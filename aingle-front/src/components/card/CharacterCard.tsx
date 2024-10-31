import React from "react";

interface CharacterCardProps {
  imageUrl?: string;
  isFollowed?: boolean;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  imageUrl = "",
  isFollowed = false,
  onClick,
}) => {
  return (
    <div
      className="relative w-[100px] h-[100px] mx-1 my-1 cursor-pointer"
      onClick={onClick}
    >
      {isFollowed && (
        <div className="absolute top-0 left-0 w-full h-full border-4 border-pink-500 rounded-lg">
          <div className="flex justify-center items-center absolute bottom-0 right-0 w-5 h-5 bg-pink-500">
            <span className="text-white text-xl font-bold">✓</span>
          </div>
        </div>
      )}
      <div className="bg-white w-full h-full rounded-lg overflow-hidden">
        <img src={imageUrl} alt="Character" className="w-full h-full" />
      </div>
    </div>
  );
};

export default CharacterCard;
