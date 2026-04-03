import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MenuProvider } from './context/MenuContext.tsx'
import { PageTransitionProvider } from './context/PageTransitionContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <PageTransitionProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </PageTransitionProvider>      
      </AuthProvider>      
    </GoogleOAuthProvider>
  </StrictMode>
)
