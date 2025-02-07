import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import { deleteTask } from "../api/taskApi";
import { TextField, Button, Typography, Container, Paper, Box, Card, CardContent } from "@mui/material";
import { Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "../components/TaskTable";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllTasks.css";

const AllTasks = () => {
    const { tasks, setTasks, loading } = useContext(TaskContext);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const displayedTasks = searchQuery ? filteredTasks : tasks;

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter((task) => task.id !== id));
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Failed to delete task!");
        }
    };

    if (loading) return <Loader />;

    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" mt={4}>
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    fullWidth
                    sx={{ maxWidth: 400 }}
                    className="search-input"
                    InputProps={{
                        startAdornment: <Search sx={{ color: "gray", marginRight: 1 }} />,
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate("/add-task")}
                    sx={{
                        padding: "12px 30px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        "&:hover": { boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)" },
                    }}
                >
                    Add Task
                </Button>
            </Box>

            <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        All Tasks
                    </Typography>
                    <TaskTable tasks={displayedTasks} onDelete={handleDelete} />
                </CardContent>
            </Card>
        </Container>
    );
};

export default AllTasks;
