import React, { useState } from "react";
import "./BeautyShop.css";
import BeautyItem from "./BeautyItem.js";
import BeautyShopData from "./BeautyShopData.js";
import Search from "../filter/Search.js";
import Category from "../filter/Category.js";
import { NavLink } from "react-router-dom";
import Toast from "./Toast.js";
const HomePage = () => {
  const [filtered, setFiltered] = useState([]);
  const [toast2, setToast] = useState(null);
  const showToast = (message) => {
    setToast(null);
    setTimeout(() => setToast(message), 50);
  };
  const [currentPage, setCurrentNumOfPage] = useState(1);
  const itemsOnPage = 10;
  return (
    <BeautyShopData>
      {({
        filteredItems,
        setClientsFilter,
        dataLoadState,
        dataLoadError,
        doAddClient,
      }) =>
        dataLoadState === 3 ? ( //404
          <div style={{ color: "red" }} className="HomePage">
            {dataLoadError}
          </div>
        ) : dataLoadState === 2 ? (
          <div className="HomePage">
            <div className="Filter">
              <Search
                names={filteredItems.map((item) => item.name)}
                images={filteredItems.map((item) => item.image_link)}
                id={filteredItems.map((item) => item.id)}
              />
              <Category
                categories={[
                  ...new Set(
                    filteredItems.map(
                      (item) => item.category || item.product_type
                    )
                  ),
                ]}
                onChooseCategory={(selectedCategory) => {
                  selectedCategory
                    ? setFiltered(
                        filteredItems.filter(
                          (item) =>
                            item.category === selectedCategory ||
                            item.product_type === selectedCategory
                        )
                      )
                    : selectedCategory === "All" || setFiltered(filteredItems);
                }}
              />
            </div>
            <div className="Products">
              {(filtered.length ? filtered : filteredItems)
                .slice(
                  (currentPage - 1) * itemsOnPage,
                  currentPage * itemsOnPage
                )
                .map((item) => (
                  <NavLink
                    to={`/cart/${item.id}`}
                    className="Cart"
                    key={item.id}
                  >
                    <BeautyItem info={item} showToast={showToast} />
                  </NavLink>
                ))}
            </div>
            {toast2 && <Toast message={toast2} />}
            <div className="Pagination">
              <button
                onClick={() =>
                  setCurrentNumOfPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <span>
                Page {currentPage} of{" "}
                {Math.ceil(
                  (filtered.length ? filtered : filteredItems).length /
                    itemsOnPage
                )}
              </span>

              <button
                onClick={() =>
                  setCurrentNumOfPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(
                        (filtered.length ? filtered : filteredItems).length /
                          itemsOnPage
                      )
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(
                    (filtered.length ? filtered : filteredItems).length /
                      itemsOnPage
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="HomePage">
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          </div>
        )
      }
    </BeautyShopData>
  );
};

export default HomePage;
