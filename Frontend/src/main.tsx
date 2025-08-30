import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContextProvider } from './context/authContext.tsx'
import { SocketContextProvider } from "./context/socketContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <div className='bg-black'>
          <App />
        </div>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
