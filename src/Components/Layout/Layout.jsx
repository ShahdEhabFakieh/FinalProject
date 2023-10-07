import React, { useContext, useEffect } from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../Context/UserContext';
import {Offline , Online} from "react-detect-offline";
export default function Layout() {

  let { setUserToken } = useContext(UserContext);

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      setUserToken(localStorage.getItem('userToken'))
    }
  } , []);

  return <>
  <Navbar/>
  <div className="container">
  <Outlet></Outlet>
  </div>

  <div>
    <Offline>
      <div className='network'>
        <i className='fas fa-wifi'></i> you're Offline (surprise!) </div>
      </Offline>
  </div>
  </>
}
