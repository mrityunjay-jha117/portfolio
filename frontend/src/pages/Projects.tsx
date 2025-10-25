import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  // Project data array with live links and GitHub repo links
  const projectsData = [
    {
      id: 0,
      liveLink: "https://your-project-1-live.com",
      githubLink: "https://github.com/mrityunjay-jha117/AirBit",
      title: "AirBit",
      description:
        "videostreaming platform leveraging WebRTC to deliver low-latency, video content with real-time chat.",
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
        return "w-full sm:w-1/4 h-48 sm:h-44 md:h-52 lg:h-72 xl:h-88"; // Increased mobile height from h-36 to h-48
      case 1: // Adjacent cards (medium)
        return "w-full sm:w-1/5 h-44 sm:h-40 md:h-48 lg:h-64 xl:h-80"; // Increased mobile height from h-32 to h-44
      case 2: // Outer cards (smallest)
        return "w-full sm:w-1/6 h-40 sm:h-36 md:h-44 lg:h-56 xl:h-72"; // Increased mobile height from h-28 to h-40
      default:
        return "w-full sm:w-1/6 h-40 sm:h-36 md:h-44 lg:h-56 xl:h-72"; // Increased mobile height from h-28 to h-40
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
    <div className="h-screen w-full flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 justify-center py-8 sm:py-12 select-none">
      <div className="flex items-start justify-start w-full text-left">
        <h1 className="text-3xl lg:text-6xl xl:text-8xl text-blue-500 font-black tracking-tight">
          Projects
        </h1>
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
            {/* Optimized card layout */}
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center items-center">
              {" "}
              {/* Reduced gaps */}
              {cardData.map((card) => (
                <motion.div
                  key={card.id}
                  initial={{ scale: 0.95, opacity: 0 }} // Less dramatic initial state
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4, // Faster duration
                    delay: card.delay,
                    ease: "easeOut", // Simpler easing
                  }}
                  className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white shadow-lg will-change-transform transform-gpu ${
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
