import React, { useState } from 'react'
import '../assets/css/style.css'
import '../assets/css/Media.css'
import City from '../assets/components/City'
import OtpVerify from '../assets/components/OtpVerify'

function SignUp() {
  let [formdata, setformdata] = useState({ fname: "", lname: "", email: "", password: "", mobile: "",
     age: "", dob: "", gender: "", quelification: "", cityid: "" })

let [otp,setOtp]=useState(true)
  let textbxHandler = (e) => {
    let { name, value } = e.target
    setformdata((existing) => ({
      ...existing, [name]: value
    }))
  }

  let submitHandler = async(e) => {
    e.preventDefault()
    let response=await fetch("http://localhost:5000/insertStudent",{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(formdata)
    })
    let result=await response.json()
    console.log(result)
    if(response.status===400){
      alert(result.message)
      return
    }
    else{
      setOtp(false)
      alert(result.message)
    }
  }

  let getSelectCityData = (cityid) => {
    setformdata((existing) => ({
      ...existing, cityid: cityid
    }))
  }
  return (
    <>
    {
      otp===true?
      <>
        <section>
        <div className='reg-container'>
          <div className='reg-main'>
            <h1 className='heading'>Create New Account <i class="fa-solid fa-user-plus"></i></h1>
            <form onSubmit={submitHandler}>
              <div className='row-form'>
                <input type='text' placeholder='First Name' className='form-control' onChange={textbxHandler} name="fname" required/>
                <input type='text' placeholder='Last Name' className='form-control' onChange={textbxHandler} name="lname" required/>
              </div>

              <div className='row-form'>
                <input type='email' placeholder='Email' className='form-control' onChange={textbxHandler} name="email" required/>
                <input type='password' placeholder='Password' className='form-control' onChange={textbxHandler} name="password" required/>
              </div>

              <div className='row-form'>
                <input type='Mobile' placeholder='Mobile Number' className='form-control' onChange={textbxHandler} name="mobile" required/>
                <input type='age' placeholder='Enter Age' className='form-control' onChange={textbxHandler} name="age" required/>
              </div>

              <div className='row-form'>
                <input type='date' placeholder='YYYY-MM-DD' className='date-control' onChange={textbxHandler} name="dob" required/>
              </div>
              <div className='row-form'>
                <select className='form-control' name='gender' onChange={textbxHandler} required>
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>

                <select className='form-control' name='quelification' onChange={textbxHandler} required>
                  <option value=''>Quelification</option>
                  <option value='SSLC'>SSLC</option>
                  <option value='PUC'>PUC</option>
                  <option value='Diploma'>Diploma</option>
                  <option value='Degree'>Degree</option>
                  <option value='BE'>BE</option>
                  <option value='BCA'>BCA</option>
                  <option value='MCA'>MCA</option>
                  <option value='MBA'>MBA</option>
                </select>
              </div>

              <div className='form-control1'>
                <City getSelectCityData={getSelectCityData} required/>
              </div>

              <div className='row-form'>
                <input type="submit" className='sub-btn' />
              </div>
            </form>
          </div>
        </div>
      </section>
      </>:
       <OtpVerify useremail={formdata.email}/>
    }
    </>
  )
}

export default SignUp