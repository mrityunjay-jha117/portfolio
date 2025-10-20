import React, { useState } from "react";
import { motion } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  description: string;
  liveLink?: string;
  githubLink?: string;
}

export default function ProjectCard({
  project,
  id,
}: {
  project: Project;
  id: number;
}) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative w-full h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden"
    >
      <video
        className="w-full h-full object-cover"
        src={`/gif/${id + 1}.webm`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <motion.div
        className="absolute inset-0 bg-black"
        animate={hover ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.22 }}
        style={{ pointerEvents: "none", zIndex: 10 }}
      />

      <div className="absolute flex flex-row gap-2 bottom-3 right-3 z-20">
        {project.githubLink && (
          <button
            onClick={() => window.open(project.githubLink, "_blank")}
            className="w-10 h-10 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg"
            title="View GitHub Repository"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {project.liveLink && (
          <button
            onClick={() => window.open(project.liveLink, "_blank")}
            className="w-10 h-10 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg"
            title="View Live Demo"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        )}
      </div>

      <motion.div
        className="absolute left-4 right-4 bottom-16 z-30"
        animate={hover ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.26 }}
        style={{ pointerEvents: "none" }}
      >
        <motion.h3
          className="text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg"
          animate={hover ? { y: -20 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {project.title}
        </motion.h3>

        <motion.div
          className="mt-2 text-sm text-gray-200 leading-relaxed overflow-hidden max-w-full"
          animate={
            hover
              ? { opacity: 1, y: 0, maxHeight: 200 }
              : { opacity: 0, y: 8, maxHeight: 0 }
          }
          transition={{ duration: 0.26 }}
        >
          {project.description}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
