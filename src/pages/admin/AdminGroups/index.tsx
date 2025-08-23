import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getAdminGroups, adminDeleteGroup } from '../../../api/adminApi';
import type { AdminGroup } from '../../../api/adminApi';

const AdminGroups: React.FC = () => {
  const [groups, setGroups] = useState<AdminGroup[]>([]);
  const [totalGroups, setTotalGroups] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingGroup, setDeletingGroup] = useState<string | null>(null);

  const pageSize = 20;

  const loadGroups = async (page: number = 0) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAdminGroups(page * pageSize, pageSize);
      setGroups(response.groups);
      setTotalGroups(response.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to load groups:', error);
      setError('그룹 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleDeleteGroup = async (groupId: string, groupName: string) => {
    if (!confirm(`정말로 "${groupName}" 그룹을 삭제하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setDeletingGroup(groupId);
      await adminDeleteGroup(groupId, true);
      
      alert('그룹이 성공적으로 삭제되었습니다.');
      
      // Reload the current page
      await loadGroups(currentPage);
    } catch (error) {
      console.error('Failed to delete group:', error);
      alert('그룹 삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingGroup(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadGroups(newPage);
  };

  const totalPages = Math.ceil(totalGroups / pageSize);

  if (isLoading && groups.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">그룹 관리</h1>
            <p className="mt-2 text-gray-600">
              전체 {totalGroups}개 그룹 중 {groups.length}개 표시
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Groups Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {groups.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              등록된 그룹이 없습니다.
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        그룹 정보
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        리더
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        멤버 수
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        현재 회차
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groups.map((group) => (
                      <tr key={group.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {group.group_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {group.id.substring(0, 8)}...
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {group.leader_email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {group.member_count}명
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {group.current_issue ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {group.current_issue.issue_number}회차
                              </div>
                              <div className="text-gray-500">
                                마감: {new Date(group.current_issue.deadline_date).toLocaleDateString()}
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">없음</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            group.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {group.status === 'ACTIVE' ? '활성' : '비활성'}
                          </span>
                          {group.subscription_status && (
                            <div className="mt-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                group.subscription_status === 'active'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                구독: {group.subscription_status}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(group.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <Link
                            to={`/admin/groups/${group.id}/feed`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            피드 보기
                          </Link>
                          <button
                            onClick={() => handleDeleteGroup(group.id, group.group_name)}
                            disabled={deletingGroup === group.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingGroup === group.id ? '삭제 중...' : '삭제'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0 || isLoading}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      이전
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1 || isLoading}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      다음
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">{currentPage * pageSize + 1}</span>
                        {' - '}
                        <span className="font-medium">
                          {Math.min((currentPage + 1) * pageSize, totalGroups)}
                        </span>
                        {' / '}
                        <span className="font-medium">{totalGroups}</span>
                        {' 결과'}
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 0 || isLoading}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ←
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = Math.max(0, Math.min(currentPage - 2 + i, totalPages - 5 + i));
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              disabled={isLoading}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                pageNum === currentPage
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {pageNum + 1}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage >= totalPages - 1 || isLoading}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          →
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminGroups;