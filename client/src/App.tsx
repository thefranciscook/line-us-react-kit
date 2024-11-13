import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { initializeCanvas, canvasMoveTo, canvasLineTo, canvasDot, canvasFinish, clearCanvas } from './lib/canvas';
import { getItems } from './lib/commands';
import { originalExample } from './drawings/originalExample';
import { owlDrawing } from './drawings/owlDrawing';
import { drawings } from './drawings/drawings';

const socket = io('http://localhost:8081');

const DrawingApp: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [buttonText, setButtonText] = useState("Line-us Go!");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const [selectedDrawing, setSelectedDrawing] = useState<string>();

  const handleDrawingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDrawing(event.target.value);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, [canvasRef]);

  const handleChartToggle = () => {
    setIsChartVisible(!isChartVisible);
  }

  const handleClearCanvas = () => {
    clearCanvas();
  }

  const handleButtonClick = () => {

    clearCanvas();


    const items = getItems();
    console.log('Sending items:', items);
    socket.send(items);
    setButtonText("Sending...");

    const drawingFunction = drawings[selectedDrawing as string];
    if (drawingFunction) {
      drawingFunction();
    }

    setTimeout(() => {
      setButtonText("Line-us Go!");
    }, 8000);
  };

  return (
    <div
      className="flex items-center justify-center max-h-screen h-full min-h-screen"
    // style={{
    //   backgroundImage: `url(${process.env.PUBLIC_URL}/paper1.jpg)`,
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   backgroundPosition: 'center',
    // }}
    >

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/paper1.jpg)`,
        }}
      ></div>


      <div className="h-full max-h-screen relative">
        <img
          src={`${process.env.PUBLIC_URL}/chart.png`}
          className={`h-full max-h-screen w-auto ${isChartVisible ? "opacity-50" : "opacity-0"}`}
          alt="Chart"
        />
        <canvas
          ref={canvasRef}
          className=" w-[78%]  absolute top-[8%] left-[10%] "
        ></canvas>
      </div>

      <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 flex flex-col space-y-2 items-center">
        {
          // drawing selector
        }
        <select value={selectedDrawing} onChange={handleDrawingChange}>
            {Object.keys(drawings).map((drawingName) => (
              <option key={drawingName} value={drawingName}>
                {drawingName}
              </option>
            ))}
          </select>

          {
            // draw button
          }
        
        <button
          onClick={handleButtonClick}
          className="bg-slate-900 text-white px-4 py-2 rounded-md "
          disabled={!isConnected}
        >
          {buttonText}
        </button>

        {
          // clear button
        }
        <button
          onClick={handleClearCanvas}
          className="bg-slate-500 text-white px-4 py-2 rounded-md"
        >
          Clear
        </button>

        {
          // show chart checkbox
        }
        <div className="flex flex-row space-x-1">
          
          <input
            type="checkbox"
            id="chartToggle"
            name="chartToggle"
            checked={isChartVisible}
            onChange={handleChartToggle}
          ></input>
          <label htmlFor="chartToggle">Show Chart</label>
        </div>
      </div>




    </div>
  );
};

export default DrawingApp;