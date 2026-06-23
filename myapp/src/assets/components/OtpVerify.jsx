import React, { useState } from 'react'
function OtpVerify({useremail}) {
    let [textbeHandler,settextbeHandler]=useState("")

    let submitHandler=async(e)=>{
    e.preventDefault()
    let response=await fetch("http://localhost:5000/OtpVerify",{
    method:"POST",
    headers:{
       "Content-Type": "application/json"
    },
    body:JSON.stringify({otp:textbeHandler,useremail:useremail})
    })
    let result=await response.json()
    console.log(result)
    if(response.status==400){
        // settextbeHandler("")
        alert(result.message)
    }
    else{
        alert(result.message)
    }
    }
    return (
        <>
          <div className="otp-page">
                        <div className="right">
                                <p>OTP Verification</p>
                                <p>We have sent a 6-digit OTP to your registered mobile/email</p>
                                <p>+91 ******1234</p>
                                <p>Please enter OTP below</p>
                                <form onSubmit={submitHandler} >
                                    <div className='form-control1'>
                                        <input type='text' onChange={(e)=>settextbeHandler(e.target.value)} className='date-control' placeholder='Enter your otp' required></input>
                                    </div>
                                    <div className='form-control1'>
                                        <input type="submit" className='sub-btn'/>
                                    </div>
                                </form>
                            </div>
                        </div>

               
        </>
    )
}

export default OtpVerify
