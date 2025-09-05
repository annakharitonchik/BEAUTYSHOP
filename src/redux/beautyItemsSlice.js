import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, getDoc } from "firebase/firestore";
import db from "../firebase/firebase";
const initialState = {
  dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  productsArr: [],
  userName: "",
  basket: [],
  numberOfAllList: "  ",
};
const saveBasket = async (userName, basket) => {
  if (!userName || !userName.trim()) return;
  const ref = doc(db, "basket", userName);
  await setDoc(ref, { basket });
};

export const itemsSlice = createSlice({
  name: "shopData",
  initialState,
  reducers: {
    changeUserName: (state, action) => {
      state.userName = action.payload;
    },

    updateLoadState: (state, action) => {
      state.dataLoadState = action.payload.state;
      state.dataLoadError = action.payload.error;
    },

    updateData: (state, action) => {
      state.productsArr = action.payload;
    },
    textChanged: (state, action) => {
      let { id, fam, im, otch, balance } = action.payload;
      let newClients =
        state.productsArr &&
        state.productsArr.map((client) => {
          if (id === client.id) {
            return {
              ...client,
              fam,
              im,
              otch,
              balance,
            };
          }
          return client;
        });
      state.productsArr = newClients;
    },
    animationForDelete: (state, action) => {
      state.basket = state.basket.map((client) =>
        client.id === action.payload.id
          ? { ...client, className: "Deleted" }
          : client
      );
    },
    deleteClient: (state, action) => {
      const item = state.basket.find((item) => item.id === action.payload);
      if (item) {
        state.numberOfAllList -= item.quantity;
      }

      state.basket =
        state.basket &&
        state.basket.filter((client) => client.id !== action.payload);
    },

    animationForAdd: (state, action) => {
      state.basket = state.basket.map((client) =>
        client.id === action.payload.id
          ? { ...client, className: "Client" }
          : client
      );
    },
    addClient: (state, action) => {
      state.productsArr = state.productsArr && [
        ...state.productsArr,
        {
          fam: "",
          im: "",
          otch: "",
          balance: 0,
          id: action.payload.id,
          className: "NewClient",
        },
      ];
      state.clientKey += 5;
    },
    addToBasket: (state, action) => {
      const counter = state.basket.find(
        (item) => item.id === action.payload.id
      );
      if (counter) {
        counter.quantity++;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
      state.numberOfAllList++;
    },
    incrementQuantity: (state, action) => {
      const item = state.basket.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.numberOfAllList++;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.basket.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.numberOfAllList--;
        } else {
          state.basket = state.basket.filter((i) => i.id !== action.payload);
          state.numberOfAllList--;
        }
      }
    },
    setBasket: (state, action) => {
      state.basket = action.payload;
      state.numberOfAllList = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },
  },
});

export const {
  changeUserName,
  updateLoadState,
  updateData,
  textChanged,
  animationForDelete,
  deleteClient,
  addClient,
  animationForAdd,
  addToBasket,
  incrementQuantity,
  decrementQuantity,
  setBasket,
} = itemsSlice.actions;

export const getCompanyData = () => async (dispatch, getState) => {
  const { productsArr } = getState().shopData;
  if (productsArr.length > 0) return;
  try {
    dispatch(updateLoadState({ state: 1, error: null }));
    const response = await fetch(
      "https://raw.githubusercontent.com/annakharitonchik/BEAUTYSHOP/refs/heads/main/products.json"
    );
    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      dispatch(updateLoadState({ state: 2, error: null }));
      dispatch(updateData(data));
    } else {
      dispatch(
        updateLoadState({ state: 3, error: "HTTP error " + response.status })
      );
    }
  } catch (err) {
    dispatch(updateLoadState({ state: 3, error: err.message }));
  }
};

export const addToBasketAndSaveInFirebase =
  (product) => async (dispatch, getState) => {
    const { userName } = getState().shopData;
    if (!userName?.trim()) return;
    dispatch(addToBasket(product));
    const { basket } = getState().shopData;
    await saveBasket(userName, basket);
  };
export const loadBasketFromFirebase = async (userName) => {
  if (!userName) return;
  const ref = doc(db, "basket", userName);
  const result = await getDoc(ref);
  return result.exists() ? result.data().basket : [];
};
export const loadBasketForUser = (userName) => async (dispatch) => {
  if (!userName) return;
  try {
    const basket = await loadBasketFromFirebase(userName);
    dispatch(setBasket(basket));
  } catch (err) {
    console.error(err);
  }
};
export const saveBasketForUser = () => async (dispatch, getState) => {
  const { userName } = getState().shopData;
  if (!userName?.trim()) return;
  try {
    const { basket } = getState().shopData;
    await saveBasket(userName, basket);
  } catch (err) {
    console.error(err);
  }
};

export const deleteAndSaveBasket = (id) => async (dispatch, getState) => {
  dispatch(animationForDelete({ id }));
  window.onbeforeunload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };
  setTimeout(async () => {
    dispatch(deleteClient(id));
    const { basket, userName } = getState().shopData;
    if (userName?.trim()) await saveBasket(userName, basket);
    window.onbeforeunload = null;
  }, 1500);
};

export default itemsSlice.reducer;
