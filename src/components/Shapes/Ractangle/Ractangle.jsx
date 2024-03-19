import PropTypes from "prop-types";
import DefaultComponent from "../../Core/Component/DefaultComponent";

const Ractangle = ({ selected }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <DefaultComponent selected={selected}>
        <div>Ractangle</div>
      </DefaultComponent>
    </div>
  );
};

Ractangle.propTypes = {
  selected: PropTypes.bool,
};

export default Ractangle;
