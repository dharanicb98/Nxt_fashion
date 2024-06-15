import React from "react";
import { useSelector } from "react-redux";
import ErrorPopup from "../components/popup/errorPopup";
import Loader from "../components/loader";
import Layout from "../components/layout";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/dashboard";
import Products from "../pages/products";
import Cart from "../pages/cart";
import ProductId from "../pages/products/productId";

const ProtectedRoutes = () => {
  const errorMessage = useSelector((state) => state.loader.errorMessage);
  const loader = useSelector((state) => state.loader.isLoading);

  return (
    <>
      {errorMessage && <ErrorPopup isOpen={true} errorMessage={errorMessage} />}
      {loader && <Loader />}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductId />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </>
  );
};

export default ProtectedRoutes;
