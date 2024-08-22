import { useState } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import "./App.css";
import { CgProfile } from "react-icons/cg";

type PageMode = "home" | "work" | "chat" | "profile";

function App() {
  const [pageMode, setPageMode] = useState<PageMode>("home");

  const changePage = (page: PageMode) => setPageMode(page);
  const onClickProfileIcon = () => setPageMode("profile");

  return (
    <>
      <div className="page_layout">
        <Nav pageMode={pageMode} setPageMode={changePage} />
        <div className="body_content">
          <Page pageMode={pageMode} />
        </div>
      </div>
      {pageMode === "home" && (
        <div className="profile_icon_container">
          <CgProfile className="profile_icon" onClick={onClickProfileIcon} />
        </div>
      )}
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
        <button
          className={pageMode === "home" ? "activeNav" : ""}
          onClick={() => setPageMode("home")}
        >
          홈
        </button>
        <button
          className={pageMode === "work" ? "activeNav" : ""}
          onClick={() => setPageMode("work")}
        >
          작업
        </button>
        <button
          className={pageMode === "chat" ? "activeNav" : ""}
          onClick={() => setPageMode("chat")}
        >
          채팅
        </button>
        <button
          className={pageMode === "profile" ? "activeNav" : ""}
          onClick={() => setPageMode("profile")}
        >
          프로필
        </button>
      </div>
    </div>
  );
};

const Page = ({ pageMode }: { pageMode: PageMode }) => {
  if (pageMode === "home") return <Home />;
  else if (pageMode === "work") return <Work />;
  else if (pageMode === "chat") return <Chat />;
  else if (pageMode === "profile") return <Profile />;
  else return <>Something worng!</>;
};

export default App;
