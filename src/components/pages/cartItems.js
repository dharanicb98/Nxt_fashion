import React, { useState } from "react";
import Button from "../button";
import { useDispatch } from "react-redux";
import { decrement, increment, removeCart, updateSize } from "../../store/reducers/cartItems";
import { DeleteIcon } from "../../Icons";
import FormInputs from "../popup/formInputs";

const CartListItems = ({ addCartItems }) => {
  const [size, setSize] = useState(addCartItems.size || "");
  const dispatch = useDispatch();

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    dispatch(updateSize({ id: addCartItems.id, size: newSize }));
  };

  return (
    <div className="drop-shadow-xl text-sm text-gray-900 font-[Roboto] rounded-md bg-white list-none mt-3 py-4 px-4 w-full max-h-fit">
      <div className="flex justify-between">
        <div className="flex">
          <img
            src={addCartItems.thumbnail}
            alt={addCartItems?.title}
            className="w-[100px] h-[100px]"
          />
          <div className="ml-3">
            <h1 className="text-[#212529] font-bold text-sm my-3 font-[Roboto] w-[160px] max-w-[200px]">
              {addCartItems.title}
            </h1>
            <p className="text-sm">Category : {addCartItems.category}</p>
          </div>
        </div>
        <div className="flex gap-4 text-center self-center">
          <Button
            value="-"
            type="black"
            className="!bg-[#3A4980]"
            onClick={() => dispatch(decrement({ id: addCartItems.id }))}
          />
          <span className="self-center">{addCartItems.quantity}</span>
          <Button
            value="+"
            type="black"
            className="!bg-[#3A4980]"
            onClick={() => dispatch(increment({ id: addCartItems.id }))}
          />
        </div>
        <div className="self-center">
          <div className="text-center">₹ {addCartItems.price * addCartItems.quantity}</div>
          {addCartItems.category.split(" ").length >= 2 && (
            <FormInputs
              type={"select"}
              apiKey="size"
              labalvalue={"Size"}
              labelStyle = "mr-2"
              className={"mt-3"}
              onChange={handleSizeChange}
              value={size}
              objKey={"optionValue"}
              optionsData={[
                { id: 1, optionValue: "S", name: "Small" },
                { id: 2, optionValue: "M", name: "Medium" },
                { id: 3, optionValue: "L", name: "Large" },
                { id: 4, optionValue: "XL", name: "Extra Large" },
              ]}
            />
          )}
        </div>
        <DeleteIcon
          className={"self-center text-[#3A4980]"}
          onClick={() => dispatch(removeCart({ id: addCartItems.id }))}
        />
      </div>
    </div>
  );
};

export default CartListItems;


