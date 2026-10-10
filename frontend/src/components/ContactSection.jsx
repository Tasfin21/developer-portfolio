import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCheckCircle,
  faEnvelope,
  faPaperPlane,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { api } from "../services/api";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function ContactSection({ email }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const reduceMotion = useReducedMotion();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "sending", message: "" });

    try {
      await api.sendContactMessage(form);
      setStatus({
        type: "success",
        message: "Thanks for reaching out. Your message has been sent successfully.",
      });
      setForm(initialForm);
    } catch (error) {
      const data = error.response?.data;
      const message = data
        ? Object.values(data).flat().join(" ")
        : "We couldn't send your message. Please try again or contact me by email.";
      setStatus({ type: "error", message });
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-accent/60 focus:ring-2 focus:ring-accent/10";

  return (
    <section id="contact" className="section-shell scroll-mt-8 pt-0">
      <div className="contact-panel relative overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12">
        <div className="contact-glow" aria-hidden="true" />
        <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">Have a project in mind?</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Let's build something useful.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-gray-400">
              Have an opportunity, or an idea, or a question ? Send a message and I'll get back to you.
            </p>
            {email && (
              <a href={`mailto:${email}`} className="mt-7 inline-flex items-center gap-3 text-sm text-gray-200 transition hover:text-accent">
                <span className="
                flex 
                h-10 
                w-10 
                items-center 
                justify-center 
                rounded-xl border 
                border-white/10 
                bg-white/4
                text-accent"><FontAwesomeIcon icon={faEnvelope} /></span>
                <span>{email}</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-xs" />
              </a>
            )}
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-medium text-gray-300">
                Your name
                <input 
                
                className={`${fieldClass} mt-2`} 
                name="name" 
                value={form.name} 
                onChange={updateField} 
                placeholder="your name" 
                maxLength={100} 
                required 
                autoComplete="name" />
              </label>
              <label className="block text-xs font-medium text-gray-300">
                Email address
                <input className={`${fieldClass} mt-2`} type="email" name="email" value={form.email} onChange={updateField} placeholder="your email" maxLength={254} required autoComplete="email" />
              </label>
            </div>
            <label className="block text-xs font-medium text-gray-300">
              Subject <span className="font-normal text-gray-500">(optional)</span>
              <input className={`${fieldClass} mt-2`} name="subject" value={form.subject} onChange={updateField} placeholder="let's discuss something" maxLength={200} />
            </label>
            <label className="block text-xs font-medium text-gray-300">
              Message
              <textarea 
              className={`${fieldClass} mt-2 min-h-36 resize-y`} 
              name="message" 
              value={form.message} 
              onChange={updateField} 
              placeholder="Tell me a little about it..." minLength={10} maxLength={5000} required />
            </label>

            {status.message && (
              <p role="status" 
              className={`
              rounded-xl 
              border 
              px-4 
              py-3 
              text-sm 
              ${status.type === "success" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-red-400/20 bg-red-400/10 text-red-200"}`}>
                {status.type === "success" && <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />}
                {status.message}
              </p>
            )}

            <button 
            type="submit" 
            disabled={status.type === "sending"} 
            className="
            button-primary 
            inline-flex 
            w-full 
            items-center 
            justify-center 
            gap-2 
            rounded-xl 
            px-5 
            py-3.5 
            text-sm 
            font-semibold 
            disabled:cursor-not-allowed 
            disabled:opacity-60 
            sm:w-auto">
              <FontAwesomeIcon icon={status.type === "sending" ? faSpinner : faPaperPlane} className={status.type === "sending" ? "animate-spin" : ""} />
              {status.type === "sending" ? "Sending message..." : "Send message"}
            </button>
            <p className="
            text-xs 
            leading-5 
            text-gray-500
            ">Your message is submitted, Please don't include passwords or other sensitive information.</p>
          </form>
        </div>
      </div>
    </section>
  );
}