import { useContext } from "react";
import { AppFlowContext } from "./AppFlowProvider";

export const useAppFlow = () => {
  const [state, setState] = useContext(AppFlowContext);

  const getShapes = () => state.initialShapes;
  const getNodes = () => state.initialNodes;
  const getEdges = () => state.initialEdges;


  /**
   *
   * @param {Object} initialNodes
   */
  const setInitialNodes = (initialNodes) => {
    setState((prev) => ({ ...prev, initialNodes }));
  };

  /**
   *
   * @param {Object} initialNodes
   */
  const setInitialEdges = (initialEdges) => {
    setState((prev) => ({ ...prev, initialEdges }));
  };

  const getShape = (id) => {
    const shape = getShapes();
    const findShape = shape.find((item) => item.id === id);
    if (findShape) {
      return findShape;
    }
    return undefined;
  };

  return {
    getShape,
    getShapes,
    getNodes,
    getEdges,
    setInitialNodes,
    setInitialEdges,
  };
};
