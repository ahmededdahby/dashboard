import { motion } from "framer-motion";
import { AmbientBackground } from "./components/AmbientBackground";
import { DemoProjectCard } from "./components/DemoProjectCard";
import { useLanguage } from "./components/LanguageProvider";
import { Navbar } from "./components/Navbar";
import { ProfessionalProjectCard } from "./components/ProfessionalProjectCard";
import { ProfilePortrait } from "./components/ProfilePortrait";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { TechIcons } from "./components/TechIcons";
import { portfolioContent } from "./data/content";

function App() {
  const { language } = useLanguage();
  const content = portfolioContent[language];
  const { contact, demoProjects, education, experience, professionalProjects, profile, sections, services } = content;

  return (
    <div className="relative overflow-hidden bg-paper text-slate-900 transition-colors duration-300 dark:bg-ink dark:text-slate-100">
      <AmbientBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(61,217,183,0.16),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.12),transparent_18%)] dark:bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(61,217,183,0.15),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.1),transparent_18%)]" />
      <div className="absolute inset-0 bg-grid-light bg-[size:72px_72px] opacity-[0.22] transition-opacity duration-300 dark:bg-grid dark:opacity-[0.07]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-6 lg:px-8">
        <Navbar />

        <main id="top" className="space-y-28">
          <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:shadow-none">
                <span className="h-2 w-2 rounded-full bg-accent" />
                {profile.location}
              </div>

              <h1 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-950 transition-colors duration-300 dark:text-white sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-4 text-xl font-medium text-brand">{profile.title}</p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                {profile.tagline}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {content.heroHighlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 + index * 0.07 }}
                    className="rounded-2xl border border-slate-300/80 bg-white/75 p-4 text-sm text-slate-700 shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <motion.a
                  href="#demo-projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                >
                  {content.labels.viewProjects}
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-slate-300/80 bg-white/75 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:border-brand/40 hover:text-brand dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  {content.labels.contact}
                </motion.a>
              </div>
            </motion.div>

            <ProfilePortrait
              imagePath={profile.imagePath}
              name={profile.name}
              title={profile.title}
              imageHint={content.labels.profileImageHint}
            />
          </section>

          <section id="demo-projects" className="space-y-10">
            <Reveal>
              <SectionHeading
                eyebrow={sections.demoProjects.eyebrow}
                title={sections.demoProjects.title}
                description={sections.demoProjects.description}
              />
            </Reveal>

            <div className="grid items-stretch gap-6 lg:grid-cols-3">
              {demoProjects.map((project, index) => (
                <DemoProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  liveLabel={content.labels.liveDemo}
                  githubLabel={content.labels.github}
                />
              ))}
            </div>
          </section>

          <section id="professional-projects" className="space-y-10">
            <Reveal>
              <SectionHeading
                eyebrow={sections.professionalProjects.eyebrow}
                title={sections.professionalProjects.title}
                description={sections.professionalProjects.description}
              />
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {professionalProjects.map((project, index) => (
                <ProfessionalProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>

          <section id="services" className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SectionHeading
                eyebrow={sections.services.eyebrow}
                title={sections.services.title}
                description={sections.services.description}
              />
            </Reveal>

            <div className="grid items-stretch gap-4 sm:grid-cols-2">
              {services.map((service, index) => (
                <Reveal
                  key={service}
                  delay={index * 0.05}
                  className={index === services.length - 1 ? "sm:col-span-2" : ""}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex h-full flex-col rounded-3xl border border-slate-300/80 bg-gradient-to-br from-white/95 via-white/80 to-brand/5 p-5 shadow-soft transition-all duration-300 hover:border-brand/40 hover:shadow-glow dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.08] dark:via-white/[0.04] dark:to-brand/10 dark:hover:bg-white/[0.08]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/12 text-brand">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                    <p className="text-base font-medium leading-7 text-slate-900 transition-colors duration-300 dark:text-slate-100">
                      {service}
                    </p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="experience" className="space-y-10">
            <Reveal>
              <SectionHeading
                eyebrow={sections.experience.eyebrow}
                title={sections.experience.title}
                description={sections.experience.description}
              />
            </Reveal>

            <div className="relative space-y-5 before:absolute before:left-3 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-slate-300/90 dark:before:bg-white/10">
              {experience.map((item, index) => (
                <Reveal key={`${item.role}-${item.company}`} delay={index * 0.06}>
                  <article className="relative rounded-3xl border border-slate-300/80 bg-white/75 p-6 pl-10 shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04]">
                    <span className="absolute left-[9px] top-8 h-3.5 w-3.5 rounded-full border-4 border-paper bg-brand transition-colors duration-300 dark:border-ink" />
                    <div>
                      <h3 className="text-xl font-semibold text-slate-950 transition-colors duration-300 dark:text-white">{item.role}</h3>
                      <p className="mt-1 text-sm font-medium text-brand">{item.company}</p>
                    </div>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                      {item.details}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="tech-stack" className="space-y-10">
            <Reveal>
              <SectionHeading
                eyebrow={sections.techStack.eyebrow}
                title={sections.techStack.title}
                description={sections.techStack.description}
              />
            </Reveal>
            <Reveal delay={0.05}>
              <TechIcons />
            </Reveal>
          </section>

          <section id="education" className="space-y-10">
            <Reveal>
              <SectionHeading
                eyebrow={sections.education.eyebrow}
                title={sections.education.title}
                description={sections.education.description}
              />
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {education.map((entry, index) => (
                <Reveal key={entry} delay={index * 0.06}>
                  <div className="rounded-[1.75rem] border border-slate-300/80 bg-white/75 p-6 shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-base font-medium text-slate-950 transition-colors duration-300 dark:text-white">{entry}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="contact">
            <Reveal>
              <div className="rounded-[2rem] border border-slate-300/80 bg-gradient-to-r from-brand/10 via-white/70 to-accent/10 p-8 shadow-soft transition-colors duration-300 dark:border-white/10 dark:bg-gradient-to-r dark:from-brand/15 dark:via-white/[0.04] dark:to-accent/10 sm:p-10">
                <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand/80">{sections.contact.eyebrow}</p>
                    <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-slate-950 transition-colors duration-300 dark:text-white sm:text-5xl">
                      {sections.contact.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 transition-colors duration-300 dark:text-slate-300">
                      {sections.contact.description}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { label: content.labels.email, value: contact.email, href: `mailto:${contact.email}` },
                      { label: content.labels.linkedin, value: contact.linkedin.replace("https://", ""), href: contact.linkedin },
                      { label: content.labels.github, value: contact.github.replace("https://", ""), href: contact.github }
                    ].map((item) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.label === "Email" ? undefined : "_blank"}
                        rel={item.label === "Email" ? undefined : "noreferrer"}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-slate-300/80 bg-white/80 p-5 shadow-soft transition-colors duration-300 hover:border-brand/40 dark:border-white/10 dark:bg-slate-950/55 dark:hover:bg-slate-950/70"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-base font-medium text-slate-950 transition-colors duration-300 dark:text-white">{item.value}</p>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
