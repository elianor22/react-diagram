import PropTypes from "prop-types";
import DefaultComponent from "../../Core/Component/DefaultComponent";

const Circle = ({ selected }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "100%",
      }}
    >
      <DefaultComponent selected={selected} type="circle">
        <div>circle</div>
      </DefaultComponent>
    </div>
  );
};

Circle.propTypes = {
  selected: PropTypes.bool,
};

export default Circle;
