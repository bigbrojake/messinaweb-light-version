import { initBotId } from 'botid/client/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

initBotId({ protect: [{ path: '/api/send-email', method: 'POST' }] })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
