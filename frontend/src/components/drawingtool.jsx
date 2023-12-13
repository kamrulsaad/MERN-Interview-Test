import { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

const gen = rough.generator();

function createElement(x1, y1, x2, y2, options) {
  const shapeType = options.shapeType;
  let roughEle, midX, radius;
  switch (shapeType) {
    case "line":
      roughEle = gen.line(x1, y1, x2, y2);
      break;
    case "rectangle":
      roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      break;
    case "triangle":
      midX = (x1 + x2) / 2;
      roughEle = gen.polygon(
        [
          [x1, y1],
          [x2, y1],
          [midX, y2],
        ],
        options
      );
      break;
    case "circle":
      radius = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      roughEle = gen.circle(x1 + radius / 2, y1 + radius / 2, radius, options);
      break;
    default:
      throw new Error(`Unsupported shape type: ${shapeType}`);
  }
  return { x1, y1, x2, y2, shapeType, options, roughEle };
}

const DrawingTool = () => {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState("line");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rc = rough.canvas(canvas);

    elements.forEach((element) => {
      rc.draw(element.roughEle);
    });
  }, [elements]);

  const startDrawing = (event) => {
    setDrawing(true);
    const { clientX, clientY } = event;

    setElements((state) => [
      ...state,
      createElement(clientX, clientY, clientX, clientY, {
        shapeType: selectedTool,
      }),
    ]);
  };

  const finishDrawing = () => {
    setDrawing(false);
  };

  const draw = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;

    const { x1, y1, shapeType } = elements[index];
    const updatedEle = createElement(x1, y1, clientX, clientY, { shapeType });
    setElements((state) => [...state.slice(0, index), updatedEle]);
  };

  const handleToolChange = (tool) => setSelectedTool(tool);

  return (
    <>
      <div className="d-flex p-4 flex-wrap justify-content-between align-items-center">
        <div className="d-flex gap-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleToolChange("line")}
          >
            Line
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleToolChange("rectangle")}
          >
            Rectangle
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleToolChange("triangle")}
          >
            Triangle
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleToolChange("circle")}
          >
            Circle
          </button>
        </div>

        <div className="d-flex gap-1">
          <button type="button" className="btn btn-secondary">
            Go Back
          </button>
          <button type="button" className="btn btn-success float-right">
            Save
          </button>
        </div>
      </div>

      <div className="w-100">
        <canvas
          id="canvas"
          className="border border-2 mx-auto d-block"
          width={window.innerWidth - 50}
          height={window.innerHeight - 150}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
        >
          Canvas
        </canvas>
      </div>
    </>
  );
};

export default DrawingTool;
