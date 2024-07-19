import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';


export default function index() {
  
 useEffect (()=>{
  console.log("Render")
  setCookie('servr', 'value',{path : '/api/say'});

}) 

  return (
    <div>
      <NavBar />
      <div className='flex h-screen'>

      </div>
      <SideBar />
    </div>
  )
}