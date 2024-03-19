import PropTypes from "prop-types";

const Modal = ({ open, handleClose, onChange }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            right: "-120px",
            border: "1px solid gray",
            backgroundColor: "#fff",
          }}
        >
          <button onClick={handleClose}>close</button>
          <div
            style={{
              color: "#000",
              marginTop: "1rem",
            }}
          >
            <button
              onClick={() => {
                onChange("circle");
              }}
            >
              Circle
            </button>
            <button
              onClick={() => {
                onChange("ractangle");
              }}
            >
              Ractangle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onChange: PropTypes.func,
};
export default Modal;
