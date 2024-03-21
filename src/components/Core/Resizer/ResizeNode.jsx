import { NodeResizer } from "reactflow";
import PropTypes from "prop-types";

import styles from "./style.module.css";
import { memo } from "react";

const ResizeNode = ({
  selected,
  children,
  type,
  onResizeEnd,
  minHeight,
  minWidth,
  style,
}) => {
  return (
    <>
      <div
        className={styles.node}
        style={{
          borderRadius: type == "circle" ? "100%" : "0px",
        }}
      >
        <NodeResizer
          isVisible={selected}
          minWidth={minWidth}
          minHeight={minHeight}
          handleStyle={{
            ...style,
          }}
          onResizeEnd={onResizeEnd}
        />
        {children}
      </div>
    </>
  );
};

ResizeNode.defaultProps = {
  minWidth: 180,
  minHeight: 66,
};

ResizeNode.propTypes = {
  children: PropTypes.element,
  selected: PropTypes.bool,
  type: PropTypes.string,
  onResizeEnd: PropTypes.func,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
};

const ResizeableNode = memo(ResizeNode);
export default ResizeableNode;
