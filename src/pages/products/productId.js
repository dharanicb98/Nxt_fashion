import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  error,
  loaderStart,
  loaderSuccess,
} from "../../store/reducers/loaderSlice";
import { getProductsID } from "../../services/products";
import { useParams } from "react-router-dom";
import { applyStyles } from "../../store/reducers/navberChange";

const ProductId = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(
      applyStyles({
        styles: "text-white fill-white",
        backgroundColor: "#291c14",
      })
    );
    getData();
  }, [dispatch]);

  const getData = async () => {
    dispatch(loaderStart());
    try {
      const response = await getProductsID(params.id);
      setData(response);
      setImages(response?.thumbnail);
      dispatch(loaderSuccess());
    } catch (err) {
      dispatch(error(err?.response?.data?.error?.message));
    }
  };

  const OnChangeImage = (picture) => {
    setImages(picture);
  };

  return (
    <div className="h-screen overflow-auto font-[Roboto] flex bg-[#e6cdbc]">
      <div className="mt-20 w-full flex justify-between gap-4">
        <div className="w-[50%] ">
          <img
            src={images}
            alt={data?.title}
            className="w-[70%] h-[70%] mx-6 bg-[#291c14] rounded-md"
          />
          <div className="flex flex-row mx-6 my-3">
            {data?.images?.map((each, index) => (
              <img
                src={each}
                key={index}
                alt={`images${index}`}
                className="h-[100px] rounded-md bg-[#291c14] cursor-pointer"
                onClick={() => OnChangeImage(each)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[50%]">
          <h1 className="font-bold text-2xl">{data?.title}</h1>
          <p>
            Category : <span>{data?.category}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductId;
