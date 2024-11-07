import { useLocation, useNavigate } from "react-router-dom";
import category from "../../assets/icons/Category.png";
import categoryGray from "../../assets/icons/CategoryGray.png";
import home from "../../assets/icons/Home.png";
import homeGray from "../../assets/icons/HomeGray.png";
import notice from "../../assets/icons/Notification.png";
import noticeGray from "../../assets/icons/NotificationGray.png";
import profile from "../../assets/icons/Profile.png";
import profileGray from "../../assets/icons/ProfileGray.png";
import plus from "../../assets/imgs/plus.png";
import { useEffect, useState } from "react";
import { getAlarm } from "../../api/alarm"; // 알람 API 가져오기
import { Ialarm } from "../../model/alarm";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [homeState, setHomeState] = useState<boolean>(true);
  const [categoryState, setCategoryState] = useState<boolean>(true);
  const [noticeState, setNoticeState] = useState<boolean>(true);
  const [profileState, setProfileState] = useState<boolean>(true);

  // 읽지 않은 알람의 갯수를 저장할 상태
  const [unreadAlarm, setUnreadAlarm] = useState<number>(0);

  useEffect(() => {
    if (location.pathname.startsWith("/home")) {
      setHomeState(true);
      setCategoryState(false);
      setNoticeState(false);
      setProfileState(false);
    } else if (location.pathname.startsWith("/vote")) {
      setHomeState(false);
      setCategoryState(true);
      setNoticeState(false);
      setProfileState(false);
    } else if (location.pathname.startsWith("/notice")) {
      setHomeState(false);
      setCategoryState(false);
      setNoticeState(true);
      setProfileState(false);
    } else if (location.pathname.startsWith("/mypage")) {
      setHomeState(false);
      setCategoryState(false);
      setNoticeState(false);
      setProfileState(true);
    }
  }, [location.pathname]);

  // 알람 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchUnreadAlarms = async () => {
      try {
        const response = await getAlarm({ page: 0, size: 10 });
        const unreadAlarms = response.filter((alarm : Ialarm) => !alarm.isRead).length;
        setUnreadAlarm(unreadAlarms);
      } catch (error) {
        console.error("알람 데이터 가져오기 실패:", error);
      }
    };

    fetchUnreadAlarms();
  }, []);

  const handleHomeClick = () => {
    setHomeState(true);
    setCategoryState(false);
    setNoticeState(false);
    setProfileState(false);
    navigate("/home");
  };

  const handleCategoryClick = () => {
    setHomeState(false);
    setCategoryState(true);
    setNoticeState(false);
    setProfileState(false);
    navigate("/vote");
  };

  const handleNoticeClick = () => {
    setHomeState(false);
    setCategoryState(false);
    setNoticeState(true);
    setProfileState(false);
    navigate("/notice");
  };

  const handleProfileClick = () => {
    setHomeState(false);
    setCategoryState(false);
    setNoticeState(false);
    setProfileState(true);
    navigate("/mypage");
  };

  const handleWriteClick = () => {
    setHomeState(false);
    setCategoryState(false);
    setNoticeState(false);
    setProfileState(false);
    navigate("/write");
  };

  return (
    <div
      className="w-full h-[75px] flex justify-evenly items-center absolute bottom-0 z-3 bg-white shadow-lg"
      style={{ boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <img
        onClick={handleHomeClick}
        src={homeState ? home : homeGray}
        className="w-[24px] mb-[12px]"
      />
      <img
        onClick={handleCategoryClick}
        src={categoryState ? category : categoryGray}
        className="w-[24px] mb-[12px]"
      />
      <div className="rounded-full p-2 flex items-center mb-[45px] justify-center">
        <img
          src={plus}
          className="w-[60px] h-[60px]"
          onClick={handleWriteClick}
        />
      </div>

      <div className="relative">
        <img
          onClick={handleNoticeClick}
          src={noticeState ? notice : noticeGray}
          className="w-[22px] mb-[12px]"
        />
        {unreadAlarm > 0 && (
          <span className="absolute top-[-5px] right-[-2px] bg-red-500 text-white rounded-full text-xs px-1">
            {unreadAlarm}
          </span>
        )}
      </div>
      <img
        onClick={handleProfileClick}
        src={profileState ? profile : profileGray}
        className="w-[24px] mb-[12px]"
      />
    </div>
  );
};

export default Footer;
