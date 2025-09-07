import { useState, useEffect } from "react";
import "./BeautyShop.css";
import { clientEvents } from "./events.js";
import { useDispatch, useSelector } from "react-redux";

import {
  textChanged,
  deleteClient,
  animationForDelete,
  addClient,
  animationForAdd,
  getCompanyData,
} from "../redux/beautyItemsSlice.js";

const BeautyShopData = ({ children }) => {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.shopData.productsArr);
  let companyName = useSelector((state) => state.shopData.companyName);
  let clientKey = useSelector((state) => state.shopData.productsArr.id);
  let dataLoadError = useSelector((state) => state.shopData.dataLoadError);
  let dataLoadState = useSelector((state) => state.shopData.dataLoadState);

  const [clientsFilter, setClientsFilter] = useState("all"); // active | blocked

  useEffect(() => {
    dispatch(getCompanyData());
  }, [dispatch]);

  const doTextChanged = (info) => {
    // console.log("Редактируем клиента:", info);
    dispatch(textChanged(info));
  };
  const doDeleteandAnimation = (id) => {
    dispatch(animationForDelete({ id }));
    setTimeout(() => dispatch(deleteClient({ id })), 2000);
  };

  useEffect(() => {
    clientEvents.addListener("ETextChanged", doTextChanged);
    clientEvents.addListener("EDelClient", doDeleteandAnimation);
    return () => {
      clientEvents.removeListener("ETextChanged", doTextChanged);
      clientEvents.removeListener("EDelClient", doDeleteandAnimation);
    };
  }, []);

  const doAddClient = () => {
    dispatch(addClient({ id: clientKey }));
    setTimeout(() => dispatch(animationForAdd({ id: clientKey })), 100);
  };

  // console.log("MobileCompany render", "err:" + dataLoadError);

  let filteredItems = products.filter((client) => {
    if (clientsFilter === "active") return client.balance > 0;
    if (clientsFilter === "blocked") return client.balance <= 0;
    return true;
  });
// console.log(products)
  return children({
    companyName,
    filteredItems,
    setClientsFilter,
    dataLoadState,
    dataLoadError,
    doAddClient,
  });
};
export default BeautyShopData;
