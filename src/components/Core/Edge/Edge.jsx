import PropTypes from "prop-types";
import { Handle } from "reactflow";
import { Position } from "../utils/position";
import {
  positionEdges,
  positionEdgesToObj,
  stylePostitionEdges,
} from "../utils/edgePosition";

const Edge = ({ children }) => {
  const getPositionEdge = (positionEdge) => {
    switch (positionEdge[0]) {
      case "t":
        return {
          position: Position.Top,
          style: stylePostitionEdges[positionEdgesToObj[positionEdge]],
        };
      case "l":
        return {
          position: Position.Left,
          style: stylePostitionEdges[positionEdgesToObj[positionEdge]],
        };
      case "r":
        return {
          position: Position.Right,
          style: stylePostitionEdges[positionEdgesToObj[positionEdge]],
        };

      case "b":
        return {
          position: Position.Bottom,
          style: stylePostitionEdges[positionEdgesToObj[positionEdge]],
        };

      default:
        return {
          position: null,
          style: null,
        };
    }
  };

  return (
    <>
      {children}
      {positionEdges.map((edge) => {
        const getPosition = getPositionEdge(edge);

        return (
          <Handle
            key={edge}
            id={edge}
            position={getPosition.position}
            type="source"
            style={{
              ...getPosition.style,
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
