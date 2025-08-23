import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getAdminGroups, adminRemoveMember } from '../../../api/adminApi';
import type { AdminGroup } from '../../../api/adminApi';

interface MemberInfo {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  relationship: string;
  role: string;
  joined_at: string;
  group_id: string;
  group_name: string;
}

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [groups, setGroups] = useState<AdminGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingMember, setDeletingMember] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Load all groups to get member information
        const groupsResponse = await getAdminGroups(0, 1000); // Get all groups
        setGroups(groupsResponse.groups);
        
        // Extract member information from groups
        // Note: This is a simplified approach since there's no dedicated members API
        // In a real implementation, you'd want a dedicated API endpoint for member management
        const allMembers: MemberInfo[] = [];
        
        // This is a placeholder - the actual API response would need to include member details
        // For now, we'll show a message that member details need to be loaded from group feeds
        
        setMembers(allMembers);
      } catch (error) {
        console.error('Failed to load member data:', error);
        setError('멤버 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemoveMember = async (memberId: string, memberName: string, groupName: string) => {
    if (!confirm(`정말로 "${memberName}" 멤버를 "${groupName}" 그룹에서 제거하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.`)) {
      return;
    }

    try {
      setDeletingMember(memberId);
      await adminRemoveMember(memberId);
      
      alert('멤버가 성공적으로 제거되었습니다.');
      
      // Remove member from local state
      setMembers(members.filter(member => member.id !== memberId));
    } catch (error) {
      console.error('Failed to remove member:', error);
      alert('멤버 제거 중 오류가 발생했습니다.');
    } finally {
      setDeletingMember(null);
    }
  };

  // Note: filteredMembers would be used when member list is implemented
  // const filteredMembers = selectedGroup === 'all' 
  //   ? members 
  //   : members.filter(member => member.group_id === selectedGroup);

  if (isLoading) {
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
            <h1 className="text-2xl font-bold text-gray-900">멤버 관리</h1>
            <p className="mt-2 text-gray-600">
              가족 그룹 멤버 관리 (리더는 삭제할 수 없습니다)
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">모든 그룹</option>
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.group_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Notice about member management */}
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <div className="text-yellow-400 mr-3">⚠️</div>
            <div className="text-sm text-yellow-700">
              <h3 className="font-medium mb-1">멤버 관리 안내</h3>
              <p>
                현재 멤버의 상세 정보를 조회하려면 각 그룹의 피드를 확인해야 합니다. 
                멤버 삭제 기능은 멤버 ID가 필요하므로, 그룹 관리 페이지에서 해당 그룹의 
                피드를 먼저 확인한 후 멤버 정보를 파악하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>

        {/* Groups Overview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">그룹별 멤버 현황</h2>
          </div>
          <div className="p-0">
            {groups.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                등록된 그룹이 없습니다.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        그룹명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        리더
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        멤버 수
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
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
                          <div className="text-sm font-medium text-gray-900">
                            {group.group_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {group.id.substring(0, 8)}...
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            group.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {group.status === 'ACTIVE' ? '활성' : '비활성'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/admin/groups/${group.id}/feed`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            피드 보기
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Member Deletion Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">멤버 직접 삭제</h3>
          <div className="rounded-md bg-blue-50 p-4 mb-4">
            <div className="text-sm text-blue-700">
              멤버 ID를 알고 있는 경우, 아래 폼을 사용하여 직접 멤버를 삭제할 수 있습니다.
              멤버 ID는 그룹 피드나 개발자 도구를 통해 확인할 수 있습니다.
            </div>
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const memberId = formData.get('memberId') as string;
              const memberName = formData.get('memberName') as string;
              const groupName = formData.get('groupName') as string;
              
              if (memberId && memberName && groupName) {
                handleRemoveMember(memberId, memberName, groupName);
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1">
                  멤버 ID
                </label>
                <input
                  type="text"
                  id="memberId"
                  name="memberId"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="멤버 ID를 입력하세요"
                />
              </div>
              <div>
                <label htmlFor="memberName" className="block text-sm font-medium text-gray-700 mb-1">
                  멤버 이름 (확인용)
                </label>
                <input
                  type="text"
                  id="memberName"
                  name="memberName"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="멤버 이름을 입력하세요"
                />
              </div>
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                  그룹 이름 (확인용)
                </label>
                <input
                  type="text"
                  id="groupName"
                  name="groupName"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="그룹 이름을 입력하세요"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!!deletingMember}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingMember ? '삭제 중...' : '멤버 삭제'}
              </button>
            </div>
          </form>
        </div>

        {/* Guidelines */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">멤버 관리 가이드라인</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 text-red-500 mr-2">⚠️</span>
              <p>리더 멤버는 삭제할 수 없습니다. 그룹 전체를 삭제해야 합니다.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 text-blue-500 mr-2">ℹ️</span>
              <p>멤버 삭제는 즉시 적용되며, 해당 사용자는 더 이상 그룹에 접근할 수 없습니다.</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 text-green-500 mr-2">✓</span>
              <p>삭제된 멤버의 기존 게시글은 보존됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMembers;