import React from "react";
import StarRating from "./starRating";
import Button from "../button";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../store/reducers/cartItems";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addCart(product));
  };

  function calculateDiscountedPrice(price, discountPercentage) {
    return price - price * (discountPercentage / 100);
  }

  function capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const discountPercentage = product?.discountPercentage;
  const originalPrice = product?.price;

  const discountedPrice = calculateDiscountedPrice(
    originalPrice,
    discountPercentage
  );

  return (
    <li className="bg-[#f0f0f0] bg-cover px-4 py-4 font-[Roboto] text-[#212529] my-3 mx-3 w-[400px] max-h-fit">
      <Link to={`/product/${product.id}`}>
        <div className="h-full max-h-full">
          <div className="flex flex-col items-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-[150px]"
            />
            <h1 className="text-[#212529] font-bold my-3  text-sm font-[Roboto]">
              {product.title}
            </h1>
          </div>
          {/* <div className="flex flex-col justify-end mt-6"> */}
          <p className="text-sm text-gray-900">
            Price : {originalPrice.toFixed(2)} /-
          </p>
          <p className="text-sm">Offer Discount : {discountPercentage}%</p>
          <p className="text-sm">
            Discounted Price: ₹{discountedPrice.toFixed(2)}
          </p>
          <p className="text-sm">Category: {capitalize(product.category)}</p>
          <div className="flex justify-between items-end self-end mx-1 mt-6">
            {/* <p className="font-bold text-gray-900">Rating </p> */}
            <div className="flex">
              <StarRating rating={product.rating} />
              <span className="text-[12px] ml-2">
                {product?.rating.count}🧑👩
              </span>
            </div>
            <Button
              value={"Add Cart"}
              type="secondary"
              className="!bg-[#68b8a0]"
              onClick={() => handleAddToCart(product)}
            />
          </div>
          {/* </div> */}
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
