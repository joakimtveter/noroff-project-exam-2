import { createTheme } from '@mui/material/styles'

const defaultTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            light: '#F55C8F',
            main: '#DE2B68',
            dark: '#E70D57',
        },
        secondary: {
            light: '#07F01D',
            main: '#25842E',
            dark: '#1C6423',
        },
    },
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    },
})

export default defaultTheme
