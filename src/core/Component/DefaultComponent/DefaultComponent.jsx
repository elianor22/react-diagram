import ResizeableNode from "../../Resizer/ResizeNode";
import PropTypes from "prop-types";
import Edge from "../../Edge/Edge";
import Toolbar from "../../Toolbar/Toolbar";

const DefaultComponent = ({
  children,
  selected,
  showToolbar,
  isResizeable,
  type,
  onResizeEnd,
  minHeight,
  minWidth,
  shape,
  onResize,
  handleSizes,
  edges,
}) => {
  return (
    <>
      {showToolbar && <Toolbar selected={selected} />}
      <Edge edges={edges}>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          {isResizeable && (
            <ResizeableNode
              selected={selected}
              type={type}
              onResizeEnd={onResizeEnd}
              minHeight={minHeight}
              minWidth={minWidth}
              shape={shape}
              onResize={onResize}
              handleSizes={handleSizes}
            >
              {children}
            </ResizeableNode>
          )}
        </div>
      </Edge>
    </>
  );
};

DefaultComponent.defaultProps = {
  showToolbar: true,
  isResizeable: true,
};
DefaultComponent.propTypes = {
  // id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  children: PropTypes.element.isRequired,
  showToolbar: PropTypes.bool,
  isResizeable: PropTypes.bool,
  type: PropTypes.string,
  onResizeEnd: PropTypes.func,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  handleSizes: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onResize: PropTypes.func,
  shape: PropTypes.string,
  edges: PropTypes.array,
  data: PropTypes.object,
};

export default DefaultComponent;
