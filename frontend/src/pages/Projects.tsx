import { motion } from "framer-motion";
import { useMemo, useCallback, useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import Text3DFlip from "@/components/ui/text-3d-flip";

export default function Projects() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Memoize size calculation function to prevent re-creation
  const getSizeClasses = useCallback((distance: number) => {
    switch (distance) {
      case 0: // Center card (largest)
        return "h-40 sm:w-1/4 sm:h-44 md:h-52 lg:h-72 xl:h-88";
      case 1: // Adjacent cards (medium)
        return "h-40 sm:w-1/5 sm:h-40 md:h-48 lg:h-64 xl:h-80";
      case 2: // Outer cards (smallest)
        return "h-40 sm:w-1/6 sm:h-36 md:h-44 lg:h-56 xl:h-72";
      default:
        return "h-40 sm:w-1/6 sm:h-36 md:h-44 lg:h-56 xl:h-72";
    }
  }, []);

  // Memoize card data to prevent recalculation
  const cardData = useMemo(() => {
    const centerIndex = 2;
    return [1, 2, 3, 4, 5].map((_, idx) => ({
      id: idx,
      distanceFromCenter: Math.abs(idx - centerIndex),
      sizeClass: getSizeClasses(Math.abs(idx - centerIndex)),
      delay: 0.08 * idx, // Reduced delay for faster animations
      isComingSoon: idx === 4, // Last card is "coming soon"
      projectData: idx < 4 ? projectsData[idx] : null, // Link to project data for first 4 cards
    }));
  }, [getSizeClasses, projectsData]);

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 justify-center py-12 sm:py-16 select-none">
      <div className="flex items-start justify-start w-full text-left">
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

      <div
        id="projects-section"
        className="flex flex-col items-center justify-center w-full "
      >
        <section className="px-2 sm:px-4 w-full py-6 sm:py-8 md:py-12 lg:py-16">
          <motion.div
            className="w-full mx-auto flex flex-col justify-center items-center"
            initial={{ opacity: 0, y: 20 }} // Reduced movement
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }} // Reduced threshold
            transition={{ duration: 0.6 }} // Faster duration
          >
            {/* 2-col grid on mobile, flex-row on sm+ */}
            <div className="w-full grid grid-cols-2 sm:flex sm:flex-row justify-center items-center gap-4 sm:gap-3 md:gap-4 py-4">
              {cardData.map((card) => (
                <motion.div
                  key={card.id}
                  initial={
                    isDesktop 
                      ? { scale: 0.95, opacity: 0 } 
                      : { x: card.id % 2 === 0 ? -30 : 30, opacity: 0 } // Mobile alternating slide-in
                  } 
                  whileInView={
                    isDesktop 
                      ? { scale: 1, opacity: 1 } 
                      : { x: 0, opacity: 1 }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: isDesktop ? 0.4 : 0.5, 
                    delay: isDesktop ? card.delay : card.id * 0.15, // Smooth mobile stagger
                    ease: "easeOut", 
                  }}
                  className={`relative rounded-2xl lg:rounded-3xl bg-white shadow-xl will-change-transform transform-gpu ${
                    card.sizeClass
                  } ${card.isComingSoon ? "hidden sm:flex" : ""}`} // Hide coming soon card on mobile
                  style={{ backfaceVisibility: "hidden" }} // Performance optimization
                >
                  {card.isComingSoon ? (
                    // Coming Soon card content
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 border-gray-600">
                      <div className="text-center p-4">
                        <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2">
                          More Projects
                        </h3>
                        <p className="text-gray-400 text-sm sm:text-base">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ProjectCard project={card.projectData!} id={card.id} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
