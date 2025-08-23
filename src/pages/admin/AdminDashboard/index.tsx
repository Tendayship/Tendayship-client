import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getAdminGroups, getPendingBooks } from '../../../api/adminApi';
import type { AdminGroup } from '../../../api/adminApi';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalGroups: 0,
    activeGroups: 0,
    pendingBooks: 0,
    recentGroups: [] as AdminGroup[],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load groups and pending books in parallel
        const [groupsResponse, pendingBooks] = await Promise.all([
          getAdminGroups(0, 5), // Get first 5 groups for recent groups
          getPendingBooks(),
        ]);

        const activeGroups = groupsResponse.groups.filter(
          group => group.status === 'ACTIVE'
        );

        setStats({
          totalGroups: groupsResponse.total,
          activeGroups: activeGroups.length,
          pendingBooks: pendingBooks.length,
          recentGroups: groupsResponse.groups,
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError('대시보드 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  const statsCards = [
    {
      title: '전체 그룹',
      value: stats.totalGroups,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/admin/groups',
    },
    {
      title: '활성 그룹',
      value: stats.activeGroups,
      icon: '✅',
      color: 'bg-green-500',
      link: '/admin/groups',
    },
    {
      title: '대기 중인 책자',
      value: stats.pendingBooks,
      icon: '📚',
      color: 'bg-yellow-500',
      link: '/admin/books',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="mt-2 text-gray-600">시스템 현황을 한눈에 확인하세요.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${card.color} text-white text-xl`}>
                  {card.icon}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Groups */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">최근 그룹</h2>
            <Link
              to="/admin/groups"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              전체 보기 →
            </Link>
          </div>
          <div className="p-0">
            {stats.recentGroups.length === 0 ? (
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stats.recentGroups.map((group) => (
                      <tr key={group.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {group.group_name}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(group.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">빠른 작업</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/groups"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-medium text-gray-900">그룹 관리</h3>
              <p className="text-sm text-gray-600">가족 그룹 조회 및 관리</p>
            </Link>
            <Link
              to="/admin/books"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-medium text-gray-900">책자 관리</h3>
              <p className="text-sm text-gray-600">PDF 생성 및 배송 관리</p>
            </Link>
            <Link
              to="/admin/members"
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="text-2xl mb-2">👤</div>
              <h3 className="font-medium text-gray-900">멤버 관리</h3>
              <p className="text-sm text-gray-600">가족 구성원 관리</p>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;