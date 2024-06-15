import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartListItems from "../../components/pages/cartItems";
import Button from "../../components/button";
import { applyStyles } from "../../store/reducers/navberChange";
import { BackWordIcon } from "../../Icons";
import { useNavigate } from "react-router-dom";
import AddessFrom from "../../components/forms/address";
import Dialog from "../../../src/utils/dialog";

const Cart = () => {
  const [pop, setPop] = useState({
    isDelete: false,
    isEdit: false,
    isCreate: false,
  });
  const [adderss, setAddress] = useState([]);
  const cartData = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      applyStyles({
        styles: "text-white fill-white",
        backgroundColor: "#3A4980",
      })
    );
  }, [dispatch]);

  const handleCreateOpen = () => {
    setPop({ ...pop, isCreate: true });
  };

  const handleCreateClose = () => {
    setPop({ ...pop, isCreate: false });
  };

  function calculateDiscountedPrice(price, discountPercentage) {
    return price - price * (discountPercentage / 100);
  }

  const totalPrice = cartData
    ?.map((each) => each.price * each.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalItems = cartData
    ?.map((each) => each.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const discountPercentage = cartData?.map(each => each?.discountPercentage).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const originalPrice = cartData?.map(each => each?.price).reduce((accumulator, currentValue) => accumulator + currentValue, 0);;

  const discountedPrice = calculateDiscountedPrice(
    originalPrice,
    discountPercentage
  );

  // console.log("this cartdata" , cartData)
  const onChangeRoute = () => {
    navigate("/products");
  };

  function handlePostRequest(formData) {
    setAddress(formData);
  }
  console.log(adderss, "this popUp fromData");

  return (
    <div className="min-h-screen mt-14 font-[Roboto] overflow-auto">
      {cartData.length > 0 ? (
        <>
          <div className="my-10 mx-4 md:mx-16">
            <p
              className="flex items-center gap-4 px-4 py-2 cursor-pointer"
              onClick={onChangeRoute}
            >
              <BackWordIcon /> <span>Shipping Details</span>
            </p>
            <hr />
          </div>
          <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-6">
            <div className="flex flex-col w-full md:w-[65%]">
              <ul className="scroll-container max-h-[400px] md:max-h-full">
                {cartData?.map((cart) => (
                  <CartListItems key={cart.id} addCartItems={cart} />
                ))}
              </ul>
            </div>
            <div className="bg-white h-auto mb-10 md:mb-0 text-gray-950 py-4 px-4 font-[Roboto] drop-shadow-lg rounded w-full md:w-[30%]">
              <p className="font-bold text-md my-2">Cart Details</p>
              <hr />
              <div className="flex justify-between text-sm my-3">
                <p>Subtotal</p>
                <p className="font-bold flex flex-col">
                  {cartData?.map((each, index) => (
                    <span key={index}>₹ {each.price * each.quantity}</span>
                  ))}
                </p>
              </div>
              <p className="flex justify-between text-sm my-3">
                <span>Items</span>{" "}
                <span className="font-bold">x {totalItems}</span>
              </p>
              <div className="flex justify-between text-sm my-3">
                <p>Sizes</p>
                <div className="w-1/2 font-bold">
                  {cartData?.map((each, index) => (
                    <div key={index} className="flex justify-between">
                      {each.size && <p className="text-[10px]">{each.title}</p>}
                      <p className="self-center text-end w-1/2">{each.size}</p>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="flex justify-between my-3">
                <p className="text-md">Shipping</p>
                <div className="w-1/2">
                  <p className="font-bold">Free Shipping</p>
                  <p className="flex justify-between text-sm">
                    <span>Flat Rate</span>{" "}
                    <span className="font-bold">
                      ₹{discountedPrice.toFixed(2)}
                    </span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>Pickup</span> <span className="font-bold">₹ 40</span>
                  </p>
                  <p className="text-[10px] my-2">
                    Shipping option will be updated during Checkout
                  </p>
                </div>
              </div>
              <hr />
              <p className="flex justify-between text-sm my-3">
                <span>Total</span>{" "}
                <span className="font-bold">₹ {(totalPrice + discountedPrice + 40).toFixed(2)}</span>
              </p>
              <div className="flex justify-center mt-5">
                <Button
                  type="black"
                  value="Proceed to Checkout"
                  className="!bg-[#3A4980] w-full"
                  onClick={handleCreateOpen}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen font-bold font-[Roboto] flex flex-col gap-4 justify-center items-center">
          <img
            src="https://img.freepik.com/premium-vector/business-saving-money-cartoon_18591-42071.jpg?w=740"
            alt="cart"
            className="w-[30%]"
          />
          <p className="text-lg">Your Cart is Empty Now</p>
          <Button
            value={"Shop now"}
            type="black"
            className="!bg-[#3A4980]"
            onClick={() => navigate("/products")}
          />
        </div>
      )}

      {pop.isCreate && (
        <Dialog
          closeModal={handleCreateClose}
          isOpen={pop.isCreate}
          createClick={pop.isCreate}
          title="Add Address"
          childrenClass={"w-[50%] h-[75%] p-6 rounded-md dark-scrollbar"}
        >
          <AddessFrom
            isEdit={pop.isCreate}
            close={handleCreateClose}
            editData={{
              name: "",
              pincode: "",
              city: "",
              state: "",
              area: "",
              flatAddress: "",
              landmark: "",
              mobile: "",
            }}
            handleRequest={handlePostRequest}
            value="Create"
            create={true}
            createClick={pop.isCreate}
          />
        </Dialog>
      )}
    </div>
  );
};

export default Cart;
