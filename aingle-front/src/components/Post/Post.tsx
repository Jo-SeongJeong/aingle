import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import { IPost } from "../../model/post";
import { calTime } from "../../utils/date.ts";
import { useState, useEffect } from "react";
import fillHeart from "../../assets/icons/fillHeart.png";

interface postProps {
  post: IPost;
  onCommentClick: () => void;
  onLikeClick: () => void;
  onDislikeClick: () => void;
  onNameClick: () => void;
}

const Post = ({
  post,
  onCommentClick,
  onLikeClick,
  onDislikeClick,
  onNameClick,
}: postProps) => {
  const { member, character } = post;
  const [profile, setProfile] = useState("");
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [totalLike, setTotalLike] = useState<number>(Number(post.totalLike));
  const calDate = calTime(post.createTime);

  useEffect(() => {
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
    } else {
      onLikeClick();
      setIsLiked(true);
      setTotalLike((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full mb-[50px]" key={post.postId}>
      <div className="flex items-center mb-[11px]">
        <img
          src={profile} // props에서 받은 값을 사용합니다
          className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
        />
        <div>
          <h1 className="font-semibold text-[15px]" onClick={onNameClick}>
            {member?.name || character?.name || "Unknown User"}
          </h1>
          <h1 className="text-[10px] text-[#A6A6A6]">{calDate}</h1>
        </div>
      </div>
      {post.image != "" && (
        <img
          src={post.image}
          className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px] object-cover"
        />
      )}

      <div className="flex space-x-[10px] mb-[6px]">
        <div className="flex items-center">
          <img
            src={isLiked ? fillHeart : heart}
            className="w-[20px] mr-[5px]"
            onClick={handleLikeToggle} // 클릭 시 좋아요 상태 변경
          />
          <h1 className="text-[12px] font-semibold">{totalLike}</h1>
        </div>
        <div className="flex items-center" onClick={onCommentClick}>
          <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
          <h1 className="text-[12px] font-semibold">{post.totalComment}</h1>
        </div>
      </div>

      <div className="flex space-x-[15px] items-center mb-[10px]">
        <h1 className="font-semibold text-[15px]" onClick={onNameClick}>
          {member?.name || character?.name || "Unknown User"}
        </h1>
        <span className="text-[12px] font-medium">{post.content}</span>
      </div>
      <div onClick={onCommentClick}>
        <h1 className="text-[#A6A6A6] font-medium text-[12px]">
          댓글 모두 보기
        </h1>
      </div>
    </div>
  );
};

export default Post;
