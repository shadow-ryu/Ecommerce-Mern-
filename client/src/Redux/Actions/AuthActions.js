import { AUTH, LOGOUT } from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.loginIn(formData);

    dispatch({ type: AUTH, data });
    if (data?.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    alert(error + " Wrong Credantials");
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    if (data?.user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    alert(error);
  }
};
