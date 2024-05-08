import { useCallback, useRef } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  EdgeText,
  Panel,
  useReactFlow,
  updateEdge,
} from "reactflow";
import PropTypes from "prop-types";

import { createShape } from "@core/utils/createShape";
import { getLastNodeId } from "@core/utils/getLastNodeId";
import EdgeLine from "@core/Edge/EdgeLine";
import { defaultMarker } from "@core/utils/defaultMarker";
import Menu from "@core/Component/Panel/Menu/Menu";
import { Circle, Rectangle } from "@core/Component";

import "reactflow/dist/style.css";
import "../styles/styles.css";
import { AppFlowProvider } from "@core/provider";
import Square from "@core/Component/Shapes/Square/Square";
import RoundedRectangle from "@core/Component/Shapes/RoundedRectangle/RoundedRectangle";
import { useAppFlow } from "@core/provider/useAppFlow";
import Rounded from "@core/Component/Shapes/Rounded/Rounded";
import { defaultShapes } from "@core/constants/defaultShape";
import DownloadDiagram from "@core/Component/DownloadDiagram/DownloadDiagram";

const nodeTypes = {
  rectangle: Rectangle,
  circle: Circle,
  square: Square,
  "rounded-rectangle": RoundedRectangle,
  rounded: Rounded,
};

const edgeTypes = {
  line: EdgeLine,
};

// eslint-disable-next-line react/prop-types
const App = ({ onClickSave }) => {
  const { getNodes, getEdges } = useAppFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(getNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(getEdges());
  const { screenToFlowPosition, getNode } = useReactFlow();
  const edgeUpdateSuccessful = useRef(true);

  const onConnect = useCallback(
    (params) => {
      const { source, target, sourceHandle, targetHandle } = params;
      const sourceId = sourceHandle[0].toLowerCase();
      const targetId = targetHandle[0].toLowerCase();
      const nodeSource = getNode(source);
      const nodeTarget = getNode(target);

      console.log(nodeSource);
      const id = `${sourceId}${source}-${targetId}${target}`;
      setEdges((els) =>
        addEdge(
          {
            ...params,
            id,
            data: {
              label: nodeSource.data.shapeId === "diamond" ? "yes" : "",
              source: {
                id: nodeSource.id,
                shapeId: nodeSource.data.shapeId,
                label: nodeSource.data.label,
              },
              target: {
                id: nodeTarget.id,
                shapeId: nodeTarget.data.shapeId,
                label: nodeTarget.data.label,
              },
              type: "next",
            },
            type: nodeSource.data.shapeId === "diamond" ? "line" : "smoothstep",
            ...defaultMarker,
          },
          els
        )
      );
    },
    [getNode, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const lastId = getLastNodeId(nodes);
      const dataShape = event.dataTransfer.getData("application/reactflow");

      const parseDataShape = JSON.parse(dataShape);

      if (typeof parseDataShape.type === "undefined" || !parseDataShape.type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = createShape(lastId, parseDataShape, position);

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, screenToFlowPosition, setNodes]
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) => {
      console.log(newConnection);
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onEdgeUpdateEnd = useCallback(
    (_, edge) => {
      if (!edgeUpdateSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeUpdateSuccessful.current = true;
    },
    [setEdges]
  );

  const onClickSaveDiagram = () => {
    onClickSave({
      nodes,
      edges,
    });
  };

  return (
    <div className="app__flow" style={{ width: "100vw", height: "100vh" }}>
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
        deleteKeyCode="Delete"
      >
        <Panel>
          <Menu />
        </Panel>
        <Panel position="top-center">
          <p
            style={{
              margin: 0,
              marginRight: 2,
            }}
          >
            This Project is Beta version
            <br />
            <span>big features for the next update!</span>
          </p>
        </Panel>
        <Panel
          position="top-right"
          style={{
            width: 200,
            display: "flex",
            gap: 10,
          }}
        >
          <DownloadDiagram />
          <button onClick={onClickSaveDiagram}>save</button>
        </Panel>
        <Controls />
        <MiniMap />
        <EdgeText />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

const Application = ({
  initialEdges,
  initialNodes,
  initialShapes,
  onClickSave,
}) => {
  const shapes = [...defaultShapes, ...initialShapes];
  return (
    <AppFlowProvider
      initialShapes={shapes}
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    >
      <ReactFlowProvider>
        <App
          initialEdges={initialEdges}
          initialNodes={initialNodes}
          onClickSave={onClickSave}
        />
      </ReactFlowProvider>
    </AppFlowProvider>
  );
};
Application.propTypes = {
  initialShapes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  initialEdges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  initialNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  onClickSave: PropTypes.func,
};
export default Application;
