import React from "react";
import CheckoutItem from "./CheckoutItem";

import { useSelector, } from "react-redux";

const Checkout = React.memo(() => {
  let basket = useSelector((state) => state.shopData.basket);

  return (
    <div className="CheckoutPage">
      {basket.map((item, i) => (
        <CheckoutItem info={item} key={item.id}/>
      ))}
    </div>
  );
});

export default Checkout;
