import React, { useContext, useEffect } from 'react';
import styles from './Home.module.css';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';
import Navbar from '../Navbar/Navbar';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import axios from 'axios';



export default function Home() {
  return <>

    <MainSlider />
    <CategorySlider />
    
    <FeaturedProducts />
  </>
}
