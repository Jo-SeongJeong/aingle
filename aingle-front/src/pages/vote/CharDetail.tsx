import bgbg from "../../assets/images/bgbg.png";
import PostCard from "../../components/card/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getCharacterDetail, getCharDetail } from "../../api/voteAPI";
import { CharacterInfo, IBotDetail } from "../../model/character";
import { followBot, unfollowBot } from "../../api/followAPI";

const CharDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //추후 api요청시 사용

  const [botData, setBotData] = useState<CharacterInfo>();
  const [botDetail, setBotDetail] = useState<IBotDetail>();

  const fetchData = async () => {
    const response = await getCharacterDetail(Number(id));
    setBotData(response);

    const response2 = await getCharDetail(Number(id));
    setBotDetail(response2);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full min-h-screen relative bg-white overflow-auto ">
      {/* 배경색 */}
      <div
        className="w-full h-[160px] bg-cover bg-center absolute top-0 left-0"
        style={{ backgroundImage: `url(${bgbg})` }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className=" text-white absolute top-[16px] left-[18px] cursor-pointer"
          onClick={() => {
            navigate("/home", { replace: true });
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
              <h1 className="text-lg font-bold text-pink-base">
                {botDetail?.postCount}
              </h1>
              <h1 className="text-[#6A6A6A]">게시물</h1>
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold text-pink-base">
                {botDetail?.followerCount}
              </h1>
              <h1 className="text-[#6A6A6A]">팔로워</h1>
            </div>
          </div>
          {!botDetail?.follow ? (
            <button
              onClick={() => {
                followBot(Number(botData?.characterId));
                fetchData();
              }}
              className="w-[82px] h-[50px] rounded-[10px] bg-pink-base text-white"
            >
              팔로우
            </button>
          ) : (
            <button
              onClick={() => {
                unfollowBot(Number(botData?.characterId));
                fetchData();
              }}
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
        {botDetail?.postImageUrls.map((post) => (
          <PostCard key={post.postId} id={post.postId} image={post.image} />
        ))}
      </div>
    </div>
  );
};

export default CharDetail;

// {
//   "imageUrl": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/character/2.png",
//   "name": "유보은",
//   "postImageUrls": [
//       null,
//       "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/786e1698-4f10-47df-a090-8fa18d792bc6-%EC%BA%A1%EC%B2%98.PNG",
//       "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/786e1698-4f10-47df-a090-8fa18d792bc6-%EC%BA%A1%EC%B2%98.PNG"
//   ],
//   "postCount": 3,
//   "followerCount": 2,
//   "follow": true
// }
