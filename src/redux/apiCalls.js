import axios from "axios";
import { SUMMER_SHOP } from "../constants";
import { BASE_URL } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, user)
        console.log(res);
        localStorage.setItem(SUMMER_SHOP, res.data.accessToken)
        dispatch(loginSuccess(res.data.user))
    } catch (error) {
        dispatch(loginFailure())
    }
}