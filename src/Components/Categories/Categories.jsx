import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';






export default function Categories() {

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [subCategories, setSubcategories] = useState([])


  async function getAllCategories() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data);
  }

  async function getSubCategories(category) {
    setSelectedCategory(category)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${category._id}/subcategories`)
    setSubcategories(data.data);
  }

  useEffect(() => {
    getAllCategories()
  }, [])



  return <>
    <div className="row mt-5">
      {categories.map((category) => <div key={category._id} className='col-md-4'>

        <div onClick={() => getSubCategories(category)} className='product border mt-5 cursor-pointer py-3 px-2'>
          <img height={300} className='w-100 rounded' src={category.image} alt={category.title} />
          <div className="div mt-3">
            <h4 className='text-main text-center fw-bolder'>{category.name}</h4>
          </div>


        </div>

      </div>
      )}
    </div>

    {subCategories && <div>
      <h3 className='text-main text-center mt-4 pt-2'>{selectedCategory.name}</h3>
      <div className="row mt-5">
        {subCategories.map((subcategory) => <div key={subcategory.id} className='col-md-4'>

          <div className="w-25 border py-2 px-2 cursor-pointer mx-4 my-4">

            <h2 className='text-center'>{subcategory.name}</h2>

          </div>

        </div>
        )}
      </div>
    </div>}


  </>
}
