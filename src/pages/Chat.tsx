import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPaperPlane } from "react-icons/fa";
import dummyUser from "../assets/dummyUser.json";
import dummyMessages from "../assets/dummyMessages.json";
import "./ChatPage.css";

function Chat() {
  const [msgObjects, setMsgObjects] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const onSendMessage = () => {
    if (newMessage === "") return;

    const newMsgObj = {
      order: msgObjects.length + 1,
      userType: "user",
      message: newMessage,
      lastMessageUserType: [...msgObjects].reverse()[0].userType,
    };
    setMsgObjects([...msgObjects, newMsgObj]);
    setNewMessage("");
  };

  return (
    <>
      <div className="chat_layout">
        <div className="chat_section1">
          <CgProfile className="profile_icon" /> <span>{dummyUser.name}</span>님
        </div>
        <div className="chat_section2">
          {msgObjects.map((msgObj) => (
            <ChatElement
              key={msgObj.order}
              userType={msgObj.userType as "user" | "admin"}
              message={msgObj.message}
              lastMessageUserType={
                msgObj.lastMessageUserType as "user" | "admin"
              }
            />
          ))}
        </div>
        <div className="chat_section3">
          <input
            type="text"
            placeholder="메시지를 입력하세요."
            onChange={onChangeMessage}
            value={newMessage}
            onKeyDown={(e) => {
              e.key === "Enter" && onSendMessage();
            }}
          />
          <button onClick={onSendMessage}>
            보내기
            <FaPaperPlane className="send_icon" />
          </button>
        </div>
      </div>
    </>
  );
}

type ChatElementProps = {
  userType: "user" | "admin";
  message: string;
  lastMessageUserType: "user" | "admin";
};
const ChatElement = ({
  userType,
  message,
  lastMessageUserType,
}: ChatElementProps) => {
  return (
    <div className={`chat_message ${userType}_message`}>
      {lastMessageUserType !== userType ? (
        <div>{userType === "admin" ? "상담원" : "나"}</div>
      ) : (
        <div></div>
      )}
      <div>{message}</div>
    </div>
  );
};

export default Chat;
