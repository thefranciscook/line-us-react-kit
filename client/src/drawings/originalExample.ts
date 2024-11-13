import { moveTo, lineTo, dot, finish } from '../lib/drawingCommands'
import drawPolygon from '../lib/drawPolygon';

export const originalExample = () => {
  moveTo(900, 800);
  lineTo(900, 200);

  moveTo(1200, 800);
  lineTo(1200, 200);

  moveTo(1000, 500);
  lineTo(1200, 500);

  moveTo(1500, 700);
  lineTo(1500, 200);

  dot(1500, 800);

  drawPolygon(1300, -500, 80, 3);
  drawPolygon(1300, -500, 200, 3, Math.PI);
  drawPolygon(1300, -500, 300, 5);

  finish();
};
