import {post} from '../request';
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/api/payment"

export const paymentIyzico = (data) =>  post(`${BASE_URL}/paymentIyzico`,data, 'application/json');
export const payment = (data) =>  post(`${BASE_URL}/`,data, 'application/json');