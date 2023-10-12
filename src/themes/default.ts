import { createTheme } from '@mui/material/styles';

// declare module '@mui/material/styles/createPalette' {
//     interface TypeText {
//         green?: string;
//         purple?: string;
//     }
// }

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#4db6ac',
        },
        secondary: {
            main: '#ce93d8',
        },
        background: {
            default: '#f7fdfc',
            paper: '#f7fdfc',
        },
        // text: {
        //     green: '#09725d',
        //     purple: '#b30f9b',
        // },
    },
});

export default defaultTheme;
