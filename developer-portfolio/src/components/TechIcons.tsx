import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type TechItem = {
  label: string;
  icon: ReactNode;
};

type TechIconProps = {
  label: string;
  children: ReactNode;
};

const techItems: TechItem[] = [
  {
    label: "React",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#61DAFB" strokeWidth="3">
        <circle cx="32" cy="32" r="4" fill="#61DAFB" />
        <ellipse cx="32" cy="32" rx="22" ry="9" />
        <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(60 32 32)" />
        <ellipse cx="32" cy="32" rx="22" ry="9" transform="rotate(120 32 32)" />
      </svg>
    )
  },
  {
    label: "TypeScript",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8">
        <rect width="64" height="64" rx="14" fill="#3178C6" />
        <text x="16" y="40" fill="white" fontSize="20" fontWeight="700">
          TS
        </text>
      </svg>
    )
  },
  {
    label: "ASP.NET Core",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <circle cx="32" cy="32" r="22" stroke="#A78BFA" strokeWidth="4" />
        <path d="M20 38c6-17 14-23 24-18-4 1-6 5-6 10 0 8 6 10 10 11-10 4-20 3-28-3Z" fill="#A78BFA" />
      </svg>
    )
  },
  {
    label: "JavaScript",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8">
        <rect width="64" height="64" rx="14" fill="#F7DF1E" />
        <text x="15" y="40" fill="#111827" fontSize="18" fontWeight="800">
          JS
        </text>
      </svg>
    )
  },
  {
    label: "SQL",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#34D399" strokeWidth="3">
        <ellipse cx="32" cy="16" rx="16" ry="7" fill="#34D399" fillOpacity="0.18" />
        <path d="M16 16v12c0 4 7 7 16 7s16-3 16-7V16" />
        <path d="M16 28v12c0 4 7 7 16 7s16-3 16-7V28" />
      </svg>
    )
  },
  {
    label: "Docker",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#38BDF8" strokeWidth="3">
        <rect x="12" y="26" width="8" height="8" fill="#38BDF8" />
        <rect x="22" y="26" width="8" height="8" fill="#38BDF8" />
        <rect x="32" y="26" width="8" height="8" fill="#38BDF8" />
        <rect x="22" y="16" width="8" height="8" fill="#38BDF8" />
        <path d="M10 38h25c6 0 9-2 12-6 1 8-4 16-15 16H18c-5 0-8-4-8-10Z" fill="#38BDF8" fillOpacity="0.2" stroke="#38BDF8" />
      </svg>
    )
  },
  {
    label: "Azure",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M34 10 16 42h14l4-9 10 17 8-8-18-32Z" fill="#0EA5E9" />
        <path d="M36 10h12L28 54H16l20-44Z" fill="#38BDF8" fillOpacity="0.78" />
      </svg>
    )
  },
  {
    label: "CI/CD",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="14" width="16" height="12" rx="3" />
        <rect x="38" y="14" width="16" height="12" rx="3" />
        <rect x="24" y="38" width="16" height="12" rx="3" />
        <path d="M26 20h12M32 20v9M24 44h-8m32 0h-8" />
      </svg>
    )
  },
  {
    label: "DevOps",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 24a10 10 0 0 1 19-4l9 9a10 10 0 1 1-15 13l-3-3" />
        <path d="M46 40a10 10 0 0 1-19 4l-9-9a10 10 0 1 1 15-13l3 3" />
      </svg>
    )
  },
  {
    label: "Git",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#F97316" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 12a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" />
        <path d="M40 36a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z" />
        <path d="M24 28v12c0 4 4 8 8 8h0" />
        <path d="M40 20H24" />
        <path d="M40 20a8 8 0 1 1 0 16" />
      </svg>
    )
  },
  {
    label: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round">
        <path d="M16 26c4-8 9-12 16-12 10 0 11 8 17 8 4 0 7-2 10-6-4 8-9 12-16 12-10 0-11-8-17-8-4 0-7 2-10 6Z" />
        <path d="M21 42c4-8 9-12 16-12 10 0 11 8 17 8 4 0 7-2 10-6-4 8-9 12-16 12-10 0-11-8-17-8-4 0-7 2-10 6Z" />
      </svg>
    )
  },
  {
    label: "Framer Motion",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M18 12h28L30 28h16L18 56V36h12L18 24V12Z" fill="#F43F5E" />
      </svg>
    )
  },
  {
    label: "REST APIs",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" stroke="#FB923C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="16" width="44" height="32" rx="10" />
        <path d="M22 28h20M22 36h12" />
        <circle cx="18" cy="28" r="1.5" fill="#FB923C" stroke="none" />
        <circle cx="18" cy="36" r="1.5" fill="#FB923C" stroke="none" />
      </svg>
    )
  },
  {
    label: "Vite",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
        <path d="M18 14l14 4-8 24-10-3 4-25Z" fill="#A78BFA" />
        <path d="M46 12 28 44l8 8 14-30-4-10Z" fill="#FBBF24" />
      </svg>
    )
  },
  {
    label: "C#",
    icon: (
      <svg viewBox="0 0 64 64" className="h-8 w-8">
        <polygon points="32,8 50,18 50,46 32,56 14,46 14,18" fill="#7C3AED" />
        <text x="20" y="38" fill="white" fontSize="16" fontWeight="700">
          C#
        </text>
      </svg>
    )
  }
];

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: "easeOut"
    }
  }
} as const;

