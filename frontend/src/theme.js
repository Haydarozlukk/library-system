import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#0F5FA6',
            light: '#3D7FBE',
            dark: '#0B477D',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#E31E3E',
            light: '#EA4B65',
            dark: '#B4152F',
            contrastText: '#FFFFFF',
        },
        error: { main: '#D32F2F' },
        warning: { main: '#F5A623' },
        success: { main: '#2E9E5B' },
        background: {
            default: '#F3F4F7',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1B1E24',
            secondary: '#6B7280',
        },
        divider: 'rgba(17,24,39,0.09)',
    },
    shape: {
        borderRadius: 10,
    },
    typography: {
        fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 800, letterSpacing: '-0.01em' },
        h4: { fontWeight: 800, letterSpacing: '-0.01em' },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
        button: { fontWeight: 700, textTransform: 'none' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F3F4F7',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF',
                    color: '#1B1E24',
                    boxShadow: '0 1px 0 rgba(17,24,39,0.08)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#FFFFFF',
                    borderRight: '1px solid rgba(17,24,39,0.08)',
                    backgroundImage: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: '1px solid rgba(17,24,39,0.08)',
                    boxShadow: '0 1px 2px rgba(17,24,39,0.04)',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    paddingLeft: 18,
                    paddingRight: 18,
                },
                contained: {
                    boxShadow: 'none',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            },
        },
    },
});

export default theme;
