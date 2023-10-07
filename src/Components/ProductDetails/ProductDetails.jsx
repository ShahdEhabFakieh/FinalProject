import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';



export default function ProductDetails() {

  let params = useParams()
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { isLoading, isError, data } = useQuery('Productdetails', () => getProductDetails(params.id));
  console.log(data?.data.data);

  let { addToCart, setCartDetails } = useContext(CartContext);
  async function addProductToCart() {
    let { data } = await addToCart(params.id);
    setCartDetails(data);
    if (data.status === 'success') {
      toast('product added to cart successfully')
    }

    else {
      toast.error('failed to add product')
    }
  }

  const [wishList, setWishList] = useState(null);
  let { getLoggedUserWishList, addToWishList, removeFromWishList } = useContext(WishListContext);
  async function addProductToWishList() {
    let { data } = await addToWishList(params.id);
    setWishList(data.data);
    if (data.status === 'success') {
      toast('product added to wishlist successfully')
    }

    else {
      toast.error('failed to add product')
    }
  }
  async function removeProductFromWishList() {
    let { data } = await removeFromWishList(params.id);
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


  return <>

    {data?.data.data ? <div className='row py-2 align-items-center'>

      <Helmet>

        <title>{data?.data.data.title}</title>






      </Helmet>
      <div className="col-md-4">
        <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} />

      </div>
      <div className="col-md-8">
        <h2 className='h4 fw-bolder'>{data?.data.data.title}</h2>
        <p>{data?.data.data.description}</p>
        <h6 className='text-main'>{data?.data.data.category?.name}</h6>
        <h6 className='text-main'> Price: {data?.data.data.price} EGP</h6>

        <div className="d-flex justify-content-between">
          <span>RatingQuantity : {data?.data.data.ratingsQuantity}</span>
          <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
        </div>

        <i onClick={() => wishList?.includes(params.id) ? removeProductFromWishList() : addProductToWishList()}
          class="fa-solid fa-heart fa-2xl" style={{ color: wishList?.includes(params.id) ? '#c91313' : '#000000' }}></i>


        <button onClick={() => addProductToCart()} className='btn bg-main text-white w-75 mt-4 ms-4'> <i class="fa-solid fa-plus"></i> Add</button>

      </div>
    </div> : ''}
  </>
}
