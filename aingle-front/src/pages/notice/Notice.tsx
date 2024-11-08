import PinkTextHeader from "../../components/header/PinkTextHeader";
import NoticeCard from "../../components/card/NoticeCard";
import { Ialarm, IgetAlarm } from "../../model/alarm";
import { useEffect, useState } from "react";
import { getAlarm, readAlarm } from "../../api/alarm";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const [alarms, setAlarms] = useState<Ialarm[]>([]);
  const navigate = useNavigate();

  const handleAlarmClick = (alarm: Ialarm) => {
    readAlarm(alarm.alarmId);

    const { post, votewinnerCharacter } = alarm;

    // 게시글 알람일 경우 게시글 디테일로 리다이렉트
    if (post) {
      navigate(`/post/${post.postId}`);
      // 투표 알람일 경우 투표에 선정된 캐릭터 디테일로 리다이렉트
    } else if (votewinnerCharacter) {
      navigate(`/vote/chardetail/${votewinnerCharacter.characterId}`);
    }
  };

  const numbers: IgetAlarm = {
    page: 0,
    size: 10,
  };

  useEffect(() => {
    const fetchAlarm = async () => {
      try {
        const response = await getAlarm(numbers);
        setAlarms(response);
      } catch (error) {
        console.error("알림 조회 실패: ", error);
      }
    };

    fetchAlarm();
  }, []);

  return (
    <div className="h-full w-[375px] relative bg-white px-6 pt-[13px] overflow-auto">
      <PinkTextHeader />
      <div className="overflow-auto h-full">
        {alarms.length === 0 ? (
          <div className="text-center text-lg font-bold text-gray-600 py-5">
            알람이 없습니다
          </div>
        ) : (
          alarms.map((alarm) => (
            <NoticeCard
              key={alarm.alarmId}
              alarm={alarm}
              onClickAlarm={() => handleAlarmClick(alarm)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Notice;
