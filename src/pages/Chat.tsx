import { useState, useEffect, useRef } from "react";
import dummyMessages from "../assets/dummyMessages.json";
import "./Chat.css";
import { FaPaperPlane } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TbCircleArrowUpRightFilled } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { SlPencil } from "react-icons/sl";

function Chat() {
  const [msgObjects, setMsgObjects] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isStartChat, setIsStartChat] = useState(false);

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

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current === null) return;
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [msgObjects]);

  return (
    <>
      <div className="chat_layout">
        <div className="chat_section1">
          <div>
            <RxMagnifyingGlass className="chat_section1_icon" />
            <input placeholder={"궁금한 것을 물어보세요."} />
            <span className="chat_section1_cancel">취소</span>
            <span>
              <TbCircleArrowUpRightFilled /> 요금제
            </span>
            <span>
              <TbCircleArrowUpRightFilled /> 저작권
            </span>
          </div>

          <button>
            <FaQuestionCircle className="faq-icon" />
            FAQ
          </button>
          <button>
            <FaInfoCircle className="on1-icon" />
            1:1 문의
          </button>
        </div>
        {!isStartChat && (
          <div className="chat-not-start">
            <div>
              <p>아직 문의를 남기신적이 없으시네요!</p>
              <p>
                궁금하신 점이 있으시다면 1:1문의를 통해 언제든지 말씀해주세요.
              </p>
            </div>
            <button onClick={() => setIsStartChat(true)}>
              <SlPencil className="chat-not-start-icon" />
              문의하기
            </button>
          </div>
        )}

        {isStartChat && (
          <>
            <div className="chat_section2" ref={chatContainerRef}>
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
          </>
        )}
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
