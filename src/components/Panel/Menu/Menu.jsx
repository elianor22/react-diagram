import { edgesTypes } from "../../core/utils/edgeTypes";

const Menu = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        width: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="description">Just Drag n Drop</div>
      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, edgesTypes.ractangle)}
        draggable
      >
        Ractangle
      </div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, edgesTypes.circle)}
        draggable
        style={{ width: "66px", height: "66px", borderRadius: "100%" }}
      >
        Circle
      </div>
    </aside>
  );
};

export default Menu;
