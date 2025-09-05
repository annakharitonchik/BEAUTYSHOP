import React from "react";
import "./BeautyItem.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {addToBasketAndSaveInFirebase } from "../redux/beautyItemsSlice.js";

const BeautyItem = React.memo((props) => {
  let userName = useSelector((state) => state.shopData.userName);
  const dispatch = useDispatch();

  // console.log(props.info.name);
  return (
    <>
      <div className={`Product ${props.info.className || ""}`}>
        <p className="Name">{props.info.name}</p>

        <div className="Image">
          <img src={props.info.image_link} alt={props.info.name} />
        </div>
        <p className="Price">{props.info.price}$</p>
        <button
          className={userName ? "Add" : "DisabledAdd"}
          onClick={(eo) => {
            eo.preventDefault();
            dispatch(addToBasketAndSaveInFirebase(props.info));
            props.showToast("Item added to basket");
          }}
          disabled={!userName.trim()}
        >
          Add
          <span className="tooltip">Please log in to add a product</span>
        </button>
      </div>
    </>
  );
});
BeautyItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
export default BeautyItem;
