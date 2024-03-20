import { useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  ReactFlowProvider,
  EdgeText,
  Panel,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import Ractangle from "./Shapes/Ractangle/Ractangle";
import { defaultMarker } from "./Core/utils/defaultMarker";
import Circle from "./Shapes/Circle/Circle";
import EdgeLine from "./Core/Edge/EdgeLine";
import Menu from "./Panel/Menu/Menu";

const nodeTypes = {
  ractangle: Ractangle,
  circle: Circle,
};
const edgeTypes = {
  line: EdgeLine,
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    label: "custom",
    // type: "line",
  },
  {
    id: "2",
    position: { x: 300, y: 0 },
    data: { label: "Node 2", resizable: true },
    type: "ractangle",
    style: { width: 180, height: 66 },
  },
  {
    id: "3",
    position: { x: 300, y: 100 },
    data: { label: "Node 2", resizable: true },
    type: "circle",
    style: { width: 66, height: 66 },
  },
  { id: "4", position: { x: 0, y: 200 }, data: { label: "4" } },
];
const initialEdges = [];

let id = 1;
const getId = () => `e-${id++}`;
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const edgeUpdateSuccessful = useRef(true);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;
      setEdges((els) =>
        addEdge(
          {
            ...params,
            id: `${source}-${target}`,
            data: {
              label: "",
            },
            type: "line",
            ...defaultMarker,
          },
          els
        )
      );
    },
    [setEdges]
  );

  // const edgeUpdateSuccessful = useRef(true);
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    console.log(newConnection);
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );
  return (
    <div className="dndflow" style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        fitViewOptions={{
          minZoom: 1,
          maxZoom: 1,
        }}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        connectionMode="loose"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Panel>
          <Menu />
        </Panel>
        <Controls />
        <MiniMap />
        <EdgeText />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

const Application = () => {
  return (
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  );
};

export default Application;
