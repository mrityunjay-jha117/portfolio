import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import Text3DFlip from "@/components/ui/text-3d-flip";

// Project data array with live links and GitHub repo links
const projectsData = [
  {
    id: 0,
    liveLink: "https://genpact.quickintell.com/",
    githubLink: "https://github.com/mrityunjay-jha117/Genpact",
    title: "Genpact",
    description:
      "Genpact is a AI-powered analytics platform that helps businesses make data-driven decisions. It provides a comprehensive suite of tools for data analysis, visualization, and reporting.",
  },
  {
    id: 1,
    liveLink: "https://nirvana-final-delta.vercel.app",
    githubLink: "https://github.com/mrityunjay-jha117/nirvana-final",
    title: "Nirvana",
    description:
      "Nirvana is a travel blogging platform with an immersive UI that lets users share and explore their journeys. Built on a serverless backend, offering seamless content creation, scalability, and an elegant experience.",
  },
  {
    id: 2,
    liveLink: "https://three-six-pearl.vercel.app/",
    githubLink: "https://github.com/mrityunjay-jha117/Three",
    title: "Three Pearl",
    description:
      "Three Pearl is an interactive 3D showcase of my Three.js learning journey, featuring creative experiments in shaders, lighting, and animation — built with React Three Fiber for seamless web rendering. ",
  },
  {
    id: 3,
    liveLink: "https://alaska-69fq.vercel.app/",
    githubLink: "https://github.com/mrityunjay-jha117/Alaska",
    title: "Alaska",
    description:
      "Alaska connects Delhi Metro commuters with matching routes using Mapbox and advanced algorithms for smart path matching and secure chats",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center py-12 sm:py-16 select-none">
      {/* Header */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 mb-8">
        <Text3DFlip
          as="h1"
          className="text-3xl lg:text-6xl xl:text-8xl text-blue-400 font-black tracking-tight"
          textClassName="bg-gray-900 text-blue-400"
          flipTextClassName="bg-gray-900 text-blue-400"
          rotateDirection="top"
        >
          Projects
        </Text3DFlip>
      </div>

      {/* Horizontal scrollable cards */}
      <div
        id="projects-section"
        className="w-full overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <motion.div
          className="flex gap-5 sm:gap-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 pb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
              className="shrink-0 w-[71vw] sm:w-[54vw] md:w-[36vw] lg:w-[26vw] xl:w-[20vw] h-56 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProjectCard project={project} id={project.id} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
