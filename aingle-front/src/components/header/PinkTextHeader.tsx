import logo from "../../assets/imgs/logoText_pink.png";
import toChat from "../../assets/icons/toChat.png";
import { useNavigate } from "react-router-dom";

const PinkTextHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-[20px] py-[27.5px] w-full sticky flex items-center justify-between">
      <img src={logo} className="h-[25px]" onClick={() => navigate("/home")} />
      <img
        src={toChat}
        className=" h-[16px]"
        onClick={() => navigate("/chat")}
      />
    </div>
  );
};

export default PinkTextHeader;
