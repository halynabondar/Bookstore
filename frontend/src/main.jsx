import {CssBaseline} from '@mui/material'
import {StyledEngineProvider} from '@mui/material/styles'
import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import {UserProvider} from "./context/UserContext.jsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <CssBaseline/>
            <BrowserRouter>
                <UserProvider>
                    <App/>
                </UserProvider>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>
)
