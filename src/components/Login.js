import React, { useState, useEffect } from "react";
import "./Header.css";
import {
  changeUserName,
  loadBasketForUser,
} from "../redux/beautyItemsSlice.js";
import { useDispatch, useSelector } from "react-redux";

function useBeforeUnload(login) {
  useEffect(() => {
    const checkLogin = (eo) => {
      if (!login) return;
      eo.preventDefault();
      eo.returnValue = "";
    };
    window.addEventListener("beforeunload", checkLogin);
    return () => window.removeEventListener("beforeunload", checkLogin);
  }, [login]);
}

const Login = () => {
  const dispatch = useDispatch();

  let userName = useSelector((state) => state.shopData.userName);

  const [isEdit, setIsEdit] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (userName?.trim()) {
      setTempName(userName);
      dispatch(loadBasketForUser(userName));
    }
  }, [userName, dispatch]);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      dispatch(changeUserName(savedName));
      dispatch(loadBasketForUser(savedName));
    }
  }, [dispatch]);

  useEffect(() => {
    if (tempName.length > 30 || tempName.trim().length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [tempName]);

  useBeforeUnload(isEdit && tempName.trim() !== userName.trim());
  return (
    <div className="Login">
      {isEdit ? (
        <React.Fragment>
          <p className="Name">
            <input
              value={tempName}
              onChange={(eo) => setTempName(eo.target.value)}
              onKeyDown={(eo) => {
                if (eo.key === "Enter" && !disable) {
                  setIsEdit(false);
                  localStorage.setItem("userName", tempName);
                  dispatch(changeUserName(tempName));
                  dispatch(loadBasketForUser(tempName));
                }
              }}
              autoFocus
            ></input>
          </p>
          <p>
            <button
              disabled={disable}
              className="Save"
              onClick={() => {
                setIsEdit(false);
                localStorage.setItem("userName", tempName);
                dispatch(changeUserName(tempName));
                dispatch(loadBasketForUser(tempName));
              }}
            >
              Save
            </button>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="Name">{tempName}</p>
          <p>
            <button
              className="Registration"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Login
            </button>
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

export default Login;
