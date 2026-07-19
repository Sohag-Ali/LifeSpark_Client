import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Numeric count-up, triggered once when scrolled into view.
 * e.g. <AnimatedCounter value={12500} suffix="+" />
 */
const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className = "",
  decimals = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    duration: shouldReduceMotion ? 0 : duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
        }
      }),
    [spring, prefix, suffix, decimals]
  );

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
