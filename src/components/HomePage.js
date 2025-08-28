import React, { useState } from "react";
import "./BeautyShop.css";
import BeautyItem from "./BeautyItem.js";
import BeautyShopData from "./BeautyShopData.js";
import Filter from "../filter/Filter";
import Category from "../filter/Category.js";
const HomePage = () => {
  const [filtered, setFiltered] = useState([]);
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
          <div style={{ color: "red" }} className="MobileCompany">
            {dataLoadError}
          </div>
        ) : dataLoadState === 2 ? (
          <div className="HomePage">
            <div className="Filter">
              <Filter
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
                    : selectedCategory ==="All" || setFiltered(filteredItems);
                }}
              />
            </div>
            <div className="Products">
              {(filtered.length ? filtered : filteredItems).map((item) => (
                <BeautyItem key={item.id} info={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="MobileCompany ">
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
