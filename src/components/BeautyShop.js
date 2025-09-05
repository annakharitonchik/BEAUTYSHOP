import { Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer";
import Checkout from "./Checkout";
// import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./HomePage";
import { Header } from "./Header";
import { CartPage } from "./CartPage";

export const BeautyShop = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart/:id" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  </>
);
