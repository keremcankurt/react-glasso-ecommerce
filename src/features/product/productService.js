import {get} from '../request';
const BASE_URL = "http://192.168.1.109:4000/api/product";

const getProducts = () =>  get(`${BASE_URL}/`);
const getPromotionalMessages = () =>  get(`${BASE_URL}/messages`);
const getBanners = () =>  get(`${BASE_URL}/banners`);
const getRecommendedProducts = () =>  get(`${BASE_URL}/recommended-products`);

const productService = {
    getBanners,
    getProducts,
    getPromotionalMessages,
    getRecommendedProducts,
}

export default productService;

