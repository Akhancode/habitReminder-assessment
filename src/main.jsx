import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/tailwind.css'; // Import Tailwind CSS
import TokenProvider from './context/TokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <App  />
    </TokenProvider>
  </StrictMode>,
)
