import { useState } from "react";
import Home from "./pages/Home";
import Other from "./pages/Other";
import "./App.css";

type PageMode = "home" | "other";

function App() {
  const [pageMode, setPageMode] = useState<PageMode>("home");

  const changePage = (page: PageMode) => setPageMode(page);

  return (
    <>
      <div className="nav_flex">
        <button onClick={() => changePage("home")}>home</button>
        <button onClick={() => changePage("other")}>other</button>
      </div>
      {pageMode === "home" ? <Home /> : <Other />}
    </>
  );
}

export default App;
