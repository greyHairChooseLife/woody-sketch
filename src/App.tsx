import { useState } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Product from "./pages/Product";
import Chat from "./pages/Chat";
import Style from "./pages/Style";
import Profile from "./pages/Profile";
import "./App.css";
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
  const [pageMode, setPageMode] = useState<PageMode[]>(["home", "home"]);

  const changePage = (newPage: PageMode) => {
    const [_, currPage] = pageMode;
    setPageMode([currPage, newPage]);
  };

  return (
    <>
      <div className="page_layout">
        <div>
          <Nav pageMode={pageMode} setPageMode={changePage} />
        </div>
        <div className="body_content">
          <Page pageMode={pageMode[1]} setPageMode={changePage} />
        </div>
      </div>
    </>
  );
}

type NavProps = {
  pageMode: PageMode[];
  setPageMode: (page: PageMode) => void;
};
const Nav = ({ pageMode, setPageMode }: NavProps) => {
  console.log("mode: ", pageMode);
  return (
    <div className="nav_content">
      <div className="nav_flex">
        <div className="nav_header">Woody Sketch</div>
        <div className="nav_buttons">
          <div
            onMouseOver={() => setPageMode("style")}
            onMouseLeave={() => setPageMode(pageMode[0])}
          >
            <button>스타일</button>
            {pageMode[1] === "style" && (
              <div className="nav_button_point"></div>
            )}
          </div>

          <div
            onMouseOver={() => setPageMode("product")}
            onMouseLeave={() => setPageMode(pageMode[0])}
          >
            <button>전제품</button>
            {pageMode[1] === "product" && (
              <div className="nav_button_point"></div>
            )}
          </div>
          <div>
            <button onClick={() => setPageMode("work")}>제품디자인</button>
            {pageMode[1] === "work" && <div className="nav_button_point"></div>}
          </div>
          <div>
            <button onClick={() => setPageMode("order")}>제작현황</button>
            {pageMode[1] === "order" && (
              <div className="nav_button_point"></div>
            )}
          </div>
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
  setPageMode: (newPage: PageMode) => void;
}) => {
  if (pageMode === "home") return <Home setPageMode={setPageMode} />;
  else if (pageMode === "style") return <Style />;
  else if (pageMode === "product") return <Product />;
  else if (pageMode === "work") return <Work />;
  else if (pageMode === "order") return <Work />;
  else if (pageMode === "chat") return <Chat />;
  else if (pageMode === "profile") return <Profile />;
  else return <>Something worng!</>;
};

export default App;
