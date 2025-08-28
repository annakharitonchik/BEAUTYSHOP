import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer";
// import CheckoutPage from "./components/CheckoutPage";
// import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./HomePage";
import { Header } from "./Header";
import {CartPage} from "./CartPage";

export const BeautyShop = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      {/* <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  </>
);
