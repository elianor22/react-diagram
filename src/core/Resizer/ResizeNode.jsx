import { NodeResizer } from "reactflow";
import PropTypes from "prop-types";

import styles from "./style.module.css";
import { memo, useMemo } from "react";

const ResizeNode = ({
  selected,
  children,
  type,
  onResizeEnd,
  minHeight,
  minWidth,
  style,
  shape,
  onResize,
  handleSizes,
}) => {
  const sizes = useMemo(
    () => ({
      width: handleSizes.width,
      height: handleSizes.height,
    }),
    [handleSizes.width, handleSizes.height]
  );

  return (
    <>
      <div
        className={styles.node}
        style={{
          borderRadius: type == "circle" ? "100%" : "0px",
          backgroundImage: `url("${shape}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${sizes.width}px ${sizes.height}px`,
          height: sizes.height + "px",
          border: "unset",
          backgroundColor:'transparent'
        }}
      >
        <NodeResizer
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
          handleStyle={{
            ...style,
          }}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        />
        {children}
      </div>
    </>
  );
};

ResizeNode.defaultProps = {
  minWidth: 180,
  minHeight: 90,
};

ResizeNode.propTypes = {
  children: PropTypes.element,
  selected: PropTypes.bool,
  type: PropTypes.string,
  onResizeEnd: PropTypes.func,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  style: PropTypes.object,
  handleSizes: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onResize: PropTypes.func,
  shape: PropTypes.string,
};

const ResizeableNode = memo(ResizeNode);
export default ResizeableNode;
