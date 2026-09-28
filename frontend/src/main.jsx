import { CssBaseline } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import { BooksProvider, UserProvider, CartProvider } from './context'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <BooksProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </BooksProvider>
        </UserProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>
)
