
---

# 🎨 Moybd Frontend

This is the **frontend** of the **Moybd** project, built with **Next.js** and styled using **Tailwind CSS**. It provides a seamless user interface for browsing movies, managing content, and interacting with the backend.

---

## 📌 Overview

The frontend is a **React-based** application powered by **Next.js**. It includes features such as:

- Dynamic routing for pages and genres
- Responsive design with Tailwind CSS
- Integration with the backend for authentication, comments, and movie data
- Admin dashboard for managing content

---

## 🗂️ Directory Structure

```
frontend/
├── app/                  # Next.js app directory for pages and components
│   ├── component/        # Reusable UI components
│   ├── admin/            # Admin dashboard pages
│   ├── Romance/          # Example genre-specific pages
│   └── layout.js         # Root layout for the app
├── public/               # Static assets (e.g., images, icons)
├── .env                  # Environment variables for the frontend
├── package.json          # Frontend dependencies and scripts
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.mjs    # PostCSS configuration
```

---

## ✨ Features

- **Dynamic Pages**: Genre-specific pages like Romance, Action, etc.
- **Reusable Components**: Navbar, Footer, Movie cards, etc.
- **Admin Dashboard**: Manage content and users
- **Responsive Design**: Optimized for all screen sizes
- **Secure**: Disables inspect tools for added security

---

## 🛠️ Installation

### 1. Install Dependencies

Navigate to the `frontend/` directory and run:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `frontend/` directory and add the required variables:

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com
# Add other necessary environment variables
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Script | Description                     |
|--------|---------------------------------|
| dev    | Starts the development server   |
| build  | Builds the app for production   |
| start  | Starts the production server    |
| lint   | Runs ESLint to check for issues |

---

## 🛠️ Technologies Used

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Icons**: Boxicons
- **State Management**: React (useState, useEffect)
- **API Integration**: Axios

---

## 📂 Key Files

- `app/layout.js`: Defines the root layout and metadata
- `app/page.js`: Home page of the application
- `app/component/`: Contains reusable components like Navbar, Footer, etc.
- `next.config.mjs`: Configuration for Next.js
- `tailwind.config.js`: Tailwind CSS configuration

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes
4. Commit and push  
   ```bash
   git commit -m "Feature: ..."
   git push origin feature-name
   ```
5. Open a pull request

---

## 📝 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.

---

## 📧 Contact

For inquiries or support, reach out at:  
📬 **md.akramhossainjisan@gmail.com**

---

