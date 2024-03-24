import PropTypes from "prop-types";
import { NodeToolbar, useNodes, useNodeId, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import { Position } from "../utils/position";
import { useCallback, useState } from "react";
import Modal from "@core/Component/Modal/Modal";

const Toolbar = ({ selected }) => {
  const nodeId = useNodeId();
  const nodes = useNodes();

  const [open, setOpen] = useState(false);

  const flow = useReactFlow();
  const changeNode = useCallback((type) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, type: type }; // Change the type of the selected node
      }
      return node;
    });
    flow.setNodes(updatedNodes);
  }, []);

  return (
    <>
      <NodeToolbar
        position={Position.Top}
        isVisible={selected}
        style={{
          width: "100px",
        }}
      >
        <button onClick={() => setOpen(true)}>Change Shape</button>
        <Modal
          open={open}
          handleClose={() => setOpen(false)}
          onChange={(e) => changeNode(e)}
        />
      </NodeToolbar>
    </>
  );
};

export default Toolbar;

Toolbar.propTypes = {
  selected: PropTypes.bool,
};
