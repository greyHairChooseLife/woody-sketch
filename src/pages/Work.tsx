import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from "react-konva";
import Konva from "konva";
import UserThumbnail from "../components/UserThumbnail";
import dummyUser from "../assets/dummyUser.json";
import "./Work.css";
import { PiRectangleDashedBold } from "react-icons/pi";
import { TbCircleDotted } from "react-icons/tb";
import { FaEraser } from "react-icons/fa";

type Tool = "rectangle" | "circle" | null;
interface Shape {
  type: Tool;
  x: number;
  y: number;
  fillColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  id: string;
}

function Work() {
  const [selectedTool, setSelectedTool] = useState<Tool>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newShape, setNewShape] = useState<Shape | null>(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const transformerRef = useRef<any>(null);
  const shapeRef = useRef<any>(null);
  const stageRef = useRef(null);
  const stageContainerRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateStageSize = () => {
      if (stageContainerRef.current) {
        const { offsetWidth, offsetHeight } = stageContainerRef.current;
        setStageSize({ width: offsetWidth, height: offsetHeight });
      }
    };
    updateStageSize();
    window.addEventListener("resize", updateStageSize);
    return () => {
      window.removeEventListener("resize", updateStageSize);
    };
  }, []);

  useEffect(() => {
    if (
      selectedShapeIndex !== null &&
      transformerRef.current &&
      shapeRef.current
    ) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [selectedShapeIndex]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!selectedTool) return;

    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    const { x, y } = pos || { x: 0, y: 0 };

    if (selectedTool === "rectangle")
      setNewShape({
        type: selectedTool,
        x,
        y,
        width: 0,
        height: 0,
        id: `rect_${shapes.length}`,
      });
    else if (selectedTool === "circle")
      setNewShape({
        type: selectedTool,
        x,
        y,
        radius: 0,
        id: `circle_${shapes.length}`,
      });
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

  const handleDragEnd = (e: any) => {
    const id = e.target.id();
    const updatedShapes = shapes.map((shape) => {
      if (shape.id === id) {
        return {
          ...shape,
          x: e.target.x(),
          y: e.target.y(),
          width: shape.type === "rectangle" ? e.target.width() : shape.width,
          height: shape.type === "rectangle" ? e.target.height() : shape.height,
          radius: shape.type === "circle" ? e.target.radius() : shape.radius,
        };
      } else return shape;
    });
    setShapes(updatedShapes);
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
        <div className="work_section2" ref={stageContainerRef}>
          <Stage
            className="canvas_stage"
            width={stageSize.width}
            height={stageSize.height}
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
                      {...shape}
                      ref={selectedShapeIndex === index ? shapeRef : null}
                      fill={shape.fillColor || "grey"}
                      draggable
                      onClick={() => handleSelectShape(index)}
                      onTransformEnd={handleDragEnd}
                    />
                  );
                } else if (shape.type === "circle") {
                  return (
                    <Circle
                      key={index}
                      {...shape}
                      ref={selectedShapeIndex === index ? shapeRef : null}
                      fill={shape.fillColor || "grey"}
                      draggable
                      onClick={() => handleSelectShape(index)}
                      onTransformEnd={handleDragEnd}
                    />
                  );
                }
                return null;
              })}
              {selectedShapeIndex !== null && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(_, newBox) => newBox}
                />
              )}
              {newShape && newShape.type === "rectangle" && (
                <Rect {...newShape} fill="yellow" opacity={0.4} />
              )}
              {newShape && newShape.type === "circle" && (
                <Circle {...newShape} fill="yellow" opacity={0.4} />
              )}
            </Layer>
          </Stage>
          <div>
            <Toolbar
              selectedTool={selectedTool}
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
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
  handleDeleteShape: () => void;
};
const Toolbar = ({
  selectedTool,
  setSelectedTool,
  handleDeleteShape,
}: ToolbarProps) => {
  return (
    <div className="tool_bar_container">
      <button
        className={
          selectedTool === "rectangle" ? "selected_tool_btn" : "tool_btn"
        }
        onClick={() => setSelectedTool("rectangle")}
      >
        <span>사각형</span>
        <PiRectangleDashedBold />
      </button>
      <button
        className={selectedTool === "circle" ? "selected_tool_btn" : "tool_btn"}
        onClick={() => setSelectedTool("circle")}
      >
        <span>원</span>
        <TbCircleDotted />
      </button>
      <button className="erase_btn" onClick={handleDeleteShape}>
        <span>지우기</span>
        <FaEraser />
      </button>
    </div>
  );
};

export default Work;
