import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MeProvider } from './components/context/Meprovider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MeProvider>
    <App />
    </MeProvider>
  </StrictMode>,
)
