// import { useAppFlow } from "@core/provider/useAppFlow";
import { MdPlayArrow } from "react-icons/md";
import { useState } from "react";
import { menuPanels } from "@core/constants/menuPanel";

const Menu = () => {
  // const { getShapes } = useAppFlow();
  const [openShape, setOpenShape] = useState(null);
  // const shapes = getShapes();

  // const onDragStart = (event, dataShape) => {
  //   const shapeString = JSON.stringify(dataShape);
  //   event.dataTransfer.setData("application/reactflow", shapeString);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  const handleOpen = (label) => {
    if (openShape === label) {
      setOpenShape(null);
    } else {
      setOpenShape(label);
    }
  };
  return (
    <aside className="menu__panel__container">
      {/* {shapes.map((shape) => (
        <MenuItem
          key={shape.id}
          shape={shape}
          onDragStart={(event) =>
            onDragStart(event, {
              id: shape.id,
              type: shape.type,
              label: shape.label,
              edgesPosition: shape.edgesPosition,
            })
          }
        />
      ))} */}
      {menuPanels.map((item) => (
        <div
          key={item.key}
          className={[
            "menu__item",
            openShape === item.key ? "active" : "",
          ].join(" ")}
          onClick={() => handleOpen(item.key)}
        >
          {item.isMore ? (
            <span className="arrow__thumb">
              <MdPlayArrow />
            </span>
          ) : undefined}
          {item.icon}
        </div>
      ))}

      {/* <div className="panel__shape"></div> */}
    </aside>
  );
};

export default Menu;
