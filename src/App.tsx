import { useState } from "react";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import "./App.css";

type PageMode = "home" | "work" | "chat" | "profile";

function App() {
  const [pageMode, setPageMode] = useState<PageMode>("home");

  const changePage = (page: PageMode) => setPageMode(page);

  return (
    <div>
      <Nav setPageMode={changePage} />
      <div className="body_content">
        <Page pageMode={pageMode} />
      </div>
    </div>
  );
}

const Nav = ({ setPageMode }: { setPageMode: (page: PageMode) => void }) => {
  return (
    <div className="nav_content">
      <div className="nav_flex">
        <button onClick={() => setPageMode("home")}>home</button>
        <button onClick={() => setPageMode("work")}>work</button>
        <button onClick={() => setPageMode("chat")}>chat</button>
        <button onClick={() => setPageMode("profile")}>profile</button>
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
