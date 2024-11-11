import { deleteReply } from "../../api/commentAPI";
import { IComment, Ireply } from "../../model/comment";
import { calTime } from "../../utils/date";

interface ICommentProps {
  comment: Ireply;
  refreshComments: () => Promise<void>;
}

const ReplyComment = ({ comment, refreshComments }: ICommentProps) => {
  if (!comment || !comment.member) {
    return null; // comment 또는 member가 없으면 렌더링하지 않음
  }
  const { member } = comment;

  const handleDelete = async () => {
    try {
      await deleteReply(comment.replyId);
      await refreshComments();
    } catch (error) {
      console.log("삭제 에러");
    }
  };

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
            {calTime(comment.createTime)}
          </h1>
        </div>
        <span>{comment.content}</span>
        {member && (
          <h1
            onClick={() => {
              handleDelete();
            }}
            className="cursor-pointer text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px] underline ml-auto"
          >
            삭제
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReplyComment;
