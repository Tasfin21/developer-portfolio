import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCode } from "@fortawesome/free-solid-svg-icons";
import { api } from "./services/api";
import Hero from "./components/Hero";
import ContentSection from "./components/ContentSection";
import ContactSection from "./components/ContactSection";

function getResults(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function getProfile(data) {
  if (Array.isArray(data)) return data[0] ?? null;
  if (Array.isArray(data?.results)) return data.results[0] ?? null;
  return data && typeof data === "object" ? data : null;
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiWarning, setApiWarning] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPortfolio() {
      const requests = await Promise.allSettled([
        api.getProfile(),
        api.getTechnologies(),
        api.getExperiences(),
        api.getProjects(),
      ]);

      if (!active) return;

      const [profileResult, technologyResult, experienceResult, projectResult] = requests;
      setApiWarning(requests.some((result) => result.status === "rejected"));

      if (profileResult.status === "fulfilled") {
        setProfile(getProfile(profileResult.value.data));
      }
      if (technologyResult.status === "fulfilled") {
        setTechnologies(getResults(technologyResult.value.data));
      }
      if (experienceResult.status === "fulfilled") {
        setExperiences(getResults(experienceResult.value.data));
      }
      if (projectResult.status === "fulfilled") {
        setProjects(getResults(projectResult.value.data));
      }

      setLoading(false);
    }

    loadPortfolio();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-darkbg text-white selection:bg-accent selection:text-black">
      <Hero profile={profile} />

      {apiWarning && (
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 pt-6 text-sm text-amber-200">
          <FontAwesomeIcon icon={faCircleExclamation} />
          Some portfolio data could not load. Check that the Django API is running and the API URL is configured correctly.
        </div>
      )}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center gap-3 text-sm tracking-widest text-gray-400">
          <FontAwesomeIcon icon={faCode} className="animate-pulse text-accent" />
          LOADING PORTFOLIO
        </div>
      ) : (
        <>
          <ContentSection
            technologies={technologies}
            experiences={experiences}
            projects={projects}
          />
          <ContactSection email={profile?.email} />
        </>
      )}

      <footer className="border-t border-white/10 px-6 py-8 text-center text-xs text-gray-500">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Built with Passon
          <span className="mx-2 text-accent">·</span>
          © {new Date().getFullYear()} {profile?.name || "Portfolio"}
        </motion.p>
      </footer>
    </main>
  );
}