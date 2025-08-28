import React from "react";
import "./BeautyItem.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const BeautyItem = React.memo((props) => {
  // console.log(props.info.name);
  return (
    <>
      
      <NavLink to="/cart" className="Cart">
        <div className={`Product ${props.info.className || ""}`}>
          <p className="Name">{props.info.name}</p>
          <div className="Image">
            <img src={props.info.image_link} alt={props.info.name} />
          </div>

          <p className="Price">{props.info.price}$</p>
          {/* <p className="Description">{props.info.description}</p> */}
          {/* <p className="Rating">{props.info.rating}</p> */}
          <button className="Add" onClick={(eo)=> eo.preventDefault()}>Add</button>
          {/* onClick={addProduct} */}
        </div>
      </NavLink>
    </>
  );
});
BeautyItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
export default BeautyItem;
