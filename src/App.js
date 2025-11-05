import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useNavigate } from "react-router-dom";
import mustafaAvatar from "./img/mustafazi.PNG";
import emailjs from "@emailjs/browser";
import ProjectsPage from "./ProjectsPage";
import "./GlowEffect.css";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Rocket,
  Download,
  ExternalLink,
  Star,
  Code2,
  MapPin,
  Calendar,
  Phone,
  ShieldCheck,
  CircleChevronRight,
} from "lucide-react";

// Animated visuals
import Balatro from "./visuals/Balatro";
import Beams from "./visuals/Beams";
import Folder from "./visuals/Folder";
import LiquidEther from "./visuals/LiquidEther";


// THEME TOGGLE + UTILITIES

const useTheme = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative py-24 md:py-32 ${className}`}>
    {children}
  </section>
);

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>
);


// DATA PLACEHOLDERS

const HERO = {
  name: "Mustafa Tamer",
  title: "Software Engineer",
  tagline: "I craft fast, accessible, and beautiful products that scale.",
  location: "Toronto, Canada",
  email: "tamermus854@gmail.com",
  phone: "+1 (647) 832-4198",
  resumeUrl: "/links/MustafasSWECV.pdf",
  avatar:
  mustafaAvatar,
};

const PROJECTS = [
  // {
  //   title: "FaceTrace",
  //   blurb: "Privacy-first people search from public sources.",
  //   tags: ["React", "FastAPI", "Firebase"],
  //   href: "https://your-live-demo.com",
  //   repo: "https://github.com/you/facetrace",
  // },
];

const EXPERIENCE = [
  {
    company: "Moore's Clothing",
    role: "Team Lead",
    period: "August 2023 — Present",
    points: [
      "Led a team of 8–10 associates, delegating tasks and optimizing scheduling to ensure peak productivity, improving daily workflow efficiency by 20%.",
      "Trained and mentored 5+ new hires, creating step-by-step onboarding guides and standardizing procedures.",
      "Analyzed sales data and KPIs, identifying patterns and implementing adjustments that boosted weekly revenue by 10–12%, applying problem-solving and data-driven decision-making.",
    ],
  },
];

const SKILLS = {
  Core: ["React", "TypeScript", "Node.js", "Python", "Java", "FastAPI", "SQL"],
  Frontend: ["Tailwind", "Framer Motion", "Vite"],
  Backend: ["PostgreSQL", "MongoDB", "Docker"],
  Cloud: ["Vercel", "Firebase", "AWS"],
  Tools: ["Git", "GitHub", "VSCode", "IntelliJ", "Jira", "Slack", "Cursor", "Windsurf"],
};

// =============================
// FANCY BACKGROUNDS
// =============================
const GridGlow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_120%_-10%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(32rem_32rem_at_-10%_-10%,rgba(244,63,94,0.25),transparent_60%),radial-gradient(28rem_28rem_at_50%_120%,rgba(16,185,129,0.2),transparent_60%)]" />
    <div className="absolute inset-0 bg-grid-slate-200/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
  </div>
);

const Spotlight = () => (
  <div aria-hidden className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-sky-500/40 via-fuchsia-500/30 to-emerald-500/20 blur-3xl" />
);

// =============================
// COMPONENTS
// =============================
const Nav = ({ onTheme, theme }) => {
  const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40">
      <Container className="flex items-center justify-between py-4">
        <a href="#home" className="group inline-flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          <span className="font-semibold tracking-tight">{HERO.name}</span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={HERO.resumeUrl}
            download="Mustafa_Tamer_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-300/50 bg-white/70 px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5 hover:-translate-y-0.5 hover:shadow transition dark:border-white/10 dark:bg-white/5"
          >
            <Download className="h-4 w-4" /> Resume
          </a>
          <button
            onClick={onTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-slate-300/50 bg-white/70 p-2 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow dark:border-white/10 dark:bg-white/5"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </Container>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-white/10" />
    </div>
  );
};

const Hero = () => {
  return (
    <Section id="home" className="pt-16">
      {/* Animated OGL shader background */}
      <div className="absolute inset-0 -z-10">
        <Balatro
          isRotate={false}
          mouseInteraction={true}
          pixelFilter={700}
          color1="#6EE7F9"
          color2="#A78BFA"
          color3="#0B0C10"
          contrast={3.6}
          lighting={0.45}
        />
      </div>
      <GridGlow />
      <Spotlight />
      <Container className="relative">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              {HERO.title}
              <span className="block bg-gradient-to-r from-sky-500 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
                {HERO.name}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-4 text-lg text-slate-600 dark:text-slate-300"
            >
              {HERO.tagline}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg ring-1 ring-black/5 transition hover:opacity-90"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 font-medium shadow-sm ring-1 ring-black/5 backdrop-blur transition hover:-translate-y-0.5 hover:shadow dark:border-white/10 dark:bg-white/5"
              >
                Contact
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {HERO.location}</div>
              <div className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" /> Available for opportunities</div>
              <div className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Open to relocate</div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <a className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="https://github.com/mufatamerr" target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" /> GitHub
                <ExternalLink className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </a>
              <a className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="https://www.linkedin.com/in/mustafatamer5/" target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5" /> LinkedIn
                <ExternalLink className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
              </a>
              <a className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href={`mailto:${HERO.email}`}>
                <Mail className="h-5 w-5" /> Email
              </a>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto h-72 w-72 overflow-hidden rounded-3xl border border-white/20 shadow-2xl ring-1 ring-black/5 md:h-[26rem] md:w-[26rem]">
              <img src={HERO.avatar} alt="Avatar" className="h-full w-full object-cover" style={{ objectPosition: '31% -5%', transform: 'scale(1.1)' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow ring-1 ring-black/5 backdrop-blur dark:bg-white/10 dark:text-white">
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

    </Section>
  );
};

const About = () => (
  <Section id="about">
    <Container>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5">
            <h2 className="text-xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
            I'm a third-year Bachelor of Computer Science (Mobile Computing) student at Sheridan College, graduating in 2027. I blend product sense with strong engineering. I like clean abstractions, crisp UI, and fast delivery. I move ideas from zero to launch.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {HERO.phone}</li>
              
              <li className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> {HERO.email}</li>
              <li className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {HERO.location}</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="rounded-3xl bg-gradient-to-tr from-sky-500/10 via-fuchsia-500/10 to-emerald-500/10 p-1">
            <div className="rounded-3xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5">
              {/* Liquid Ether accent */}
              <div className="mb-6 h-48 w-full overflow-hidden rounded-2xl border border-white/10">
                <LiquidEther
                  colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                  mouseForce={20}
                  cursorSize={100}
                  isViscous={false}
                  viscous={30}
                  iterationsViscous={32}
                  iterationsPoisson={32}
                  resolution={0.6}
                  isBounce={false}
                  autoDemo={true}
                  autoSpeed={0.5}
                  autoIntensity={2.2}
                  takeoverDuration={0.25}
                  autoResumeDelay={2500}
                  autoRampDuration={0.6}
                />
              </div>

              <h3 className="text-lg font-semibold tracking-tight">What I bring</h3>
              <ul className="mt-4 grid gap-3 md:grid-cols-2">
                {["Systems thinking", "Rapid prototyping", "Strong UX", "Data-driven", "Secure by default", "Team player"].map((s) => (
                  <li 
                    key={s} 
                    className="glow-hover inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/70 px-3 py-2 text-sm shadow-sm ring-1 ring-black/5 dark:bg-white/5"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                      e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                    }}
                  >
                    <Star className="h-4 w-4" />{s}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-slate-600 dark:text-slate-300">
                I enjoy roles where I own outcomes, talk to users, and ship value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

const Skills = () => (
  <Section id="skills" className="pt-0">
    <Container>
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {Object.entries(SKILLS).map(([k, v]) => (
          <div key={k} className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5">
            <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Code2 className="h-4 w-4" /> {k}
            </h3>
            <div className="flex flex-wrap gap-2">
              {v.map((skill) => (
                <span 
                  key={skill} 
                  className="glow-hover rounded-full border border-white/20 bg-white/80 px-3 py-1 text-sm ring-1 ring-black/5 dark:bg-white/10"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

const Experience = () => (
  <Section id="experience">
    <Container>
      <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-6">
        {EXPERIENCE.map((e, idx) => (
          <div key={idx} className="relative grid gap-4 rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5 md:grid-cols-[220px_1fr]">
            <div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{e.period}</div>
              <div className="mt-1 font-semibold">{e.role}</div>
              <div className="text-slate-600 dark:text-slate-300">{e.company}</div>
            </div>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              {e.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2"><CircleChevronRight className="mt-0.5 h-4 w-4 flex-none" /> <span>{p}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  </Section>
);

const ProjectCard = ({ p }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5"
  >
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
      <div className="flex items-center gap-3">
        {p.href && (
          <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Live <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium hover:underline">
            Repo <Github className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
    <p className="mt-2 text-slate-600 dark:text-slate-300">{p.blurb}</p>
    {p.tags?.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs ring-1 ring-black/5 dark:bg-white/10">
            {t}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const Projects = () => (
  <Section id="projects">
    {/* Three.js Beams backdrop */}
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[560px] w-full max-w-6xl">
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.6}
        scale={0.2}
        rotation={0}
      />
    </div>

    <Container>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">Add your best work here. The layout updates automatically.</p>
        </div>
      </div>
      {PROJECTS.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      ) : (
        <EmptyProjects />
      )}
    </Container>
  </Section>
);

const EmptyProjects = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative mt-6 rounded-3xl border border-dashed border-slate-300/60 p-10 text-center dark:border-white/20">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <div className="relative" style={{ height: '220px', width: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Folder
            size={1.4}
            color="#5227FF"
            items={[
              <div key="a" className="h-full w-full p-2 text-xs text-center">Case Study</div>,
              <div key="b" className="h-full w-full p-2 text-xs text-center">Demo Link</div>,
              <div key="c" className="h-full w-full p-2 text-xs text-center">GitHub</div>,
            ]}
            onNavigate={() => navigate("/projects")}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">My Projects!</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Click the folder to view all projects
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {[].map((x) => (
              <span key={x} className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs ring-1 ring-black/5 dark:bg-white/10">
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <Section id="contact">
    <Container>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Reach out for roles, collabs, or coffee. I reply fast.
          </p>
          <div className="mt-6 space-y-3 text-slate-700 dark:text-slate-200">
            <a className="group flex items-center gap-3" href={`mailto:${HERO.email}`}>
              <Mail className="h-5 w-5" /> {HERO.email}
            </a>
            <a className="group flex items-center gap-3" href="https://www.linkedin.com/in/mustafatamer5/" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5" /> LinkedIn
            </a>
            <a className="group flex items-center gap-3" href="https://github.com/mufatamerr" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" /> GitHub
            </a>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5">
            <h3 className="text-lg font-semibold tracking-tight">Quick message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  // EmailJS configuration - Set these in your .env file or replace with your actual values
  // Get these from https://www.emailjs.com after setting up your account
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

  // Debug: Check if EmailJS is configured (remove this after testing)
  useEffect(() => {
    console.log("EmailJS Config:", {
      SERVICE_ID: EMAILJS_SERVICE_ID ? "✓ Set" : "✗ Missing",
      TEMPLATE_ID: EMAILJS_TEMPLATE_ID ? "✓ Set" : "✗ Missing",
      PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? "✓ Set" : "✗ Missing",
    });
  }, [EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY]);

  const validateForm = () => {
    if (!name.trim()) {
      setStatus({ type: "error", message: "Please enter your name" });
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", message: "Please enter a valid email address" });
      return false;
    }
    if (!message.trim()) {
      setStatus({ type: "error", message: "Please enter a message" });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    // Try EmailJS if configured, otherwise fall back to mailto
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        const templateParams = {
          from_name: name,
          from_email: email,
          message: message,
          reply_to: email,
        };

        const response = await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );

        console.log("EmailJS success:", response);
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." });
        setName("");
        setEmail("");
        setMessage("");
      } catch (error) {
        console.error("EmailJS error details:", error);
        let errorMessage = "Failed to send message. ";
        
        if (error.text) {
          errorMessage += `Error: ${error.text}`;
        } else if (error.message) {
          errorMessage += `Error: ${error.message}`;
        } else {
          errorMessage += "Please check your EmailJS configuration or try again.";
        }
        
        setStatus({ type: "error", message: errorMessage });
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback to mailto
      const mailto = `mailto:${HERO.email}?subject=Portfolio%20message%20from%20${encodeURIComponent(
        name
      )}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
      window.location.href = mailto;
      setStatus({ type: "success", message: "Opening your email client..." });
      setName("");
      setEmail("");
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/80 px-3 py-2 ring-1 ring-black/5 transition focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-white/10"
          placeholder="Your name"
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-white/20 bg-white/80 px-3 py-2 ring-1 ring-black/5 transition focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-white/10"
          placeholder="your.email@example.com"
          disabled={loading}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-white/20 bg-white/80 px-3 py-2 ring-1 ring-black/5 transition focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-white/10"
          placeholder="Write a short note"
          disabled={loading}
        />
      </div>
      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 font-medium text-white shadow-lg ring-1 ring-black/5 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Sending...
            </>
          ) : (
            <>
              Send <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </button>
        {status.message && (
          <div
            className={`rounded-xl px-3 py-2 text-sm ${
              status.type === "success"
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </form>
  );
};

const Footer = () => (
  <footer className="relative mt-24 border-t border-white/10 py-12">
    <Container className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <p className="text-sm text-slate-600 dark:text-slate-300">© {new Date().getFullYear()} {HERO.name}. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#home" className="text-sm hover:underline">Back to top</a>
      </div>
    </Container>
    <GridGlow />
  </footer>
);

// =============================
// HOME PAGE
// =============================
const HomePage = ({ onTheme, theme }) => (
  <>
    <Nav onTheme={onTheme} theme={theme} />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Contact />
    <Footer />
  </>
);

// =============================
// APP
// =============================
export default function App() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="min-h-dvh bg-white text-slate-900 antialiased dark:bg-[#0b0c10] dark:text-white">
      <Routes>
        <Route 
          path="/" 
          element={<HomePage onTheme={() => setTheme(theme === "dark" ? "light" : "dark")} theme={theme} />} 
        />
        <Route 
          path="/projects" 
          element={<ProjectsPage projects={PROJECTS} />} 
        />
      </Routes>
    </div>
  );
}

