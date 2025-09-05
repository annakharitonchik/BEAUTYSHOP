import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import { useSelector } from "react-redux";
export const Header = () => {
  let numberOfAllList = useSelector((state) => state.shopData.numberOfAllList);

  return (
    <div className="Header">
      <div>
        <NavLink to="/" className="HomePage">
          Home
        </NavLink>
      </div>
      <Login />
      <div>
        <NavLink to="/checkout" className="Checkout">
          <span>Basket</span>
        </NavLink>
        <p className="Number"> {` ${numberOfAllList}`}</p>
      </div>
    </div>
  );
};
