import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../api/taskApi";
import { getCategories } from "../api/categoryApi";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import { Container, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { pre } from "framer-motion/m";

const UpdateTask = () => {
    const { id } = useParams();
    const { setTasks } = useContext(TaskContext);
    const [task, setTask] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskById(id);
                setTask(response.data);
            } catch (error) {
                console.error("Error fetching task:", error);
                toast.error("Failed to load task details.");
                navigate("/tasks");
            }
        };

        fetchTask();
        fetchCategories();
    }, [id, navigate]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleUpdate = async (updatedTask) => {
        try {
            await updateTask(id, updatedTask);
            toast.success("Task updated successfully!");
            setTasks((prevTasks) => {
                for (var i = 0; i < prevTasks.length; i++) {
                    if (prevTasks[i].id == id) prevTasks[i] = updatedTask;
                }
                return prevTasks;
            });

            navigate("/tasks");
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task.");
        }
    };

    if (!task) return <Typography>Loading task details...</Typography>;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Update Task
                </Typography>
                <TaskForm onSubmit={handleUpdate} initialTask={task} categories={categories} />
            </Paper>
        </Container>
    );
};

export default UpdateTask;
