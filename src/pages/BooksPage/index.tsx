import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyBooks, downloadBookPdf, regenerateBook, type Book } from '../../api/booksApi';

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadingBook, setDownloadingBook] = useState<string | null>(null);
    const [regeneratingBook, setRegeneratingBook] = useState<string | null>(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setIsLoading(true);
            const response = await getMyBooks();
            setBooks(response.books);
            setError(null);
        } catch (err) {
            console.error('책자 목록 조회 실패:', err);
            setError('책자 목록을 불러오는데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = async (book: Book) => {
        if (!book.pdf_url || book.status !== 'COMPLETED') {
            alert('다운로드할 수 있는 책자가 아닙니다.');
            return;
        }

        try {
            setDownloadingBook(book.id);
            const blob = await downloadBookPdf(book.id);
            
            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${book.title}_${book.issue_number}회차.pdf`;
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
            
        } catch (err) {
            console.error('책자 다운로드 실패:', err);
            alert('책자 다운로드에 실패했습니다.');
        } finally {
            setDownloadingBook(null);
        }
    };

    const handleRegenerate = async (book: Book) => {
        if (!window.confirm(`${book.title} (${book.issue_number}회차) 책자를 다시 생성하시겠습니까?`)) {
            return;
        }

        try {
            setRegeneratingBook(book.id);
            await regenerateBook(book.id);
            alert('책자 재생성이 요청되었습니다. 잠시 후 상태가 업데이트됩니다.');
            
            // Refresh books list
            await fetchBooks();
        } catch (err) {
            console.error('책자 재생성 실패:', err);
            alert('책자 재생성 요청에 실패했습니다.');
        } finally {
            setRegeneratingBook(null);
        }
    };

    const getStatusText = (status: Book['status']) => {
        switch (status) {
            case 'PENDING': return '생성 대기';
            case 'GENERATING': return '생성 중';
            case 'COMPLETED': return '완료';
            case 'FAILED': return '실패';
            default: return status;
        }
    };

    const getStatusColor = (status: Book['status']) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'GENERATING': return 'bg-blue-100 text-blue-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'FAILED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">책자를 불러오고 있습니다...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">나의 책자</h1>
                            <p className="mt-2 text-gray-600">
                                지금까지 만들어진 가족 이야기 책자를 확인하고 다운로드하세요.
                            </p>
                        </div>
                        <Link
                            to="/"
                            className="px-4 py-2 text-green-600 hover:text-green-700 font-medium"
                        >
                            홈으로 돌아가기
                        </Link>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchBooks}
                            className="mt-2 text-red-700 hover:text-red-800 underline"
                        >
                            다시 시도
                        </button>
                    </div>
                )}

                {/* Books Grid */}
                {books.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            아직 만들어진 책자가 없습니다
                        </h3>
                        <p className="text-gray-500 mb-6">
                            가족들과 소식을 나누면 자동으로 책자가 만들어집니다.
                        </p>
                        <Link
                            to="/posts/create"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            첫 소식 작성하기
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Book Cover/Header */}
                                <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 text-white">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium opacity-90">
                                            {book.issue_number}회차
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                                            {getStatusText(book.status)}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                    <p className="text-sm opacity-75">
                                        생성일: {new Date(book.created_at).toLocaleDateString('ko-KR')}
                                    </p>
                                </div>

                                {/* Book Info */}
                                <div className="p-6">
                                    <div className="space-y-3 mb-6">
                                        {book.completed_at && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">완료일</span>
                                                <span className="font-medium">
                                                    {new Date(book.completed_at).toLocaleDateString('ko-KR')}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">다운로드 횟수</span>
                                            <span className="font-medium">{book.download_count}회</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-2">
                                        {book.status === 'COMPLETED' && book.pdf_url && (
                                            <button
                                                onClick={() => handleDownload(book)}
                                                disabled={downloadingBook === book.id}
                                                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                                            >
                                                {downloadingBook === book.id ? '다운로드 중...' : 'PDF 다운로드'}
                                            </button>
                                        )}
                                        
                                        {book.status === 'FAILED' && (
                                            <button
                                                onClick={() => handleRegenerate(book)}
                                                disabled={regeneratingBook === book.id}
                                                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400"
                                            >
                                                {regeneratingBook === book.id ? '요청 중...' : '다시 생성'}
                                            </button>
                                        )}
                                        
                                        {book.status === 'PENDING' && (
                                            <div className="w-full px-4 py-2 bg-gray-100 text-gray-500 rounded-lg text-center">
                                                생성 대기 중...
                                            </div>
                                        )}
                                        
                                        {book.status === 'GENERATING' && (
                                            <div className="w-full px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-center">
                                                생성 중...
                                            </div>
                                        )}

                                        <Link
                                            to={`/books/${book.id}`}
                                            className="w-full inline-block px-4 py-2 text-center border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            상세 보기
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}