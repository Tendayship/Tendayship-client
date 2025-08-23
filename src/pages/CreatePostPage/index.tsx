import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, createPostWithImages, uploadImages } from '../../api/postsApi';

interface ImagePreview {
    file: File;
    preview: string;
}

export default function CreatePostPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [content, setContent] = useState('');
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_IMAGES = 4;
    const MAX_CONTENT_LENGTH = 1000;

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        
        if (images.length + files.length > MAX_IMAGES) {
            setError(`최대 ${MAX_IMAGES}장까지 업로드할 수 있습니다.`);
            return;
        }

        const newImages: ImagePreview[] = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...newImages]);
        setError(null);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImages(prev => {
            const newImages = prev.filter((_, index) => index !== indexToRemove);
            // Clean up object URL to prevent memory leaks
            URL.revokeObjectURL(prev[indexToRemove].preview);
            return newImages;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!content.trim()) {
            setError('소식 내용을 입력해주세요.');
            return;
        }

        if (content.length > MAX_CONTENT_LENGTH) {
            setError(`소식 내용은 ${MAX_CONTENT_LENGTH}자 이내로 작성해주세요.`);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (images.length === 0) {
                // 텍스트만 있는 소식
                await createPost({ content });
            } else {
                // 이미지가 있는 소식
                const imageFiles = images.map(img => img.file);
                const uploadResponse = await uploadImages(imageFiles);
                
                await createPostWithImages({
                    content,
                    image_urls: uploadResponse.image_urls,
                    image_blob_keys: uploadResponse.blob_keys
                });
            }

            // Clean up image previews
            images.forEach(img => URL.revokeObjectURL(img.preview));
            
            alert('소식이 성공적으로 작성되었습니다!');
            navigate('/');
        } catch (err) {
            console.error('소식 작성 실패:', err);
            setError('소식 작성 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">소식 작성</h1>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            취소
                        </button>
                    </div>
                    <p className="mt-2 text-gray-600">
                        가족들과 나누고 싶은 소중한 이야기를 작성해보세요.
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Content Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                소식 내용
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="오늘의 이야기를 들려주세요..."
                                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                maxLength={MAX_CONTENT_LENGTH}
                                disabled={isLoading}
                            />
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">
                                    최대 {MAX_CONTENT_LENGTH}자까지 입력 가능합니다.
                                </p>
                                <span className={`text-sm ${
                                    content.length > MAX_CONTENT_LENGTH * 0.9 
                                        ? 'text-red-500' 
                                        : 'text-gray-500'
                                }`}>
                                    {content.length}/{MAX_CONTENT_LENGTH}
                                </span>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                사진 추가 (선택사항)
                            </label>
                            
                            {/* Image Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={image.preview}
                                            alt={`업로드한 이미지 ${index + 1}`}
                                            className="w-full aspect-square object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                                            disabled={isLoading}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                
                                {/* Add Image Button */}
                                {images.length < MAX_IMAGES && (
                                    <button
                                        type="button"
                                        onClick={handleAddImageClick}
                                        className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                                        disabled={isLoading}
                                    >
                                        <svg
                                            className="w-8 h-8 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4v16m8-8H4"
                                            />
                                        </svg>
                                        <span className="text-sm">
                                            사진 추가
                                        </span>
                                    </button>
                                )}
                            </div>
                            
                            <p className="text-sm text-gray-500">
                                최대 {MAX_IMAGES}장까지 업로드 가능합니다. JPG, PNG 파일만 지원됩니다.
                            </p>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                                disabled={isLoading || !content.trim()}
                            >
                                {isLoading ? '작성 중...' : '소식 작성'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}