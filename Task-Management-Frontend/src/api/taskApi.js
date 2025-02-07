import axios from "axios";

const API_URL = "http://localhost:5144/api/Task";

export const getAllTasks = async () => {
    return await axios.get(API_URL);
};

export const getTaskById = async (id) => {
    return await axios.get(`${API_URL}/${id}`);
};

export const createTask = async (taskData) => {
    return await axios.post(API_URL, taskData);
};

export const updateTask = async (id, taskData) => {
    return await axios.put(`${API_URL}/${id}`, taskData);
};

export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
