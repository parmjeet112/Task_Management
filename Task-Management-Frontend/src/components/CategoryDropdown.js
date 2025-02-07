import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CategoryDropdown = ({ value, onChange, categories }) => {
    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>Select Category</InputLabel>
            <Select value={value} onChange={(e) => onChange(e.target.value)}>
                <MenuItem value="">Select Category</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CategoryDropdown;
