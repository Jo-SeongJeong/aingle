import { useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import Post, { IPost } from "../../components/Post/Post";
import PostCommentModal from "../../components/Post/PostCommentModal";

const Home = () => {
  const [postId, setPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dummyData: IPost[] = [
    {
      id: 1,
      profileURL: "",
      writer: "John Doe",
      time: "2시간 전",
      likeCnt: "120",
      commentCnt: "45",
      postImgURL: "",
      postText: "What a beautiful day!",
    },
    {
      id: 2,
      profileURL: "",
      writer: "Jane Smith",
      time: "5시간 전",
      likeCnt: "89",
      commentCnt: "32",
      postImgURL: "https://via.placeholder.com/340x340",
      postText: "Loving this new recipe I tried!",
    },
    {
      id: 3,
      profileURL: "",
      writer: "Alice Kim",
      time: "1일 전",
      likeCnt: "200",
      commentCnt: "60",
      postImgURL: "https://via.placeholder.com/340x340",
      postText: "Feeling grateful for today. #blessed",
    },
    {
      id: 4,
      profileURL: "",
      writer: "Bob Lee",
      time: "3일 전",
      likeCnt: "150",
      commentCnt: "40",
      postImgURL: "https://via.placeholder.com/340x340",
      postText: "Nature never ceases to amaze me.",
    },
  ];

  return (
    <div className="bg-white h-full w-full px-[16px] py-[34px] flex flex-col items-center relative">
      {/* `relative` 포지셔닝 추가 */}
      <PinkTextHeader />
      {/* 모달 컴포넌트를 최상위 요소 바로 아래에 위치시킵니다 */}
      {isModalOpen && (
        <PostCommentModal id={postId} closeFn={() => setIsModalOpen(false)} />
      )}

      <div className="overflow-auto w-full">
        {dummyData.map((data, idx) => (
          <div
            onClick={() => {
              setPostId(data.id);
              setIsModalOpen(true);
            }}
          >
            <Post
              key={idx}
              id={data.id}
              profileURL={data.profileURL}
              writer={data.writer}
              time={data.time}
              likeCnt={data.likeCnt}
              commentCnt={data.commentCnt}
              postImgURL={data.postImgURL}
              postText={data.postText}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
