import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Search.css";

const Search = ({ names, images, id }) => {
  const [curList, changeList] = useState(names);
  const [searchingText, setText] = useState("");
  const [showList, setShowList] = useState(false);
  const wrapperRef = useRef(null);

  const searchedWords = (eo) => {
    const value = eo.target.value;
    setText(value);
    const filtered = names.filter((word) =>
      word.toLowerCase().includes(value.toLowerCase())
    );
    changeList(filtered);
    setShowList(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Search" ref={wrapperRef}>
      <input
        type="text"
        placeholder="Search"
        value={searchingText}
        onChange={searchedWords}
        onBlur={() => setShowList(false)}
      />
      {searchingText.trim().length && showList ? (
        curList.length ? (
          <ul className="SearchingList">
            {curList.map((word, index) => (
              // console.log(index, id[index])
              <li key={id[index]}>
                <NavLink
                  to={`/cart/${id[index]}`}
                  className="CartFromFilter"
                  onMouseDown={(eo) => eo.preventDefault()}
                  onClick={() => setShowList(false)}
                >
                  <img src={images[index]} alt={names[index]} />
                  {word}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="SearchingList"> Not Found</p>
        )
      ) : (
        ""
      )}
    </div>
  );
};
export default Search;
