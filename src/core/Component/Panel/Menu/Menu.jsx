import { useAppFlow } from "@core/provider/useAppFlow";
import MenuItem from "./MenuItem";

const Menu = () => {
  const { getShapes } = useAppFlow();
  const shapes = getShapes();

  const onDragStart = (event, dataShape) => {
    const shapeString = JSON.stringify(dataShape);
    event.dataTransfer.setData("application/reactflow", shapeString);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">Just Drag n Drop</div>
      {shapes.map((shape) => (
        <MenuItem
          key={shape.id}
          shape={shape}
          onDragStart={(event) =>
            onDragStart(event, {
              id: shape.id,
              type: shape.type,
              label: shape.label,
            })
          }
        />
      ))}
    </aside>
  );
};

export default Menu;
