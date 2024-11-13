// src/client/lib/drawingCommands.ts
import { robotMoveTo, robotLineTo, robotDot } from './commands';
import { canvasMoveTo, canvasLineTo, canvasDot, canvasFinish } from './canvas';

export const moveTo = (x: number, y: number) => {
  canvasMoveTo(x, y);
  robotMoveTo(Math.round(x), Math.round(y));
};

export const lineTo = (x: number, y: number) => {
  canvasLineTo(x, y);
  robotLineTo(Math.round(x), Math.round(y));
};

export const dot = (x: number, y: number) => {
  canvasDot(x, y);
  robotDot(Math.round(x), Math.round(y));
};

export const finish = () => {
  canvasFinish();
};
