# 🎓 LearnSite – Educational Platform

A **learning management system (LMS)** built with **Node.js** and **Express.js**, providing core features for managing users, courses, and authentication.  
The backend is connected to a **MongoDB database** using **Mongoose** and supports secure authentication, file uploads, and email notifications.  

---

## 🚀 Features

- **User Authentication** (JWT-based login & signup)  
- **Password Hashing** with bcrypt  
- **Role-based access** (Admin / Student – extendable)  
- **Course Management**  
  - Add, update, and delete courses (admin)  
  - View and enroll in courses (student)  
- **File Uploads** using Multer (e.g., course thumbnails, documents)  
- **Data Validation** with Fastest Validator  
- **Email Notifications** via Nodemailer (e.g., signup confirmation)  
- **Environment Configuration** using dotenv  
- **Security** with crypto & JWT tokens  
- **CORS support** for frontend integration  

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT, bcrypt  
- **Validation:** Fastest Validator  
- **File Handling:** Multer  
- **Email Service:** Nodemailer  
- **Environment Config:** dotenv  

---

## 📂 Project Structure (example)


LearnSite/
│── server.js # Entry point
│── config/ # Database & env config
│── models/ # Mongoose models
│── routes/ # Express routes (auth, courses, users)
│── controllers/ # Route controllers (business logic)
│── middlewares/ # Auth, validation, etc.
│── uploads/ # Uploaded files (e.g., images)
│── utils/ # Helper functions (email, crypto, etc.)
└── .env # Environment variables


---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/sabzlearn.git
cd sabzlearn
npm install
PORT=5000
MONGO_URI=mongodb://localhost:27017/sabzlearn
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
npm run dev
```



