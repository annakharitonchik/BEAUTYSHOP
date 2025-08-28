import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLoadState: 0, // 0 - not loaded, 1 - is loading, 2 - loaded, 3 - error
  dataLoadError: null,
  productsArr: [],
};

export const clientsSlice = createSlice({
  name: "companyData",
  initialState,
  reducers: {
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
        state.clientsArr &&
        state.clientsArr.map((client) => {
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
      state.clientsArr = newClients;
    },
    animationForDelete: (state, action) => {
      state.clientsArr = state.clientsArr.map((client) =>
        client.id === action.payload.id
          ? { ...client, className: "Deleted" }
          : client
      );
    },
    deleteClient: (state, action) => {
      state.clientsArr =
        state.clientsArr &&
        state.clientsArr.filter((client) => client.id !== action.payload.id);
    },
    animationForAdd: (state, action) => {
      state.clientsArr = state.clientsArr.map((client) =>
        client.id === action.payload.id
          ? { ...client, className: "Client" }
          : client
      );
    },
    addClient: (state, action) => {
      state.clientsArr = state.clientsArr && [
        ...state.clientsArr,
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
  },
});

export const {
  updateLoadState,
  updateData,
  textChanged,
  animationForDelete,
  deleteClient,
  addClient,
  animationForAdd,
} = clientsSlice.actions;

export const getCompanyData = () => async (dispatch) => {
  try {
    dispatch(updateLoadState({ state: 1, error: null }));
    const response = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
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

export default clientsSlice.reducer;
