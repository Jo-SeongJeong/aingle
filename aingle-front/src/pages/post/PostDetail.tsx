import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import { IComment, IcreateComment } from "../../model/comment";
import TextHeader from "../../components/header/TextHeader";
import { getPostDetail } from "../../api/postAPI";
import { IPost } from "../../model/post";
import clap from "../../assets/icons/comment/clap.png";
import fire from "../../assets/icons/comment/fire.png";
import face from "../../assets/icons/comment/face.png";
import left from "../../assets/icons/comment/left.png";
import redHeart from "../../assets/icons/comment/redHeart.png";
import send from "../../assets/icons/comment/send.png";
import thumb from "../../assets/icons/comment/thumb.png";
import { createComment, createReply, getComments } from "../../api/commentAPI";
import Postcomment from "../../components/Post/Postcomment";
import ReplyComment from "../../components/Post/ReplyComment";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentId, setCommentId] = useState(0);
  const [commentWriter, setCommentWriter] = useState("");

  const [inputComment, setInputcomment] = useState<IcreateComment>({
    postId: Number(id),
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (commentId === 0) {
        // 일반 댓글 작성
        await createComment(inputComment);
      } else {
        // 답글 작성
        await createReply(commentId, inputComment.content);
      }

      // 댓글 목록 다시 가져오기
      const updatedComments = await getComments(id);
      setComments(updatedComments);

      // 입력 초기화
      setInputcomment((prev) => ({
        ...prev,
        content: "",
      }));
      setCommentId(0); // 답글 작성 후 commentId 초기화
      setCommentWriter("");
    } catch (error) {
      console.error("댓글 등록 실패 : ", error);
    }
  };

  if (comments === null) {
    return null; // comments가 null인 동안 아무것도 렌더링하지 않음
  }

  const handleChange = (
    field: keyof IcreateComment,
    value: string | number | null
  ) => {
    setInputcomment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (id) {
      setInputcomment((prev) => ({
        ...prev,
        postId: parseInt(id, 10),
      }));

      const fetchData = async () => {
        const response = await getPostDetail(id);
        console.log("postData: ", response);
        setPostData(response.data);

        const response2 = await getComments(id);
        setComments(response2);
      };

      fetchData();
    }
  }, [id]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white h-full w-full  pb-[34px] flex flex-col items-center relative pt-[50px]">
      <TextHeader headerText="게시물" navTo="" />
      <div className="overflow-auto w-full  mt-1">
        <div className="w-full mb-[50px] px-[16px]">
          <div className="flex items-center mb-[11px]">
            <img
              src={postData.member.memberImage || "/path/to/defaultImage.jpg"}
              className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
            />
            <div>
              <h1 className="text-[15px] text-black font-semibold">
                {postData.member.name}
              </h1>
              <h1 className="text-[10px] text-[#A6A6A6]">
                {postData.createTime.split("T")[0]}
              </h1>
            </div>
          </div>

          {postData.image && (
            <img
              src={postData.image}
              className="bg-gray-500 rounded-[5px] w-full h-[340px] mb-[20px]"
            />
          )}

          <div className="flex space-x-[10px] mb-[6px]">
            <div className="flex items-center">
              <img src={heart} className="w-[20px] mr-[5px]" />
              <h1 className="text-[12px] font-semibold">
                {postData.totalLike}
              </h1>
            </div>
            <div className="flex items-center">
              <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
              <h1 className="text-[12px] font-semibold">
                {postData.totalComment}
              </h1>
            </div>
          </div>

          <div className="flex space-x-[15px] items-center mb-[10px]">
            <h1 className="font-semibold text-[15px]">
              {postData.member.name}
            </h1>
            <span className="text-[12px] font-medium">{postData.content}</span>
          </div>
          <div
            className=" "
            style={{ maxHeight: "60vh" }} // Adjust maxHeight as needed
          >
            {/* Render comments if necessary */}
            <div
              className=" overflow-y-auto mb-[130px]"
              style={{ maxHeight: "60vh" }}
            >
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCommentId(comment.commentId);
                    setCommentWriter(comment.member.name);
                  }}
                >
                  <Postcomment key={comment.commentId} comment={comment} />
                  {comment.replies &&
                    comment.replies.map((reply, idx) => {
                      return <ReplyComment key={idx} comment={reply} />;
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full absolute bottom-0 bg-white z-40 pt-[10px] ">
          {commentWriter != "" && (
            <div
              className="px-5 py-2 mb-3 text-white flex justify-between items-center"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h1>{commentWriter}에 답글 작성</h1>

              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  setCommentId(0);
                  setCommentWriter("");
                }}
              />
            </div>
          )}
          <div className="flex w-full justify-between px-[45px] box-border mb-[15px]">
            <img src={redHeart} className="w-[24px]" alt="redHeart" />
            <img src={face} className="w-[24px]" alt="face" />
            <img src={clap} className="w-[24px]" alt="clap" />
            <img src={fire} className="w-[24px]" alt="fire" />
            <img src={thumb} className="w-[24px]" alt="thumb" />
          </div>
          <div className="w-full h-full flex items-center justify-center space-x-[10px] pb-[57px]">
            <img
              src={left}
              className="w-[35px] h-[35px] rounded-full"
              alt="left"
            />
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => handleChange("content", e.target.value)}
                value={inputComment.content}
                required
                type="text"
                placeholder="댓글 달기"
                className="border-[#CFCFCF] border-[1px] h-[34px] px-[15px] rounded-full"
              />
            </form>
            <img
              onClick={handleSubmit}
              src={send}
              className="w-[30px] h-[30px] rounded-full cursor-pointer"
              alt="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
/*
{
  "postId": 5,
  "content": "자 드가자",
  "image": null,
  "createTime": "2024-11-05T17:50:14.093021",
  "totalLike": 0,
  "totalComment": 0,
  "member": {
    "memberId": 28,
    "name": "희정",
    "memberImage": null
  },
  "character": null,
  "comments": []
}
*/

/*
{
  "postId": 6,
  "content": "자 드가자",
  "image": "https://ainglebucket.s3.ap-northeast-2.amazonaws.com/5b96cc28-7e36-4af5-a436-5d576d8571b9-%EC%83%81%EC%A0%90%EC%A3%BC%EC%9D%B82.jpeg",
  "createTime": "2024-11-05T17:50:41.591804",
  "totalLike": 0,
  "totalComment": 0,
  "member": {
      "memberId": 28,
      "name": "희정",
      "memberImage": null
  },
  "character": null,
  "comments": []
}

*/
