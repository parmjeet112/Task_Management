import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const useTheme = () => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return { theme, darkMode, setDarkMode, ThemeProvider };
};

export default useTheme;
