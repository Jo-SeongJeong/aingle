import { useEffect, useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import Post from "../../components/Post/Post";
import PostCommentModal from "../../components/Post/PostCommentModal";
import { usePostStore } from "../../store/usePostStore";
import { IPost } from "../../model/post";
import { like } from "../../api/likeAPI";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";

const Home = () => {
  const [postId, setPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { posts, fetchPosts } = usePostStore();
  
  const userData = useRecoilValue(userDataState);
  const navigate = useNavigate();
    

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCommentClick = (id: number) => {
    setPostId(id);
    setIsModalOpen(true);
  };

  const handleNameClick = (post : IPost) => {
    const { member } = post;

    if (userData.id === member.memberId) {
      navigate(`/mypage`);
    } else {
      navigate(`/vote/chardetail/${member.memberId}`);
    }

  }

  const handleLikeClick = (id: number) => {
    like(id);
  };

  return (
    <div className="bg-white h-full w-full px-[16px] pb-[34px] flex flex-col items-center relative">
      <PinkTextHeader />

      {isModalOpen && (
        <PostCommentModal id={postId} closeFn={() => setIsModalOpen(false)} />
      )}

      <div className="overflow-auto w-full">
        {posts.map((post: IPost, idx: number) => (
          <Post
            key={idx}
            post={post}
            onCommentClick={() => handleCommentClick(post.postId)}
            onLikeClick={() => handleLikeClick(post.postId)}
            onNameClick={() => handleNameClick(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
