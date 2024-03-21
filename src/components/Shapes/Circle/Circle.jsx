import PropTypes from "prop-types";
import DefaultComponent from "../../core/Component/DefaultComponent";
import { useReactFlow } from "reactflow";
import { useCallback } from "react";
// import "./style.css";

const Circle = ({ selected, id }) => {
  const { setNodes } = useReactFlow();

  const onResizeEnd = useCallback((_, sizes) => {
    const { width, x, y } = sizes;
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === id) {
          return {
            ...nd,
            position: {
              x,
              y,
            },
            style: {
              width,
              height: width,
            },
          };
        }
        return nd;
      })
    );
  }, []);
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "100%",
      }}
    >
      <DefaultComponent
        selected={selected}
        type="circle"
        showToolbar={false}
        isResizeable={true}
        minWidth={66}
        minHeight={66}
        onResizeEnd={onResizeEnd}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          circle
        </div>
      </DefaultComponent>
    </div>
  );
};

Circle.propTypes = {
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Circle;
