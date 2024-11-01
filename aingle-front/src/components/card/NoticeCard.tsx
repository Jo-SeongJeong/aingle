import React from "react";

export interface INoticeCard {
  profile: string;
  writer: string;
  content: string;
  alertText: string;
  contentImg?: string;
  isChecked: boolean;
  postTime: string;
}

const NoticeCard: React.FC<INoticeCard> = ({
  profile,
  writer,
  content,
  alertText,
  contentImg,
  isChecked,
  postTime,
}) => {
  const cutText = (text: string): string => {
    if (text.length > 14) {
      return text.substring(0, 14) + "...";
    }
    return text;
  };

  return (
    <div
      className={`mb-[10px] w-full p-[15px] rounded-[10px] flex gap-[12px] items-start bg-[#FFE8F1] ${
        isChecked ? "bg-[rgb(241,241,241)]" : "bg-[#FFE8F1]"
      }`}
    >
      <img
        src={profile}
        className="w-[30px] h-[30px] rounded-full bg-black object-cover flex-shrink-0"
      />
      <div className="w-full">
        <h1 className="text-16px font-semibold mb-[5px]">{writer}</h1>
        <h1 className="text-[14px]">{alertText}</h1>
        <h1 className="text-[14px] text-pink-base mb-[2px]">
          {cutText(content)}
        </h1>
        <span className="text-[#A6A6A6] text-[12px]">asdf</span>
      </div>
      {contentImg && (
        <img
          src={contentImg}
          alt="콘텐츠 이미지"
          className="w-[50px] h-[50px] bg-black object-cover flex-shrink-0 rounded-[5px]"
        />
      )}
    </div>
  );
};

export default NoticeCard;
