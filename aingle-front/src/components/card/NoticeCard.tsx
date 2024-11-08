import React from "react";
import { Ialarm } from "../../model/alarm";
import { calTime } from "../../utils/date";
import  CircleBird  from "../../assets/icons/CircleBird.png";

interface AlarmProps {
  alarm: Ialarm;
  onClickAlarm: () => void;
}

const NoticeCard: React.FC<AlarmProps> = ({ alarm, onClickAlarm }) => {
  const { sender, post, voteWinnerCharacter } = alarm;
  console.log(alarm)
  // 시간을 계산하는 함수 호출
  const time = calTime(alarm.createTime);

  // 알림 텍스트 설정
  const alarmText = voteWinnerCharacter
    ? `이번 달 1등은 ${voteWinnerCharacter.name} 입니다!`
    : "회원님의 글에 반응을 남겼습니다";

  return (
    <div
      className={`mb-[10px] w-full p-[15px] rounded-[10px] flex gap-[12px] items-start ${
        alarm.isRead ? "bg-[rgb(241,241,241)]" : "bg-[#FFE8F1]"
      }`}
      onClick={onClickAlarm}
    >
      {voteWinnerCharacter ? (
        <img
          src={CircleBird}
          className="w-[30px] h-[30px] bg-black object-cover flex-shrink-0 rounded-[25px]"
        />
      ) : (
        <img
          src={sender?.memberImage}
          className="w-[30px] h-[30px] bg-black object-cover flex-shrink-0 rounded-[25px]"
        />
      )}
      <div className="w-full">
        <h1 className="text-16px font-semibold mb-[5px]">{sender?.name}</h1>
        <h1 className="text-[14px]">{alarmText}</h1>
        <span className="text-[#A6A6A6] text-[12px]">{time}</span>
      </div>
      {voteWinnerCharacter ? (
        <img
          src={voteWinnerCharacter.imageUrl}
          className="w-[50px] h-[50px] bg-black object-cover flex-shrink-0 rounded-[5px]"
        />
      ) : (
        <img
          src={post?.image}
          className="w-[50px] h-[50px] bg-black object-cover flex-shrink-0 rounded-[5px]"
        />
      )}
    </div>
  );
};

export default NoticeCard;
