import { useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import "./CustomerCenter.css";

function CustomerCenter() {
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="ct-center-container">
      <div
        className="ct-center"
        onClick={() => {
          setIsBoardOpen((prev) => !prev);
          isChatOpen && setIsChatOpen(false);
        }}
      >
        <TfiHeadphoneAlt className="ct-center-icon" />
      </div>
      {isBoardOpen && <MenuBoard setIsChatOpen={setIsChatOpen} />}
      {isChatOpen && <ChatContainer />}
    </div>
  );
}

import { HiOutlineVideoCamera } from "react-icons/hi2";

const MenuBoard = ({ setIsChatOpen }: any) => {
  return (
    <div className="ct-board">
      <div onClick={() => setIsChatOpen("true")}>
        <TfiHeadphoneAlt className="ct-board-icon" />
        <div>1:1 채팅</div>
      </div>
      <div>
        <HiOutlineVideoCamera className="ct-board-icon2" />
        <div>1:1 통화</div>
      </div>
    </div>
  );
};

import Chat from "../pages/Chat";

const ChatContainer = () => {
  return (
    <div className="ct-chat">
      <Chat />
    </div>
  );
};

export default CustomerCenter;
