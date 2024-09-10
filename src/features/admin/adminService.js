import {del, post, put} from '../request';
const BASE_URL = "http://192.168.1.109:4000/api/admin";

const addProduct = (data) =>  post(`${BASE_URL}/add-product`,data, 'application/json');
const deleteProduct = (id) =>  del(`${BASE_URL}/delete-product/${id}`);
const updateProduct = (id,data) =>  put(`${BASE_URL}/update-product/${id}`,data,'application/json');


const addPromotionalMessage = (data) =>  post(`${BASE_URL}/add-promotional-message`, data, 'application/json');
const deletePromotionalMessage = (id) =>  del(`${BASE_URL}/delete-promotional-message/${id}`);

const addBanner = (data) =>  post(`${BASE_URL}/add-banner`, data, 'application/json');
const deleteBanner = (id) =>  del(`${BASE_URL}/delete-banner/${id}`);

const addRecommendedProduct = (id) =>  post(`${BASE_URL}/add-recommended-product/${id}`);
const deleteRecommendedProduct = (id) =>  del(`${BASE_URL}/delete-recommended-product/${id}`);

const updateCampaign = (data) =>  put(`${BASE_URL}/update-campaign`,data, 'application/json');

const adminService = {
    addBanner,
    addProduct,
    deleteBanner,
    deleteProduct,
    updateProduct,
    updateCampaign,
    addPromotionalMessage,
    addRecommendedProduct,
    deleteRecommendedProduct,
    deletePromotionalMessage,
}

export default adminService;
