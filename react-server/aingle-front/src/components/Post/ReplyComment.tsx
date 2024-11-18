import { deleteReply } from "../../api/commentAPI";
import { Ireply } from "../../model/comment";
import { calTime } from "../../utils/date";
import { useNavigate } from "react-router-dom";

interface ICommentProps {
  comment: Ireply;
  refreshComments: () => Promise<void>;
}

const ReplyComment = ({ comment, refreshComments }: ICommentProps) => {
  if (!comment) {
    return null;
  }

  const { member, character } = comment;
  const navigate = useNavigate();

  // adjustedCreateTime 계산: character가 있는 경우 createTime에 commentDelayTime을 더함
  const adjustedCreateTime = character
    ? new Date(
        new Date(comment.createTime).getTime() +
          character.commentDelayTime * 60000
      )
    : new Date(comment.createTime);

  const calDate = calTime(adjustedCreateTime.toISOString());

  const handleDelete = async () => {
    try {
      await deleteReply(comment.replyId);
      await refreshComments();
    } catch (error) {
      console.error("삭제 에러");
    }
  };

  return (
    <div className="w-[95%] bg-white flex items-start mb-3 ml-4">
      <div className="mr-3 flex-shrink-0">
        <img
          onClick={() =>
            navigate(
              `/vote/charDetail/${
                member ? member.memberId : character?.characterId
              }`
            )
          }
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
          src={member ? member.memberImage : character?.characterImage}
          alt="profile"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-semibold">
            {member ? member.name : character?.name}
          </h1>
          <h1 className="text-xs text-gray-500">{calDate}</h1>
        </div>
        <span className="mt-1 text-sm">{comment.content}</span>
        <div className="flex space-x-4 mt-2">
          <h1 className="text-xs text-gray-500 cursor-pointer">답글 달기</h1>
          {!character && (
            <h1
              onClick={handleDelete}
              className="text-xs text-gray-500 cursor-pointer underline"
            >
              삭제
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReplyComment;
