import { useEffect, useRef, useState } from "react";
import send from "../../assets/icons/send.png";
import { getChatDetail, postChat } from "../../api/chatAPI";
import { useLocation, useParams } from "react-router-dom";
import { IchatRoomDetail, Inumbers, IpostChat } from "../../model/chat";
import { calTime } from "../../utils/date";
import TextHeader from "../../components/header/TextHeader";

const ChatDetail = () => {
  const [chatDetails, setChatDetails] = useState<IchatRoomDetail[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [afterPost, setAfterPost] = useState(false);
  const [page, setPage] = useState(0);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const parseId = parseInt(id);
  const location = useLocation();
  const characterName = location.state?.characterName;
  const params = {
    chatRoomId: parseId,
    page: page,
    size: 10,
  };

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current) {
        // Check if scrolled to the top
        if (chatBoxRef.current.scrollTop === 0 && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increase page
        }
      }
    };

    const chatBox = chatBoxRef.current;
    if (chatBox) {
      chatBox.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatBox) {
        chatBox.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore]);

  const fetchChatDetail = async (params: Inumbers) => {
    try {
      if (!afterPost) {
        const response = await getChatDetail(params);
        if (response.chatMessageList.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없으면 false
        } else {
          const sortedChatDetails = response.chatMessageList.sort(
            (a, b) => a.chatMessageId - b.chatMessageId
          );
          setChatDetails((prev) => [...sortedChatDetails, ...prev]);
        }
      } else {
        const nums = {
          chatRoomId: parseId,
          page: 0,
          size: 10,
        };
        const response = await getChatDetail(nums);
        setAfterPost(false);
        if (response.chatMessageList.length === 0) {
          setHasMore(false); // 더 이상 불러올 데이터가 없으면 false
        } else {
          const sortedChatDetails = response.chatMessageList.sort(
            (a, b) => a.chatMessageId - b.chatMessageId
          );
          setChatDetails((prev) => [...sortedChatDetails, ...prev]);
        }
      }
    } catch (error) {
      console.error("채팅방 불러오기 실패: ", error);
    }
  };

  useEffect(() => {
    fetchChatDetail(params);
  }, [page]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatDetails]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1); // 페이지 증가
      }
    });

    if (chatBoxRef.current) {
      observer.observe(chatBoxRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      // 임시 메시지를 로컬 상태에 추가하여 즉각적으로 표시
      const temporaryMessage: IchatRoomDetail = {
        chatMessageId: Date.now(),
        message: inputValue,
        createTime: new Date().toISOString(),
        memberId: parseId,
        character: null,
      };
      setChatDetails((prev) => [...prev, temporaryMessage]);
      setInputValue("");

      const newMessage: IpostChat = {
        chatRoomId: parseId,
        message: inputValue,
      };

      try {
        const response = await postChat(newMessage); // 메시지 전송 및 응답 받기
        if (response) {
          // postChat 응답을 기반으로 로컬 상태 업데이트
          const newChatDetail: IchatRoomDetail = {
            chatMessageId: response.chatMessageId,
            message: response.aiMessage,
            createTime: response.createTime,
            memberId: null,
            character: response.character,
          };
          setChatDetails((prev) => [...prev, newChatDetail]);
        }
      } catch (error) {
        console.error("메시지 전송 실패: ", error);
      }
    }
  };
  return (
    <div className="bg-[#ffffff] h-screen w-full px-[16px] pb-[34px] flex flex-col items-center relative overflow-hidden">
      <TextHeader navTo={""} headerText={characterName} />
      <div
        className="flex flex-col justify-start flex-1 h-full overflow-y-scroll scrollbar-hide"
        ref={chatBoxRef}
      >
        <div className="flex flex-col gap-4 mb-11">
          {chatDetails.map((chatDetail, index) =>
            chatDetail.memberId ? (
              <div key={index} className="flex items-center justify-end">
                <span className="text-gray-400 text-xs mr-2 self-end">
                  {calTime(chatDetail.createTime)}
                </span>
                <div className="max-w-[60%] p-3 bg-[#FF589B] text-white rounded-lg text-sm leading-6">
                  {chatDetail.message}
                </div>
              </div>
            ) : (
              <div key={index} className="flex items-center">
                <img
                  src={chatDetail.character?.characterImage}
                  className="w-8 h-8 rounded-full mr-2"
                  alt="Character"
                />
                <div className="max-w-[60%] p-3 bg-[#FFC2DB] rounded-lg text-sm leading-6 border-2 border-[#FB599A]">
                  {chatDetail.message}
                </div>
                <span className="text-gray-400 text-xs ml-2 self-end">
                  {calTime(chatDetail.createTime)}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex w-full absolute bottom-0 items-center p-2.5 bg-white border-t border-gray-200 left-0 pl-5 box-border z-10">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력해주세요."
          className="flex-1 p-2.5 border-none rounded-md mr-2.5 text-sm bg-gray-100"
        />
        <button
          className="w-10 h-10 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${send})` }}
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default ChatDetail;
