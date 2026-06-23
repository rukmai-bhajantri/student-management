import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profile from '../assets/img/profile1.webp'
import AttendanceChart from './AttendChart'
function Myprofile() {

    let [studentDeatils, setstudentdetails] = useState([])
    let [edit, setEdit] = useState(0)
 
    let [save, setSave] = useState({
        studentid: "",
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        age: ""
    })

    let [attendance, setAttendance] = useState([])
    let [studentmarks,setStudentMarks]=useState([])
    let navigation = useNavigate()

    // GET PROFILE
    let getaData = async () => {
        let token = localStorage.getItem("token")

        let response = await fetch("http://localhost:5000/studentprofile", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        let result = await response.json()
        setstudentdetails(result)
    }

    // GET ATTENDANCE
    let getAttendance = async () => {
        let token = localStorage.getItem("token")

        let response = await fetch("http://localhost:5000/myAttendance", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })

        let result = await response.json()
        setAttendance(result)
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigation('/login')
            return
        }

        getaData()
        getAttendance()
        marksData()
    }, [])

    // EDIT
    let EditeHandler = (student) => {
        setEdit(student.studentid)

        setSave({
            studentid: student.studentid,
            fname: student.fname || "",
            lname: student.lname || "",
            email: student.email || "",
            mobile: student.mobile || "",
            age: student.age || ""
        })
    }

    // INPUT CHANGE
    let texbHandler = (e) => {
        const { name, value } = e.target

        setSave((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // SAVE UPDATE
    let saveHandler = async () => {
        let response = await fetch("http://localhost:5000/UpdateStudentprofile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(save)
        })

        let result = await response.json()

        if (response.status === 200) {
            alert(result.message)
            getaData()
            setEdit(0)
        } else {
            alert(result.message)
        }
    }

    let cancelHandler = () => {
        setEdit(0)
    }

    let marksData=async()=>{
 let response=await fetch("http://localhost:5000/MystudentMarks")
 let result=await response.json()
 setStudentMarks(result)
    }
    console.log(studentmarks)
    return (
        <>
            <div className='dashboard-container'>

                {/* LEFT SIDE PROFILE */}
                <div className='profile-card'>
                    <h3>Welcome 👋</h3>

                    <img src={profile} className='profile-img' alt="profile" />

                    {studentDeatils.map((students, index) => (
                        <div className='profile-container' key={index}>
                            <form>

                                <div className='form-text'>
                                    <label>Firstname:</label>
                                    <input
                                        type='text'
                                        name="fname"
                                        value={edit === students.studentid ? save.fname : students.fname}
                                        onChange={texbHandler}
                                        className='profile-form'
                                    />
                                </div>

                                <div className='form-text'>
                                    <label>Lastname:</label>
                                    <input
                                        type='text'
                                        name="lname"
                                        value={edit === students.studentid ? save.lname : students.lname}
                                        onChange={texbHandler}
                                        className='profile-form'
                                    />
                                </div>

                                <div className='form-text'>
                                    <label>Email:</label>
                                    <input
                                        type='text'
                                        name="email"
                                        value={edit === students.studentid ? save.email : students.email}
                                        onChange={texbHandler}
                                        className='profile-form'
                                    />
                                </div>

                                <div className='form-text'>
                                    <label>Mobile:</label>
                                    <input
                                        type='text'
                                        name="mobile"
                                        value={edit === students.studentid ? save.mobile : students.mobile}
                                        onChange={texbHandler}
                                        className='profile-form'
                                    />
                                </div>

                                <div className='form-text'>
                                    <label>Age:</label>
                                    <input
                                        type='text'
                                        name="age"
                                        value={edit === students.studentid ? save.age : students.age}
                                        onChange={texbHandler}
                                        className='profile-form'
                                    />
                                </div>

                            </form>

                            {edit === students.studentid ? (
                                <div className='profile-btns'>
                                    <button onClick={saveHandler}>✔</button>
                                    <button onClick={cancelHandler}>✖</button>
                                </div>
                            ) : (
                                <button
                                    className='profile-btn'
                                    onClick={() => EditeHandler(students)}
                                >
                                    ✎
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE SUBJECT CARDS */}
                <div className='subject-cards'>

                    <div className='row'>
                    {
                        studentmarks.map(s=><>
                         <div className='sub-card'>
                               <p>Subject: {s.subject}</p> 
                               <p>Subject Type:{s.subjectype}</p> 
                               <p>Date:{new Date(s.date).toLocaleDateString()}</p> 
                               <p>Marks:{s. number}</p> 
                               <p>Total Marks:{s.TotalStudentmarks}</p>          
                               <p>percentage:{s.percentage}</p>
                               <p>Result:{s.Result}</p>
                        </div>
                        
                        </>)
                    }
                    </div>



 <div className='student-table'>

                        <table className='table'>

                            <thead>

                                <tr>

                                    <th>REG NO.</th>
                                    <th>Subjsct</th>
                                    <th>Date</th>
                                    <th>Attends</th>

                                </tr>

                            </thead>

                            <tbody>
                                {
                                    attendance.map(students => <>
                                        <tr>

                                            <td>{students.studentid}</td>
                                            <td>{students.subject}</td>
                                             <td>{new Date(students.date).toLocaleDateString()}</td>
                                            {/* <td>{.date}</td> */}
                                            <td className={students.status === "Present" ? "present" : "absent"}>
                                                {students.status}
                                            </td>


                                        </tr>
                                    </>)
                                }
                            </tbody>

                        </table>
                        <AttendanceChart/>
                    </div>
                </div>
                
            </div>

            
        </>
    )
}

export default Myprofile