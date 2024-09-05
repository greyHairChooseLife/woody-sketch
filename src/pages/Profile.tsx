import "./Profile.css";

import { CiFolderOn } from "react-icons/ci";
import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";

function Profile() {
  return (
    <>
      <div className="profile_layout">
        <div className="profile_layout_left">
          <div>
            <div className="polygon-container">
              <CiFolderOn className="polygon-container-icon" />
            </div>
            <div className="polygon-container-title">내 작업</div>
          </div>
          <div>
            <div className="polygon-container">
              <HiOutlineCloudArrowUp className="polygon-container-icon" />
            </div>
            <div className="polygon-container-title">커뮤니케이션</div>
          </div>
          <div>
            <div className="polygon-container">
              <FaHeart className="polygon-container-icon polygon-container-icon-heart" />
            </div>
            <div className="polygon-container-title">찜</div>
          </div>
        </div>
        <div className="profile_layout_right">
          <RightOne />
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
      <div>two</div>
    </>
  );
};

const RightTree = () => {
  return (
    <>
      <div>3</div>
    </>
  );
};

export default Profile;
