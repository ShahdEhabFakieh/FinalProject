import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';



export default function Address() {

  let {OnlinePayment} = useContext(CartContext)


  async function handleSubmit(values){
   let response = await OnlinePayment('650935c445ed4b248c0ead71' , 'https://localhost:3000' , values);
   console.log(response?.data.session.url);
  }


  let formik = useFormik({initialValues: {
    details:'',
    phone:'',
    city:''


  },

  onSubmit: handleSubmit

})
  return <>

  <div className="container">
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor='details'>Details:</label>
      <input value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name='details' id='details' />



      <label htmlFor='phone'>Phone:</label>
      <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control mb-2' name='phone' id='phone' />



      <label htmlFor='city'>City:</label>
      <input value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='form-control mb-2' name='city' id='city' />

      <button type='submit' className='btn bg-info text-white'>Pay Now</button>

    </form>
  </div>

  </>
}
