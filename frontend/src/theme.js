import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: 'rgb(var(--color-primary-500) / 1)' },
    background: { default: 'rgb(var(--color-surface) / 1)' },
    text: { primary: 'rgb(var(--color-text) / 1)' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
})

export default theme
