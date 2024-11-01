interface ChDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: { imageUrl: string; isFollowed: boolean } | null;
}

const ChDetailModal: React.FC<ChDetailModalProps> = ({
  isOpen,
  onClose,
  character,
}) => {
  if (!isOpen || !character) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-[300px] h-[399px] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="border-[3px] border-main-color rounded-full h-[100px] w-[100px] overflow-hidden">
            <img
              src={character.imageUrl}
              alt="Character"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-slate-600 w-full h-[150px] flex items-center justify-center rounded-lg">
            {/* 추가적인 콘텐츠나 스타일을 여기에 추가할 수 있습니다 */}
          </div>
          <p className="text-gray-600 mt-4">
            팔로우 여부: {character.isFollowed ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChDetailModal;
