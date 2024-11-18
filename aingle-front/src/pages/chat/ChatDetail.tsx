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
  const [page, setPage] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
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
        if (chatBoxRef.current.scrollTop === 0 && hasMore) {
          setPage((prevPage) => prevPage + 1);
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
      const response = await getChatDetail(params);
      if (response === undefined) {
        setIsDelete(true);
      }

      if (response.chatMessageList.length === 0) {
        setHasMore(false);
      } else {
        const sortedChatDetails = response.chatMessageList.sort(
          (a, b) => a.chatMessageId - b.chatMessageId
        );
        setChatDetails((prev) => [...sortedChatDetails, ...prev]);
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

  const handleSend = async () => {
    if (inputValue.trim()) {
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
        const response = await postChat(newMessage);
        if (response) {
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

  if (isDelete) {
    return (
      <div className="bg-white h-screen w-full flex items-center justify-center">
        <TextHeader navTo={""} headerText={""} />
        <h1 className="text-gray-500 text-lg">삭제된 캐릭터입니다.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white h-screen w-full flex flex-col relative overflow-hidden">
      {/* 헤더 */}
      <div className="absolute top-0 w-full z-10">
        <TextHeader navTo={""} headerText={characterName} />
      </div>

      {/* 채팅 컨테이너 */}
      <div
        className="flex-1 mt-[60px] overflow-y-auto p-4 w-full max-w-[800px] mx-auto pb-20"
        ref={chatBoxRef}
      >
        {/* <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-8"> */}
        <div className="flex flex-col gap-4 ">
          {chatDetails.map((chatDetail, index) =>
            chatDetail.memberId ? (
              <div key={index} className="flex items-center justify-end">
                <span className="text-gray-400 text-xs mr-2">
                  {calTime(chatDetail.createTime)}
                </span>
                <div className="max-w-[60%] p-3 bg-pink-500 text-white rounded-lg text-sm leading-6">
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
                <div className="max-w-[60%] p-3 bg-pink-200 border-2 border-pink-500 rounded-lg text-sm leading-6">
                  {chatDetail.message}
                </div>
                <span className="text-gray-400 text-xs ml-2">
                  {calTime(chatDetail.createTime)}
                </span>
              </div>
            )
          )}
        </div>
      </div>
      {/* 입력창 */}
      <div className="absolute bottom-0 left-0 w-full flex items-center p-3 bg-white border-t border-gray-300">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력해주세요."
          className="flex-1 p-2.5 border-none rounded-md bg-gray-100 text-sm"
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
