/*
This file defines the robot's movement functions (moveTo, lineTo, and dot) and an array to store the commands.
*/

export const items: string[] = [];

let prev: [number, number] = [0, 0];

export const robotMoveTo = (x: number, y: number) => {
  items.push(`G01 X${prev[0]} Y${prev[1]} Z1000`);
  items.push(`G01 X${x} Y${y} Z1000`);
  prev = [x, y];
};

export const robotLineTo = (x: number, y: number) => {
  items.push(`G01 X${prev[0]} Y${prev[1]} Z0`);
  items.push(`G01 X${x} Y${y} Z0`);
  prev = [x, y];
};

export const robotDot = (x: number, y: number) => {
  items.push(`G01 X${prev[0]} Y${prev[1]} Z1000`);
  items.push(`G01 X${x} Y${y} Z1000`);
  items.push(`G01 X${x} Y${y} Z0`);
  items.push(`G01 X${x} Y${y} Z1000`);
  prev = [x, y];
};

export const getItems = () => items;
