import { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle, KonvaEventObject } from "react-konva";
import UserThumbnail from "../components/UserThumbnail";
import dummyUser from "../assets/dummyUser.json";
import "./Work.css";
import ColoredRect from "../shapes/Circle";

type Tool = "rectangle" | "circle" | null;
interface Shape {
  type: Tool;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
}

function Work() {
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState<Shape | null>(null);
  const stageRef = useRef(null);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (!selectedTool) return;

    setIsDrawing(true);
    const { x, y } = e.target.getStage().getPointerPosition() || { x: 0, y: 0 };

    if (selectedTool === "rectangle")
      setNewShape({ type: selectedTool, x, y, width: 0, height: 0 });
    else if (selectedTool === "circle")
      setNewShape({ type: selectedTool, x, y, radius: 0 });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing || !newShape) return;

    const { x, y } = e.target.getStage().getPointerPosition() || { x: 0, y: 0 };

    if (newShape.type === "rectangle")
      setNewShape({
        ...newShape,
        width: x - newShape.x,
        height: y - newShape.y,
      });
    else if (newShape.type === "circle")
      setNewShape({
        ...newShape,
        radius: Math.sqrt((x - newShape.x) ** 2 + (y - newShape.y) ** 2),
      });
  };

  const handleMouseUp = () => {
    if (!isDrawing || !newShape) return;

    setShapes([...shapes, newShape]);
    setNewShape(null);
    setIsDrawing(false);
    setSelectedTool(null);
  };

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
          <Stage
            className="canvas_stage"
            width={window.innerWidth * 0.7}
            height={window.innerHeight * 0.7}
            ref={stageRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              {shapes.map((shape, index) => {
                if (shape.type === "rectangle") {
                  return (
                    <Rect
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      fill="red"
                      opacity={0.5}
                      draggable
                    />
                  );
                } else if (shape.type === "circle") {
                  return (
                    <Circle
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      radius={shape.radius}
                      fill="blue"
                      opacity={0.5}
                      draggable
                    />
                  );
                }
                return null;
              })}
              {newShape && newShape.type === "rectangle" && (
                <Rect {...newShape} fill="red" opacity={0.5} />
              )}
              {newShape && newShape.type === "circle" && (
                <Circle {...newShape} fill="red" opacity={0.5} />
              )}
            </Layer>
          </Stage>
          <div>
            <Toolbar setSelectedTool={setSelectedTool} />
          </div>
        </div>
      </div>
    </>
  );
}

type ToolbarProps = {
  setSelectedTool: (tool: Tool) => void;
};
const Toolbar = ({ setSelectedTool }: ToolbarProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setSelectedTool("rectangle")}>사각형</button>
      <button onClick={() => setSelectedTool("circle")}>원</button>
    </div>
  );
};

export default Work;
