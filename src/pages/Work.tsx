import { useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import UserThumbnail from "../components/UserThumbnail";
import dummyUser from "../assets/dummyUser.json";
import "./Work.css";

function Work() {
  const [strokeColor, setStrokeColor] = useState<string>("black");

  return (
    <>
      <div className="work_layout">
        <div className="work_section1">
          <div>
            <UserThumbnail src={dummyUser.thumbnail} size="small" />{" "}
            <span>{dummyUser.name}</span>님
          </div>
        </div>
        <div className="work_section2">
          <div>
            <ReactSketchCanvas
              className="canvas_board"
              height="80vh"
              strokeWidth={4}
              strokeColor={strokeColor}
            />
          </div>
          <div>
            <PaintTools setStrokeColor={setStrokeColor} />
          </div>
        </div>
      </div>
    </>
  );
}

type PaintToolsProps = {
  setStrokeColor: (color: string) => void;
};
const PaintTools = ({ setStrokeColor }: PaintToolsProps) => {
  return (
    <>
      <button
        className="colorPickBtn black_Btn"
        onClick={() => setStrokeColor("black")}
      >
        black
      </button>
      <button
        className="colorPickBtn red_Btn"
        onClick={() => setStrokeColor("red")}
      >
        red
      </button>
      <button
        className="colorPickBtn blue_Btn"
        onClick={() => setStrokeColor("blue")}
      >
        blue
      </button>
      <button
        className="colorPickBtn green_Btn"
        onClick={() => setStrokeColor("green")}
      >
        green
      </button>
    </>
  );
};

export default Work;
