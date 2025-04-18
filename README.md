Here’s your updated `README.md` file with **"Movie App"** changed to **"Moybd"** throughout the document:

---

# 🎬 Moybd

## 📌 Overview

**Moybd** is a full-stack web application featuring a **Next.js frontend** and a **Node.js (Express) backend**. It includes features such as user authentication, commenting, a contact form, admin dashboard, and categorized movie posts by genre.

---

## 🗂️ Project Structure

```
Moybd/
├── backend/
│   ├── api/              # API routes for various features
│   ├── controllers/      # Business logic controllers
│   ├── libs/             # Utility libraries (e.g., DB connection)
│   ├── models/           # Mongoose models (e.g., User, Post, Comment)
│   ├── .env              # Backend environment variables
│   ├── main.js           # Backend entry point
│   └── package.json      # Backend dependencies and scripts
├── frontend/
│   ├── app/              # Next.js app pages and components
│   ├── public/           # Static assets
│   ├── .env              # Frontend environment variables
│   ├── package.json      # Frontend dependencies and scripts
│   ├── next.config.mjs   # Next.js configuration
│   └── tailwind.config.js# Tailwind CSS configuration
├── package.json          # Root-level scripts for managing the project
└── README.md             # Project documentation
```

---

## ✨ Features

- **Frontend**: Built with [Next.js](https://nextjs.org/) and styled using [Tailwind CSS](https://tailwindcss.com/).
- **Backend**: Powered by [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/), connected to MongoDB.
- **Authentication**: Secure user registration and login.
- **Comments**: Users can post and manage comments on movie posts.
- **Contact Form**: Users can send messages and inquiries.
- **Dashboard**: Admin panel for managing content and users.
- **Genres & Posts**: Categorization for organizing movies.

---

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Moybd
```

### 2. Install Dependencies

```bash
npm run install:all
```

This installs dependencies for both `frontend/` and `backend/`.

### 3. Configure Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories. Add necessary variables such as:

- MongoDB URI
- API base URLs
- Secret keys
- Next.js runtime configs

### 4. Start Development Servers

```bash
npm run dev
```

This will start both the frontend and backend in development mode.

---

## 📜 Scripts (Root `package.json`)

| Script             | Description                                      |
|--------------------|--------------------------------------------------|
| `dev`              | Starts both frontend and backend concurrently    |
| `frontend`         | Starts only the frontend server                  |
| `backend`          | Starts only the backend server with `nodemon`   |
| `install:all`      | Installs dependencies for both frontend & backend |
| `install:frontend` | Installs only frontend dependencies              |
| `install:backend`  | Installs only backend dependencies               |

---

## 🔍 Backend Details

- **APIs**: Located in `backend/api/`
- **Controllers**: Business logic in `backend/controllers/`
- **Models**: Mongoose schemas in `backend/models/`
- **DB Connection**: Configured in `backend/libs/db.js`

---

## 🖥️ Frontend Details

- **Framework**: Built with Next.js
- **Styling**: Tailwind CSS
- **Config**: Managed in `next.config.mjs` and `tailwind.config.js`

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit and push (`git commit -m "Feature: ..." && git push origin feature-name`).
5. Open a pull request.

---

## 📝 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.

---

## 📧 Contact

For inquiries or support, reach out at: **[md.akramhossainjisan@gmail.com]**

---
