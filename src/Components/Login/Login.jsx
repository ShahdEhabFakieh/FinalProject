import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';


export default function Login() {

  let {setUserToken} = useContext(UserContext);

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isloading, setisloading] = useState(false)


  async function submitLogin(values) {
    setisloading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => {
      setisloading(false);
      seterror(err.response.data.message)
    })
    if (data.message === 'success') {
     
      setisloading(false);
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')

    }
  }

  let validateScheme = yup.object({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase').required('password is required'),


  })


  let Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateScheme,
    onSubmit: submitLogin,
  });

  return <>
    <div className="w-75 mx-auto py-5 mt-4">
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''}

      <h2>Login Now</h2>
      <form onSubmit={Formik.handleSubmit}>


        <label htmlFor='email'>Email</label>
        <input type='email' className='form-control mb-2' value={Formik.values.email} email='email' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='email'></input>
        {Formik.errors.email && Formik.touched.email ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.email}</div> : ''}



        <label htmlFor='password'>Password</label>
        <input type='password' className='form-control mb-2' value={Formik.values.password} password='password' onChange={Formik.handleChange} onBlur={
          Formik.handleBlur} id='password'></input>
        {Formik.errors.password && Formik.touched.password ? <div className="alert alert-danger pt-2 mt-2">{Formik.errors.password}</div> : ''}


        {isloading ? <button type='button' className='btn bg-main text-white mt-2'><i className='fas fa-spinner fa-spin'></i> </button> :
          <>

          <div className="d-flex align-items-center m-2">
          <button disabled={!(Formik.isValid && Formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button> <Link className='btn' to={'/Register'}>Register Now</Link>

          </div>
          </>
        }
      </form>
    </div>
  </>
}
