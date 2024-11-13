import { moveTo, lineTo } from './drawingCommands'

const TAU = Math.PI * 2;

const drawPolygon = (
  cx: number = 1200,
  cy: number = 0,
  radius: number = 300,
  numPoints: number = 5,
  baseRot: number = 0
) => {
  const arc = TAU / numPoints;
  const offset = baseRot;
  let x, y;

  for (let i = 0; i < numPoints + 1; i++) {
    x = cx + Math.sin(arc * i + offset) * radius;
    y = cy + Math.cos(arc * i + offset) * radius;

    if (i === 0) {
      moveTo(x, y);
    }
    lineTo(x, y);
  }
};

export default drawPolygon;
