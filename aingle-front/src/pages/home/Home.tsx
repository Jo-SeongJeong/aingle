import { useEffect, useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import Post from "../../components/Post/Post";
import PostCommentModal from "../../components/Post/PostCommentModal";
import { usePostStore } from "../../store/usePostStore";
import { IPost } from "../../model/post";


const Home = () => {
  const [postId, setPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {posts , fetchPosts} = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-white h-full w-full px-[16px] pb-[34px] flex flex-col items-center relative">
      {/* `relative` 포지셔닝 추가 */}
      <PinkTextHeader />
      {/* 모달 컴포넌트를 최상위 요소 바로 아래에 위치시킵니다 */}
      {isModalOpen && (
        <PostCommentModal id={postId} closeFn={() => setIsModalOpen(false)} />
      )}

      <div className="overflow-auto w-full">
        {posts.map((post : IPost) => (
          <div
            key={post.postId}
            onClick={() => {
              setPostId(post.postId);
              setIsModalOpen(true);
            }}
          >
            <Post post={post}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
