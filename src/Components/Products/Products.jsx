import React from 'react';
import styles from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';


export default function Products() {
  return <>
    <FeaturedProducts />
  </>
}
