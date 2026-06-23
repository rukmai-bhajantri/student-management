import React from 'react'
import { useState } from 'react';
import { FaGoogle, FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import login from '../assets/img/loginimg.jpg'
function Login({updaterole}) {
  // let navigation= useNavigate ()
     let [formdata,setFromData]=useState({email:"",password:""})


     let textbxHandler=(e)=>{
          let { name, value } = e.target
       setFromData((existing) => ({
      ...existing, [name]: value
    }))
    console.log(formdata)
     }

     let submitHandler=async(e)=>{
         e.preventDefault()
    let response=await fetch("http://localhost:5000/studentlogin",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formdata)
    })
    let result=await response.json()
    console.log(result)
    if(response.status!=200){
      alert(result.message)
    }
    else{
      console.log(result.token)
      localStorage.setItem("token",result.token)
      localStorage.setItem("role",result.role)
      updaterole(result.role)
      // navigation('/profile')
    }
     }
  return (
    <div className='login-page'>
     <div className='login-card'>
        <h1>Login</h1>
         <div className="social-icons">
      <div className="icon google">
        <FaGoogle />
      </div>
      <div className="icon insta">
        <FaInstagram />
      </div>
      <div className="icon facebook">
        <FaFacebookF />
      </div>
      <div className="icon twitter">
        <FaTwitter />
      </div>
    </div>
         <h5>or use your email to login</h5>
          <form onSubmit={submitHandler}>
        <div className='admin-form'>
            <input type='text' placeholder='Email Id' className='admin-control' required name='email' onChange={textbxHandler}></input>
        </div>
          <div className='admin-form'>
            <input type='password' placeholder='password' className='admin-control' required name='password' onChange={textbxHandler}></input>
        </div>
         <div className='admin-form'>
            <button className='admin-btn'>Login  <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </form>
     </div>
    </div>
  )
}

export default Login
