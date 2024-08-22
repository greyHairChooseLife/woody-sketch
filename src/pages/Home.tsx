import { PiTreeFill } from "react-icons/pi";
import { HiMiniMagnifyingGlassCircle } from "react-icons/hi2";
import "./Home.css";
import designObjects from "../assets/designObjects.json";

function Home() {
  const todayRecommendObj = designObjects.filter(
    (dObj) => dObj.type === "todayRecommend"
  );
  const recentlyViewedObj = designObjects.filter(
    (dObj) => dObj.type === "recentlyViewed"
  );

  return (
    <>
      <div className="home_layout">
        <div className="home_section1">
          <h1>
            <PiTreeFill className="tree_icon" />
            Woody Sketch
          </h1>
        </div>
        <div className="home_section2">
          <label>
            <HiMiniMagnifyingGlassCircle className="glass_icon" />
            <input type="text" placeholder="디자인 검색 ..." />
          </label>
        </div>
        <div className="home_section3">
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
