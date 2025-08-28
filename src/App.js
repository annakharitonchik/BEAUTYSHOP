import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import BeautyShopData from "./components/BeautyShopData";
import { BeautyShop } from "./components/BeautyShop";
export const App = () => (
  <Provider store={store}>
    <BeautyShopData>
      {({
        companyName,
        filteredClients,
        setClientsFilter,
        dataLoadState,
        dataLoadError,
        doAddClient,
      }) => (
        <BeautyShop
          companyName={companyName}
          filteredClients={filteredClients}
          setClientsFilter={setClientsFilter}
          dataLoadState={dataLoadState}
          dataLoadError={dataLoadError}
          doAddClient={doAddClient}
        />
      )}
    </BeautyShopData>
  </Provider>
);
