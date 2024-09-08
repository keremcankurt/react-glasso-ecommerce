import {del, get, post, put} from '../request';
const BASE_URL = "http://localhost:4000/api/admin";

export const addProduct = (data) =>  post(`${BASE_URL}/add-product`,data, 'application/json');
export const deleteProduct = (id) =>  del(`${BASE_URL}/delete-product/${id}`);
export const updateProduct = (id,data) =>  put(`${BASE_URL}/update-product/${id}`,data,'application/json');

export const getPromotionalMessages = () =>  get(`${BASE_URL}/get-messages`);
export const addPromotionalMessage = (data) =>  post(`${BASE_URL}/add-promotional-message`, data, 'application/json');
export const deletePromotionalMessage = (id) =>  del(`${BASE_URL}/delete-promotional-message/${id}`);

export const getBanners = () =>  get(`${BASE_URL}/get-banners`);
export const addBanner = (data) =>  post(`${BASE_URL}/add-banner`, data, 'application/json');
export const deleteBanner = (id) =>  del(`${BASE_URL}/delete-banner/${id}`);