function TechIcon({ label, children }: TechIconProps) {
  return (
    <div className="group flex h-[148px] min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-slate-300/80 bg-white/75 p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/40 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:shadow-glow">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white transition-colors duration-300 dark:bg-slate-950/70">
        {children}
      </div>
      <span className="text-center text-sm font-medium text-slate-700 transition duration-300 group-hover:text-slate-950 dark:text-slate-300 dark:group-hover:text-white">
        {label}
      </span>
    </div>
  );
}

export function TechIcons() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAutoHintPlayedRef = useRef(false);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(7);
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2);
        return;
      }

      if (window.innerWidth < 1024) {
        setVisibleCount(4);
        return;
      }

      setVisibleCount(7);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const maxStart = Math.max(0, techItems.length - visibleCount);
    setStartIndex((currentIndex) => Math.min(currentIndex, maxStart));
  }, [visibleCount]);

  const maxStart = Math.max(0, techItems.length - visibleCount);
  const visibleItems = techItems.slice(startIndex, startIndex + visibleCount);
  const enterOffset = direction > 0 ? 88 : -88;
  const exitOffset = direction > 0 ? -88 : 88;

  const goPrev = () => {
    setDirection(-1);
    setStartIndex((currentIndex) => {
      if (currentIndex <= 0) {
        return maxStart;
      }

      return currentIndex - 1;
    });
  };

  const goNext = () => {
    setDirection(1);
    setStartIndex((currentIndex) => {
      if (currentIndex >= maxStart) {
        return 0;
      }

      return currentIndex + 1;
    });
  };

  useEffect(() => {
    if (shouldReduceMotion || isPaused || !isInView || maxStart === 0) {
      return;
    }

    let firstMoveTimeoutId: number | undefined;

    if (!hasAutoHintPlayedRef.current) {
      hasAutoHintPlayedRef.current = true;
      firstMoveTimeoutId = window.setTimeout(() => {
        setDirection(1);
        setStartIndex((currentIndex) => (currentIndex >= maxStart ? 0 : currentIndex + 1));
      }, 450);
    }

    // Auto-play acts as a subtle hint that the row is horizontally navigable.
    const intervalId = window.setInterval(() => {
      setDirection(1);
      setStartIndex((currentIndex) => (currentIndex >= maxStart ? 0 : currentIndex + 1));
    }, 2200);

    return () => {
      window.clearInterval(intervalId);
      if (firstMoveTimeoutId) {
        window.clearTimeout(firstMoveTimeoutId);
      }
    };
  }, [isInView, isPaused, maxStart, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="space-y-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {startIndex + 1}-{Math.min(startIndex + visibleCount, techItems.length)} of {techItems.length}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-700 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Previous technologies"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/80 text-slate-700 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Next technologies"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${startIndex}-${visibleCount}`}
            initial={{ opacity: 0, x: enterOffset, scale: 0.985 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                duration: 0.34,
                ease: "easeOut",
                staggerChildren: 0.03,
                delayChildren: 0.02
              }
            }}
            exit={{
              opacity: 0,
              x: exitOffset,
              scale: 0.985,
              transition: {
                duration: 0.24,
                ease: "easeIn"
              }
            }}
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))` }}
          >
            {visibleItems.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
              >
                <TechIcon label={item.label}>{item.icon}</TechIcon>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
