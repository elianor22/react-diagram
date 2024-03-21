import ResizeableNode from "../../core/Resizer/ResizeNode";
import PropTypes from "prop-types";
import Edge from "../Edge/Edge";
import Toolbar from "../Toolbar/Toolbar";

const DefaultComponent = ({
  children,
  selected,
  showToolbar,
  isResizeable,
  type,
  onResizeEnd,
  minHeight,
  minWidth,
}) => {
  return (
    <>
      {showToolbar && <Toolbar selected={selected} />}
      <Edge>
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
              minHeight={minWidth}
              minWidth={minHeight}
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
  selected: PropTypes.bool,
  children: PropTypes.element.isRequired,
  showToolbar: PropTypes.bool,
  isResizeable: PropTypes.bool,
  type: PropTypes.string,
  onResizeEnd: PropTypes.func,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
};

export default DefaultComponent;
