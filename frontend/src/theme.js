import { createTheme } from "@mui/material/styles";

export default createTheme({
    palette: {
        primary: { main: "rgb(var(--brand-500) / 1)" },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { textTransform: "none", fontWeight: 600, borderRadius: 12 },
            },
        },
    },
});