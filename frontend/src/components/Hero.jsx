import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUpRightFromSquare,
  faEnvelope,
  faFileArrowDown,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { getMediaUrl } from "../services/api";

export default function Hero({ profile }) {
  const reduceMotion = useReducedMotion();
  const name = profile?.name || "Your Name";
  const title = profile?.title || "Backend Developer";
  const bio =
    profile?.bio ||
    "I build reliable APIs and useful web applications with a focus on clean backend architecture.";
  const resumeUrl = getMediaUrl(profile?.resume);
  const avatarUrl = getMediaUrl(profile?.avatar);
  const initialAnimation = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="
    hero-section 
    relative 
    flex 
    min-h-[92svh] 
    flex-col 
    overflow-hidden 
    border-b 
    border-white/10 
    text-white">
      <div className="
      hero-background 
      absolute 
      inset-0" aria-hidden="true" />
      <div className="
      hero-grid 
      absolute 
      inset-0" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="absolute inset-0 bg-liniear-to-b from-black/35 via-black/55 to-darkbg" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <a href="#home" className="font-semibold tracking-tight">
          {name}<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-5 text-xs font-medium uppercase tracking-[0.16em] text-gray-300 sm:gap-8">
          <a className="transition hover:text-accent" href="#about">About</a>
          <a className="transition hover:text-accent" href="#projects">Projects</a>
          <a className="transition hover:text-accent" href="#contact">Contact</a>
        </nav>
      </header>

      <div id="home" className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-16 md:px-10 md:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_300px]">
          <motion.div
            {...initialAnimation}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease: "easeOut" }}
          >
            <div className="
            mb-7 
            inline-flex 
            items-center 
            gap-3 
            rounded-full 
            border 
            border-accent/25 
            bg-accent/10 
            px-4 
            py-2 
            text-xs 
            font-semibold 
            uppercase 
            tracking-[0.19em] 
            text-accent">
              <span className="relative flex h-2 w-2">
                <span className="
                absolute 
                inline-flex 
                h-full 
                w-full 
                animate-ping 
                rounded-full 
                bg-accent 
                opacity-60 
                motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </div>

            <p className="mb-3 text-sm tracking-wide text-gray-300">Hello, I'm</p>
            <h1 className="max-w-5xl text-5xl font-bold leading-[1.06] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
              {name}<span className="text-accent">.</span>
            </h1>
            <h2 className="mt-6 text-xl font-medium text-gray-200 sm:text-2xl md:text-3xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300 md:text-lg">{bio}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={profile?.email ? `mailto:${profile.email}?subject=${encodeURIComponent("Hiring Inquiry")}` : "#contact"}
                className="button-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                Hire Me
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  inline-flex 
                  items-center 
                  gap-2 
                  rounded-full 
                  border 
                  border-white/20 
                  bg-white/[0.06] 
                  px-6 
                  py-3.5 
                  text-sm 
                  font-semibold 
                  text-white 
                  backdrop-blur 
                  transition 
                  hover:border-accent/60 
                  hover:bg-white/10"
                >
                  <FontAwesomeIcon icon={faFileArrowDown} />
                  View Resume
                </a>
              )}
              <a href="#projects" className="
              inline-flex 
              items-center 
              gap-2 
              rounded-full
               px-4 
               py-3.5 
               text-sm 
               font-semibold 
               text-gray-300 
               transition 
               hover:text-accent">
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                Explore Work
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="social-link">
                  <FontAwesomeIcon icon={faGithub} /> GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="social-link">
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </a>
              )}
              {profile?.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="social-link">
                  <FontAwesomeIcon icon={faXTwitter} /> Twitter
                </a>
              )}
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className="social-link">
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto hidden w-full max-w-[270px] lg:block"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: 3 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute -inset-5 rounded-[2rem] border border-accent/20 rotate-6" />
            <div className="absolute -inset-2 rounded-[2rem] border border-white/10 -rotate-3" />
            <div className="
            relative 
            aspect-[4/5] 
            overflow-hidden 
            rounded-[1.6rem] 
            border 
            border-white/15 
            bg-linear-to-br 
            from-accent/20 
            via-cardbg 
            to-black 
            shadow-2xl">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <span className="text-7xl font-bold tracking-tighter text-accent">
                    {name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase()}
                  </span>
                  <span className="mt-4 text-xs uppercase tracking-[0.25em] text-gray-400">Building with purpose</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-16">
                <p className="text-sm font-semibold">{name}</p>
                <p className="mt-1 text-xs text-gray-300">{title}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="
      relative 
      z-10 
      mx-auto 
      flex 
      w-full 
      max-w-7xl 
      items-center 
      justify-between 
      px-6 
      pb-7 
      text-[10px] 
      uppercase tracking-[0.22em] 
      text-gray-500 md:px-10">
        <span>Thoughtful code · Useful products</span>
        <a href="#about" className="inline-flex items-center gap-2 transition hover:text-accent">
          Scroll to explore <FontAwesomeIcon icon={faArrowDown} />
        </a>
      </div>
    </section>
  );
}