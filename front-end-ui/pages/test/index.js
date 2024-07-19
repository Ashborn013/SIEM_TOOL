import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';


export default function index() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loginCookie = getCookie('login');
    if (loginCookie) {
      setUser(loginCookie);
    }
  }, []);


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
        } else {
          alert("Wrong Password or Email")
        }
      })
      .catch(error => console.error('Error:', error));
  }


  return (
    <div>
      <NavBar />
      <ToastandToast />
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

function handleOnClick() {
  console.log("Yo")


  console.log(x)
}

function ToastandToast() {
  return (<div role="alert" id="error-thing" className="alert alert-error fixed hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 shrink-0 stroke-current"
      fill="none"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>Error! Task failed successfully.</span>
  </div>)
}