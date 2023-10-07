import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

export default function FeaturedProducts() {

  let { addToCart, setCartDetails } = useContext(CartContext);
  async function addProductToCart(productId) {
    let { data } = await addToCart(productId);
    setCartDetails(data);
    if (data.status === 'success') {
      toast('product added successfully')
    }

    else {
      toast.error('failed to add product')
    }
  }

  const [wishList, setWishList] = useState(null);
  let { getLoggedUserWishList, addToWishList, removeFromWishList } = useContext(WishListContext);
  async function addProductToWishList(productId) {
    let { data } = await addToWishList(productId);
    setWishList(data.data);
    if (data.status === 'success') {
      toast('product added to wishlist successfully')
    }

    else {
      toast.error('failed to add product')
    }
  }
  async function removeProductFromWishList(productId) {
    let { data } = await removeFromWishList(productId);
    setWishList(data.data);
    if (data.status === 'success') {
      toast('product removed from wishlist successfully')
    }

    else {
      toast.error('failed to remove product')
    }
  }
  async function getWishList() {
    let { data } = await getLoggedUserWishList();
    setWishList(data.data.map((product) => product._id));
  }

  useEffect(() => {
    getWishList();
  }, []);

  function getFeaturedProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, isError, data, isFetching } = useQuery('featuredProduct', getFeaturedProduct);
  console.log(data?.data.data);

  return <>
    {isLoading ? <div className="w-100 d-flex justify-content-center py-5">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div> : <div className="container py-2">
      <div className="row">
        {data?.data.data.map((product) => <div key={product._id} className='col-md-2'>


          <div className="product cursor-pointer py-3 px-2">
            <Link to={`/productdetails/${product._id}`}>
              <img className='w-100' src={product.imageCover} alt={product.title} />

              <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
              <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>

              <div className="d-flex justify-content-between mt-3">
                <span>{product.price} EGP</span>

                <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
              </div>

            </Link>

            <i onClick={() => wishList?.includes(product._id) ? removeProductFromWishList(product._id) : addProductToWishList(product._id)}
              class="fa-solid fa-heart fa-2xl" style={{ color: wishList?.includes(product._id) ? '#c91313' : '#000000' }}></i>


            <button onClick={() => addProductToCart(product._id)} className='btn bg-main text-white w-100 btn-sm mt-2'> Add to cart</button>

          </div>

        </div>)}
      </div>
    </div>}




  </>
}
