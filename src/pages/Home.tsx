import "./Home.css";
import designObjects from "../assets/designObjects.json";

type PageMode = "home" | "work" | "chat" | "profile";

type HomeProps = {
  setPageMode: (newPage: PageMode) => void;
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
          <div className="home_design_container">
            <Designs title="오늘의 추천" elements={todayRecommendObj} />
            <Designs
              title="최근에 본 상품과 비슷한 디자인"
              elements={recentlyViewedObj}
            />
          </div>
        </div>
      </div>
    </>
  );
}

type BigFrontElementProps = {
  setPageMode: (newPage: PageMode) => void;
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
        <img src="/woody-sketch/down/Subtract.png" />
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
          <div className="design" key={element.title}>
            <div>
              <img src={element.src} />
            </div>
            {element.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
