import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { getCategoryById } from "../api/categoryApi";
import { Table, Tooltip, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "./TaskTable.css";

const TaskTable = ({ tasks, onDelete }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            const categoryMap = {};
            for (const task of tasks) {
                if (task.categoryId && !categoryMap[task.categoryId]) {
                    categoryMap[task.categoryId] = await getCategoryById(task.categoryId);
                }
            }
            setCategories(categoryMap);
        };

        fetchCategories();
    }, [tasks]);

    const StyledTableCell = styled(TableCell)({
        padding: "16px",
        fontSize: "15px",
        textAlign: "center",
        fontWeight: "500",
        color: "#333",
    });

    const StyledTableHeaderCell = styled(TableCell)({
        padding: "16px",
        fontSize: "17px",
        fontWeight: "600",
        textAlign: "center",
        color: "#555",
        backgroundColor: "#f5f5f5",
        borderBottom: "2px solid #ddd",
    });

    return (
        <TableContainer sx={{ maxHeight: 600, borderRadius: 2, boxShadow: 3 }}>
            <Table stickyHeader aria-label="task table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                        <StyledTableHeaderCell>Title</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Description</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Category</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Actions</StyledTableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#f0f0f0",
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                <StyledTableCell>{task.title}</StyledTableCell>
                                <StyledTableCell>{task.description}</StyledTableCell>
                                <StyledTableCell>{task.isCompleted ? "Completed" : "Pending"}</StyledTableCell>
                                <StyledTableCell>{categories[task.categoryId] || "Loading..."}</StyledTableCell>
                                <StyledTableCell>
                                    <Tooltip title="Edit Task">
                                        <IconButton
                                            onClick={() => navigate(`/update-task/${task.id}`)}
                                            sx={{ color: "blue" }}
                                        >
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Task">
                                        <IconButton
                                            onClick={() => onDelete(task.id)}
                                            sx={{ color: "red" }}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                </StyledTableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                <Typography variant="body2" color="textSecondary">
                                    No tasks available.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskTable;
