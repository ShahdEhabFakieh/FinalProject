import React, { useState } from 'react';
import styles from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  
  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isloading, setisloading] = useState(false)


  async function submitRegister(values) {
    setisloading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>{
    setisloading(false);
    seterror(err.response.data.message)
  })
   if (data.message === 'success'){
    setisloading(false);
    navigate('/login')

   }
  }

  let phoneRegex = /^(?:\+\d{1,3}\s?)?\(?\d{1,3}\)?[-.\s]?\d{1,}-?\d{1,}$/
  let validateScheme = yup.object({
    name: yup.string().min(3, 'min length is 3').max(10, 'name max is 10').required('name is required'),
    email: yup.string().email('email is invalid').required('email is required'),
    phone: yup.string().matches(phoneRegex, 'phone is invalid').required('phone is required'),
    name: yup.string().min(3).max(10).required('name is invalid'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref("password")], 'password doesnot match').required('repassword is required')



  })


  let Formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: '',

    },
    validationSchema: validateScheme,
    onSubmit: submitRegister, // Call the submitRegister function when the form is submitted
  });

  return <>
    <div className="w-75 mx-auto py-5 mt-4">
      {error !==null ?<div className="alert alert-danger">{error}</div>:''}
      <form onSubmit={Formik.handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input className='form-control mb-2' value={Formik.values.name} name='name' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='name'></input>
        {Formik.errors.name && Formik.touched.name ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.name}</div> : ''}




        <label htmlFor='email'>Email</label>
        <input type='email' className='form-control mb-2' value={Formik.values.email} email='email' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='email'></input>
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.email}</div> : ''}





        <label htmlFor='phone'>Phone</label>
        <input className='form-control mb-2' value={Formik.values.phone} phone='phone' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='phone'></input>
        {Formik.errors.phone && Formik.touched.phone ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.phone}</div> : ''}




        <label htmlFor='password'>Password</label>
        <input type='password' className='form-control mb-2' value={Formik.values.password} password='password' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='password'></input>
        {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.password}</div> : ''}




        <label htmlFor='rePassword'>rePassword</label>
        <input type='password' className='form-control mb-2' value={Formik.values.rePassword} rePassword='rePassword' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='rePassword'></input>

        {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.rePassword}</div> : ''}


        {isloading?         <button type='button' className='btn bg-main text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:         <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>
}

      </form>
    </div>
  </>
}
