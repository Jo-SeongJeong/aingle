import { useNavigate } from "react-router-dom";
import { IComment } from "../../model/comment";
import { calTime } from "../../utils/date.ts";
import { deleteComments } from "../../api/commentAPI.ts";

interface ICommentProps {
  comment: IComment;
  refreshComments: () => Promise<void>;
}

const Postcomment = ({ comment, refreshComments }: ICommentProps) => {
  const navigate = useNavigate();
  const { member, character } = comment;

  // adjustedCreateTime 계산: character가 있는 경우 createTime에 commentDelayTime을 더함
  const adjustedCreateTime = character
    ? new Date(
        new Date(comment.createTime).getTime() +
          character.commentDelayTime * 60000
      )
    : new Date(comment.createTime);

  const calDate = calTime(adjustedCreateTime.toISOString()); // adjustedCreateTime 사용

  const handleDelete = async () => {
    try {
      await deleteComments(comment.commentId);
      await refreshComments();
    } catch (error) {
      console.log("삭제 에러");
    }
  };

  return (
    <div className="w-full bg-white flex items-start">
      <div className="mr-[10px] self-start flex-shrink-0">
        <img
          onClick={() => {
            navigate(
              `/vote/charDetail/${
                member ? member.memberId : character?.characterId
              }`
            );
          }}
          className="bg-black w-[35px] h-[35px] rounded-full object-cover"
          src={member ? member.memberImage : character?.characterImage}
          alt="profile"
        />
      </div>
      <div>
        <div className="flex space-x-[5px] items-center">
          <h1 className="text-[13px] font-semibold">
            {member ? member.name : character?.name}
          </h1>
          <h1 className="text-[10px] font-medium text-[#A6A6A6]">{calDate}</h1>
        </div>
        <span>{comment.content}</span>
        <div className="flex">
          <h1 className="text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px]">
            답글 달기
          </h1>
          {member && (
            <h1
              onClick={handleDelete}
              className="cursor-pointer text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px] underline ml-auto"
            >
              삭제
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Postcomment;
