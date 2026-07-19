import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router";

/**
 * Wraps a route layout's <Outlet/> to cross-fade between pages. Usage:
 *   <PageTransition><Outlet /></PageTransition>
 * Keys off pathname so AnimatePresence detects route changes.
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
