import { useState } from "react";
import "./Profile.css";

import { CiFolderOn } from "react-icons/ci";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

function Profile() {
  const [mode, setMode] = useState<"one" | "two" | "three">("one");

  return (
    <>
      <div className="profile_layout">
        <div className="profile_layout_left">
          <div>
            <div
              className={
                mode === "one"
                  ? "polygon-container-active"
                  : "polygon-container"
              }
              onClick={() => {
                setMode("one");
              }}
            >
              <CiFolderOn className="polygon-container-icon" />
            </div>
            <div className="polygon-container-title">내 작업</div>
          </div>
          <div>
            <div
              className={
                mode === "two"
                  ? "polygon-container-active"
                  : "polygon-container"
              }
              onClick={() => {
                setMode("two");
              }}
            >
              <HiOutlineCloudArrowUp className="polygon-container-icon" />
            </div>
            <div className="polygon-container-title">커뮤니케이션</div>
          </div>
          <div>
            <div
              className={
                mode === "three"
                  ? "polygon-container-active"
                  : "polygon-container"
              }
              onClick={() => {
                setMode("three");
              }}
            >
              <FaHeart className="polygon-container-icon polygon-container-icon-heart" />
            </div>
            <div className="polygon-container-title">찜</div>
          </div>
        </div>
        <div className="profile_layout_right">
          {mode === "one" && <RightOne />}
          {mode === "two" && <RightTwo />}
          {mode === "three" && <RightThree />}
        </div>
      </div>
    </>
  );
}

import { PiUserCircleDuotone } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { LiaTrashAlt } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";

const RightOne = () => {
  return (
    <>
      <div className="right-one-layout">
        <div className="right-one-layout-left">
          <div>
            <div>
              <PiUserCircleDuotone className="roll-icon1" />
              꿈꾸는 나무1106
            </div>
            <div>
              <div>
                <span>작업중</span>
                <span>2</span>
              </div>
              <div>
                <span>제작완료</span>
                <span>4</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <CiFolderOn className="roll-icon2g" />
              <span>내 작업</span>
            </div>
            <div>
              <CiStar className="roll-icon2g" />
              <span>중요 작업</span>
            </div>
            <div>
              <CiShare2 className="roll-icon2g" />
              <span>공유 작업</span>
            </div>
            <div>
              <LiaTrashAlt className="roll-icon2g roll-icon2g-trash" />
              <span>휴지통</span>
            </div>
          </div>
        </div>
        <div className="right-one-layout-right">
          <h2>내 작업</h2>
          <div>
            <CiCirclePlus className="rolr-icon" />새 폴더
          </div>
          <div>
            <div>
              <CiCirclePlus className="rolr-icon2" />
              <div>새 작업</div>
            </div>
            <div> </div>
            <div> </div>
          </div>
        </div>
      </div>
    </>
  );
};
const RightTwo = () => {
  return (
    <>
      <div className="right-two-layout">
        <div className="rtl1">꿈꾸는 나무1106님의 블로그</div>
        <div className="rtl2">
          <PiUserCircleDuotone className="roll-icon1" />
          <div>
            <div>꿈꾸는 나무1106</div>
            <div>6명의 이웃</div>
          </div>
        </div>
        <div className="rtl3">
          <img src="src/assets/profilePagePic.png" />
        </div>
      </div>
    </>
  );
};

const RightThree = () => {
  return (
    <>
      <div className="right-three-layout">
        <div>
          <h1>최근 본 상품</h1>
          <div>
            <div>
              <img src="src/assets/down/TalkMedia_i_4be794fc57ed.jpg.jpg" />
              <div>책갈피</div>
            </div>
            <div>
              <img src="src/assets/down/TalkMedia_i_a3678a0df8cb.jpg.jpg" />
              <div>볼펜</div>
            </div>
            <div>
              <img src="src/assets/down/TalkMedia_i_a35e7bee7f63.jpg.jpg" />
              <div>도마</div>
            </div>
          </div>
        </div>
        <div>
          <h1>내 서랍</h1>
          <div>
            <div>
              <div>
                <div>
                  <img src="src/assets/down/TalkMedia_i_6c50a4ba51b1.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_7fc6ef8dd970.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_ff3e2bd1e26c.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_ef56fa033c4b.jpg.jpg" />
                </div>
                <div>
                  <div>
                    <div>기본 서랍</div>
                    <div>찜한 상품 25개</div>
                  </div>
                  icon
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img src="src/assets/down/TalkMedia_i_d78d92b46043.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_bef1f764dd85.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_b9279f2006d8.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_b922254615f3.jpg.jpg" />
                </div>
                <div>
                  <div>
                    <div>소품</div>
                    <div>찜한 상품 17개</div>
                  </div>
                  icon
                </div>
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img src="src/assets/down/TalkMedia_i_a3678a0df8cb.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_a35e7bee7f63.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_931988783b33.jpg.jpg" />
                  <img src="src/assets/down/TalkMedia_i_91a9e998f27d.jpg.jpg" />
                </div>
                <div>
                  <div>
                    <div>학용품</div>
                    <div>찜한 상품 8개</div>
                  </div>
                  icon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
