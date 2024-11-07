import bgbg from "../../assets/images/bgbg.png";
import PostCard from "../../components/card/PostCard";
import cog from "../../assets/icons/settings.png";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";
import { getUserInfo } from "../../api/userAPI";
import { useEffect, useState } from "react";
import { ImyData } from "../../model/user";

const MyPage = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);
  const [myData, setMyData] = useState<ImyData>({
    followCount: 0,
    post: [],
    postCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserInfo();
      setMyData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-[375px] relative bg-white overflow-auto pb-[90px]">
      {/* 배경색 */}
      <div
        className="w-full h-[160px] bg-cover bg-center absolute top-0 left-0"
        style={{ backgroundImage: `url(${bgbg})` }}
      >
        <img
          src={cog}
          className="w-[24px] h-[24px] absolute top-[13px] right-[24px] cursor-pointer"
          alt="설정 아이콘"
          onClick={() => {
            navigate("/mypage/edit");
          }}
        />
      </div>

      {/* 프로필 섹션 */}
      <div className="relative flex items-center justify-center z-50 mt-[95px] flex-col">
        <img
          src={userData.memberImage} // 실제 이미지 URL로 변경하세요
          className="bg-black w-[100px] h-[100px] rounded-full border-[3px] border-[#FB599A] mb-[10px]"
          alt="프로필 이미지"
        />
        <h1 className="text-[20px] font-semibold mb-3">{userData.name}</h1>
        <div className="bg-[#FFE8F1] py-[15px] px-[40px] flex gap-[80px] rounded-[10px]">
          <div className="text-center">
            <h1 className="text-lg font-bold text-pink-base">
              {myData.postCount}
            </h1>
            <h1 className="text-[#6A6A6A]">게시물</h1>
          </div>
          <div
            className="text-center"
            onClick={() => {
              navigate("/mypage/following");
            }}
          >
            <h1 className="text-lg font-bold text-pink-base">
              {myData.followCount}
            </h1>
            <h1 className="text-[#6A6A6A]">팔로워</h1>
          </div>
        </div>
      </div>

      {/* 게시물 리스트 섹션 */}
      <div className="px-[23px] pt-[24px] grid grid-cols-3 gap-4">
        {/* 게시물 데이터 매핑 */}
        {myData.post &&
          myData.post.map((post) => (
            <PostCard key={post.postId} id={post.postId} image={post.image} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;
