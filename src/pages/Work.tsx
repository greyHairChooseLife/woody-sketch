import { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Line,
  Ellipse,
  Transformer,
} from "react-konva";
import Konva from "konva";
import GridLayer from "../components/GridLayer";
import "./Work.css";
import { PiRectangleDashedBold } from "react-icons/pi";
import { TbCircleDotted } from "react-icons/tb";
import { FaEraser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

type Tool = "rectangle" | "circle" | "polygon" | null;
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
  const stageRef = useRef<any>(null);
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

  const handleDownload = () => {
    if (!stageRef.current) return;
    const dataURL = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "Woody Image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="work_layout">
        <div className="work_section1"></div>
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
            <GridLayer stageSize={stageSize} gridSpacing={50} />
            <Layer>
              {shapes.map((shape, index) => {
                if (shape.type === "rectangle") {
                  return (
                    <Rect
                      key={index}
                      {...shape}
                      ref={selectedShapeIndex === index ? shapeRef : null}
                      fill={shape.fillColor || ""}
                      stroke="#990c0b"
                      strokeWidth={7}
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
                      fill={shape.fillColor || ""}
                      stroke="#990c0b"
                      strokeWidth={7}
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

              <Line
                x={700}
                y={200}
                points={[0, 0, 100, -35, 0, -75]}
                stroke="#990c0b"
                strokeWidth={5}
                closed={true}
              />
              <Ellipse
                x={700}
                y={164}
                radiusX={15}
                radiusY={39}
                stroke="#990c0b"
                strokeWidth={5}
                fill="white"
              />
              <Line
                x={500}
                y={150}
                points={[
                  0, 0, 120, 0, 120, 50, 0, 50, 0, 0, 30, -30, 150, -30, 120, 0,
                  0, 0, 120, 0, 120, 50, 150, 20, 150, -30,
                ]}
                stroke="#990c0b"
                closePath={true}
                strokeWidth={5}
                draggable
              />
              <Rect fill="yellow" opacity={0.4} />
              {newShape && newShape.type === "rectangle" && (
                <Rect {...newShape} fill="yellow" opacity={0.4} />
              )}
              {newShape && newShape.type === "circle" && (
                <Circle {...newShape} fill="yellow" opacity={0.4} />
              )}
            </Layer>
          </Stage>
          <div className="toolbar-left">
            <button>채색</button>
            <button>스타일</button>
          </div>
          <div className="toolbar-main">
            <div className="toolbar-top">
              <button>자동차</button>
              <button>볼펜</button>
            </div>
            <Toolbar
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
              handleDeleteShape={handleDeleteShape}
              handleDownload={handleDownload}
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
  handleDownload: () => void;
};
const Toolbar = ({
  selectedTool,
  setSelectedTool,
  handleDeleteShape,
  handleDownload,
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
      <button className="download_btn" onClick={handleDownload}>
        <FiDownload />
        <div>다운로드</div>
      </button>
    </div>
  );
};

export default Work;
