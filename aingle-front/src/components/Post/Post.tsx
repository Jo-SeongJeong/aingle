import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import { IPost } from "../../model/post";

interface postProps {
  post: IPost;
}

const Post = ({ post }: postProps) => {
  const { member } = post;

  return (
    <div className="w-full mb-[50px]" key={post.postId}>
      <div className="flex items-center mb-[11px]">
        <img
          src={member.memberImage} // props에서 받은 값을 사용합니다
          className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
        />
        <div>
          <h1 className="text-[15px] text-black font-semibold">
            {member.name}
          </h1>
          <h1 className="text-[10px] text-[#A6A6A6]">{post.createTime}</h1>
        </div>
      </div>
      {post.image != "" && (
        <img
          src={post.image}
          className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px]"
        />
      )}

      <div className="flex space-x-[10px] mb-[6px]">
        <div className="flex items-center">
          <img src={heart} className="w-[20px] mr-[5px]" />
          <h1 className="text-[12px] font-semibold">{post.totalLike}</h1>
        </div>
        <div className="flex items-center">
          <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
          <h1 className="text-[12px] font-semibold">{post.totalComment}</h1>
        </div>
      </div>

      <div className="flex space-x-[15px] items-center mb-[10px]">
        <h1 className="font-semibold text-[15px]">{member.name}</h1>
        <span className="text-[12px] font-medium">{post.content}</span>
      </div>
      <h1 className="text-[#A6A6A6] font-medium text-[12px]">댓글 모두 보기</h1>
    </div>
  );
};

export default Post;
