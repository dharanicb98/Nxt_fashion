import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isValidToken } from "../../utils";
import { authSuccess, authFail } from "../../store/reducers/authSlice";
import { error } from "../../store/reducers/loaderSlice";
import ErrorPopup from "../../components/popup/errorPopup";
import Cookies from "js-cookie";
import { FashionLogo } from "../../Icons";

function Login() {
  const errorMessage = useSelector((state) => state.loader.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    window.googleSSOSuccess = function (e) {
      const token = e.credential;

      if (!token) {
      } else {
        localStorage.setItem("token", JSON.stringify(token));
        Cookies.set("accessToken", token);
        const validateToken = isValidToken(token);
        if (validateToken.data) {
          dispatch(authSuccess());
        } else {
          dispatch(error(validateToken.error));
          dispatch(authFail());
        }
      }
    };
    loadScript("https://accounts.google.com/gsi/client");
  }, [dispatch]);

  const loadScript = (url) => {
    const myScript = document.createElement("script");
    myScript.src = url;
    document.body.appendChild(myScript);
  };

  return (
    <>
      {errorMessage && <ErrorPopup isOpen={true} errorMessage={errorMessage} />}
      <div
        // style={{ backgroundImage: "url(`https://img.freepik.com/premium-photo/toy-shopping-trolley-with-colourful-packets_23-2147955541.jpg?w=740`)" }}
        // className="flex flex-col justify-center items-center h-screen bg-image"
        className="bg-image"
      >
        <div>
          <p className="text-white font-bold text-[40px] m-5 welcome_title">Welcome to the Nxt Fashion <br/> Please Login</p>
        </div>

        <div className="ml-[30%] text-center">
          <div className="flex flex-col">
            <FashionLogo className={"text-center ml-16"} logoStyle={"rounded-2xl h-28 w-28"} iconStyle={"w-24 h-24 "} yAction = "100"/>
            <div className="mt-4">
              <GoogleSSOButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GoogleSSOButton() {
  const clientId =
    "763908872557-dairn99om87rgo41oq0g827fe3jg8dvq.apps.googleusercontent.com";

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={clientId}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="googleSSOSuccess"
        data-auto_prompt="false"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
}

export default Login;
