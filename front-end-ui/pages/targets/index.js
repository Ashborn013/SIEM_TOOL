import React from 'react'
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar'
// Targets

import { getCookie } from 'cookies-next';


export const getServerSideProps = (context) => {
    const user = getCookie('login', { req: context.req });
  
    if (!user) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
  
    return { props: {} };
  };
  
export default function index() {
    return (
        <div>
            <NavBar/>
            <div className='flex h-screen'>
                
            </div>
            <SideBar />


        </div>
    )
}
