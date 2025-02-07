import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import { getCategories, addCategory } from "../api/categoryApi";
import { createTask } from "../api/taskApi";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { Button, Typography, Container, Paper, Box, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddTask.css";

const AddTask = () => {
    const { setTasks } = useContext(TaskContext);
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

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

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        try {
            const response = await addCategory({ name: newCategoryName });
            const newCategory = response.data;
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            setNewCategoryName("");

            toast.success("New category added!");
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error("Failed to add category!");
        }
    };

    const handleSubmit = async (task) => {
        try {
            const response = await createTask(task);
            const newTask = response.data;

            setTasks((prevTasks) => [...prevTasks, newTask]);
            toast.success("Task added successfully!");

            navigate("/tasks");
        } catch (error) {
            console.error("Error creating task:", error);
            toast.error("Failed to create task!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Add New Task
                </Typography>
                <TaskForm onSubmit={handleSubmit} categories={categories} />
                <Box display="flex" alignItems="center" mt={2} sx={{ gap: 2 }}>
                    <TextField
                        label="New Category"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        onClick={handleAddCategory}
                        variant="contained"
                        startIcon={<AddIcon />}
                        className="custom-btn"
                    >
                        Add Category
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddTask;
