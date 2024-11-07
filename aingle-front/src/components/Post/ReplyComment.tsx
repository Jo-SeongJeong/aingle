import { IComment, Ireply } from "../../model/comment";

interface ICommentProps {
  comment: Ireply;
}

const ReplyComment = ({ comment }: ICommentProps) => {
  if (!comment || !comment.member) {
    return null; // comment 또는 member가 없으면 렌더링하지 않음
  }
  const { member } = comment;

  return (
    <div className="w-full bg-white flex items-start ml-5 mb-3">
      <div className="mr-[10px] self-start flex-shrink-0">
        <img
          className="bg-black w-[35px] h-[35px] rounded-full object-cover"
          src={member.memberImage}
        />
      </div>
      <div className="">
        <div className="flex space-x-[5px] items-center">
          <h1 className="text-[13px] font-semibold ">{member.name}</h1>
          <h1 className="text-[10px] font-medium text-[#A6A6A6]">
            {comment.createTime.split("T")[0]}
          </h1>
        </div>
        <span>{comment.content}</span>
      </div>
    </div>
  );
};

export default ReplyComment;
