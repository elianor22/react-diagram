import PropTypes from "prop-types";
import { Handle } from "reactflow";
import { Position } from "../utils/position";

const Edge = ({ edges, children }) => {
  const getEdges = () => {
    if (Array.isArray(edges)) {
      if (edges.includes("all")) {
        return Object.keys(Position);
      } else {
        const toUpper = edges.map((ed) => ed.charAt(0).toUpperCase() + ed.slice(1));
        return toUpper;
      }
    }
    else{
      throw new Error("edges must be an array")
    }
  };
  return (
    <>
      {children}
      {getEdges().map((edge) => {
        return (
          <Handle
            className="node__dot"
            key={edge}
            id={edge}
            position={Position[edge]}
            type="source"
            style={{
              backgroundColor: "#007eed",
            }}
          />
        );
      })}
    </>
  );
};
Edge.defaultProps = {
  edges: ["all"],
};
Edge.propTypes = {
  children: PropTypes.element.isRequired,
  edges: PropTypes.array,
};

export default Edge;
