import { nodesTypes } from "@core/utils/nodesTypes";
import PropTypes from "prop-types";

const MenuItem = ({ shape, onDragStart }) => {
  const getStyles = () => {
    switch (shape.type) {
      case "circle":
      case "square":
        return {
          ...(shape.type === "circle" && { borderRadius: "100%" }),
          width: "65px",
          height: "65px",
        };

      case nodesTypes.rectangle:
        return {
          width: "80px",
          height: "40px",
        };
      case nodesTypes.rounded:
        return {
          width: "80px",
          height: "40px",
          borderRadius: "100px",
          textAlign: "center",
        };
      case nodesTypes["rounded-rectangle"]:
        return {
          width: "80px",
          height: "40px",
          borderRadius: "4px",
          textAlign: "center",
        };
      default:
        return {
          width: "80px",
          height: "40px",
          textAlign: "center",
          // backgroundImage: `url(${shape.image})`,
        };
    }
  };
  return (
    <div onDragStart={onDragStart} draggable style={{}}>
      <div
        className="app__flow__node"
        style={{
          ...getStyles(),
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          position: "relative",
          backgroundImage: `url("${shape.image}")`,
        }}
      >
        {shape.label}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  shape: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default MenuItem;
