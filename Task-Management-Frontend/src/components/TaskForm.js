import { useState, useEffect } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Box } from "@mui/material";
import CategoryDropdown from "./CategoryDropdown";
import SaveIcon from "@mui/icons-material/Save";
import "./TaskForm.css";

const TaskForm = ({ onSubmit, initialTask, categories }) => {
    const [task, setTask] = useState(
        initialTask || { title: "", description: "", isCompleted: false, categoryId: categories[0]?.id || "" }
    );

    useEffect(() => {
        if (initialTask) setTask(initialTask);
    }, [initialTask]);

    useEffect(() => {
        if (!task.categoryId && categories.length > 0) {
            setTask((prev) => ({ ...prev, categoryId: categories[0].id }));
        }
    }, [categories]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
    };

    return (
        <Box className="task-form" component="form" onSubmit={handleSubmit}>
            <TextField
                label="Task Title"
                name="title"
                value={task.title}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="Task Description"
                name="description"
                value={task.description}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={3}
                margin="normal"
            />

            <CategoryDropdown
                value={task.categoryId}
                onChange={(categoryId) => setTask({ ...task, categoryId })}
                categories={categories}
            />

            <FormControlLabel
                control={<Checkbox checked={task.isCompleted} onChange={() => setTask({ ...task, isCompleted: !task.isCompleted })} />}
                label="Completed"
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                fullWidth
            >
                Save Task
            </Button>
        </Box>
    );
};

export default TaskForm;
