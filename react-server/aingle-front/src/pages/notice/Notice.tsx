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

    const { post, voteWinnerCharacter } = alarm;

    if (post) {
      navigate(`/post/${post.postId}`);
    } else if (voteWinnerCharacter) {
      navigate(`/vote/chardetail/${voteWinnerCharacter.characterId}`);
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
        console.log("알림 : ", response);
        setAlarms(response);
      } catch (error) {
        console.error("알림 조회 실패: ", error);
      }
    };

    fetchAlarm();
  }, []);

  const currentTime = new Date();

  const isAlarmReady = (alarm: Ialarm) => {
    if (!alarm.sender) {
      // sender가 null일 경우 false 반환
      return false;
    }

    const alarmTime = new Date(alarm.createTime);
    alarmTime.setMinutes(
      alarmTime.getMinutes() + alarm.sender.commentDelayTime
    );
    return alarmTime <= currentTime;
  };

  return (
    <div className="min-h-screen  relative bg-white px-6 pt-[13px] pb-[100px] overflow-auto">
      <PinkTextHeader />
      <div className="overflow-auto min-h-screen">
        {alarms.filter(isAlarmReady).length === 0 ? (
          <div className="text-center text-lg font-bold text-gray-600 py-5">
            알람이 없습니다
          </div>
        ) : (
          alarms
            .filter(isAlarmReady)
            .map((alarm) => (
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
