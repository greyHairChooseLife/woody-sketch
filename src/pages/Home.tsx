import { Dispatch, SetStateAction } from "react";
import { PiTreeFill } from "react-icons/pi";
import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import "./Home.css";
import designObjects from "../assets/designObjects.json";

type PageMode = "home" | "work" | "chat" | "profile";

type HomeProps = {
  setPageMode: Dispatch<SetStateAction<PageMode>>;
};
function Home({ setPageMode }: HomeProps) {
  const todayRecommendObj = designObjects.filter(
    (dObj) => dObj.type === "todayRecommend"
  );
  const recentlyViewedObj = designObjects.filter(
    (dObj) => dObj.type === "recentlyViewed"
  );

  return (
    <>
      <div className="home_layout">
        <div className="home_section1" />
        <div className="home_section2">
          <BigFrontElement setPageMode={setPageMode} />
          <Designs title="오늘의 추천" elements={todayRecommendObj} />
          <Designs
            title="최근에 본 상품과 비슷한 디자인"
            elements={recentlyViewedObj}
          />
        </div>
      </div>
    </>
  );
}

type BigFrontElementProps = {
  setPageMode: Dispatch<SetStateAction<PageMode>>;
};
const BigFrontElement = ({ setPageMode }: BigFrontElementProps) => {
  return (
    <div className="home_page">
      <div className="home_page_left">
        <div className="home_word">
          <div className="home_word_small">새로운 디자인의 시작</div>
          <div className="home_word_big">Woody Sketch</div>
        </div>
        <button className="home_button" onClick={() => setPageMode("work")}>
          Start
        </button>
      </div>

      <div className="home_page_right">
        <img src="https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg" />
      </div>
    </div>
  );
};

type DesignsProps = {
  title: string;
  elements: { title: string; src: string }[];
};
const Designs = ({ title, elements }: DesignsProps) => {
  return (
    <div className="designs_container">
      <h2>{title}</h2>
      <div className="designs">
        {elements.map((element) => (
          <div key={element.title} className="design">
            {element.title}
            <img src={element.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
