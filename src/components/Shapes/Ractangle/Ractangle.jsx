import PropTypes from "prop-types";
import DefaultComponent from "../../core/Component/DefaultComponent";
import { useReactFlow } from "reactflow";
import InputField from "../../Form/Input/InputField";
import { useState } from "react";
import Label from "../../Label/Label";

const Ractangle = (rest) => {
  const { selected, data, id } = rest;

  const { setNodes } = useReactFlow();

  const [clickEdit, setClickEdit] = useState(false);

  const updateChange = (e) => {
    const val = e.target.value;
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: val,
            },
          };
        }

        return node;
      })
    );
  };
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        zIndex: 99,
      }}
    >
      <DefaultComponent
        selected={selected}
        data={data}
        id={id}
        showToolbar={false}
      >
        <div
          style={{
            width: "100%",
            display: "block",
            height: "100%",
          }}
        >
          {!clickEdit ? (
            <div
              onClick={() => {
                setClickEdit(true);
              }}
              style={{
                height: "100%",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <Label label={data.label} />
            </div>
          ) : (
            <>
              <InputField
                onChange={updateChange}
                value={data.label}
                onClose={() => {
                  setClickEdit(false);
                }}
              />
            </>
          )}
        </div>
      </DefaultComponent>
    </div>
  );
};

Ractangle.propTypes = {
  selected: PropTypes.bool,
  data: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Ractangle;
