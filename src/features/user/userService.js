import {get, post, put} from '../request';
const BASE_URL = process.env.REACT_APP_API_BASE_URL ?process.env.REACT_APP_API_BASE_URL + "/api/user" : "https://glasso-ecommerce-backend.onrender.com/api/user";

const getProfile = () =>  get(`${BASE_URL}/profile`);
const favProduct = (id) =>  put(`${BASE_URL}/${id}/fav`);
const getCart = cart => post(`${BASE_URL}/cart`,cart,'application/json');

const userService = {
    getProfile,
    favProduct,
    getCart
}

export default userService;