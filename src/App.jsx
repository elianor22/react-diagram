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
  const onClickSave = (payload) => {
    const { edges, nodes } = payload;
    const newPaylaod = edges.map((edge) => {
      const newEdges = {};
      nodes.forEach((node) => {
        if (node.id === edge.data.source.id) {
          const nodeTarget = nodes.find(
            (nodeTarget) => nodeTarget.id === edge.data.target.id
          );
          Object.assign(newEdges, {
            currRole: node.data.label,
            roleNext: nodeTarget.data.label,
            roleReject: nodeTarget.data.label,
            roleType: edge.data.label === "no" ? "no" : edge.data.type,
          });
        }
      });
      return newEdges;
    });

    console.log(newPaylaod);
  };

  return (
    <>
      <Application
        initialEdges={initialEdges}
        initialNodes={initialNodes}
        initialShapes={initialShapes}
        onClickSave={onClickSave}
      />
    </>
  );
}

export default App;
