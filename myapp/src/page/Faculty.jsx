import React, { useState } from 'react'
import logo1 from '../assets/img/facultylogo.png'
import { useNavigate } from 'react-router-dom'
function Faculty({updaterole}) {
   let [formdata,setFromData]=useState({email:"",password:""})
const navigate = useNavigate();

   let textbxHandler=(e)=>{
     let { name, value } = e.target
       setFromData((existing) => ({
      ...existing, [name]: value
    }))
    console.log(formdata)
   }

   let submitHandler=async(e)=>{
     e.preventDefault()
    let response=await fetch("http://localhost:5000/faculatyLogin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formdata)
    })
    let result=await response.json()
    if(response.status!=200){
      alert(result.message)
    }
    else{
       localStorage.setItem("token", result.token)
       localStorage.setItem("role", result.role)
          navigate("/facdashboard")
          updaterole(result.role)
      // console.log(result.token)
       alert(result.message)
    }
   }
  return (
    <>
    <div className='faculty-page'>
        <div className='faculty-card'>
         <img src={logo1} className='faculty-logo'></img>
         <h2>Faculty Login</h2>
           <h5>Welcome back! Please login to your account</h5>
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
    </>
  )
}

export default Faculty