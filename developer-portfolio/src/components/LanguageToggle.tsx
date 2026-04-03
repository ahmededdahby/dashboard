import { motion } from "framer-motion";
import { useLanguage } from "./LanguageProvider";

export function LanguageToggle({ ariaLabel }: { ariaLabel: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-300/70 bg-white/80 p-1 text-sm shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-white/5"
      aria-label={ariaLabel}
    >
      {(["en", "fr"] as const).map((item) => {
        const isActive = language === item;

        return (
          <motion.button
            key={item}
            type="button"
            onClick={() => setLanguage(item)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full px-3 py-1.5 font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            {item}
          </motion.button>
        );
      })}
    </div>
  );
}
