import profile from "../assets/imgs/profileSample.png";
import heart from "../assets/icons/hearth.png";
import message from "../assets/icons/message-circle.png";

interface IPost {
  profileURL: string;
  writer: string;
  time: string;
  likeCnt: string;
  commentCnt: string;
  postImgURL: string;
  postText: string;
}

const Post = ({
  profileURL,
  writer,
  time,
  likeCnt,
  commentCnt,
  postImgURL,
  postText,
}: IPost) => {
  return (
    <div className="w-full mb-[50px]">
      {/* header */}
      <div className="flex items-center mb-[11px]">
        <img
          src={profileURL} // props에서 받은 값을 사용합니다
          className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
        />
        <div>
          <h1 className="text-[15px] text-black font-semibold">{writer}</h1>{" "}
          {/* writer를 표시 */}
          <h1 className="text-[10px] text-[#A6A6A6]">{time}</h1>{" "}
          {/* 시간을 표시 */}
        </div>
      </div>
      <img
        src={postImgURL}
        className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px]"
      />{" "}
      {/* postImgURL 사용 */}
      <div className="flex space-x-[10px] mb-[6px]">
        <div className="flex items-center">
          <img src={heart} className="w-[20px] mr-[5px]" />
          <h1 className="text-[12px] font-semibold">{likeCnt}</h1>{" "}
          {/* 좋아요 개수를 표시 */}
        </div>
        <div className="flex items-center">
          <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
          <h1 className="text-[12px] font-semibold">{commentCnt}</h1>{" "}
          {/* 댓글 개수를 표시 */}
        </div>
      </div>
      {/* name */}
      <div className="flex space-x-[15px] items-center mb-[10px]">
        <h1 className="font-semibold text-[15px]">{writer}</h1>{" "}
        {/* writer를 다시 표시 */}
        <span className="text-[12px] font-medium">{postText}</span>{" "}
        {/* 포스트 텍스트 */}
      </div>
      <h1 className="text-[#A6A6A6] font-medium text-[12px]">댓글 모두 보기</h1>
    </div>
  );
};

export default Post;
