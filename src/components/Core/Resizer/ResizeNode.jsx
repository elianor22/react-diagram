import { NodeResizer } from "reactflow";
import PropTypes from "prop-types";

import styles from "./style.module.css";
import { memo } from "react";

const ResizeNode = ({ selected, children, type }) => {
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
          minWidth={type === "circle" ? 66 : 180}
          minHeight={type === "circle" ? 66 : 66}
          handleStyle={{
            backgroundColor: "purple",
          }}
        />
        {children}
      </div>
    </>
  );
};

ResizeNode.propTypes = {
  children: PropTypes.element,
  selected: PropTypes.bool,
  type: PropTypes.string,
};

const ResizeableNode = memo(ResizeNode);
export default ResizeableNode;
