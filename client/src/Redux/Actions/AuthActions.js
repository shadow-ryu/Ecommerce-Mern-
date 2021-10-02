import {
  ALLSELLER,
  ALLUSER,
  AUTH,
  DELETE,
  END_LOADING,
  START_LOADING,
} from "../../constants/ActionTypes";
import * as api from "../../api/api.js";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.loginIn(formData);

    dispatch({ type: AUTH, data });
    if (data?.user.role === "admin" || data?.user.role === "seller") {
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

    if (data?.user.role === "admin" || data?.user.role === "seller") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getAllseller = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.allsellers();

    dispatch({ type: ALLSELLER, payload: { data } });
    dispatch({ type: END_LOADING });
    //
  } catch (error) {
    alert(error);
  }
};

export const updateUserById = (id, router) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.promoteSellerById(id);
    router.push("/admin");
    dispatch({ type: END_LOADING });
    router.push("/admin/allsellerD");
  } catch (error) {
    alert(error);
  }
};
export const deleteuser = (id, router, user) => async (dispatch) => {
  try {
    const { data } = await api.deleteUserById(id);
    router.push("/admin");
    console.log(data);
    dispatch({ type: DELETE, payload: id });
    if (user) {
      router.push("/admin/alluserD");
    }
    if (!user) {
      router.push("/admin/allsellerD");
    }
  } catch (error) {
    alert(error);
  }
};

export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.allusers();

    dispatch({ type: ALLUSER, payload: { data } });
    dispatch({ type: END_LOADING });
    //
  } catch (error) {
    alert(error);
  }
};
