import {get, put} from '../request';
const BASE_URL = "http://192.168.1.109:4000/api/user";

const getProfile = () =>  get(`${BASE_URL}/profile`);
const favProduct = (id) =>  put(`${BASE_URL}/${id}/fav`);


const userService = {
    getProfile,
    favProduct,
}

export default userService;