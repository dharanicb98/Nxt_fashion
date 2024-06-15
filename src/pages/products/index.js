import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../services/products";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../store/reducers/loaderSlice";
import { applyStyles } from "../../store/reducers/navberChange"; // Import the action
import ProductItem from "../../components/pages/productItem";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(loaderStart());
    try {
      const data = await getProducts();
      setProductData(data);
      dispatch(loaderSuccess());
    } catch (err) {
      dispatch(error(err?.response?.data?.error?.message));
    }
  };


  console.log("this product change" , productData?.products)

  useEffect(() => {
    dispatch(
      applyStyles({ styles: "text-black fill-black", backgroundColor: "#fff" })
    );
    getData();
  }, [dispatch]);

  return (
    <div className="h-screen overflow-auto mt-10">
      <div className="bg-[#a8ebd7] bg-cover flex justify-around items-center py-4 px-4">
        <img
          src="https://preview.colorlib.com/theme/estore/assets/img/hero/hero_man.png.webp"
          alt=""
          className="w-[20%] h-[20%]"
        />
        <div>
          <p className="font-mono text-[#007bff] text-[35px]">60% Discount</p>
          <p className=".welcome_title  text-[50px]">Winter Collection</p>
         <p className="text-[#212529] font-light text-[20px]">Best Cloth Collection By Coming Fastival!</p>
        </div>
      </div>
      <div className="">
          {productData?.products?.length > 0 ? (
            <ul className="flex justify-center flex-wrap">
              {productData?.products?.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </ul>
          ) : (
            <p>No products available.</p>
          )}
        </div>
    </div>
  );
};

export default Products;
