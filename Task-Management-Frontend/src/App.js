import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/update-task/:id" element={<UpdateTask />} />
        </Routes>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
