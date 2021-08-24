import axios from "axios";
import cookie from "js-cookie";
import absoluteUrl from "next-absolute-url";
import Router from "next/router";

import {
  CURRENT_USER_PROFILE_DETAILS,
  USER_LOGIN_DETAILS,
  USER_LOGOUT,
  USER_REGISTER_DETAILS,
  USER_LOADING_ACTION,
  AUTHENTICATE,
  DEAUTHENTICATE,
} from "../constants/authConstants";
import { GLOBAL_ALERT } from "../constants/globalConstants";

const register =
  (name, email, password, passwordConfirm) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOADING_ACTION,
        payload: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/register",
        { name, email, password, passwordConfirm },
        config,
      );

      dispatch({
        type: USER_LOADING_ACTION,
        payload: false,
      });

      dispatch({
        type: USER_REGISTER_DETAILS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_DETAILS,
        payload: data,
      });

      setCookie("token", data.token);
      Router.push("/");
      dispatch({ type: AUTHENTICATE, payload: data.token });
    } catch (error) {
      dispatch({
        type: GLOBAL_ALERT,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOADING_ACTION,
      payload: true,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      config,
    );

    dispatch({
      type: USER_LOADING_ACTION,
      payload: false,
    });

    dispatch({
      type: USER_LOGIN_DETAILS,
      payload: data,
    });

    setCookie("token", data.token);
    Router.push("/");
    dispatch({ type: AUTHENTICATE, payload: data.token });
  } catch (error) {
    dispatch({
      type: GLOBAL_ALERT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const logout = () => (dispatch) => {
  removeCookie("token");
  dispatch({ type: USER_LOGOUT });
  Router.push("/login");
  dispatch({ type: DEAUTHENTICATE });
};

const authCookie = (authCookie) => (dispatch) => {
  dispatch({ type: AUTHENTICATE, payload: authCookie });
};

const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  }
};

const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export { register, login, logout, authCookie };
