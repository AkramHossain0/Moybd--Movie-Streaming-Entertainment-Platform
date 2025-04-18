

---

# 🎬 Moybd Backend

This is the **backend** of the **Moybd** project, built with **Node.js** and **Express.js**. It provides APIs for user authentication, movie posts, comments, contact forms, and admin dashboard functionalities. The backend uses **MongoDB** and secure authentication with **JWT**.

---

## 📌 Overview

The backend handles the core functionality of the **Moybd** project, including:

- User authentication (registration, login, and JWT-based sessions)
- CRUD operations for movies, comments, and genres
- Admin dashboard APIs for managing content and users
- Contact form handling with email notifications
- Google reCAPTCHA integration for bot protection

---

## 🗂️ Directory Structure

```
backend/
├── api/                  # API route handlers
│   ├── Auth.js           # Authentication routes
│   ├── Post.js           # Movie post routes
│   ├── Comments.js       # Comment routes
│   ├── Contact.js        # Contact form routes
│   ├── Dashboard.js      # Admin dashboard routes
│   ├── Genre.js          # Genre-related routes
│   └── captcha.js        # Google reCAPTCHA routes
├── controllers/          # Business logic for APIs
│   ├── Auth.js
│   ├── Post.js
│   ├── Comments.js
│   ├── Contact.js
│   ├── Dashboard.js
│   └── Genre.js
├── libs/                 # Utility libraries
│   └── db.js             # MongoDB connection setup
├── models/               # Mongoose schemas
│   ├── user.js
│   ├── Post.js
│   ├── Comments.js
│   └── Contact.js
├── .env                  # Environment variables
├── main.js               # Entry point for the backend
└── package.json          # Backend dependencies and scripts
```

---

## ✨ Features

- **Authentication**: Secure user registration and login with JWT
- **Movie Posts**: Full CRUD functionality for movie posts
- **Comments**: Add, edit, and delete user comments
- **Genres**: Categorization of movies
- **Admin Dashboard**: APIs for managing users and content
- **Contact Form**: Handles user messages with email notifications
- **Google reCAPTCHA**: Prevents bot submissions
- **Database**: MongoDB integration via Mongoose

---

## 🛠️ Installation

### 1. Install Dependencies

Navigate to the `backend/` directory and run:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

```
PORT=8080
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
RECAPTCHA_SECRET_KEY=<your-recaptcha-secret-key>
EMAIL_USER=<your-email-address>
EMAIL_PASS=<your-email-password>
```

### 3. Start the Development Server

```bash
npm start
```

The backend will run at [http://localhost:8080](http://localhost:8080).

---

## 📜 Scripts

| Script | Description                  |
|--------|------------------------------|
| start  | Starts the backend server    |
| dev    | Starts the server with nodemon |
| test   | Placeholder for future tests |

---

## 🛠️ Technologies Used

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer
- **Bot Protection**: Google reCAPTCHA
- **Env Management**: dotenv

---

## 📂 Key Files

- `main.js`: Entry point for the backend server
- `libs/db.js`: MongoDB connection logic
- `api/`: Route handlers for all backend APIs
- `controllers/`: Business logic for handling requests
- `models/`: Mongoose schemas for database collections

---

## 🔍 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive a JWT

### 🎥 Movies

- `GET /api/movie`: Fetch all movies
- `POST /api/movie`: Create a new movie post
- `PUT /api/movie/:id`: Update a movie post
- `DELETE /api/movie/:id`: Delete a movie post

### 💬 Comments

- `GET /api/comments`: Fetch all comments
- `POST /api/comments`: Add a new comment
- `PUT /api/comments/:id`: Update a comment
- `DELETE /api/comments/:id`: Delete a comment

### 📩 Contact

- `POST /api/contact`: Submit a contact form

### 🛠️ Admin Dashboard

- `GET /api/dashboard`: Fetch admin dashboard data

---

## 📝 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for details.

---

## 📧 Contact

For inquiries or support, reach out at:  
📬 **md.akramhossainjisan@gmail.com**

---

