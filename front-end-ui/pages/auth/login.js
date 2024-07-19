import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router'
export default function index() {
  const [user, setUser] = useState(null)
  const router = useRouter();
  useEffect(()=>{
    if(getCookie('login')){
      setUser(getCookie('login'))
      console.log(user)
    }
  })
  useEffect(()=>{
    if(user){
      router.push('/dashboard')
    }
  },[user])

  function handleSubmit() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.valid === true) {
          setCookie("login", email, { path: '/' })
          alert("loged In")
          // router.push('/dashboard')
        } else {
          alert("Wrong Password or Email")
        }
      })
      .catch(error => console.error('Error:', error));
  }


  return (
    <div>
      <NavBar />
      <div className='flex h-screen'>
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSubmit}  >

                <div className="form-control"  >
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input id="email" type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input id="password" type="password" placeholder="password" className="input input-bordered" required />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary"  >Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  )
}