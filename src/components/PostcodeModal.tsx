import React from 'react';
import DaumPostcode, { type DaumPostcodeData } from 'react-daum-postcode';

interface PostcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: DaumPostcodeData) => void;
  title?: string;
}

const PostcodeModal: React.FC<PostcodeModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  title = '주소 검색'
}) => {
  if (!isOpen) return null;

  const handleComplete = (data: DaumPostcodeData) => {
    onComplete(data);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="postcode-modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 id="postcode-modal-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="주소 검색창 닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          <div className="w-full h-96 border border-gray-200 rounded-lg overflow-hidden">
            <DaumPostcode
              onComplete={handleComplete}
              width="100%"
              height="100%"
              animation={true}
              autoClose={false}
              theme={{
                bgColor: '#FFFFFF',
                searchBgColor: '#0B7261',
                contentBgColor: '#FFFFFF',
                pageBgColor: '#FAFAFA',
                textColor: '#333333',
                queryTextColor: '#FFFFFF',
                postcodeTextColor: '#FA4256',
                emphTextColor: '#008BD3',
                outlineColor: '#E0E0E0'
              }}
            />
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcodeModal;