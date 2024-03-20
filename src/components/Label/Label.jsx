import PropTypes from "prop-types";
import styles from "./style.module.css";

const Label = ({ label }) => {
  return <div className={styles.label_preview}>{label}</div>;
};

Label.propTypes = {
  label: PropTypes.string,
};

export default Label;
