import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

type ThemeToggleProps = {
  darkLabel: string;
  lightLabel: string;
  ariaLabel: string;
};

export function ThemeToggle({ darkLabel, lightLabel, ariaLabel }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-3 rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      aria-label={ariaLabel}
    >
      <span
        className={`inline-flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300 ${
          theme === "dark" ? "bg-brand/30" : "bg-slate-300/80"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ${
            theme === "dark" ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span>{theme === "dark" ? darkLabel : lightLabel}</span>
    </motion.button>
  );
}
