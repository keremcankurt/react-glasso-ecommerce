import HomeLayout from './layouts/HomeLayout/HomeLayout';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Register from './pages/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "react-toastify/dist/ReactToastify.css"
import Product from './pages/Product/Product';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AddProduct from './pages/AdminPanel/AddProduct/AddProduct';
import PromotionalMessages from './pages/AdminPanel/AdManagement/PromotionalMessages/PromotionalMessages';
import Banner from './pages/AdminPanel/AdManagement/Banner/Banner';
import Products from './pages/AdminPanel/Products/Products';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { 
  getBanners,
  getProducts,
  getPromotionalMessages,
  getRecommendedProducts,
} from './features/product/productSlice';
import AddCampaign from './pages/AdminPanel/AddCampaign/AddCampaign';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRecommendedProducts())
    dispatch(getBanners())
    dispatch(getPromotionalMessages())
  }, [dispatch]);

  

  return (
    <>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/admin' element={<AdminLayout />}>
          <Route path='add-product' element={<AddProduct />}/>
          <Route path='add-campaign' element={<AddCampaign />}/>
          <Route path='promotional-messages' element={<PromotionalMessages />}/>
          <Route path='banner' element={<Banner />}/>
          <Route path='products' element={<Products />}/>

        </Route>
        <Route path='/' element={<HomeLayout/>}>
          <Route index={true} element={<HomePage/>}/>
          <Route path='product' element={<Product/>}/>
        </Route>

      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
