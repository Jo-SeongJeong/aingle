import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import heart from "../../assets/icons/hearth.png";
import message from "../../assets/icons/message-circle.png";
import { IComment, IcreateComment } from "../../model/comment";
import TextHeader from "../../components/header/TextHeader";
import { deletePopst, getPostDetail } from "../../api/postAPI";
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
import { calTime } from "../../utils/date";
import fillHeart from "../../assets/icons/fillHeart.png";
import { disLike, like } from "../../api/likeAPI";

const PostDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [validCommentCount, setValidCommentCount] = useState<number>(0); // 유효한 댓글 개수
  const [commentId, setCommentId] = useState(0);
  const [commentWriter, setCommentWriter] = useState("");

  const [inputComment, setInputcomment] = useState<IcreateComment>({
    postId: Number(id),
    content: "",
  });
  const navigate = useNavigate();

  // 로컬 좋아요 상태와 수 관리
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(0);

  // 댓글 필터링 함수
  const fetchAndFilterComments = async () => {
    try {
      const allComments = await getComments(Number(id));
      const now = new Date();

      const filteredComments = allComments.filter((comment) => {
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

      setComments(filteredComments);
      setValidCommentCount(filteredComments.length); // 유효한 댓글 개수 설정
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  };

  const addEmoji = (emoji: string) => {
    setInputcomment((prev) => ({
      ...prev,
      content: prev.content + emoji,
    }));
  };

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

      await fetchAndFilterComments();

      setInputcomment((prev) => ({
        ...prev,
        content: "",
      }));
      setCommentId(0);
      setCommentWriter("");
    } catch (error) {
      console.error("댓글 등록 실패 : ", error);
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setTotalLike((prev) => prev - 1);
      disLike(postData!.postId);
    } else {
      setIsLiked(true);
      setTotalLike((prev) => prev + 1);
      like(postData!.postId);
    }
  };

  const handleDeleteButton = async () => {
    const response = await deletePopst(postData!.postId); // 게시글 삭제 API 호출
    if (response.status == 200) {
      navigate("/mypage"); // 상태 전달
    }
  };

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
        setPostData(response);

        // 초기 좋아요 상태와 수 설정
        setIsLiked(response.isLiked);
        setTotalLike(response.totalLike);

        await fetchAndFilterComments();
      };

      fetchData();
    }
  }, [id]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white h-full w-full flex flex-col items-center relative pt-[50px] pb-[150px]">
      <TextHeader headerText="게시물" navTo="" />
      <div className="overflow-auto w-full mt-1">
        <div className="w-full mb-[160px] px-[16px] ">
          <div className="flex items-center mb-[11px]">
            <img
              src={
                postData.member
                  ? postData.member.memberImage
                  : postData.character.characterImage
              }
              className="w-[35px] h-[35px] rounded-full border-[2px] border-solid border-[#FB599A] mr-[10px]"
            />
            <div className="flex justify-content w-[100%] justify-between">
              <div>
                <h1 className="text-[15px] text-black font-semibold">
                  {postData.member
                    ? postData.member.name
                    : postData.character.name}
                </h1>
                <h1 className="text-[10px] text-[#A6A6A6]">
                  {calTime(postData.createTime)}
                </h1>
              </div>
              <button
                className="text-xs text-pink-darkest font-semibold"
                onClick={handleDeleteButton}
              >
                삭제
              </button>
            </div>
          </div>

          {postData.image && (
            <img
              src={postData.image}
              className="bg-gray-500 rounded-[10px] w-full aspect-square mb-[20px] object-cover"
            />
          )}

          <div className="flex space-x-[10px] mb-[6px]">
            <div className="flex items-center">
              <img
                src={isLiked ? fillHeart : heart}
                className="w-[20px] mr-[5px] cursor-pointer"
                onClick={handleLikeToggle}
              />
              <h1 className="text-[12px] font-semibold">{totalLike}</h1>
            </div>
            <div className="flex items-center">
              <img src={message} className="w-[20px] mr-[5px] mt-[2px]" />
              <h1 className="text-[12px] font-semibold">
                {validCommentCount} {/* 유효한 댓글 개수 */}
              </h1>
            </div>
          </div>

          <div className="flex flex-row items-start space-x-[10px] mb-[10px]">
            <h1 className="font-semibold text-[16px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
              {postData.member ? postData.member.name : postData.character.name}
            </h1>
            <span className="text-[16px] font-medium break-words flex-1">
              {postData.content}
            </span>
          </div>

          <div style={{ maxHeight: "60vh" }}>
            <div className="mb-[130px]" style={{ maxHeight: "60vh" }}>
              {comments.map((comment, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCommentId(comment.commentId);
                    setCommentWriter(
                      comment.member?.name ||
                        comment.character?.name ||
                        "Unknown User"
                    );
                  }}
                >
                  <Postcomment
                    key={comment.commentId}
                    comment={comment}
                    refreshComments={fetchAndFilterComments}
                  />
                  {comment.replies &&
                    comment.replies.map((reply, idx) => (
                      <ReplyComment
                        key={idx}
                        comment={reply}
                        refreshComments={fetchAndFilterComments}
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full max-w-[480px] fixed bottom-0 bg-white z-40">
          {commentWriter != "" && (
            <div
              className="px-5 py-2 text-white flex justify-between items-center"
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
          <div className="flex w-full justify-between px-[40px] box-border mb-[15px] pt-3 shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
            <img
              src={redHeart}
              className="w-[24px]"
              alt="❤️"
              onClick={() => addEmoji("❤️")}
            />
            <img
              src={face}
              className="w-[24px]"
              alt="😊"
              onClick={() => addEmoji("😊")}
            />
            <img
              src={clap}
              className="w-[24px]"
              alt="👏"
              onClick={() => addEmoji("👏")}
            />
            <img
              src={fire}
              className="w-[24px]"
              alt="🔥"
              onClick={() => addEmoji("🔥")}
            />
            <img
              src={thumb}
              className="w-[24px]"
              alt="👍"
              onClick={() => addEmoji("👍")}
            />
          </div>
          <div className="w-full h-full flex items-center justify-evenly px-[30px] pb-[30px]">
            <img
              src={left}
              className="w-[35px] h-[35px] rounded-full"
              alt="left"
            />
            <form onSubmit={handleSubmit} className="px-4">
              <input
                onChange={(e) => handleChange("content", e.target.value)}
                value={inputComment.content}
                required
                type="text"
                placeholder="댓글 달기"
                className="border-[#CFCFCF] w-full border-[1px] h-[34px] px-[15px] rounded-full"
              />
            </form>
            <img
              onClick={handleSubmit}
              src={send}
              className="w-[35px] h-[35px] rounded-full cursor-pointer"
              alt="send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
