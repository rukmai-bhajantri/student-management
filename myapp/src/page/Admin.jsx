import React, { useState } from 'react'
import admin from '../assets/img/admin1.png'
import logo from '../assets/img/adminlogo.png'
function Admin({updaterole}) {
 let [formdata,setFromData]=useState({email:"",password:""})


  let textbxHandler=(e)=>{
 let { name, value } = e.target
       setFromData((existing) => ({
      ...existing, [name]: value
    }))
    console.log(formdata)
  }

let submitHndler=async(e)=>{
 e.preventDefault()
  let token = localStorage.getItem("token")
let response=await fetch("http://localhost:5000/adminLogin",{
  method:"POST",
     headers: {
                "authorization": `Bearer ${token}`,
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
   updaterole(result.role)
  alert(result.message)
}
}
console.log(formdata)
  return (
    <div className='admin-page'>
      <div className='left'>
        <img src={admin} className='admin-img'></img>
      </div>

      <div className='right-side'>
        {/* <h1>Admin Login </h1> */}
      <div className='right-card'>
        <img src={logo} className='logo'></img>
        <p>Admin Login</p>
        <h5>Welcome back! Please login to your account</h5>
      <form onSubmit={submitHndler}>
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
      </div>
  )
}

export default Admin
