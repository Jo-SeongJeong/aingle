import { useEffect, useRef, useState } from "react";
import send from "../../assets/icons/send.png";

const ChatDetail = () => {
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>(
    []
  );

  const [inputValue, setInputValue] = useState("");
  // const navigate = useNavigate();
  const chatBoxRef = useRef<HTMLDivElement>(null); // HTMLDivElement 타입으로 명시적으로 지정

  useEffect(() => {
    setMessages([
      {
        text: "안녕하세요 멍이냥 챗봇입니다! 궁금하신 내용의 버튼을 선택하거나 아래 채팅창에 질문을 주세요 🐶",
        user: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, user: true }];
      setMessages(newMessages);
      setInputValue("");

      // const reply = await getReply(inputValue, token);
      // const botMessage = reply
      //   ? reply
      //   : "챗봇 서비스에 문제가 발생했습니다. 나중에 다시 시도해주세요.";

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: botMessage, user: false },
      // ]);
    }
  };
  return (
    <div className="bg-[#ffe8f1] h-screen w-full px-[16px] pb-[34px] flex flex-col items-center relative overflow-scroll">
      <div
        className="flex flex-col justify-start flex-1 overflow-y-auto "
        ref={chatBoxRef}
      >
        <div className="flex flex-col gap-2  overflow-y-auto">
          {messages.map((message, index) =>
            message.user ? (
              <div
                key={index}
                className="max-w-[60%] p-3 bg-[#FF589B] text-white rounded-lg self-end text-sm leading-6"
              >
                {message.text}
              </div>
            ) : (
              <div key={index} className="flex items-center">
                {/* 상대방 이미지 */}
                <img src={""} className="w-8 mr-1.5" />
                <div className="max-w-[60%] p-3 bg-[#FFC2DB] rounded-lg text-sm leading-6 border-2 border-[#FB599A]">
                  {message.text}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex w-full absolute bottom-0 items-center p-2.5 bg-white border-t border-gray-200  left-0 pl-5 box-border z-10">
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
