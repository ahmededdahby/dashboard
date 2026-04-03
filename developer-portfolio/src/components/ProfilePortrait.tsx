import { motion } from "framer-motion";
import { useState } from "react";

type ProfilePortraitProps = {
  imagePath: string;
  name: string;
  title: string;
  imageHint: string;
};

export function ProfilePortrait({ imagePath, name, title, imageHint }: ProfilePortraitProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand/25 via-transparent to-accent/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-300/70 bg-white/75 p-5 shadow-soft backdrop-blur transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-glow">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-slate-100 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/80">
          {!imageError ? (
            <img
              src={imagePath}
              alt={name}
              className="h-[420px] w-full object-cover object-center"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-[420px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.22),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.22),transparent_30%)]">
              <div className="flex flex-col items-center gap-5">
                <div className="h-28 w-28 rounded-full bg-slate-300/80 dark:bg-white/10" />
                <div className="h-28 w-44 rounded-[999px] bg-slate-300/70 dark:bg-white/10" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-brand">{imageHint}</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-5 rounded-2xl border border-slate-200/80 bg-white/80 p-4 transition-colors duration-300 dark:border-white/10 dark:bg-slate-950/60">
          <p className="font-display text-xl font-semibold text-slate-950 dark:text-white">{name}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{title}</p>
        </div>
      </div>
    </motion.div>
  );
}
