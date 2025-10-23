import { createContext, useContext, useEffect, useState } from "react";

type PageTransitionType = {
  isTransitioning: boolean
  targetRoute: string
  triggerTransition:  (route: string) => void
  endTransition: () => void
  isFirstVisit: boolean
  completeInitialLoad: () => void
}

// Creates context object with default value here for global use. 
const PageTransitionContext = createContext<PageTransitionType>({
  isTransitioning: false,
  targetRoute: '',
  triggerTransition: () => {},
  endTransition: () => {},
  isFirstVisit: false,
  completeInitialLoad: () => {}
})

// Store states here and update route and stuff here
export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [targetRoute, setTargetRoute] = useState(window.location.pathname);
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsTransitioning(false);
      setIsFirstVisit(false);
    }, 1500)
    return () => clearTimeout(loadingTimer);
  }, []);

  const triggerTransition = (route: string) => {
    setIsTransitioning(true);
    setTargetRoute(route);
  }

  const endTransition = () => setIsTransitioning(false);

  const completeInitialLoad = () => {
    if (isFirstVisit) {
      setIsTransitioning(false);
      setIsFirstVisit(false);
    }
  }

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, targetRoute, triggerTransition, endTransition, isFirstVisit, completeInitialLoad }}>
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


