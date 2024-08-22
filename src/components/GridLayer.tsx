import { Layer, Line } from "react-konva";

type GridLayerProps = {
  stageSize: { width: number; height: number };
  gridSpacing: number;
};
const GridLayer = ({ stageSize, gridSpacing }: GridLayerProps) => {
  const drawGrid = () => {
    const lines = [];
    for (let i = 0; i < stageSize.width; i += gridSpacing) {
      lines.push(
        <Line
          key={`x${i}`}
          points={[i, 0, i, stageSize.height]}
          stroke="grey"
          strokeWidth={1}
        />
      );
    }
    for (let i = 0; i < stageSize.height; i += gridSpacing) {
      lines.push(
        <Line
          key={`y${i}`}
          points={[0, i, stageSize.width, i]}
          stroke="grey"
          strokeWidth={1}
        />
      );
    }
    return lines;
  };

  return <Layer>{drawGrid()}</Layer>;
};

export default GridLayer;
