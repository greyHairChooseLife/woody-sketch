import { useState, Dispatch, SetStateAction } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import UserThumbnail from "./components/UserThumbnail";
import "./App.css";
import dummyUser from "./assets/dummyUser.json";

type PageMode = "home" | "work" | "chat" | "profile";

function App() {
  const [pageMode, setPageMode] = useState<PageMode>("home");

  const changePage = (page: PageMode) => setPageMode(page);

  return (
    <>
      <div className="page_layout">
        <div>
          <Nav pageMode={pageMode} setPageMode={changePage} />
          {pageMode === "home" && (
            <div className="profile_icon_container">
              <UserThumbnail
                src={dummyUser.thumbnail}
                setPageMode={setPageMode}
                size="small"
              />
            </div>
          )}
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
