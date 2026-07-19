import { motion, useReducedMotion } from "framer-motion";

/**
 * Pair for animating card grids / lists: wrap the grid in StaggerContainer
 * and each child in StaggerItem. Children reveal in sequence on scroll.
 */
export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
  once = true,
  amount = 0.15,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "", as: Component = motion.div }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </Component>
  );
};
