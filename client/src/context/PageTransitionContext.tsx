import { createContext, useContext, useState } from "react";

type PageTransitionType = {
  isTransitioning: boolean
  targetRoute: string
  triggerTransition:  (route: string) => void
  endTransition: () => void
}

// Creates context object with default value here for global use. 
const PageTransitionContext = createContext<PageTransitionType>({
  isTransitioning: false,
  targetRoute: '',
  triggerTransition: () => {},
  endTransition: () => {}
})

// Store states here and update route and stuff here
export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetRoute, setTargetRoute] = useState('');

  const triggerTransition = (route: string) => {
    setIsTransitioning(true);
    setTargetRoute(route);
  }

  const endTransition = () => setIsTransitioning(false);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, targetRoute, triggerTransition, endTransition }}>
      {children}
    </PageTransitionContext.Provider>
  )
} 

export const usePageTransition = (): PageTransitionType => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider")
  }
  return context
}


