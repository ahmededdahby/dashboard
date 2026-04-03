import { motion } from "framer-motion";

type DemoProject = {
  title: string;
  tag: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
};

type DemoProjectCardProps = {
  project: DemoProject;
  index: number;
  liveLabel: string;
  githubLabel: string;
};

export function DemoProjectCard({ project, index, liveLabel, githubLabel }: DemoProjectCardProps) {
  const accents = [
    {
      card: "border-brand/30 bg-gradient-to-br from-brand/12 via-white/85 to-cyan-100/60 dark:from-brand/18 dark:via-white/[0.08] dark:to-cyan-400/10",
      pill: "border-brand/30 bg-brand/10 text-brand",
      primary: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
    },
    {
      card: "border-emerald-300/40 bg-gradient-to-br from-emerald-100/70 via-white/85 to-teal-100/70 dark:from-emerald-400/10 dark:via-white/[0.06] dark:to-teal-400/10",
      pill: "border-emerald-400/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
      primary: "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300"
    },
    {
      card: "border-fuchsia-300/40 bg-gradient-to-br from-fuchsia-100/70 via-white/85 to-indigo-100/70 dark:from-fuchsia-400/10 dark:via-white/[0.06] dark:to-indigo-400/10",
      pill: "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300",
      primary: "bg-fuchsia-600 text-white hover:bg-fuchsia-500 dark:bg-fuchsia-400 dark:text-slate-950 dark:hover:bg-fuchsia-300"
    }
  ][index % 3];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className={`group h-full rounded-[2rem] border p-6 shadow-soft backdrop-blur transition-all duration-300 hover:shadow-glow ${accents.card}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${accents.pill}`}>
            {project.tag}
          </span>
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-500">0{index + 1}</span>
        </div>

        <h3 className="mt-7 font-display text-2xl font-bold text-slate-950 transition group-hover:text-brand dark:text-white">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techStack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-300/80 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-8">
          <motion.a
            href={project.liveUrl}
            whileHover={{ y: -1 }}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${accents.primary}`}
          >
            {liveLabel}
          </motion.a>
          <motion.a
            href={project.githubUrl}
            whileHover={{ y: -1 }}
            className="rounded-full border border-slate-300/80 bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-800 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            {githubLabel}
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}
