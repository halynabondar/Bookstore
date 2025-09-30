import {ThemeProvider, CssBaseline} from '@mui/material'
import {StyledEngineProvider} from '@mui/material/styles'
import React from 'react'
import {createRoot} from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import theme from './theme.js'
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
)
