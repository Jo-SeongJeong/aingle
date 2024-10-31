import React from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import NoticeCard, { INoticeCard } from "../../components/card/NoticeCard";

const Notice = () => {
  const dummyDatas: INoticeCard[] = [
    {
      profile: "https://via.placeholder.com/30",
      writer: "홍길동",
      content: "새로운 업데이트가 있습니다. 확인해보세요!",
      alertText: "알림",
      contentImg: "https://via.placeholder.com/50",
      isChecked: false,
      postTime: "2024-04-25 10:30",
    },
    {
      profile: "https://via.placeholder.com/30",
      writer: "김철수",
      content: "프로젝트 회의가 오후 3시에 있습니다.",
      alertText: "회의",
      isChecked: true,
      postTime: "2024-04-24 09:15",
    },
    {
      profile: "https://via.placeholder.com/30",
      writer: "이영희",
      content: "새로운 기능이 추가되었습니다. 자세히 알아보세요.",
      alertText: "업데이트",
      contentImg: "https://via.placeholder.com/50",
      isChecked: false,
      postTime: "2024-04-23 14:45",
    },
    {
      profile: "https://via.placeholder.com/30",
      writer: "박민수",
      content: "주간 보고서를 제출해주세요.",
      alertText: "보고서",
      isChecked: true,
      postTime: "2024-04-22 16:20",
    },
    {
      profile: "https://via.placeholder.com/30",
      writer: "최지우",
      content: "다음 주 휴가 신청을 완료했습니다.",
      alertText: "휴가",
      contentImg: "https://via.placeholder.com/50",
      isChecked: false,
      postTime: "2024-04-21 11:05",
    },
  ];

  return (
    <div className="h-full w-[375px] relative bg-white px-6 pt-[13px] overflow-auto">
      <PinkTextHeader />
      <div className="overflow-auto h-full">
        {dummyDatas.map((data, idx) => {
          return (
            <NoticeCard
              key={idx}
              postTime="2"
              profile=""
              contentImg="d"
              alertText={data.alertText}
              isChecked={data.isChecked}
              writer={data.writer}
              content={data.content}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notice;
