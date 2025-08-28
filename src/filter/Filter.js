import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Filter.css";
const Filter = ({ names, images, id }) => {
  const [curList, changeList] = useState(names);
  const [searchingText, setText] = useState("");
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    let filtered = names.filter((word) =>
      word.toLowerCase().includes(searchingText.toLowerCase())
    );
    changeList(filtered);
    setShowList(true);
  }, [searchingText, names]);

  const searchedWords = (eo) => {
    setText(eo.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={searchingText}
        onChange={searchedWords}
        onBlur={() => setShowList(false)}
        onFocus={() => setShowList(true)}
      />
      {searchingText.trim().length && showList ? (
        curList.length ? (
          <ul className="SearchingList">
            {curList.map((word, index) => (
              <li
                key={id[index]}
                onMouseDown={(eo) => {
                  eo.preventDefault();
                }}
              >
                <NavLink to="/cart" className="CartFromFilter">
                  <img src={images[index]} alt={names[index]} />
                  {word}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          "Not Found"
        )
      ) : (
        ""
      )}
    </>
  );
};
export default Filter;
