const express = require('express')
const app = express()
const db = require('./dbConfing')
const cors = require('cors')
const path = require('path')
const nodemailer = require("nodemailer")
require('dotenv').config()
const bcrypt = require('bcrypt');
const multer = require('multer')
const e = require('express')
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(cors())

app.use('/upload', express.static(path.join(__dirname, 'upload')));

let myscryteToken = "myItershipProject"
let Otpstorage = {}
const saltRounds = 10;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

app.get("/cityData", (req, res) => {
    let sql = "select * from city"
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json(result)
        }

    })
})

let findExistingUser = (useremail, callback) => {
    let sql = "select * from students where email=?"
    db.query(sql, [useremail], callback)
}

app.post("/insertStudent", (req, res) => {
    const { fname, lname, email, password, mobile, age, dob, gender, quelification, cityid } = req.body
    findExistingUser(email, async (err, result) => {
        if (result.length > 0) {
            console.log(err)
            return res.status(400).json({ message: "User alerday Exsting" })
        }
        else {
            let otp = Math.floor(Math.random() * 100000)
            console.log(otp)
            Otpstorage[email] = { otp: otp, expires: Date.now() + 2 * 60 * 1000, studentdetails: { fname, lname, email, password, mobile, age, dob, gender, quelification, cityid } }
            const mailoption = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "your otp is code",
                text: `your otp is ${otp}. It is valid for 2 minutes`
            };
            await transporter.sendMail(mailoption)
            return res.status(200).json({ message: "Otp send successfully" })
        }
    })
})

app.post("/OtpVerify", (req, res) => {
    const { otp, useremail } = req.body
    if (!Otpstorage[useremail]) {
        return res.status(400).json({ message: "otp not required" })
    }
    if (Otpstorage[useremail].expires < Date.now()) {
        delete Otpstorage[useremail]
        return res.status(400).json({ message: "otp expired" })
    }
    if (Otpstorage[useremail].otp != otp) {
        return res.status(400).json({ message: "Invalid otp" })
    }
    const { fname, lname, email, password, mobile, age, dob, gender, quelification, cityid
    } = Otpstorage[useremail].studentdetails

    let sql = "insert into students(fname, lname, email, password, mobile, age, dob, gender, quelification, cityid)values(?,?,?,?,?,?,?,?,?,?)"
    bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "hashing password Error" })
        }
        db.query(sql, [fname, lname, email, hash, mobile, age, dob, gender, quelification, cityid], (err, result) => {
            if (err) {
                console.log("DATABASE ERROR :", err)
                return res.status(500).json({ message: "Database error" })
            }
            delete Otpstorage[useremail]
            return res.status(200).json({
                message: "User Registered successfully"
            })
        }
        )
    })
})
// console.log(otp,useremail)
// console.log(Otpstorage)
// console.log(Otpstorage[useremail].otp==otp)
// console.log("otptime",Otpstorage[useremail].expires>Date.now())studentid, fname, lname, email, password, mobile, age, dob, gender, quelification, cityid


app.get("/qualification", (req, res) => {
    let sql = "select * from qualification"
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" })
        else return res.status(200).json(result)
    })
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const stringval = "student_img"
        const extension = path.extname(file.originalname)
        const datetime = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
        const randomNum = Math.floor(Math.random() * 10000)
        const uniquefilename = `${stringval}_${datetime}_${randomNum}${extension}`
        cb(null, uniquefilename)
    }
})

console.log(storage)
const upload = multer({ storage: storage })



app.post('/addproducts', upload.array("images"), (req, res) => {

    const { fname, lname, email, password, cityid, quid } = req.body

    let images = req.files.map(file => file.filename)

    let sql = "insert into studentd(fname,lname,email,password,cityid,qu_id) values(?,?,?,?,?,?)"

    db.query(sql, [fname, lname, email, password, cityid, quid], (err, result) => {

        if (err) {
            console.log(err)
        }
        else {

            let imgsql = "insert into pimages(imagepath,qid) values(?,?)"

            images.map(imagepath => {

                db.query(imgsql, [imagepath, quid], (err) => {

                    if (err) console.log(err)
                    else console.log("Img Inserted")

                })

            })

            res.send("Data Inserted")

        }

    })

})

app.get('/studentDetails', (req, res) => {
    let sql = `select s.*,pimgid.imgid,pimages.imagepath from studentd as s inner join
(
select qid,min(imageid) as imgid from pimages
group by qid)as pimgid on pimgid.qid=s.qu_id

inner join pimages on pimages.imageid=pimgid.imgid`

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" })
        else return res.status(200).json(result)
    })
})

app.delete('/deletestudents/:id', (req, res) => {
    const sid = req.params.id
    const sql = "delete from studentd where studentid=?"
    db.query(sql, [sid], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database error" })
        }
        else {
            return res.status(200).json({ message: "Delete Students" })
        }
    })
})


