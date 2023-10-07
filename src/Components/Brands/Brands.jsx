import React, { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const showAlert = (brand) => {
    alert(`You clicked on ${brand.name}`);
  };

  return (
    <>
      <h1 className='fw-bolder text-center text-main mt-5'>All Brands</h1>

      <div className="row mt-5">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div key={brand.id} className='col-md-3'>
              <div className='product border mt-5 cursor-pointer py-3 px-2' onClick={() => showAlert(brand)}>
                <img height={200} className='w-100 rounded' src={brand.image} alt={brand.title} />
                <h6 className='fw-sm mt-3 text-center fw-bolder'>{brand.name}</h6>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}