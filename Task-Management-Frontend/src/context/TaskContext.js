import { createContext, useState, useEffect } from "react";
import { getAllTasks } from "../api/taskApi";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getAllTasks();
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, loading }}>
            {children}
        </TaskContext.Provider>
    );
};
