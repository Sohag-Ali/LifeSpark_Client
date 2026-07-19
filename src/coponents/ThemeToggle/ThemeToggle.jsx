import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";

/**
 * Icon button that flips data-theme between "light" and "dark".
 * Crossfades/rotates between sun and moon glyphs on switch.
 */
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`btn btn-ghost btn-circle relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-5 w-5 text-primary" />
          ) : (
            <Sun className="h-5 w-5 text-primary" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
