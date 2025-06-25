import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../context/PageTransitionContext"
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';


const FlashScreen = () => {
  const { isTransitioning, targetRoute, endTransition } = usePageTransition();
  const [shouldRender, setShouldRender] = useState(false);
  const navigate = useNavigate();
  const pageName = targetRoute.replace('/', '').toUpperCase();

  useEffect(()=> {
    if (isTransitioning) {
      setShouldRender(true)
      setTimeout(() => {
        navigate(targetRoute);
        setTimeout(() => {
          endTransition();
        }, 1000)
        setTimeout(() => {
          setShouldRender(false)
        }, 1500);
      }, 500);
    }
  }, [isTransitioning])

  if (!shouldRender) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning? 1 : 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      transition={{ duration: .5 }}
    >
      <h1 className="text-white text-[36px] font-bold">{ pageName }</h1>
    </motion.div>
  )
}

export default FlashScreen;