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
        <div className="home_section1">
          <div>
            <label>
              <HiMiniMagnifyingGlassCircle className="glass_icon" />
              <input type="text" placeholder="디자인 검색 ..." />
            </label>
          </div>
          <div>
            <h1>
              <PiTreeFill className="tree_icon" />
              Woody Sketch
            </h1>
          </div>
        </div>
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
    <div className="big_front_element_container">
      <div className="big_front_element">
        <div>
          <div>
            <div>
              <div className="big_front_element_top">
                누구나 쉽게 즐기는 목공예 디자인
              </div>
              <div className="big_front_element_mid">WOODY SKETCH</div>
              <div className="big_front_element_bot">
                <span>목공 멘토와의 1:1 매칭으로</span>
                <span>쉽게 배워보세요.</span>
              </div>
            </div>
          </div>
          <img src="https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070_960_720.jpg" />
        </div>
        <button onClick={() => setPageMode("work")}>스케치 하기</button>
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
