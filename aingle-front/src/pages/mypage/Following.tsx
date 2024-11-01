import FollowingCard from "../../components/card/FollowingCard";
import TextHeader from "../../components/header/TextHeader";

const Following = () => {
  return (
    <div className="h-full w-[375px] relative bg-white  pt-[13px] overflow-auto">
      <TextHeader navTo="/mypage" headerText="팔로잉 리스트" />
      <div className="px-4 pt-[20px] mt-8">
        <FollowingCard profileImg={""} />
      </div>
    </div>
  );
};

export default Following;
