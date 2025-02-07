import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#4CAF50' },
        secondary: { main: '#FF9800' },
        background: { default: '#F4F6F8' },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

export default theme;
