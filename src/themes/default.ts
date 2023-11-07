import { createTheme } from '@mui/material/styles'

// declare module '@mui/material/styles/createPalette' {
//     interface TypeText {
//         green?: string;
//         purple?: string;
//     }
// }

const defaultTheme = createTheme({
    palette: {
        primary: {
            dark: '#05445E',
            main: '#0088A3',
            light: '#D4F1F4',
        },
        secondary: {
            dark: '#00726F',
            main: '#0abab5',
            light: '#0CE6DF',
        },
        background: {
            paper: '#E7F7F9',
        },
        // text: {
        //     green: '#09725d',
        //     purple: '#b30f9b',
        // },
    },
    typography: {
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    },
})

export default defaultTheme
