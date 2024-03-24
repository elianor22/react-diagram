import PropTypes from "prop-types";
import { Handle } from "reactflow";
import { Position } from "../utils/position";

const Edge = ({ children }) => {
  return (
    <>
      {children}
      {Object.keys(Position).map((edge) => {
        return (
          <Handle
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

Edge.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Edge;
