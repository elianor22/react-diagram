import PropTypes from "prop-types";
import styles from "./style.module.css";
import { useRef } from "react";

const InputField = ({ type, value, onChange, onBlur, onClick }) => {
  const textRef = useRef();
  return (
    <textarea
      ref={textRef}
      className={styles.input__field}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onClick}
      onInput={(e) => {
        const target = e.target;
        textRef.current.style.height = "30px";
        textRef.current.style.height = `${target.scrollHeight}px`;
      }}
    />
  );
};

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  type: PropTypes.oneOf(["text", "number"]),
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
};

export default InputField;
