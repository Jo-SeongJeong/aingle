import { IComment } from "../../model/comment";

interface ICommentProps {
  comment: IComment;
}

const Postcomment = ({ comment }: ICommentProps) => {
  const { member, character } = comment;

  return (
    <div className="w-full bg-white flex items-start">
      <div className="mr-[10px] self-start flex-shrink-0">
        <img
          className="bg-black w-[35px] h-[35px] rounded-full object-cover"
          src={member ? member.memberImage : character?.characterImage} // 기본 이미지 설정
          alt="profile"
        />
      </div>
      <div className="">
        <div className="flex space-x-[5px] items-center">
          <h1 className="text-[13px] font-semibold ">
            {member ? member.name : character?.name}
          </h1>
          <h1 className="text-[10px] font-medium text-[#A6A6A6]">
            {comment.createTime && comment.createTime.split("T")[0]}
          </h1>
        </div>
        <span>{comment.content}</span>
        <h1 className="text-[10px] text-[#A6A6A6] pt-[5px] pb-[10px]">
          답글 달기
        </h1>
      </div>
    </div>
  );
};

export default Postcomment;

/*

{
  "commentId": 107,
  "content": "이 사진 속 인물이 누군지 잘 모르겠어. 😅 어떤 상황인지 더 설명해줄 수 있어?",
  "createTime": "2024-11-07T12:45:35.3805",
  "member": null,
  "character": {
      "characterId": 1,
      "name": "유보은",
      "characterImage": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/character/2.png",
      "commentDelayTime": 3
  },
  "replies": []
},
{
  "commentId": 115,
  "content": "ㅋㅋ",
  "createTime": "2024-11-07T12:48:32.268325",
  "member": {
      "memberId": 56,
      "name": "우영3",
      "memberImage": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/118cd119-8827-4078-b6ae-286d63be863c-%EA%BD%83%EB%B3%B4%EB%8B%A4%20%ED%99%80%EC%8A%A4.png"
  },
  "character": null,
  "replies": []
}

*/
