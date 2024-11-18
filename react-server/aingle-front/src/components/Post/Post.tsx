import { useState, useEffect } from "react";
import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import fillHeart from "../../assets/icons/fillHeart.png";
import ReactGA from "react-ga4";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";
import { IPost } from "../../model/post";
import { calTime } from "../../utils/date.ts";
import { IComment } from "../../model/comment.ts";

interface postProps {
  post: IPost;
  onCommentClick: () => void;
  onLikeClick: () => void;
  onDislikeClick: () => void;
  onNameClick: () => void;
  onPostDetail: () => void;
}

const Post = ({
  post,
  onCommentClick,
  onLikeClick,
  onDislikeClick,
  onNameClick,
  onPostDetail,
}: postProps) => {
  const { member, character } = post;
  const [profile, setProfile] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [totalLike, setTotalLike] = useState<number>(post.totalLike);
  const calDate = calTime(post.createTime);
  const userData = useRecoilValue(userDataState);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCnt, setCommentCnt] = useState(0);

  // 본문 상태
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongContent = post.content.length > 20; // 본문이 20글자를 초과하는지 확인

  const fetchAndFilterComments = async () => {
    try {
      const allComments = post.comments;
      const now = new Date();

      const filteredComments = allComments.filter((comment: IComment) => {
        if (comment.member) {
          return true; // member인 경우 시간 조건 무시
        } else if (comment.character) {
          const commentTime = new Date(comment.createTime);
          commentTime.setMinutes(
            commentTime.getMinutes() + comment.character.commentDelayTime
          );
          return commentTime <= now;
        }
        return false;
      });

      // setComments(filteredComments);
      // setValidCommentCount(filteredComments.length); // 유효한 댓글 개수 설정

      setCommentCnt(filteredComments.length);
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  };

  useEffect(() => {
    fetchAndFilterComments();
    if (member?.memberImage) {
      setProfile(member.memberImage);
    } else if (character?.characterImage) {
      setProfile(character.characterImage);
    }
  }, [member, character]);

  const handleLikeToggle = () => {
    if (isLiked) {
      onDislikeClick();
      setIsLiked(false);
      setTotalLike((prev) => prev - 1);

      ReactGA.gtag("event", "post_like_count", {
        action: "Dislike",
        user_id: userData.id,
        post_id: post.postId,
        current_like_count: totalLike - 1,
        total_likes_by_user: likeCount,
      });
    } else {
      onLikeClick();
      setIsLiked(true);
      setTotalLike((prev) => prev + 1);
      setLikeCount((prev) => prev + 1);

      ReactGA.gtag("event", "post_like_count", {
        action: "Like",
        user_id: userData.id,
        post_id: post.postId,
        current_like_count: totalLike + 1,
        total_likes_by_user: likeCount + 1,
      });
    }
  };

  return (
    <div className="w-full mb-[50px]" key={post.postId}>
      <div className="flex items-center mb-[11px]">
        <img
          src={profile}
          className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
          onClick={onNameClick}
        />
        <div className="flex flex-col">
          <h1
            className="font-semibold text-[15px] inline-block"
            onClick={onNameClick}
          >
            {member?.name || character?.name || "Unknown User"}
          </h1>
          <h1 className="text-[10px] text-[#A6A6A6]">{calDate}</h1>
        </div>
      </div>
      {post.image && (
        <img
          src={post.image}
          className="bg-gray-500 rounded-[5px] w-full aspect-square mb-[10px] object-cover"
          onClick={onPostDetail}
        />
      )}

      <div className="flex space-x-[10px] mb-[6px]">
        <div className="flex items-center">
          <img
            src={isLiked ? fillHeart : heart}
            className="w-[25px] mr-[5px]"
            onClick={handleLikeToggle}
          />
          <h1 className="text-[12px] font-semibold">{totalLike}</h1>
        </div>
        <div className="flex items-center" onClick={onCommentClick}>
          <img src={message} className="w-[25px] mr-[5px] mt-[2px]" />
          <h1 className="text-[12px] font-semibold">{commentCnt}</h1>
        </div>
      </div>

      {/* 작성자 이름과 본문 */}
      <div className="flex flex-col pl-[2px] mb-[10px]">
        <h1 className="font-semibold text-[15px] inline-block">
          {member?.name || character?.name || "Unknown User"}
        </h1>
        <span className="text-[12px] font-medium inline">
          {isExpanded || !isLongContent
            ? post.content
            : `${post.content.slice(0, 20)}...`}
          {!isExpanded && isLongContent && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[12px] text-gray-400 ml-1 "
            >
              더보기
            </button>
          )}
        </span>
      </div>

      <div onClick={onCommentClick} className="pl-[2px]">
        <h1 className="text-[#A6A6A6] font-medium text-[12px]">
          댓글 모두 보기
        </h1>
      </div>
    </div>
  );
};

export default Post;
