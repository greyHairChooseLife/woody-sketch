import { useState, Dispatch, SetStateAction } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Chat from "./pages/Chat";
import Style from "./pages/Style";
import Profile from "./pages/Profile";
import UserThumbnail from "./components/UserThumbnail";
import "./App.css";
import dummyUser from "./assets/dummyUser.json";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

type PageMode =
  | "home"
  | "chat"
  | "profile"
  | "style"
  | "product"
  | "work"
  | "order";

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
          <button onClick={() => setPageMode("style")}>스타일</button>
          <button onClick={() => setPageMode("product")}>전제품</button>
          <button onClick={() => setPageMode("work")}>제품디자인</button>
          <button onClick={() => setPageMode("order")}>제작현황</button>
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
  else if (pageMode === "style") return <Style />;
  else if (pageMode === "product") return <Work />;
  else if (pageMode === "work") return <Work />;
  else if (pageMode === "order") return <Work />;
  else if (pageMode === "chat") return <Chat />;
  else if (pageMode === "profile") return <Profile />;
  else return <>Something worng!</>;
};

export default App;
