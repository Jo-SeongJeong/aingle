import PinkTextHeader from "../../components/header/PinkTextHeader";
import NoticeCard from "../../components/card/NoticeCard";
import { Ialarm , IgetAlarm } from "../../model/alarm";
import { useEffect, useState } from "react";
import { getAlarm } from "../../api/alarm";

const Notice = () => {

  const [ alarms , setAlarms ] = useState<Ialarm[]>([]);
  const [ alarmId , setAlarmId ] = useState(0);

  const numbers : IgetAlarm =  {
    page : 0,
    size : 10,
  }

  useEffect(() => {
    const fetchAlarm = async () => {
      try {
        const response = await getAlarm(numbers);
        setAlarms(response);
        
      } catch (error) {
        console.error("알림 조회 실패 : " , error);
      }
    }

    fetchAlarm();
  } , [])
  console.log(alarms);
  return (
    <div className="h-full w-[375px] relative bg-white px-6 pt-[13px] overflow-auto">
      <PinkTextHeader />
      <div className="overflow-auto h-full">
        {alarms.map((alarm) => {
          return (
            <NoticeCard
              key={alarm.alarmId}
              alarm={alarm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notice;
