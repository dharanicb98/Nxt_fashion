import React, { useEffect } from "react";
import { FashionLogo } from "../../Icons";
import { useDispatch } from "react-redux";
import { applyStyles, noStyles } from "../../store/reducers/navberChange";


const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(applyStyles({ styles: "text-white fill-white", backgroundColor: "#59665c" })); 
    dispatch(noStyles());
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-home">
      <FashionLogo
        className={"text-center ml-16"}
        logoStyle={"rounded-2xl h-28 w-28"}
        iconStyle={"w-28 h-24 "}
        yAction="100"
      />
      <p>This is Home page</p>
    </div>
  );
};

export default Home;
