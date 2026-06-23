# Student Management System

A full-stack Student Management System developed using React.js, Node.js, Express.js, and MySQL. The system provides secure authentication and role-based access for Admin, Faculty, and Students.

## Features

### Authentication & Authorization
- User Login & Registration
- JWT Authentication
- Role-Based Access Control
- Secure Password Encryption

### Admin Module
- Manage Students
- Manage Faculty
- View All Records
- Control User Access

### Faculty Module
- View Assigned Students
- Add Student Marks
- Update Student Academic Records

### Student Module
- Login to Personal Dashboard
- View Profile Information
- View Marks and Academic Performance

## Technology Stack

### Frontend
- React.js
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Authentication
- JWT (JSON Web Token)
- Bcrypt

## Project Structure

```
student-management/
│
├── myapp/          # React Frontend
├── backend/        # Node.js Backend
├── README.md
└── .gitignore
```

## Installation

### Clone Repository

```bash
git clone https://github.com/rukmai-bhajantri/student-management.git
```

### Install Frontend Dependencies

```bash
cd myapp
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create `.env` file inside backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=student_management
JWT_SECRET=your_secret_key
```

### Run Backend

```bash
cd backend
npm start
```

### Run Frontend

```bash
cd myapp
npm run dev
```

## Future Enhancements

- Attendance Management
- Result Analytics
- Notifications System
- File Upload Support
- Report Generation

## Author

**Rukmai Bhajantri**
