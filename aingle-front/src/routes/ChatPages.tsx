import { Route, Routes } from "react-router-dom";
import Chat from "../pages/chat/Chat";
import ChatDetail from "../pages/chat/ChatDetail";

const ChatPages = () => {
  return (
    <div className="h-full relative bg-white">
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/:id" element={<ChatDetail />} />
      </Routes>
    </div>
  );
};

export default ChatPages;
