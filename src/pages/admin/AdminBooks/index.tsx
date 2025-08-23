import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { getPendingBooks, updateBookStatus, generateBookPDF } from '../../../api/adminApi';
import type { PendingBook, BookStatusUpdate } from '../../../api/adminApi';

const AdminBooks: React.FC = () => {
  const [books, setBooks] = useState<PendingBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingBook, setUpdatingBook] = useState<string | null>(null);
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const booksData = await getPendingBooks();
      setBooks(booksData);
    } catch (error) {
      console.error('Failed to load books:', error);
      setError('책자 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleStatusUpdate = async (
    bookId: string,
    statusUpdate: BookStatusUpdate
  ) => {
    try {
      setUpdatingBook(bookId);
      const updatedBook = await updateBookStatus(bookId, statusUpdate);
      
      // Update the book in the local state
      setBooks(books.map(book => 
        book.id === bookId ? updatedBook : book
      ));
      
    } catch (error) {
      console.error('Failed to update book status:', error);
      alert('책자 상태 업데이트 중 오류가 발생했습니다.');
    } finally {
      setUpdatingBook(null);
    }
  };

  const handleGeneratePDF = async (issueId: string) => {
    try {
      setGeneratingPDF(issueId);
      const result = await generateBookPDF(issueId);
      alert(`PDF 생성이 완료되었습니다.\n${result.message}`);
      
      // Reload books to get updated PDF URLs
      await loadBooks();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setGeneratingPDF(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'shipping':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      pending: '대기',
      in_progress: '진행중',
      completed: '완료',
      shipping: '배송중',
      delivered: '배송완료',
    };
    return statusMap[status] || status;
  };

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
            <h1 className="text-2xl font-bold text-gray-900">책자 관리</h1>
            <p className="mt-2 text-gray-600">
              총 {books.length}개의 책자 처리 현황
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Books Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {books.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              처리 중인 책자가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      회차 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      그룹
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      받는 분
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      제작 상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      배송 상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      PDF
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {book.issue_number}회차
                          </div>
                          <div className="text-sm text-gray-500">
                            생성일: {new Date(book.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {book.group_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {book.recipient_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(book.production_status)}`}>
                            {getStatusText(book.production_status)}
                          </span>
                          <select
                            value={book.production_status}
                            onChange={(e) => handleStatusUpdate(book.id, {
                              production_status: e.target.value as 'pending' | 'in_progress' | 'completed'
                            })}
                            disabled={updatingBook === book.id}
                            className="text-xs border border-gray-300 rounded px-2 py-1 disabled:opacity-50"
                          >
                            <option value="pending">대기</option>
                            <option value="in_progress">진행중</option>
                            <option value="completed">완료</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(book.delivery_status)}`}>
                            {getStatusText(book.delivery_status)}
                          </span>
                          <select
                            value={book.delivery_status}
                            onChange={(e) => handleStatusUpdate(book.id, {
                              delivery_status: e.target.value as 'pending' | 'shipping' | 'delivered'
                            })}
                            disabled={updatingBook === book.id}
                            className="text-xs border border-gray-300 rounded px-2 py-1 disabled:opacity-50"
                          >
                            <option value="pending">대기</option>
                            <option value="shipping">배송중</option>
                            <option value="delivered">배송완료</option>
                          </select>
                          {book.shipped_at && (
                            <div className="text-xs text-gray-500">
                              배송: {new Date(book.shipped_at).toLocaleDateString()}
                            </div>
                          )}
                          {book.delivered_at && (
                            <div className="text-xs text-gray-500">
                              완료: {new Date(book.delivered_at).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-2">
                          {book.pdf_url ? (
                            <a
                              href={book.pdf_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900 text-xs"
                            >
                              PDF 보기
                            </a>
                          ) : (
                            <button
                              onClick={() => handleGeneratePDF(book.issue_id)}
                              disabled={generatingPDF === book.issue_id}
                              className="text-green-600 hover:text-green-900 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {generatingPDF === book.issue_id ? 'PDF 생성중...' : 'PDF 생성'}
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {updatingBook === book.id && (
                          <div className="text-blue-600 text-xs">
                            업데이트 중...
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Status Legend */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">상태 설명</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">제작 상태</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <span className="font-medium">대기</span>: 제작 대기 중</li>
                <li>• <span className="font-medium">진행중</span>: 제작 진행 중</li>
                <li>• <span className="font-medium">완료</span>: 제작 완료</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">배송 상태</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <span className="font-medium">대기</span>: 배송 준비 중</li>
                <li>• <span className="font-medium">배송중</span>: 배송 중</li>
                <li>• <span className="font-medium">배송완료</span>: 배송 완료</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBooks;