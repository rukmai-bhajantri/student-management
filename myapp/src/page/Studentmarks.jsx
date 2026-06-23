import React from 'react'
import { useState } from 'react'

function Studentmarks() {
    let [formdata, setFormData] = useState({ subject: "", subjectype: "", date: "", number: "" })
    let [studentmarks, setStudentMarks] = useState({})
    let [student, setStudent] = useState([])


    let selectStudents = async () => {
        let response = await fetch("http://localhost:5000/studentDetails")
        let result = await response.json()
        setStudent(result)
    }
    let textbxHandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    let savehandler = async (e) => {
        e.preventDefault()
        let data = student.map((s) => ({
            studentid: s.studentid,
            subject: formdata.subject,
            subjectype: formdata.subjectype,
            date: formdata.date,
            number: studentmarks[s.studentid] || 0
        }))

        let response = await fetch("http://localhost:5000/addstudentmarks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        let result = await response.json()
        if (response.status == 200) {
            alert(result.message)
        }
        else {
            alert(result.message)
        }
        console.log(data)
    }


    return (
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

                        <select onChange={textbxHandler} name="subjectype">
                            <option>...Exam Type...</option>
                            <option value="Internal">Internal</option>
                            <option value="Unit Test">Unit Test</option>
                            <option value="Final Exam">Final Exam</option>
                        </select>

                        <input type='date' name="date" onChange={textbxHandler}></input>


                        <button onClick={selectStudents}>
                            Add Marks
                        </button>
                        {/* <button>Add marks</button> */}
                    </div>
                    <div className='student-table'>

                        <table className='table'>

                            <thead>

                                <tr>

                                    <th>Img</th>
                                    <th>fname</th>
                                    <th>lname</th>
                                    <th>email</th>
                                    <th>marks</th>
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
                                                <input type="number" placeholder="Enter Marks" name="number" onChange={(e) => setStudentMarks({ ...studentmarks, [students.studentid]: e.target.value })} />
                                            </td>
                                        </tr>
                                    </>)
                                }
                            </tbody>

                        </table>
                        <button className='save-btn' onClick={savehandler}>Save marks</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studentmarks