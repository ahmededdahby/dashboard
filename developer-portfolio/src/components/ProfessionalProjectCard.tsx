import { motion } from "framer-motion";

type ProfessionalProject = {
  title: string;
  company: string;
  role: string;
  label: string;
  description: string;
  techStack: string[];
};

export function ProfessionalProjectCard({ project, index }: { project: ProfessionalProject; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="rounded-[2rem] border border-slate-300/60 bg-white/75 p-6 shadow-soft backdrop-blur transition-colors duration-300 hover:border-brand/40 dark:border-white/10 dark:bg-white/[0.04]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {project.label}
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold text-slate-950 dark:text-white">{project.title}</h3>
          <p className="mt-2 text-sm font-medium text-brand">{project.company} / {project.role}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>

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
    </motion.article>
  );
}
