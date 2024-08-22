import { useState, useRef } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import Konva from "konva";
import UserThumbnail from "../components/UserThumbnail";
import dummyUser from "../assets/dummyUser.json";
import "./Work.css";

type Tool = "rectangle" | "circle" | null;
interface Shape {
  type: Tool;
  x: number;
  y: number;
  fillColor?: string;
  width?: number;
  height?: number;
  radius?: number;
}

function Work() {
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState<Shape | null>(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const stageRef = useRef(null);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!selectedTool) return;

    setIsDrawing(true);
    const { x, y } = e?.target?.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

    if (selectedTool === "rectangle")
      setNewShape({ type: selectedTool, x, y, width: 0, height: 0 });
    else if (selectedTool === "circle")
      setNewShape({ type: selectedTool, x, y, radius: 0 });
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing || !newShape) return;

    const { x, y } = e?.target?.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

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

  const handleSelectShape = (index: number) => {
    if (selectedShapeIndex === index) setSelectedShapeIndex(null);
    else setSelectedShapeIndex(index);
  };

  const handleDeleteShape = () => {
    if (selectedShapeIndex === null) return;
    const newShapes = shapes.filter((_, index) => index !== selectedShapeIndex);
    setShapes(newShapes);
    setSelectedShapeIndex(null);
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
                      fill={shape.fillColor || "grey"}
                      draggable
                      onClick={() => handleSelectShape(index)}
                      strokeWidth={selectedShapeIndex === index ? 10 : 1}
                      stroke={selectedShapeIndex === index ? "yellow" : "black"}
                    />
                  );
                } else if (shape.type === "circle") {
                  return (
                    <Circle
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      radius={shape.radius}
                      fill={shape.fillColor || "grey"}
                      draggable
                      onClick={() => handleSelectShape(index)}
                      strokeWidth={selectedShapeIndex === index ? 10 : 1}
                      stroke={selectedShapeIndex === index ? "yellow" : "black"}
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
            <Toolbar
              setSelectedTool={setSelectedTool}
              handleDeleteShape={handleDeleteShape}
            />
          </div>
        </div>
      </div>
    </>
  );
}

type ToolbarProps = {
  setSelectedTool: (tool: Tool) => void;
  handleDeleteShape: () => void;
};
const Toolbar = ({ setSelectedTool, handleDeleteShape }: ToolbarProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => setSelectedTool("rectangle")}>사각형</button>
      <button onClick={() => setSelectedTool("circle")}>원</button>
      <button onClick={handleDeleteShape}>지우기</button>
    </div>
  );
};

export default Work;
