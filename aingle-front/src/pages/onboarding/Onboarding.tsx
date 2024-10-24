import bird from "../../assets/icons/Bird.png";

const Onboarding = () => {
  return (
    <div className="bg-[#FFFAFC] h-full w-full px-[16px] py-[34px] flex flex-col justify-between items-center">
      <div></div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center flex-col">
          <img src={bird} className="w-[60px] h-[60px] mb-6" />
          <div className="mb-[34px]">
            <span className="font-hakgyo text-[20px] text-pink-base">
              aingle{" "}
            </span>
            <span className="font-hakgyo text-[20px] text-black ">
              에 온 걸 환영해!
            </span>
          </div>
          <h1 className="mb-[16px] font-medium text-black">
            너에게 딱 맞는 AI캐릭터를 추천해주려고 해
          </h1>
          <h1 className="mb-[16px] font-medium text-black">
            너가 어떤 사람인지 알려줘
          </h1>
          <h1 className="mb-[16px] font-medium text-black">
            그러면 내가 맞는 친구를 데려올게
          </h1>
        </div>
      </div>
      <button className="py-[20px] w-full text-white bg-pink-base rounded-[10px]">
        시작하기
      </button>
    </div>
  );
};

export default Onboarding;
