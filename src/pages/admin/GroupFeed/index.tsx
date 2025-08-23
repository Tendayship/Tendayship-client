import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getGroupFeed } from '../../../api/adminApi';
import type { GroupFeedResponse } from '../../../api/adminApi';

const GroupFeed: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [feedData, setFeedData] = useState<GroupFeedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGroupFeed = async () => {
      if (!groupId) {
        setError('그룹 ID가 없습니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await getGroupFeed(groupId);
        setFeedData(data);
      } catch (error) {
        console.error('Failed to load group feed:', error);
        setError('그룹 피드를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadGroupFeed();
  }, [groupId]);

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
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/groups"
              className="text-blue-600 hover:text-blue-800"
            >
              ← 그룹 목록으로 돌아가기
            </Link>
          </div>
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!feedData) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-gray-500">피드 데이터를 찾을 수 없습니다.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin/groups"
              className="text-blue-600 hover:text-blue-800"
            >
              ← 그룹 목록으로 돌아가기
            </Link>
          </div>
        </div>

        {/* Group Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {feedData.group_info.name}
              </h1>
              {feedData.group_info.recipient_name && (
                <p className="text-gray-600">
                  받는 분: {feedData.group_info.recipient_name}
                </p>
              )}
            </div>
            <div className="text-sm text-gray-500">
              그룹 ID: {feedData.group_info.id.substring(0, 8)}...
            </div>
          </div>
        </div>

        {/* Posts */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              피드 게시글 ({feedData.posts.length}개)
            </h2>
          </div>
          
          {feedData.posts.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              아직 등록된 게시글이 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {feedData.posts.map((post, index) => (
                <div key={post.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          {post.author_name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(post.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-gray-700 mb-3">
                        {post.content}
                      </div>
                      {post.image_urls && post.image_urls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                          {post.image_urls.map((imageUrl, imgIndex) => (
                            <div key={imgIndex} className="relative">
                              <img
                                src={imageUrl}
                                alt={`첨부 이미지 ${imgIndex + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="ml-4 text-sm text-gray-500">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feed Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">피드 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-gray-900">회차 ID</dt>
              <dd className="text-gray-600">{feedData.issue_id}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">총 게시글 수</dt>
              <dd className="text-gray-600">{feedData.posts.length}개</dd>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GroupFeed;