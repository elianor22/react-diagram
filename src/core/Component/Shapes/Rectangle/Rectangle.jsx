import PropTypes from "prop-types";
import { useReactFlow } from "reactflow";
import { useCallback, useState } from "react";
import Label from "@core/Component/Label/Label";
import DefaultComponent from "@core/Component/DefaultComponent/DefaultComponent";
import InputField from "@core/Component/Input/InputField";
import { getImageUrl } from "@core/utils/getUrlImage";
import { useAppFlow } from "@core/provider/useAppFlow";

const Rectangle = (rest) => {
  const { selected, data, id } = rest;

  const { setNodes } = useReactFlow();
  const { getShape } = useAppFlow();
  const shape = getShape(data.shapeId);
  const [clickEdit, setClickEdit] = useState(false);
  const [sizes, setSizes] = useState({
    width: 180,
    height: 90,
  });

  console.log(shape)
  const onResizeEnd = useCallback((_, sizes) => {
    const { width, x, y } = sizes;
    setNodes((nds) =>
      nds.map((nd) => {
        if (nd.id === id) {
          return {
            ...nd,
            position: {
              x,
              y,
            },
            style: {
              width,
              height: Math.floor(width / 2),
            },
          };
        }
        return nd;
      })
    );
  }, [id, setNodes]);


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
  const onResize = useCallback((_, sizes) => {
    setSizes({
      width: sizes.width,
      height: Math.floor(sizes.width / 2),
    });
  }, []);
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
        minHeight={90}
        minWidth={180}
        onResizeEnd={onResizeEnd}
        onResize={onResize}
        handleSizes={sizes}
        shape={getImageUrl(shape.image)}
      >
        <div
           style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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

Rectangle.propTypes = {
  selected: PropTypes.bool,
  data: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Rectangle;
