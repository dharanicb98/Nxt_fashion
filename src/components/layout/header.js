import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authFail } from "../../store/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import { FashionLogo } from "../../Icons";
import { Link } from "react-router-dom";
// import Cookies from "js-cookie";

const Header = () => {
  const [toggleProfile, setToggleProfile] = useState(true);
  const backgroundColor = useSelector((state) => state.navbar.backgroundColor);
  const isStyles = useSelector((state) => state.navbar.isStyles);
  const styles = useSelector((state) => state.navbar.styles);
  const token = localStorage.getItem("token");
  // const token = Cookies.get("accessToken");
  const userDetails = jwtDecode(token);
  const { email, name, picture } = userDetails;

  const dispatch = useDispatch();
  const handleGoToWebsite = () => {
    window.open("https://www.snizle.com");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    // Cookies.remove("accessToken");
    dispatch(authFail());
  };

  return (
    <header
      className="bg-[#59665c] h-[70px] w-[100%] z-[10] flex justify-between items-center px-[20px] fixed top-0 left-0 right-0 shadow-sm"
      style={{ backgroundColor: backgroundColor }}
    >
      <Link to={"/"}>
        <FashionLogo
          bgLogo={backgroundColor}
          logoStyle={
            "rounded h-12 w-28 flex gap-3 flex-col justify-center items-center"
          }
          textStyle = {styles && styles}
          yAction={"43"}
          iconStyle={"w-28 h-8 ml-5"}
        />
      </Link>
      <div
        className={`flex justify-between gap-4 ${
          isStyles ? styles : "text-white"
        } font-[Roboto]`}
      >
        <Link to={"/products"}>Get Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/categories">Categories</Link>
      </div>
      <div className="relative group">
        <img
          src={`${picture}`}
          alt={"profile image"}
          className={"w-[37px] h-[37px] rounded-full cursor-pointer"}
        />
        <div
          className={`absolute bg-white shadow-lg p-6 rounded-md flex flex-col  invisible group-hover:visible -left-[150px] w-[200px]`}
        >
          <span className="text-[20px] font-medium">{name && name}</span>
          <span className="text-slate-500 text-[11px]">{email && email}</span>
          <span className="cursor-pointer py-1" onClick={handleGoToWebsite}>
            Go to Website
          </span>
          <hr />
          <span onClick={handleLogOut} className="cursor-pointer">
            Logout
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
