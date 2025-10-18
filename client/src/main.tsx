import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MenuProvider } from './context/MenuContext.tsx'
import { PageTransitionProvider } from './context/PageTransitionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageTransitionProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </PageTransitionProvider>
  </StrictMode>
)
