import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MenuProvider } from './context/MenuContext.tsx'
import { PageTransitionProvider } from './context/PageTransitionContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PageTransitionProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </PageTransitionProvider>      
    </AuthProvider>
  </StrictMode>
)
