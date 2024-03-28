import {
  EdgeLabelRenderer,
  BaseEdge,
  getSmoothStepPath,
  useReactFlow,
  Panel,
} from "reactflow";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const diamondMsg = ["YES", "NO"];

const EdgeLine = ({ id, data, selected, ...props }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { markerEnd } = props;
  const { setEdges } = useReactFlow();
  const [newLabel, setNewLabel] = useState(data.label);
  const [isError, setIsError] = useState(false);

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
              ...data,
              label: newLabel,
            },
          };
        }
        return edg;
      })
    );
  };

  useEffect(() => {
    if (newLabel) {
      if (!diamondMsg.includes(newLabel.toUpperCase())) {
        setIsError(true);
      }
    }
    return () => {
      setIsError(false);
    };
  }, [newLabel]);
  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
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
                  transform: "translate(-50%,-50%)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
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
                  {isError && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#d62626",
                      }}
                    >
                      Only &ldquo;yes&ldquo; or &ldquo;No&ldquo;
                    </span>
                  )}
                </div>
              </Panel>
            </>
          ) : (
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span className="label_line">{data.label}</span>
              {!diamondMsg.includes(newLabel.toUpperCase()) && (
                <span
                  style={{
                    fontSize: "10px",
                    color: "#d62626",
                    position: "absolute",
                    bottom: -10,
                    minWidth: "94px",
                    transform: "translateX(-50%)",
                  }}
                >
                  Only &ldquo;yes&ldquo; or &ldquo;No&ldquo;
                </span>
              )}
            </div>
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
  markerEnd: PropTypes.string,
};
export default EdgeLine;
