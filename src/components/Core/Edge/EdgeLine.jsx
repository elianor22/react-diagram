import {
  EdgeLabelRenderer,
  BaseEdge,
  getSmoothStepPath,
  useReactFlow,
  Panel,
} from "reactflow";
import PropTypes from "prop-types";
import { useState } from "react";

const EdgeLine = ({ id, data, selected, ...props }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { setEdges } = useReactFlow();
  const [newLabel, setNewLabel] = useState(data.label); // State untuk menyimpan label baru

  const handleChangeLabel = (e) => {
    setNewLabel(e.target.value);
  };
  const handleSaveLabel = () => {
    setEdges((eds) =>
      eds.map((edg) => {
        if (edg.id === id) {
          return {
            ...edg,
            data: {
              label: newLabel,
            },
          };
        }
        return edg;
      })
    );
  };
  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            fontWeight: 700,
          }}
          className="nodrag nopan"
        >
          {selected ? (
            <>
              <Panel
                style={{
                  margin: 0,
                }}
              >
                <input
                  value={newLabel} // Menggunakan nilai label baru dari state
                  onChange={handleChangeLabel}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      e.preventDefault();
                      handleSaveLabel();
                    }

                    handleChangeLabel(e);
                  }}
                  onBlur={handleSaveLabel}
                />
              </Panel>
            </>
          ) : (
            data.label
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
EdgeLine.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  data: PropTypes.object,
  selected: PropTypes.bool,
};
export default EdgeLine;
