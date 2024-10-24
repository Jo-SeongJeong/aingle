import bar from "../../assets/imgs/swipeBar.png";
import Postcomment from "./Postcomment";
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
  const [modalHeight, setModalHeight] = useState<number>(70);
  const startY = useRef<number>(0);
  const startHeight = useRef<number>(70);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = 90;
  const CLOSE_THRESHOLD = 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = modalHeight;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const deltaY = startY.current - e.clientY;
    const containerHeight = containerRef.current
      ? containerRef.current.clientHeight
      : window.innerHeight;
    let deltaHeight = (deltaY / containerHeight) * 100;
    let newHeight = startHeight.current + deltaHeight;

    const totalDeltaY = e.clientY - startY.current;
    if (totalDeltaY > CLOSE_THRESHOLD) {
      setIsDragging(false);
      closeFn(); // Call closeFn instead of setting modalHeight
      return;
    }

    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
    if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;

    setModalHeight(newHeight);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startHeight.current = modalHeight;
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const deltaY = startY.current - e.touches[0].clientY;
    const containerHeight = containerRef.current
      ? containerRef.current.clientHeight
      : window.innerHeight;
    let deltaHeight = (deltaY / containerHeight) * 100;
    let newHeight = startHeight.current + deltaHeight;

    const totalDeltaY = e.touches[0].clientY - startY.current;
    if (totalDeltaY > CLOSE_THRESHOLD) {
      setIsDragging(false);
      closeFn(); // Call closeFn instead of setting modalHeight
      return;
    }

    if (newHeight < MIN_HEIGHT) newHeight = MIN_HEIGHT;
    if (newHeight > MAX_HEIGHT) newHeight = MAX_HEIGHT;

    setModalHeight(newHeight);
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
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
    // You might want to add additional logic here for submitting the comment
  };

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-full">
      {/* 검은 배경 */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20 px-[16px] transition-opacity duration-300"
        onClick={closeFn} // Use closeFn here
      ></div>
      <div
        ref={modalRef}
        className="z-30 bg-white rounded-t-lg absolute bottom-0 w-full overflow-auto transition-all duration-300 ease"
        style={{ height: `${modalHeight}%` }}
      >
        {/* 드래그 바 */}
        <div
          className="w-full flex justify-center items-center border-b-[1px] border-[#A6A6A6] h-[60px] relative pb-5 cursor-ns-resize touch-none"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="separator"
          aria-orientation="horizontal"
          aria-label="댓글 모달 높이 조절"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              setModalHeight((prev) => Math.max(prev - 5, MIN_HEIGHT));
            } else if (e.key === "ArrowUp") {
              setModalHeight((prev) => Math.min(prev + 5, MAX_HEIGHT));
            }
          }}
        >
          <img
            src={bar}
            className="absolute top-[15px] mb-[10px] w-[48px] h-[5px]"
            alt="drag bar"
          />
          <h1 className="font-semibold absolute top-[30px]">댓글 {id}</h1>
        </div>
        <div className="px-[18px] h-full pt-[25px] overflow-auto">
          <Postcomment />
          <Postcomment />
          <Postcomment />
          <Postcomment />
          <Postcomment />
          <Postcomment />
          <Postcomment />
        </div>

        {/* 아이콘 */}
        <div className="w-full absolute bottom-0 bg-white z-40 pt-[10px]">
          <div className="flex w-full justify-between px-[45px] box-border mb-[15px]">
            <img src={redHeart} className="w-[24px]" alt="redHeart" />
            <img src={face} className="w-[24px]" alt="face" />
            <img src={clap} className="w-[24px]" alt="clap" />
            <img src={fire} className="w-[24px]" alt="fire" />
            <img src={thumb} className="w-[24px]" alt="thumb" />
          </div>
          <div className="w-full flex items-center justify-center space-x-[10px] pb-[57px]">
            <img
              src={left}
              className="w-[35px] h-[35px] rounded-full"
              alt="left"
            />
            {/* 작성칸 */}
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
