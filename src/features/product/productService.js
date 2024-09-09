import {get} from '../request';
const BASE_URL = "http://192.168.1.109:4000/api/product";

const getProducts = () =>  get(`${BASE_URL}/`);
const getPromotionalMessages = () =>  get(`${BASE_URL}/get-messages`);
const getBanners = () =>  get(`${BASE_URL}/get-banners`);

const productService = {
    getBanners,
    getProducts,
    getPromotionalMessages,
}

export default productService;

