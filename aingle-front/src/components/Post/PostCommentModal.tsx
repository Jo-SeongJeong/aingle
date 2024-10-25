import bar from "../../assets/imgs/swipeBar.png";
import Postcomment, { IComment } from "./Postcomment";
import clap from "../../assets/icons/comment/clap.png";
import fire from "../../assets/icons/comment/fire.png";
import face from "../../assets/icons/comment/face.png";
import left from "../../assets/icons/comment/left.png";
import redHeart from "../../assets/icons/comment/redHeart.png";
import send from "../../assets/icons/comment/send.png";
import thumb from "../../assets/icons/comment/thumb.png";
import { useState, useRef, useEffect } from "react";

interface PostCommentModalProps {
  id: number;
  closeFn: () => void;
}

const PostCommentModal: React.FC<PostCommentModalProps> = ({ id, closeFn }) => {
  const [typedText, setTypedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef<number>(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const CLOSE_THRESHOLD = 100;

  const dummyDatas: IComment[] = [
    {
      id: 1,
      writer: "홍길동",
      time: "방금 전",
      content: "정말 유익한 글이네요! 공유해주셔서 감사합니다.",
    },
    {
      id: 2,
      writer: "김철수",
      time: "2시간 전",
      content: "저도 같은 생각을 했습니다. 훌륭한 포스팅입니다.",
    },
    {
      id: 3,
      writer: "이영희",
      time: "어제",
      content: "추가로 생각해볼 만한 부분이 있어요.",
    },
    {
      id: 4,
      writer: "박민수",
      time: "3일 전",
      content: "이 주제에 대해 더 알고 싶습니다. 좋은 정보 감사합니다!",
    },
    {
      id: 5,
      writer: "최지우",
      time: "1주일 전",
      content: "이 글 덕분에 많은 도움이 되었습니다.",
    },
    {
      id: 1,
      writer: "홍길동",
      time: "방금 전",
      content: "정말 유익한 글이네요! 공유해주셔서 감사합니다.",
    },
    {
      id: 2,
      writer: "김철수",
      time: "2시간 전",
      content: "저도 같은 생각을 했습니다. 훌륭한 포스팅입니다.",
    },
    {
      id: 3,
      writer: "이영희",
      time: "어제",
      content: "추가로 생각해볼 만한 부분이 있어요.",
    },
    {
      id: 4,
      writer: "박민수",
      time: "3일 전",
      content: "이 주제에 대해 더 알고 싶습니다. 좋은 정보 감사합니다!",
    },
    {
      id: 5,
      writer: "최지우",
      time: "1주일 전",
      content: "이 글 덕분에 많은 도움이 되었습니다.",
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY.current;
    if (deltaY > CLOSE_THRESHOLD) {
      setIsDragging(false);
      closeFn(); // Close modal when dragged down past threshold
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY.current;
    if (deltaY > CLOSE_THRESHOLD) {
      setIsDragging(false);
      closeFn(); // Close modal when dragged down past threshold
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "ns-resize";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "default";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "default";
    };
  }, [isDragging]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTypedText("");
    // Additional logic for submitting the comment
  };

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
      {/* Background overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20 px-[16px] transition-opacity duration-300"
        onClick={closeFn}
      ></div>
      <div
        ref={modalRef}
        className="z-30 bg-white rounded-t-lg absolute bottom-0 w-full overflow-auto transition-all duration-300 ease"
        style={{ height: `90%` }}
      >
        {/* Drag bar */}
        <div
          className="w-full flex justify-center items-center border-b-[1px] border-[#A6A6A6] h-[60px] relative pb-5 cursor-ns-resize touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="separator"
          aria-orientation="horizontal"
          aria-label="댓글 모달 높이 조절"
        >
          <img
            src={bar}
            className="absolute top-[15px] mb-[10px] w-[48px] h-[5px]"
            alt="drag bar"
          />
          <h1 className="font-semibold absolute top-[30px]">댓글 {id}</h1>
        </div>
        <div
          className="px-[18px] pt-[25px] overflow-y-auto"
          style={{ maxHeight: "60vh" }} // Adjust maxHeight as needed
        >
          {dummyDatas.map((data, idx) => (
            <Postcomment
              key={idx}
              content={data.content}
              id={data.id}
              time={data.time}
              writer={data.writer}
            />
          ))}
        </div>

        {/* Icons and comment input */}
        <div className="w-full absolute bottom-0 bg-white z-40 pt-[10px]">
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
                onChange={(e) => setTypedText(e.target.value)}
                value={typedText}
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

export default PostCommentModal;
