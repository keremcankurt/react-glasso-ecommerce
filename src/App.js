import HomeLayout from './layouts/HomeLayout/HomeLayout';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Register from './pages/Register/Register';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "react-toastify/dist/ReactToastify.css"
import Product from './pages/Product/Product';

function App() {
  return (
    <>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
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
