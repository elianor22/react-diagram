import { nodesTypes } from "./nodesTypes";

const shapeSmallTypes = ["circle", "square"];

export const createShape = (lastId, shapeData, position) => {
  const shape = nodesTypes[shapeData.type];
  let id = Number(lastId);
  const newId = () => `${id + 1}`;

  if (!shape) return;

  if (shapeSmallTypes.includes(shape)) {
    return {
      id: newId(),
      type: shape,
      position,
      data: {
        shapeId: shapeData.id,
        label: shapeData.label,
      },
      style: { width: 100, height: 100 },
    }; 
  } else {
    return {
      id: newId(),
      type: shape,
      position,
      data: {
        shapeId: shapeData.id,
        label: shapeData.label,
      },
      style: { width: 180, height: 90 },
    };
  }
};
