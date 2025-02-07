import { Link } from "react-router-dom";
import { FaHome, FaTasks, FaPlus } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Task Manager</h2>
            <nav>
                <Link to="/"><FaHome /> Home</Link>
                <Link to="/tasks"><FaTasks /> All Tasks</Link>
                <Link to="/add-task"><FaPlus /> Add Task</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
