import {get} from '../request';
const BASE_URL = "http://localhost:4000/api/product";

export const getProducts = () =>  get(`${BASE_URL}/`);

