import { portfolioContent } from "../data/content";
import { useLanguage } from "./LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { language } = useLanguage();
  const content = portfolioContent[language];

  return (
    <header className="sticky top-4 z-30 mb-10 rounded-full border border-slate-300/60 bg-white/80 px-5 py-3 backdrop-blur transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/70">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
          {content.profile.name}
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex dark:text-slate-300">
            {content.navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-slate-950 dark:hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <LanguageToggle ariaLabel={content.labels.toggleLanguage} />
          <ThemeToggle
            darkLabel={content.labels.dark}
            lightLabel={content.labels.light}
            ariaLabel={content.labels.toggleTheme}
          />
        </div>
      </div>
    </header>
  );
}
