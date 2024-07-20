import React from 'react'
import {   getCookie, setCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useRouter } from 'next/router'

export default function logout() {
    const router = useRouter()

    useEffect(()=>{
        if(getCookie('login')){
            setCookie('login','',{path:'/',maxAge:-1})

        }
        router.push('/auth/login')
    })

    return (
    <div>
      
    </div>
  )
}
