import React, { useState } from "react";
import BeautyShopData from "./BeautyShopData";
import "./CartPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasketAndSaveInFirebase } from "../redux/beautyItemsSlice.js";
import Toast from "./Toast.js";
export const CartPage = () => {
  let userName = useSelector((state) => state.shopData.userName);
  const dispatch = useDispatch();
  let { id } = useParams();

  const [toast, setToast] = useState(null);
  const showToast = (message) => {
    setToast(null);
    setTimeout(() => setToast(message), 50);
  };
  return (
    <BeautyShopData>
      {({ filteredItems }) => {
        let choseItem = filteredItems.find((item) => item.id === Number(id));

        return (
          <div className="CartPage">
            {choseItem ? (
              <>
                <p className="Name">{choseItem.name}</p>
                <div className="Image">
                  <img src={choseItem.image_link} alt={choseItem.name} />
                </div>
                <p className="Price">{choseItem.price}$</p>
                <p className="Description">{choseItem.description}</p>
                <button
                  className={userName ? "Add" : "DisabledAdd"}
                  onClick={(eo) => {
                    eo.preventDefault();
                    dispatch(addToBasketAndSaveInFirebase(choseItem));
                    showToast("Item added to basket");
                  }}
                  disabled={!userName.trim()}
                >
                  Add
                  <span className="tooltip">
                    Please log in to add a product
                  </span>
                </button>
                {toast && <Toast message={toast} />}
                {choseItem.rating && (
                  <div className="Rating">
                    <span>{`Rating (${choseItem.rating}/5):`}</span>

                    <div className="stars-outer">
                      <div
                        className="stars-inner"
                        style={{ width: `${(choseItem.rating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading...</p>
              </div>
            )}
          </div>
        );
      }}
    </BeautyShopData>
  );
};
