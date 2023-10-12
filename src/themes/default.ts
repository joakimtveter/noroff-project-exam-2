import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface TypeText {
        green?: string;
        purple?: string;
    }
}

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#69f0ae',
        },
        secondary: {
            main: '#ff80ab',
        },
        background: {
            default: '#f7fdfc',
            paper: '#f7fdfc',
        },
        text: {
            green: '#09725d',
            purple: '#b30f9b',
        },
    },
});

export default defaultTheme;
