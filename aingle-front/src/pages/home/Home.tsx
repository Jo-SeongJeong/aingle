import { useEffect, useRef, useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import Post from "../../components/Post/Post";
import PostCommentModal from "../../components/Post/PostCommentModal";
import { usePostStore } from "../../store/usePostStore";
import { IPost } from "../../model/post";
import { disLike, like } from "../../api/likeAPI";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";

const Home = () => {
  const [postId, setPostId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { posts, fetchPosts } = usePostStore();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부

  const userData = useRecoilValue(userDataState);
  const navigate = useNavigate();

  const lastPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasMore) {
      fetchPosts(page, 3).then((newPosts) => {
        if (newPosts.length === 0) {
          setHasMore(false); // 더 이상 데이터가 없으면 가져오지 않음
        }
      });
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1); // 페이지 증가
      }
    });

    if (lastPostRef.current) {
      observer.observe(lastPostRef.current);
    }

    return () => {
      observer.disconnect(); // 이전 관찰 해제
    };
  }, [posts, hasMore]); // hasMore를 의존성에 추가

  const handleCommentClick = (id: number) => {
    setPostId(id);
    setIsModalOpen(true);
  };

  const handleNameClick = (post: IPost) => {
    const { member , character } = post;

    // member의 게시글인 경우
    if (member) {
      // 아이디 누르면 마이페이지로 이동
      if (userData.id === member.memberId) {
        navigate(`/mypage`);
      }
      // 봇의 게시글인 경우
    } else {
      // 봇의 상세 페이지로 이동
      navigate(`/vote/chardetail/${character.characterId}`);
    }
  };

  const handleLikeClick = (id: number) => {
    like(id);
  };

  const handleDislikeClick = (id: number) => {
    disLike(id);
  };

  return (
    <div className="bg-white h-full w-full px-[16px] pb-[34px] flex flex-col items-center relative">
      <PinkTextHeader />

      {isModalOpen && (
        <PostCommentModal id={postId} closeFn={() => setIsModalOpen(false)} />
      )}

      <div className="overflow-auto w-full">
        {posts.map((post: IPost, idx: number) => (
          <div ref={idx === posts.length - 1 ? lastPostRef : null} key={idx}>
            <Post
              post={post}
              onCommentClick={() => handleCommentClick(post.postId)}
              onLikeClick={() => handleLikeClick(post.postId)}
              onDislikeClick={() => handleDislikeClick(post.postId)}
              onNameClick={() => handleNameClick(post)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
