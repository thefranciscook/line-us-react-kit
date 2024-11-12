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

## Attribution

This project is a React port of [line-us-js-kit](https://github.com/funwithtriangles/line-us-js-kit), originally created by [Alex Kempton](https://github.com/funwithtriangles).

The original project is from 2018, so many libraries has been updated.

I also added a few requested (and unrequested) features from the original repository:
- animated lines
- optional Line-us coordinate system visibility
- support for multiple drawings


