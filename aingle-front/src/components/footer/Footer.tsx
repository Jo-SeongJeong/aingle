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

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  {
    location.pathname !== "/write" && location.pathname !== "/" && <Footer />;
  }

  const [homeState, setHomeState] = useState<boolean>(true);
  const [categoryState, setCategoryState] = useState<boolean>(true);
  const [noticeState, setNoticeState] = useState<boolean>(true);
  const [profileState, setProfileState] = useState<boolean>(true);

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
        onClick={() => handleHomeClick()}
        src={homeState ? home : homeGray}
        className="w-[24px] mb-[12px]"
      />
      <img
        onClick={() => handleCategoryClick()}
        src={categoryState ? category : categoryGray}
        className="w-[24px] mb-[12px]"
      />
      <div className="rounded-full p-2 flex items-center mb-[45px] justify-center">
        <img
          src={plus}
          className="w-[60px] h-[60px]"
          onClick={() => {
            handleWriteClick();
          }}
        />
      </div>

      <img
        onClick={() => handleNoticeClick()}
        src={noticeState ? notice : noticeGray}
        className="w-[22px] mb-[12px]"
      />
      <img
        onClick={() => handleProfileClick()}
        src={profileState ? profile : profileGray}
        className="w-[24px] mb-[12px]"
      />
    </div>
  );
};

export default Footer;
