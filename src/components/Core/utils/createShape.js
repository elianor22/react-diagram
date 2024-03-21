import { edgesTypes } from "./edgeTypes";

const shapeTypes = {
  ractangle: "ractangle",
  circle: "circle",
};
const shapeSmallTypes = [shapeTypes.circle, "plus"];

export const createShape = (lastId, shapeType, position) => {
  const shape = edgesTypes[shapeType];
  let id = Number(lastId);
  const newId = () => `${id + 1}`;

  // console.log(id);
  if (!shape) return;

  if (shapeSmallTypes.includes(shape)) {
    return {
      id: newId(),
      type: shape,
      position,
      data: {
        label: shapeTypes[shape],
      },
      style: { width: 66, height: 66 },
    };
  } else {
    return {
      id: newId(),
      type: shape,
      position,
      data: {
        label: shapeTypes[shape],
      },
    };
  }
};
