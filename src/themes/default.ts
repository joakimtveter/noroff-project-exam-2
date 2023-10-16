import { amber, deepOrange, orange, red } from '@mui/material/colors';
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
            main: red[500],
        },
        secondary: {
            main: amber[500],
        },
        // text: {
        //     green: '#09725d',
        //     purple: '#b30f9b',
        // },
    },
});

export default defaultTheme;
