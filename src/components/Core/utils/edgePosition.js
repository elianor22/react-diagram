export const positionEdges = [
  "t-1",
  "b-1",
  "r-1",
  "l-1",
  "t-2",
  "b-2",
  "r-2",
  "l-2",
  "t-3",
  "b-3",
  "r-3",
  "l-3",
];

export const positionEdgesToObj = {};

positionEdges.forEach((ed) => {
  positionEdgesToObj[ed] = ed;
});

export const stylePostitionEdges = {
  [positionEdgesToObj["l-1"]]: { top: 8 },
  [positionEdgesToObj["l-2"]]: {},
  [positionEdgesToObj["l-2"]]: { bottom: 0, top: "auto" },
  [positionEdgesToObj["t-1"]]: { left: 12 },
  [positionEdgesToObj["t-2"]]: {},
  [positionEdgesToObj["t-3"]]: { right: 4, left: "auto" },
  [positionEdgesToObj["r-1"]]: { top: 8 },
  [positionEdgesToObj["r-2"]]: { },
  [positionEdgesToObj["r-2"]]: { bottom: 0, top: "auto" },
  [positionEdgesToObj["b-1"]]: { left: 12 },
  [positionEdgesToObj["b-2"]]: {},
  [positionEdgesToObj["b-3"]]: { right: 4, left: "auto" },
};
