import { useState } from "react";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import "./CustomerCenter.css";

function CustomerCenter() {
  const [isBoardOpen, setIsBoardOpen] = useState(false);

  return (
    <div>
      <div
        className="ct-center"
        onClick={() => {
          setIsBoardOpen((prev) => !prev);
        }}
      >
        <TfiHeadphoneAlt className="ct-center-icon" />
      </div>
      {isBoardOpen && <MenuBoard />}
    </div>
  );
}

import { HiOutlineVideoCamera } from "react-icons/hi2";

const MenuBoard = () => {
  return (
    <div className="ct-board">
      <div>
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

export default CustomerCenter;
