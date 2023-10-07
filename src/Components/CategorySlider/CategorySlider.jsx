import React from 'react';
import styles from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";


export default function CategorySlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };



  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { isLoading, isError, data } = useQuery('categorySlider', getCategories);
  console.log(data?.data.data);
  return <>






    {data?.data.data? 
    
    

      <div className="py-4 mt-4 pt-4">
            <Slider {...settings}> {data?.data.data.map((category)=> <img height={200} key={category._id} src={category.image} className='w-100'/> )} </Slider>

      </div>    
    
    
    
    : ' '}

  </>
}
