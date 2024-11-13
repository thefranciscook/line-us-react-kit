let ctx: CanvasRenderingContext2D;
let animationQueue: (() => void)[] = [];
let isAnimating = false;

export const initializeCanvas = (canvas: HTMLCanvasElement) => {
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = 2000;
  canvas.height = 3200;
  ctx.lineWidth = 10;
  ctx.strokeStyle = "black";
  ctx.lineCap = "round"; // Makes the ends of lines rounded
  ctx.lineJoin = "round";
  ctx.beginPath();
};

export const clearCanvas = () => {
  if (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath(); // Reset the context state
  }
  animationQueue.length = 0;
  isAnimating = false;
};

const convertY = (y: number) => 1600 - y;

export const canvasMoveTo = (x: number, y: number) => {
  animationQueue.push(() => ctx.moveTo(x, convertY(y)));
  startAnimation();
};

export const canvasLineTo = (x: number, y: number) => {
  animationQueue.push(() => ctx.lineTo(x, convertY(y)));
  startAnimation();
};

export const canvasDot = (x: number, y: number) => {
  animationQueue.push(() => {
    ctx.moveTo(x, convertY(y));
    ctx.arc(x, convertY(y), 3, 0, 2 * Math.PI);
  });
  startAnimation();
};

export const canvasFinish = () => {
  animationQueue.push(() => ctx.stroke());
  startAnimation();
};

const startAnimation = () => {
  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(animate);
  }
};

const animate = () => {
  if (animationQueue.length > 0) {
    const drawStep = animationQueue.shift();
    if (drawStep) drawStep();
    ctx.stroke(); // Ensure the stroke is drawn after each step
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100); // Adjust the delay (in milliseconds) to control the speed
  } else {
    isAnimating = false;
  }
};