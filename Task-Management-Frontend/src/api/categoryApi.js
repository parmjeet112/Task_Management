import axios from "axios";

const API_URL = "http://localhost:5144/api/Task/category";

export const getCategories = async () => {
    return await axios.get(API_URL);
};

export const addCategory = async (categoryData) => {
    return await axios.post(API_URL, categoryData);
};

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.name;
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        return "N/A";
    }
}