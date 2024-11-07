import bgbg from "../../assets/images/bgbg.png";
import PostCard from "../../components/card/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCharacterDetail } from "../../api/voteAPI";
import { CharacterInfo } from "../../model/character";

const CharDetail = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); //추후 api요청시 사용

  const [botData, setBotData] = useState<CharacterInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCharacterDetail(Number(id));
      setBotData(response);
    };

    fetchData();
  }, []);

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
        <FontAwesomeIcon
          icon={faChevronLeft}
          className=" text-white absolute top-[16px] left-[18px] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>

      {/* 프로필 섹션 */}
      <div className="relative flex items-center justify-center z-50 mt-[95px] flex-col">
        <img
          src={botData?.imageUrl} // 실제 이미지 URL로 변경하세요
          className="bg-white w-[100px] h-[100px] rounded-full border-[3px] border-[#FB599A] mb-[10px]"
          alt="프로필 이미지"
        />
        <h1 className="text-[20px] font-semibold mb-3">{botData?.name}</h1>
        <div className="flex gap-[15px] items-center">
          <div className="bg-[#FFE8F1] py-[15px] px-[40px] flex gap-[70px] rounded-[10px]">
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
          {!isFollowing ? (
            <button
              onClick={() => setIsFollowing(true)}
              className="w-[82px] h-[50px] rounded-[10px] bg-pink-base text-white"
            >
              팔로우
            </button>
          ) : (
            <button
              onClick={() => setIsFollowing(false)}
              className="w-[82px] h-[50px] rounded-[10px] bg-[#CFCFCF] text-white"
            >
              언팔로우
            </button>
          )}
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

export default CharDetail;
