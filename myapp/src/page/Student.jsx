import React, { useEffect, useState } from 'react'
import ImgUpload from '../assets/components/ImgUpload'
import City from '../assets/components/City'
function Student() {
  let [formdata, setFromData] = useState({ fname: "", lname: "", email: "", password: "",quid: "", cityid: "" })
  let [qualification, setQualification] = useState([])
  let [pimg, setpimg] = useState([])
  let [student,setStudent]=useState([])

  let getData = async () => {
    let response = await fetch("http://localhost:5000/qualification")
    let result = await response.json()
    setQualification(result)
  }

  let studentData=async()=>{
    let response = await fetch("http://localhost:5000/studentDetails")
    let result = await response.json()
    setStudent(result)
  }
  console.log(student)
  useEffect(() => {
    getData()
    studentData()
  }, [])

  let textbxHandler = (e) => {
    let { name, value } = e.target
    setFromData((existing) => ({
      ...existing, [name]: value
    }))
    console.log(formdata)
  }

  let getSelectCityData = (cityid) => {
    console.log(cityid)
    setFromData((existing) => ({
      ...existing, cityid: cityid
    }))
  }
  let getimage = (img) => {
    setpimg(img)
    console.log(img)
  }
  let submitHandler = async (e) => {
    e.preventDefault()
    const formHandler = new FormData()
    formHandler.append("fname", formdata.fname)
    formHandler.append("lname", formdata.lname)
    formHandler.append("email", formdata.email)
    formHandler.append("password", formdata.password)
    formHandler.append("quid", formdata.quid)
    formHandler.append("cityid", formdata.cityid)
    pimg.map(pimgs => formHandler.append("images", pimgs.file))
    let response = await fetch("http://localhost:5000/addproducts", {
      method: 'POST',
      body: formHandler
    })
    let result = await response.json()
    console.log(formdata)
    if (response.status == 200) {
      alert(result.message)
      studentData()
    }
    else {
      alert(result.message)
    }
  }

  let studentDeleteHandler=async(studentid)=>{
   let response=await fetch(`http://localhost:5000/deletestudents/${studentid}`,{
      method:'DELETE'
    })
    let result=await response.json()
    console.log(result)
    if(response.status==200){  
      alert(result.message)
      studentData()
    }
    else{
       alert(result.message)
    }
  }
  return (
    <>
      <div className='student-page'>
        <div className='text-form'>
          <h1>Students <i class="fa-solid fa-graduation-cap"></i></h1>
          <div className='qua-form'>
            <select className='que-control' name='quid' onChange={textbxHandler}>
              {
                qualification.map(qulist => <>
                  <option value={qulist.quid}>{qulist.quname}</option>
                </>)
              }
            </select>
          </div>
          <div className='row-form'>
            <input type='text' placeholder='First Name' className='que-control' name="fname" required onChange={textbxHandler} />
            <input type='text' placeholder='Last Name' className='que-control' name="lname" required onChange={textbxHandler} />
          </div>
          <div className='row-form'>
            <input type='email' placeholder='Email' className='que-control' name="email" required onChange={textbxHandler} />
            <input type='password' placeholder='Password' className='que-control' name="password" required onChange={textbxHandler} />
          </div>
          <div className='qua-form'>
            <div className='form-control1'>
              <City getSelectCityData={getSelectCityData} required />
            </div>
          </div>
          <div className='qua-form'>
            <ImgUpload getimage={getimage} />
          </div>
          <div className='qua-form'>
            <input type='Submit' className='subbtn' onClick={submitHandler}></input>
          </div>
        </div>
      </div>

    <div className='student-table'>

  <table className='table'>

    <thead>

      <tr>
        
        <th>Img</th>
        <th>fname</th>
        <th>lname</th>
        <th>email</th>
        <th>button</th>
      </tr>

    </thead>

    <tbody>
{
  student.map(students=><>
    <tr>
   <td><img src={`http://localhost:5000/upload/${students.imagepath}`} className='pro-img'/></td>
   <td>{students.fname}</td>
   <td>{students.lname}</td>
   <td>{students.email}</td>
   
   <td><button><i class="fa-solid fa-pen-to-square"></i></button>
   <button onClick={()=>studentDeleteHandler(students.studentid)}><i class="fa-solid fa-trash"></i></button></td>
   </tr>
  </>)
}
    </tbody>

  </table>

</div>
    </>
  )
}

export default Student