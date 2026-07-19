import { motion, useReducedMotion } from "framer-motion";

const DIRECTION_OFFSET = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

/**
 * Scroll-reveal / mount fade wrapper. Animates once when it enters the
 * viewport; collapses to a plain opacity fade if the user prefers reduced motion.
 */
const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  once = true,
  amount = 0.2,
  as: Component = motion.div,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const offset = shouldReduceMotion ? {} : DIRECTION_OFFSET[direction] || {};

  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
