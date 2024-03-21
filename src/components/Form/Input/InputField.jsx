import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useLayoutEffect, useRef, useState } from "react";

const InputField = ({ type, value, onChange, onBlur, onClick, onClose }) => {
  const textRef = useRef();
  const [height, setHeight] = useState(30);

  useLayoutEffect(() => {
    if (textRef.current) {
      setHeight(textRef.current?.scrollHeight + 2);
    }
  }, []);
  return (
    <>
      <div onClick={onClose} className={styles.panel_input}></div>
      <textarea
        ref={textRef}
        className={styles.input__field}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        autoFocus
        onInput={(e) => {
          const target = e.target;
          textRef.current.style.height = "30px";
          textRef.current.style.height = `${target.scrollHeight}px`;
        }}
        style={{
          height,
        }}
      />
    </>
  );
};

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "number"]),
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

export default InputField;
