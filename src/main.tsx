import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CanvasScaler from './CanvasScaler'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CanvasScaler>
      <App />
    </CanvasScaler>
  </React.StrictMode>,
)
