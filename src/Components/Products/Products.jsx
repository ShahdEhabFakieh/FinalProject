import React from 'react';
import styles from './Products.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';


export default function Products() {
  return <>

<div className="w-75 mx-auto py-5 mt-4">

<input className='form-control mb-2' name='name' id='name' placeholder='Search...'></input>
</div>

    <FeaturedProducts />
  </>
}
