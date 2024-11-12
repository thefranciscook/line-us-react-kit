# line-us-react-kit
React + Node app for controlling your Line-us robot drawing arm:

1. Write commands in Typescript
2. Preview the output in the browser
3. Click the button and your Line-us will draw it!

## About Line-us

> Line-us is an internet connected robot drawing arm. It's small, portable and draws with a nice wobbly line using a real pen on paper.

[Line-us official website](https://www.line-us.com/)

## Quick start

1. Clone this repository
2. Run ```npm install```
3. In the root directory (one level up from client or server) run ```npm start```
4. The web client will automatically open: http://localhost:3000

## Creating drawings

To create new drawing:
1. Add a new NEWDRAWING.ts file to the client/src/drawings/ folder
2. In the new .ts file add imports for the drawing commands available:
```
import { moveTo, lineTo, dot, finish } from '../lib/drawingCommands'
import drawPolygon from '../lib/drawPolygon';
```
3. Export a function using the drawing commands to plot a picture. Example:
```
export const example = () => {
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
```
4. In clients/src/drawings/drawings.ts add the new drawing to the list:
```
import { example } from "./originalExample";

export const drawings :  { [key: string]: () => void } = {
    'example': example,
  };
```
5. In the web client select the new drawing from the drop down
6. Hit the "Line-us Go" button
7. Your drawing will be:
    - previewed in the browser, and 
    - the Line-us will plot your drawing in parallel (it has to be on the same local network as your computer)

## Attribution

This project is a React port of [line-us-js-kit](https://github.com/funwithtriangles/line-us-js-kit), originally created by [Alex Kempton](https://github.com/funwithtriangles).

The original project is from 2018, so many libraries has been updated.

I also added a few requested (and unrequested) features from the original repository:
- animated lines
- optional Line-us coordinate system visibility
- support for multiple drawings


