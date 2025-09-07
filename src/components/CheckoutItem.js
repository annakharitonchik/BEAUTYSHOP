import React from "react";
import "./CheckoutItem.css";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  saveBasketForUser,
  deleteAndSaveBasket,
  decrementQuantity,
  incrementQuantity,
} from "../redux/beautyItemsSlice.js";

const CheckoutItem = React.memo((props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={`CheckoutItem ${props.info.className || ""}`}>
        <p className="Name">{props.info.name}</p>
        <div className="Image">
          <img src={props.info.image_link} alt={props.info.name} />
        </div>
        <p className="Price">{props.info.price}$</p>
        <div className="Quantity">
          <button
            onClick={() => {
              dispatch(decrementQuantity(props.info.id));
              dispatch(saveBasketForUser());
            }}
          >
            &#8722;
          </button>
          <p className="Price Number">{props.info.quantity}</p>
          <button
            onClick={() => {
              dispatch(incrementQuantity(props.info.id));
              dispatch(saveBasketForUser());
            }}
          >
            &#43;
          </button>
        </div>
        <button
          className="Delete"
          onClick={() => dispatch(deleteAndSaveBasket(props.info.id))}
        >
          Delete
        </button>
      </div>
    </>
  );
});
CheckoutItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_link: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
export default CheckoutItem;
