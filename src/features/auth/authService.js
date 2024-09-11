import {get, post, put} from '../request';
const BASE_URL = "https://glasso-ecommerce-backend.onrender.com/api/auth";

const login = (data) =>  post(`${BASE_URL}/login`,data, 'application/json');
const logout = () =>  get(`${BASE_URL}/logout`);
const register = data => post(`${BASE_URL}/register`,data, 'application/json');
const forgotPassword = data => post(`${BASE_URL}/forgotpassword`,data, 'application/json');
const changePassword = data => put(`${BASE_URL}/changepassword`,data, 'application/json');
const confirmAccount = data => put(`${BASE_URL}/confirmaccount?id=${data.id}&registerUserToken=${data.registerUserToken}`);


const authService = {
    login,
    logout,
    register,
    forgotPassword,
    changePassword,
    confirmAccount,
}

export default authService;