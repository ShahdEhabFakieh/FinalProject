import './App.css';
import React, { useContext, useEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import UserContextProvider, { UserContext } from './Context/UserContext';
import Navbar from './Components/Navbar/Navbar';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import WishList from './Components/WishList/WishList';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import FeaturedProducts from './Components/FeaturedProducts/FeaturedProducts';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider, CartContext } from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { WishListContextProvider } from './Context/WishListContext';

let routers = createHashRouter([
  {
    path: '/', element: <Layout />, children: [
      { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
      { path: 'WishList', element: <ProtectRoute><WishList /></ProtectRoute> },
      { path: 'Products', element: <ProtectRoute><Products /></ProtectRoute> },
      { path: 'Cart', element: <ProtectRoute><Cart /></ProtectRoute> },
      { path: 'Categories', element: <ProtectRoute><Categories /></ProtectRoute> },
      { path: 'Brands', element: <ProtectRoute><Brands /></ProtectRoute> },
      { path: 'address/:id', element: <ProtectRoute><Address /></ProtectRoute> },
      { path: 'allorders/:id', element: <ProtectRoute><Orders /></ProtectRoute> },

      { path: 'ProductDetails/:id', element: <ProtectRoute><ProductDetails /></ProtectRoute> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
    ]
  }
])

function App() {


  return <UserContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
        <RouterProvider router={routers}></RouterProvider>
      </WishListContextProvider>
    </CartContextProvider>
    <Toaster />
  </UserContextProvider>
}

export default App;
