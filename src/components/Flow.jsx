import { useCallback, useRef, useState } from "react";
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

const nodeTypes = {
  ractangle: Ractangle,
  circle: Circle,
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    label: "test",
    // type: "smoothstep",
  },
  {
    id: "2",
    position: { x: 300, y: 0 },
    data: { label: "Node 2", rotatable: true, resizable: true },
    type: "ractangle",
    style: { width: 180, height: 66 },
  },
  {
    id: "3",
    position: { x: 300, y: 100 },
    data: { label: "Node 2", rotatable: true, resizable: true },
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
  const [connectionNode, setConnectionNode] = useState({
    id: "",
    handleId: "",
  });
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      setConnectionNode(null);
      setEdges((els) =>
        addEdge(
          {
            ...params,
            type: "smoothstep",
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
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnectStart = useCallback((_, { handleId, nodeId }) => {
    setConnectionNode({
      id: nodeId,
      handleId: handleId,
    });
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (connectionNode === null) return;
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
          type:'ractangle'
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectionNode.id,
            target: id,
            sourceHandle: connectionNode.handleId,
          })
        );
      }
    },
    [connectionNode, screenToFlowPosition, setEdges, setNodes]
  );

  const handleAddEdge = (type) => {
    const id = getId();
    const newNode = {
      id,
      position: screenToFlowPosition({
        x: 200,
        y: 100,
      }),
      data: { label: `${type} ${id}` },
      type: type,
      origin: [0.5, 0.0],
      ...(type === "circle" && {
        style: { width: 66, height: 66 },
      }),
    };

    setNodes((nds) => nds.concat(newNode));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{
          minZoom: 1,
          maxZoom: 1,
        }}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        connectionMode="loose"

        // connectionLineComponent={ConnectionLine}
      >
        <Panel
          style={{
            backgroundColor: "#fff",
            color: "black",
            height: "calc(100vh - 200px)",
            border: "1px solid purple",
          }}
        >
          Shapes
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button onClick={() => handleAddEdge("ractangle")}>
              Ractangle
            </button>
            <button onClick={() => handleAddEdge("circle")}>Circle</button>
          </div>
        </Panel>
        <Controls />
        <MiniMap
          style={{
            height: 100,
            width: 100,
          }}
        />
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
