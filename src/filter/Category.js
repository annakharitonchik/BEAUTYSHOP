import React, { useState } from "react";

import "./Category.css";
const Category = ({ categories, onChooseCategory }) => {
  const [currCategory, setChangeCategory] = useState("");

  const chooseCategory = (eo) => {
    let category = eo.target.value;
    setChangeCategory(category);
    onChooseCategory(category);
  };

  return (
    <>
      <form className="Category">
        <select
          name="animalkind"
          onChange={chooseCategory}
          value={currCategory}
        >
          <option value="" disabled>
            Category
          </option>
          <option value="All">all</option>
          {categories.map((category, i) => (
            <option value={category} key={i}>
              {category}
            </option>
          ))}
        </select>
      </form>
    </>
  );
};

export default Category;
