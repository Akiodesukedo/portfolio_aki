import { useNavigate } from "react-router-dom";
import { usePageTransition } from "../context/PageTransitionContext"
import { useEffect } from "react";
import { motion } from 'framer-motion';


const FlashScreen = () => {
  const { isTransitioning, targetRoute } = usePageTransition();
  const navigate = useNavigate();
  const pageName = targetRoute.replace('/', '').toUpperCase();

  useEffect(()=> {
    if (isTransitioning) {
      setTimeout(() => {
        navigate(targetRoute);
      },500);
    }
  }, [isTransitioning])

  if (!isTransitioning) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white text-[36px] font-bold">{ pageName }</h1>
    </motion.div>
  )
}

export default FlashScreen;