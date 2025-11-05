import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import LiquidEther from "./visuals/LiquidEther";

const Container = ({ className = "", children }) => (
  <div className={`mx-auto w-full max-w-7xl px-6 md:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`relative py-24 md:py-32 ${className}`}>
    {children}
  </section>
);

const ProjectsPage = ({ projects = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-white text-slate-900 antialiased dark:bg-[#0b0c10] dark:text-white">
      {/* Background with LiquidEther */}
      <div className="fixed inset-0 -z-10">
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

      <Section id="projects-page" className="pt-16">
        <Container>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-300/50 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow dark:border-white/10 dark:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              My Projects
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
              A collection of my work and side projects
            </p>
          </motion.div>

          {projects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-white/5"
                >
                  {/* LiquidEther effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <LiquidEther
                      colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                      mouseForce={15}
                      cursorSize={80}
                      resolution={0.4}
                      autoDemo={false}
                      autoSpeed={0.3}
                      autoIntensity={1.5}
                      className="rounded-3xl"
                    />
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      {project.blurb || project.description}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="rounded-full border border-white/20 bg-white/80 px-3 py-1 text-xs ring-1 ring-black/5 dark:bg-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {(project.href || project.repo) && (
                      <div className="mt-4 flex gap-3">
                        {project.href && (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400"
                          >
                            Live Demo →
                          </a>
                        )}
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-sky-500 hover:text-sky-600 dark:text-sky-400"
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl border border-dashed border-slate-300/60 p-16 text-center dark:border-white/20"
            >
              <p className="text-lg text-slate-600 dark:text-slate-300">
                No projects added yet. Check back soon!
              </p>
            </motion.div>
          )}
        </Container>
      </Section>

    </div>
  );
};

export default ProjectsPage;

