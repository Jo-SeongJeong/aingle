import bgbg from "../../assets/images/bgbg.png";
import PostCard from "../../components/card/PostCard";
import cog from "../../assets/icons/settings.png";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";

const MyPage = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);

  // 더미 데이터 생성
  const posts = [
    { id: 1, image: "https://via.placeholder.com/100" },
    { id: 2, image: "https://via.placeholder.com/100" },
    { id: 3, image: "https://via.placeholder.com/100" },
    { id: 4, image: "https://via.placeholder.com/100" },
    { id: 5, image: "https://via.placeholder.com/100" },
    { id: 6, image: "https://via.placeholder.com/100" },
    // 필요한 만큼 추가
  ];

  return (
    <div className="h-full w-[375px] relative bg-white overflow-auto ">
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
          src="/path/to/profile-image.jpg" // 실제 이미지 URL로 변경하세요
          className="bg-black w-[100px] h-[100px] rounded-full border-[3px] border-[#FB599A] mb-[10px]"
          alt="프로필 이미지"
        />
        <h1 className="text-[20px] font-semibold mb-3">{userData.name}</h1>
        <div className="bg-[#FFE8F1] py-[15px] px-[40px] flex gap-[80px] rounded-[10px]">
          <div className="text-center">
            <h1 className="text-lg font-bold text-pink-base">4</h1>
            <h1 className="text-[#6A6A6A]">게시물</h1>
          </div>
          <div
            className="text-center"
            onClick={() => {
              navigate("/mypage/following");
            }}
          >
            <h1 className="text-lg font-bold text-pink-base">4</h1>
            <h1 className="text-[#6A6A6A]">팔로워</h1>
          </div>
        </div>
      </div>

      {/* 게시물 리스트 섹션 */}
      <div className="px-[23px] pt-[24px] grid grid-cols-3 gap-4">
        {/* 게시물 데이터 매핑 */}
        {posts.map((post) => (
          <PostCard key={post.id} id={post.id} image={post.image} />
        ))}
      </div>
    </div>
  );
};

export default MyPage;
