import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#008577',
        },
        secondary: {
            main: '#0abab5',
        },
        background: {
            paper: '#E8FAF9',
        },
    },
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    },
})

export default defaultTheme
