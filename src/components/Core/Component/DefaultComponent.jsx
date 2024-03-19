import ResizeableNode from "../../Core/Resizer/ResizeNode";
import PropTypes from "prop-types";
import Edge from "../Edge/Edge";
import Toolbar from "../Toolbar/Toolbar";

const DefaultComponent = ({
  children,
  selected,
  showToolbar,
  isResizeable,
  type,
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
            <ResizeableNode selected={selected} type={type}>
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
};

export default DefaultComponent;
