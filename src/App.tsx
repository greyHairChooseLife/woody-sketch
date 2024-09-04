import { useState, Dispatch, SetStateAction } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import UserThumbnail from "./components/UserThumbnail";
import "./App.css";
import dummyUser from "./assets/dummyUser.json";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

type PageMode = "home" | "work" | "chat" | "profile";

function App() {
  const [pageMode, setPageMode] = useState<PageMode>("home");

  const changePage = (page: PageMode) => setPageMode(page);

  return (
    <>
      <div className="page_layout">
        <div>
          <Nav pageMode={pageMode} setPageMode={changePage} />
        </div>
        <div className="body_content">
          <Page pageMode={pageMode} setPageMode={setPageMode} />
        </div>
      </div>
    </>
  );
}

type NavProps = {
  pageMode: PageMode;
  setPageMode: (page: PageMode) => void;
};
const Nav = ({ pageMode, setPageMode }: NavProps) => {
  return (
    <div className="nav_content">
      <div className="nav_flex">
        <div className="nav_header">Woody Sketch</div>
        <div className="nav_buttons">
          <button
            className={pageMode === "home" ? "activeNav" : ""}
            onClick={() => setPageMode("home")}
          >
            스타일
          </button>
          <button
            className={pageMode === "work" ? "activeNav" : ""}
            onClick={() => setPageMode("work")}
          >
            전제품
          </button>
          <button
            className={pageMode === "chat" ? "activeNav" : ""}
            onClick={() => setPageMode("chat")}
          >
            제품디자인
          </button>
          <button
            className={pageMode === "profile" ? "activeNav" : ""}
            onClick={() => setPageMode("profile")}
          >
            제작현황
          </button>
        </div>
        <div className="nav_icon_div">
          <div>
            <FaMagnifyingGlass className="nav_icons nav_icons_FaMagnifyingGlass" />
          </div>
          <div>
            <AiOutlineUser className="nav_icons nav_icons_AiOutlineUser" />
          </div>
          <div>
            <IoMenu className="nav_icons nav_icons_IoMenu" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = ({
  pageMode,
  setPageMode,
}: {
  pageMode: PageMode;
  setPageMode: Dispatch<SetStateAction<PageMode>>;
}) => {
  if (pageMode === "home") return <Home setPageMode={setPageMode} />;
  else if (pageMode === "work") return <Work />;
  else if (pageMode === "chat") return <Chat />;
  else if (pageMode === "profile") return <Profile />;
  else return <>Something worng!</>;
};

export default App;
