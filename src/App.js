import './App.css';
import Header from './components/layouts/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { HelmetProvider } from 'react-helmet-async';
import ProductFiles from './components/productFiles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';  
import Login from './components/user/Login';
import Register from './components/user/Register'; 
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Footer from './components/Footer';
import Payment from './components/cart/Payment';
import axios from 'axios';
import OrderSuccess from './components/cart/orderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';

import OtpVerification from './components/user/OtpVerification';
import AboutUs from './components/layouts/AboutUs';

import OfferProductDetail from './components/OfferProductDetail';






function App() {
  const [razorpayApiKey, setRazorpayApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser()); // Load user data

    async function getRazorApikey() {
      try {
        const apiKey="06a4ef90e738b7a0d5a133658ba550ff99d2a5f36351e644f23e51d4a3aa2a26"
        const { data } = await axios.get(`/api/v1/razorpayapi?apiKey=${apiKey}`);
        setRazorpayApiKey(data.razorpayApiKey);
      } catch (error) {
        console.error("Error fetching Razorpay API Key:", error.response ? error.response.data : error.message);
      }
    } 
   
    getRazorApikey();
  }, []);
  const categories = [
    'SNACKS', 'GROCERIES', 'HERBAL', 'CANDIES', 'SWEETS',
    'RICE', 'OIL', 'HOMEAPPLIANCES', 'POOJAITEMS',
  ];
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Header />
        <div className="container">
          <ToastContainer theme='dark' />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<ProductFiles />} />
            
        <Route path="/search/:keyword?" element={<ProductSearch />} />
        {categories.map(category => (
          <Route 
            key={category}
            path={`/search/${category.toLowerCase()}`}
            element={<ProductSearch category={category} />}  
          />
        ))}
      
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/offerproducts/:id' element={<OfferProductDetail/>} />
          
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-otp' element={<OtpVerification/>} />
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
            <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
            <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
            <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path='/orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
            {/* Ensure razorpayApiKey is available before rendering Payment */}
            <Route
              path='/payment'
              element={
                <ProtectedRoute>
                  <Payment razorpayApiKey={razorpayApiKey} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div> 
        <Routes>
        <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>} />
        <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute>} />
        <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>} />
        <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>} />
        <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>} />
        <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>} />
        <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>} />
        <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>} />
        <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ReviewList/></ProtectedRoute>} />
        </Routes>
        <br /><br />
        <Footer />
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
