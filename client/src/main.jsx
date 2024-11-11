import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './Features/ContextProvider.jsx'


createRoot(document.getElementById('root')).render(
  <ContextProvider>
  <StrictMode>
      <App />
  </StrictMode>,
  </ContextProvider>
)
