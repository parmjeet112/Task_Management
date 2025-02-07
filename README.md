# **Task Management System**

A full-stack **Task Management System** with a **.NET Core** backend and **React.js** frontend, featuring **secure API communication**, **real-time updates**, and **a beautiful UI with animations**. The project also includes **Docker configuration** and **deployment scripts** for seamless DevOps integration.

---

## **📌 Project Overview**

This project allows users to:  
✅ **Create, update, and delete tasks**  
✅ **Categorize tasks and set priority levels**  
✅ **Filter, search, and track tasks efficiently**  
✅ **Real-time updates and notifications**  
✅ **Secure API communication**  
✅ **Responsive and animated UI**  

---

## **⚙️ Tech Stack**

### **Backend**
- **.NET Core (C#)** – API Development  
- **Entity Framework Core** – ORM for database interactions  
- **SQL Server/MySQL** – Database  
- **MediatR** – CQRS for handling requests  
- **xUnit** – Unit testing  
- **Docker** – Containerization  

### **Frontend**
- **React.js** – UI development  
- **React Router** – Client-side routing  
- **MUI (Material-UI)** – Beautiful UI components  
- **Redux Toolkit** – State management  
- **Axios** – API communication  
- **Framer Motion** – Animations  
- **Bootstrap** – Styling  

---

## **🚀 Setup Instructions**

### **1️⃣ Prerequisites**
Ensure you have these installed:  
✔️ **Node.js** (for frontend)  
✔️ **.NET SDK** (for backend)  
✔️ **SQL Server/MySQL** (for database)  
✔️ **Docker** (optional, for containerized setup)  

---

### **2️⃣ Backend Setup (.NET Core API)**

#### **🔹 Running Locally**
```sh
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

#### **🔹 Running in Docker**
```sh
cd backend
docker build -t task-backend .
docker run -p 5000:5000 task-backend
```

---

### **3️⃣ Frontend Setup (React.js)**

#### **🔹 Running Locally**
```sh
cd frontend
npm install
npm start
```

#### **🔹 Running in Docker**
```sh
cd frontend
docker build -t task-frontend .
docker run -p 3000:3000 task-frontend
```

---

### **4️⃣ Running the Full System (Docker Compose)**

```sh
cd devops
docker-compose up --build
```

---

# 📌 Documentation

This document provides the **API endpoints**, **request methods**, and **descriptions** for the **Task Management System** backend.

---

## 📌 Base URL

http://localhost:5144/api/Task

---

## 📌 Task Endpoints

| Method | Endpoint         | Description                 |
|--------|-----------------|-----------------------------|
| GET    | `/tasks`        | Get all tasks              |
| GET    | `/tasks/{id}`   | Get a specific task        |
| POST   | `/tasks`        | Create a new task          |
| PUT    | `/tasks/{id}`   | Update an existing task    |
| DELETE | `/tasks/{id}`   | Delete a task              |

---

## 📌 Category Endpoints

| Method | Endpoint           | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/categories`     | Get all categories          |
| POST   | `/categories`     | Create a new category       |

---

# 📌 Technical Decisions & Architecture Overview

This document provides an overview of the **architecture**, **design patterns**, and **technologies** used in the **Task Management System**.

---

## 📌 1️⃣ Backend Architecture

The backend is built using **C# .NET Core** and follows a **modular and clean architecture** to maintain **scalability, testability, and separation of concerns**.

### ✅ **Key Design Patterns & Principles**
- **Clean Architecture:** Layers are well-structured (Controllers, Services, Repositories, Database).
- **Repository Pattern:** Separates business logic from data access.
- **CQRS (Command Query Responsibility Segregation):** Using MediatR for handling requests efficiently.
- **Dependency Injection:** Ensures modular and maintainable code.
- **DTOs (Data Transfer Objects):** Used to ensure only required data is exposed.
- **Asynchronous Programming:** Uses `async/await` for better performance and scalability.

### ✅ **Tech Stack**
- **Framework:** .NET Core 7+
- **Database:** SQL Server / MySQL
- **ORM:** Entity Framework Core
- **Authentication:** JWT (optional for future implementation)
- **Unit Testing:** xUnit with Moq
- **Logging:** Serilog
- **API Documentation:** Swagger
- **Containerization:** Docker

---

## 📌 2️⃣ Frontend Architecture

The frontend is a **Single Page Application (SPA)** built with **React.js**, ensuring a **modern, interactive, and responsive** user experience.

### ✅ **Key Features**
- **Component-Based Architecture:** Modular UI components for reusability.
- **State Management:** Uses Redux Toolkit for global state management.
- **API Communication:** Uses Axios for HTTP requests.
- **Routing:** React Router for navigation.
- **Animations & UI Effects:** Framer Motion & Material UI for smooth animations.
- **Responsiveness:** Ensures mobile-friendliness with CSS Flexbox & Grid.

### ✅ **Tech Stack**
- **Framework:** React.js (Latest)
- **UI Library:** Material UI (MUI) + Framer Motion (for animations)
- **State Management:** Redux Toolkit
- **HTTP Client:** Axios
- **Routing:** React Router
- **Form Handling:** React Hook Form
- **Linting & Formatting:** ESLint & Prettier

---

## 📌 3️⃣ Deployment & DevOps

The project is **fully containerized** and can be easily deployed on **cloud services** like AWS, Azure, or DigitalOcean.

### ✅ **Key DevOps Features**
- **Dockerization:** 
  - Backend & Frontend both have **Dockerfiles**.
  - `docker-compose` is used for multi-container setup.
- **Cloud Deployment:** 
  - Backend can be hosted on **AWS EC2, Azure App Service, or DigitalOcean**.
  - Frontend can be hosted on **Vercel or Netlify**.
- **CI/CD Pipelines:** 
  - GitHub Actions / Jenkins (optional for future improvements).
- **Environment Configuration:** 
  - Uses `.env` files to manage secrets securely.

### ✅ **Required Environment Variables**
#### 🔹 Backend (`backend/.env`)
```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
