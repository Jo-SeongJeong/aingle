import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../../api/chatAPI";
import { IchatRoom } from "../../model/chat";
import { calTime } from "../../utils/date";
import TextHeader from "../../components/header/TextHeader";


const Chat = () => {
  const [chatList, setChatList] = useState<IchatRoom[]>([]);
  const navigate = useNavigate();

  const cutText = (message: string) => {
    if (message.length > 25) {
      return message.slice(0, 25) + "...";
    }
    return message;
  };

  const clickChat = (id: number, characterName: string) => {
    navigate(`/chat/${id}`, { state: { characterName } });
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await getChatList();

        const sortedChatList = response.sort(
          (a, b) =>
            new Date(b.lastMessageTime).getTime() -
            new Date(a.lastMessageTime).getTime()
        );

        setChatList(sortedChatList);
      } catch (error) {
        console.error("채팅 리스트 가져오기 실패: ", error);
      }
    };

    fetchChat();
  }, []);

  return (
    <div className="bg-white h-screen w-full flex flex-col overflow-hidden">
      {/* 헤더가 상단에 고정 */}
      <div className="absolute top-0 w-full z-10">
        <TextHeader navTo={""} headerText={"다이렉트 메세지"} />
      </div>

      {/* 채팅 리스트가 헤더 아래에서부터 렌더링 */}
      <div className="mt-[60px] flex-1 overflow-y-auto px-4 py-6">
        {chatList.length === 0 ? (
          <div className="text-gray-500 text-center">
            채팅 리스트가 없습니다
          </div>
        ) : (
          chatList.map((chat) => (
            <div
              key={chat.chatRoomId}
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => clickChat(chat.chatRoomId, chat.character.name)}
            >
              <div className="flex items-center">
                <img
                  src={chat.character.characterImage}
                  className="w-12 h-12 rounded-full bg-gray-300 mr-4"
                  alt={chat.character.name}
                />
                <div className="flex flex-col">
                  <span className="font-semibold mb-1 text-black text-sm">
                    {chat.character.name}
                  </span>
                  {chat.lastMessage ? (
                    <span className="text-gray-500 text-xs">
                      {cutText(chat.lastMessage)}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-xs">
                      채팅 기록이 없어요
                    </span>
                  )}
                </div>
              </div>
              {chat.lastMessage && (
                <span className="text-gray-400 text-xs">
                  {calTime(chat.lastMessageTime)}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chat;
