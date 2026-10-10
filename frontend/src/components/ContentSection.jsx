import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCodeBranch,
  faDatabase,
  faGlobe,
  faLayerGroup,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { getMediaUrl } from "../services/api";

const categoryIcons = {
  Language: faTerminal,
  Framework: faLayerGroup,
  Database: faDatabase,
  Tool: faCodeBranch,
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-7 text-gray-400">{description}</p>}
    </div>
  );
}

function TechnologyPill({ technology }) {
  return (
    <span key={technology.id} className="
    inline-flex 
    items-center 
    gap-2 
    rounded-full 
    border 
    border-white/10
    bg-white/4 
    px-3 
    py-2 
    text-xs 
    text-gray-300 
    transition 
    hover:border-accent/40 
    
    hover:text-white">
      {technology.icon ? (
        <img src={getMediaUrl(technology.icon)} alt="" className="h-4 w-4 object-contain" loading="lazy" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      )}
      {technology.name}
    </span>
  );
}

export default function ContentSection({ technologies = [], experiences = [], projects = [] }) {
  const reduceMotion = useReducedMotion();
  const groupedTechnologies = technologies.reduce((groups, technology) => {
    const category = technology.category || "Other";
    groups[category] = [...(groups[category] || []), technology];
    return groups;
  }, {});
  const orderedProjects = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  return (
    <div className="relative bg-darkbg">
      <section id="about" className="section-shell mx-auto w-full max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <SectionHeading
          eyebrow="A little about my work"
          title="Building beyond the interface."
          description="I really enjoy what i do and love to turning ideas into useful products, with attention to the API, data model, and details that make an application dependable."
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {[
            { number: "01", title: "Backend first", text: "Thoughtful APIs, validation, authentication, and business logic." },
            { number: "02", title: "Data with purpose", text: "Structured databases and clear relationships between models." },
            { number: "03", title: "Full product view", text: "Connecting backend services to practical, responsive interfaces." },
          ].map((item, index) => (
            <motion.article
              key={item.number}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-2xl p-6"
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-accent">{item.number}</span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {technologies.length > 0 && (
        <section id="skills" className="section-shell mx-auto w-full max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <SectionHeading eyebrow="Tools of the trade" title="Technical skills" description="Technologies managed from the portfolio dashboard." />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {Object.entries(groupedTechnologies).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <FontAwesomeIcon icon={categoryIcons[category] || faLayerGroup} />
                  </span>
                  <h3 className="font-semibold">{category === "Framework" ? "Frameworks & libraries" : category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((technology) => <TechnologyPill key={technology.id} technology={technology} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section id="projects" className="section-shell mx-auto w-full max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="Selected work" title="Projects that solve problems." description="A few things I've been building. Open a live demo or explore the source code when available." />
        {orderedProjects.length ? (
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {orderedProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
                whileHover={reduceMotion ? {} : { y: -5 }}
                className="project-card group overflow-hidden rounded-2xl"
              >
                {project.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10 bg-black/30">
                    <img
                      src={getMediaUrl(project.image)}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent opacity-70" />
                    {project.featured && <span className="absolute left-4 top-4 rounded-full border border-accent/30 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent backdrop-blur">Featured</span>}
                  </div>
                ) : (
                  <div className="
                  relative 
                  flex 
                  aspect-[16/9] 
                  items-center 
                  justify-center 
                  overflow-hidden 
                  border-b 
                  border-white/10 
                  bg-linear-to-br 
                  from-accent/10 
                  via-cardbg 
                  to-black">
                    <FontAwesomeIcon icon={faCodeBranch} className="text-5xl text-accent/60 transition duration-500 group-hover:scale-110 group-hover:text-accent" />
                    {project.featured && <span className="
                    absolute 
                    left-4 
                    top-4 
                    rounded-full 
                    border 
                    border-accent/30 
                    bg-black/60 
                    px-3 
                    py-1 
                    text-[10px] 
                    font-semibold 
                    uppercase 
                    tracking-[0.15em] 
                    text-accent">Featured</span>}
                  </div>
                )}
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-gray-400">{project.description}</p>
                    </div>
                    <span className="
                    hidden 
                    h-10 
                    w-10 
                    shrink-0 
                    items-center 
                    justify-center 
                    rounded-full 
                    border 
                    border-white/10 
                    text-gray-400 
                    transition 
                    group-hover:border-accent/40 
                    group-hover:text-accent 
                    sm:flex">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(project.technologies || []).map((technology) => (
                      <span key={technology.id} className="rounded-full bg-accent/[0.08] px-3 py-1.5 text-[11px] font-medium text-teal-200/90">{technology.name}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4 border-t border-white/[0.08] pt-5 text-sm">
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-medium text-accent transition hover:text-teal-200">
                        <FontAwesomeIcon icon={faGlobe} /> Live demo <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-gray-300 transition hover:text-white">
                        <FontAwesomeIcon icon={faGithub} /> Source code <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-sm text-gray-400">Projects will appear here when they are added in Django admin.</p>
        )}
      </section>

      <section id="experience" className="section-shell mx-auto w-full max-w-7xl scroll-mt-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
        <SectionHeading eyebrow="The journey so far" title="Experience & practice" description="Professional experience, internships, and other relevant work can be managed from Django admin." />
        {experiences.length ? (
          <div className="relative space-y-6 before:absolute before:bottom-8 before:left-[15px] before:top-8 before:w-px before:bg-white/10">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="glass-card relative ml-0 rounded-2xl p-5 pl-12 sm:p-6 sm:pl-14"
              >
                <span className="absolute left-[9px] top-7 h-3.5 w-3.5 rounded-full border-2 border-darkbg bg-accent shadow-[0_0_0_4px_rgba(45,212,191,0.12)]" />
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">{experience.type || "Experience"}</p>
                    <h3 className="mt-2 text-lg font-semibold">{experience.role}</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      {experience.company}
                      {experience.location ? ` · ${experience.location}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs text-gray-500">{experience.start_date} — {experience.end_date}</p>
                </div>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-400">{experience.description}</p>
                {!!experience.technologies?.length && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((technology) => <TechnologyPill key={technology.id} technology={technology} />)}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="
          rounded-2xl 
          border 
          border-dashed 
          border-white/15 
          p-8 
          text-sm 
          text-gray-400
          ">
            Add relevant experience or independent project work through Django admin to show it here.</p>
        )}
      </section>
    </div>
  );
}