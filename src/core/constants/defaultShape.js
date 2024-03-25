import Start from "@core/assets/svgs/start.svg";
import Rectangle from "@core/assets/svgs/rectangle.svg";
import Circle from "@core/assets/svgs/circle.svg";
import Diamond from "@core/assets/svgs/diamond.svg";
import Plus from "@core/assets/svgs/plus.svg";
import Cross from "@core/assets/svgs/cross.svg";
import End from "@core/assets/svgs/end.svg";
import Time from "@core/assets/svgs/time.svg";
import Square from "@core/assets/svgs/square.svg";
import RoundedRectangle from "@core/assets/svgs/rounded_rectangle.svg";

export const defaultShapes = [
  {
    id: "rectangle",
    type: "rectangle",
    label: "Rectangle",
    image: Rectangle,
  },
  {
    id: "circle",
    type: "circle",
    label: "Circle",
    image: Circle,
  },
  {
    id: "square",
    type: "square",
    label: "Square",
    image: Square,
  },
  {
    id: "rounded-rectangle",
    type: "rounded-rectangle",
    label: "Rounded Rectangle",
    image: RoundedRectangle,
  },
  {
    id: "start",
    type: "rounded",
    label: "Start",
    image: Start,
    edgesPosition: ["bottom"],
  },
  {
    id: "end",
    type: "rounded",
    label: "End",
    image: End,
    edgesPosition: ["top"],
  },
  {
    id: "diamond",
    type: "square",
    label: "Diamond",
    image: Diamond,
  },
];
