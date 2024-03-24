// import './App.css'

import Application from "@core/App/Flow";
import { initialShapes } from "./constants/initialShapes";
const initialNodes = [
  // {
  //   id: "1",
  //   position: { x: 0, y: 0 },
  //   data: { label: "1" },
  //   label: "custom",
  // },
  // {
  //   id: "2",
  //   position: { x: 300, y: 0 },
  //   data: { label: "Node 2", resizable: true },
  //   type: "rectangle",
  //   style: { width: 180, height: 66 },
  // },
  // {
  //   id: "3",
  //   position: { x: 300, y: 100 },
  //   data: { label: "Node 2", resizable: true },
  //   type: "circle",
  //   style: { width: 66, height: 66 },
  // },
  // { id: "4", position: { x: 0, y: 200 }, data: { label: "4" } },
];
const initialEdges = [];
function App() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          right: 0,
        }}
      >
        <p
          style={{
            margin: 0,
            marginRight: 2,
          }}
        >
          This Project is alpha version
          <br />
          <span>big features for the next update!</span>
        </p>
      </div>
      <Application
        initialEdges={initialEdges}
        initialNodes={initialNodes}
        initialShapes={initialShapes}
      />
    </>
  );
}

export default App;
