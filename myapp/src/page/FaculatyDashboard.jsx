
import React, { useState } from 'react'
import Studentmarks from './Studentmarks'
import { useNavigate } from 'react-router-dom'
// import AttendanceChart from '../page/AttendChart'
function FaculatyDashboard() {
    let  navigation=useNavigate()
    let [student, setStudent] = useState([])
    let [attendance,setAttendance]=useState({subject:"",date:""})
    let [studentattendance,setStudentAttendance]=useState({})

    let selectStudents = async () => {
        let response = await fetch("http://localhost:5000/studentDetails")
        let result = await response.json()
        setStudent(result)
    }

    let textbxHandler = (e) => {
    const { name, value } = e.target
    setAttendance((prev) => ({
        ...prev,
        [name]: value
    }));
};
    console.log(attendance)

    let saveHandler=async(e)=>{
         e.preventDefault()
          let data = student.map(s => ({
        studentid: s.studentid,
        subject: attendance.subject,
        date: attendance.date,
        status: studentattendance[s.studentid] || "Absent"
    }))
console.log(data)

let response=await fetch("http://localhost:5000/saveAttendance",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
})
let result=await response.json()
if(response.status==200){
    alert(result.message)
}
else{
     alert(result.message)
}
    }
    return (
        <>
            <div>
                <div className='dashboard-container'>
                    <div className='profile-card1'>
                        <h3>Student Attendence Management <i class="fa-solid fa-calendar-check"></i></h3>
                        <div className='btn-group'>
                            <select onChange={textbxHandler} name="subject">
                                <option>...select subject...</option>
                                <option>React</option>
                                <option>Java</option>
                                <option>CSS</option>
                                <option>HTML</option>
                                <option>FSD</option>
                            </select>

                            <input type='date' onChange={textbxHandler} name="date"></input>


                            <button onClick={selectStudents}>
                                Select Students
                            </button>
                                <button onClick={() => navigation('/marks')}>Eter Marks<i className="fa-solid fa-arrow-right"></i></button>
                        </div>
                        <div className='student-table'>

                            <table className='table'>

                                <thead>

                                    <tr>

                                        <th>Img</th>
                                        <th>fname</th>
                                        <th>lname</th>
                                        <th>email</th>
                                        <th>Attendence</th>
                                    </tr>

                                </thead>

                                <tbody>
                                    {
                                        student.map(students => <>
                                            <tr>
                                                <td><img src={`http://localhost:5000/upload/${students.imagepath}`} className='pro-img' /></td>
                                                <td>{students.fname}</td>
                                                <td>{students.lname}</td>
                                                <td>{students.email}</td>

                                                <td>
                                                    <input type="radio" name={`attendance-${students.studentid}`}  onChange={()=>setStudentAttendance((preve)=>({...preve,[students.studentid]:"Present"}))}></input>
                                                    <input type="radio" name={`attendance-${students.studentid}`}   onChange={()=>setStudentAttendance((preve)=>({...preve,[students.studentid]:"Absent"}))}></input></td>

                                            </tr>
                                        </>)
                                    }
                                </tbody>

                            </table>
                            <button className='save-btn' onClick={saveHandler}>Save Attendence</button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default FaculatyDashboard
