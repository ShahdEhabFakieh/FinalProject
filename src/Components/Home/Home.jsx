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
    <div className="w-75 mx-auto py-5 mt-4">

      <input className='form-control mb-2' name='name' id='name' placeholder='Search...'></input>
    </div>
    <FeaturedProducts />
  </>
}
