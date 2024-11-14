import { useEffect, useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import { useNavigate } from "react-router-dom";
import { getChatList } from "../../api/chatAPI";
import { IchatRoom } from "../../model/chat";
import { calTime } from "../../utils/date";

const Chat = () => {
  const [chatList, setChatList] = useState<IchatRoom[]>([]);
  const navigate = useNavigate();

  const cutText = (message: string) => {
    if (message.length > 25) {
      return message.slice(0, 25) + "...";
    }
    return message;
  };

  const clickChat = (id: number) => {
    navigate(`/chat/${id}`);
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
    <div className="bg-white h-screen w-full px-4 py-6 flex flex-col items-start overflow-y-auto">
      <PinkTextHeader />
      <div className="flex flex-col w-full">
        {chatList.length === 0 ? (
          <div className="text-gray-500 text-center">
            채팅 리스트가 없습니다
          </div>
        ) : (
          chatList.map((chat) => (
            <div
              key={chat.chatRoomId}
              className="flex items-center justify-between mb-4 cursor-pointer"
              onClick={() => clickChat(chat.chatRoomId)}
            >
              <div className="flex items-center">
                <img
                  src={chat.character.characterImage}
                  className="w-12 h-12 rounded-full bg-gray-300 mr-4"
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