let GenerateToken = (studentid, role) => {
    console.log(studentid, role)
    return jwt.sign({ studentid, role }, myscryteToken, { expiresIn: '1h' })
}

let veryfitoken = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ error: "unauthorized" })

    jwt.verify(token, myscryteToken, (err, decode) => {
        req.user = decode
        next()
    })
}

app.post('/studentlogin', (req, res) => {
    const { email, password } = req.body
    findExistingUser(email, async (err, result) => {
        if (err) return res.status(500).json({ message: "Database Error" })
        else {
            if (result.length > 0) {
                let passwordResult = await bcrypt.compare(password, result[0].password)
                if (passwordResult == true) {
                    let studentId = result[0].studentid
                    let role = result[0].role
                    let token = GenerateToken(studentId, role)
                    console.log(token)
                    return res.status(200).json({ token: token,role:role })
                }
                else {
                    return res.status(401).json({ message: "Wrong Password" })
                }
            }
            else {
                return res.status(404).json({ message: "User Not Found" })
            }
        }
    })
})

app.get('/studentprofile', veryfitoken, (req, res) => {
    console.log(req.user)

    let sql = "select * from students where studentid=?"

    db.query(sql, [req.user.studentid], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" })
        } else {
            return res.status(200).json(result)
        }
    })
})

app.put('/UpdateStudentprofile', (req, res) => {
    const { studentid, fname, lname, email, mobile, age } = req.body
    let sql = "update students set  fname=?,lname=?,email=?,mobile=?,age=? where studentid=?"
    db.query(sql, [fname, lname, email, mobile, age, studentid], (err) => {
        if (err) return res.status(500).json({ message: "Database error" })
        else {
            return res.status(200).json({ message: "Update Sucessfully" })
        }
    })
})

app.post('/faculatyLogin', (req, res) => {
    const { email, password } = req.body
    let sql = "select * from faculaty where email=? and password=?"
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" })
        }
        if (result.length == 0) {
            console.log(err)
            return res.status(404).json({ message: "Invalid Email or Password" })
        }
        let facultyId = result[0].fact_id
        let role = result[0].role
        let token = GenerateToken(facultyId, role)
        console.log(token)
        res.status(200).json({ message: "Login Successful", token: token,role:role })
    })
})

app.post('/adminLogin', (req, res) => {
    const { email, password } = req.body
    let sql = "select * from admin where email=? and password=?"
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database error" })
        }
        if (result.length == 0) {
            return res.status(404).json({ message: "Invalid Email or Password" })
        }
        let adminId = result[0].adminid
        let role = result[0].role
        let token = GenerateToken(adminId, role)
        console.log(token)
        res.status(200).json({ message: "Login Successful", token: token,role:role })
    })
})

app.post('/saveAttendance', (req, res) => {
    const data = req.body
    let Data = req.body.map(s => [s.studentid, s.subject, s.date, s.status])
    console.log(Data)
    let sql = "insert into attendance(studentid, subject, date, status)values ?"
    db.query(sql, [Data], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json({ message: "Add Attendance sucessfully" })
        }
    })
})

app.get('/myAttendance', veryfitoken, (req, res) => {
    console.log(req.user)
    let sql = "select * from attendance where studentid=?"
    db.query(sql, [req.user.studentid], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error" })
        else {
            return res.status(200).json(result)
        }
    })
})

app.post('/addstudentmarks', (req, res) => {
    let data = req.body
    let Data = req.body.map(s => [s.studentid, s.subject, s.subjectype, s.date, s.number])
    console.log(data)
    let sql = "insert into studentmarks(studentid,subject,subjectype,date,number)values ?"
    db.query(sql, [Data], (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json({ message: "Add marks sucessfully" })
        }
    })
})

app.get('/MystudentMarks', (req, res) => {
    let sql = `SELECT 
    studentid, subject, subjectype, date, number,
    SUM(number) AS TotalStudentmarks,
    CONCAT(ROUND((SUM(number) / 400) * 100), '%') AS percentage,

    CASE
        WHEN (SUM(number) / 400) * 100 >= 40 THEN 'Pass'
        ELSE 'Fail'
    END AS Result

FROM studentmarks
where studentid=1
GROUP BY studentid, subject, subjectype, date, number ;`
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ message: "Database Error" })
        }
        else {
            return res.status(200).json(result)
        }
    })
})

app.listen(5000, (err) => {
    if (err) console.log(err)
    else console.log("Server runing in port 5000")
})
// fname: 'ouyuityt',
//   lname: 'hubbli',
//   email: 'h@gmail.com',
//   mobile: '09606761904',
//   age: 