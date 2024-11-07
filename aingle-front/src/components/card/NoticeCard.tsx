import React from "react";
import { Ialarm } from "../../model/alarm";
import { calTime } from "../../utils/date";
interface alarmProps {
  alarm : Ialarm
}

const NoticeCard = ( {alarm} : alarmProps) => {

  const { sender , post } = alarm;

  const time = calTime(alarm.createTime); 

  // const cutText = (text: string): string => {
  //   if (text.length > 14) {
  //     return text.substring(0, 14) + "...";
  //   }
  //   return text;
  // };

  return (
    <div
      className={`mb-[10px] w-full p-[15px] rounded-[10px] flex gap-[12px] items-start bg-[#FFE8F1] ${
        alarm.isRead ? "bg-[rgb(241,241,241)]" : "bg-[#FFE8F1]"
      }`}
    >
      <img
        src={sender?.memberImage}
        className="w-[30px] h-[30px] rounded-full bg-black object-cover flex-shrink-0"
      />
      <div className="w-full">
        <h1 className="text-16px font-semibold mb-[5px]">{sender?.name}</h1>
        <h1 className="text-[14px]">{}</h1>
        <h1 className="text-[14px] text-pink-base mb-[2px]">
          {/* {cutText(content)} */}
        </h1>
        <span className="text-[#A6A6A6] text-[12px]">{time}</span>
      </div>
      {post.image && (
        <img
          src={post.image}
          alt="콘텐츠 이미지"
          className="w-[50px] h-[50px] bg-black object-cover flex-shrink-0 rounded-[5px]"
        />
      )}
    </div>
  );
};

export default NoticeCard;
