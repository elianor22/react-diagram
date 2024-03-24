import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const AppFlowContext = createContext(null);

const AppFlowProvider = ({
  children,
  initialShapes,
  initialEdges,
  initialNodes,
}) => {
  const [state, setState] = useState({
    initialEdges: initialEdges,
    initialNodes: initialNodes,
    initialShapes: initialShapes,
  });

  return (
    <AppFlowContext.Provider value={[state, setState]}>
      {children}
    </AppFlowContext.Provider>
  );
};

AppFlowProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initialShapes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ),
  initialEdges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  initialNodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
};
export default AppFlowProvider;
