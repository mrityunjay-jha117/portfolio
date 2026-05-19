import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../dashboard/header";
import Sidenav from "../dashboard/sidenav";

import First from "./heroSection";
import Fourth from "./Projects";
import Second from "./about";
import Third from "./experience";
import Fifth from "./BlogPage";
import Sixth from "./SkillsMarquee";
import Seventh from "./contactMe";

import PortfolioSection from "./components/Three js components/car_model_animation/canvas_setter";
import AnimatedModel from "./components/Three js components/car_model_animation/animated_model";

export default function Portfolio() {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Screen size detection for conditional 3D rendering
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll detection - listen to window scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Modular and device-optimized animation variants
  const sectionVariants = {
    hidden: isDesktop
      ? { opacity: 0, y: 60 } // Desktop: Standard slide up
      : { opacity: 0, scale: 0.95, y: 20 }, // Mobile: Smooth zoom-in with minor slide (better for mobile GPU)
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isDesktop ? 0.7 : 0.6,
        ease: "easeOut" as const,
        delay: isDesktop ? 0.1 : 0, // No delay on mobile to feel more responsive
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-gray-900 w-full min-h-screen">
      {/* Desktop Cursor and Sidenav - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:block fixed left-4 xl:left-10 w-13 z-[115] h-2/3 top-[20%] bg-blue-400 rounded-full"
      >
        <Sidenav />
      </motion.div>

      {/* Header - Responsive positioning */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="fixed w-full z-[110] h-15 top-5 rounded-full"
      >
        <Header />
      </motion.div>

      {/* Floating Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="fixed bottom-6 sm:bottom-10 z-[105] w-15 h-auto flex flex-col gap-3 sm:gap-5 items-center justify-center right-4 sm:right-10"
        layout
      >
        {/* Scroll to Top Button */}
        <AnimatePresence mode="wait">
          {showScrollTop && (
            <motion.button
              layout
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.5,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="w-12 h-12 sm:w-15 sm:h-15 rounded-full text-white flex items-center justify-center bg-blue-400 hover:bg-blue-600 transition-colors cursor-pointer shadow-lg z-[105] relative"
              title="Scroll to Top"
            >
              ^^
            </motion.button>
          )}
        </AnimatePresence>

        {/* Game Button - Desktop only */}
        <motion.button
          layout
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/game")}
          className="hidden sm:flex w-12 h-12 sm:w-15 sm:h-15 rounded-full text-gray-900 items-center justify-center bg-white hover:bg-blue-400 hover:text-white transition-colors cursor-pointer shadow-lg z-[105] relative"
          title="Open 3D Game"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6H3a2 2 0 00-2 2v8a2 2 0 002 2h18a2 2 0 002-2V8a2 2 0 00-2-2zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
          </svg>
        </motion.button>
      </motion.div>

      <div className="w-full flex flex-col gap-0">
        <motion.div
          className="h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <First />
        </motion.div>

        <motion.div
          className="relative flex flex-row h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Second />
          {isDesktop && (
            <div className="absolute z-10 h-screen w-full">
              <PortfolioSection
                Scene={
                  <AnimatedModel
                    gltfPath="/models/stylized_mustang.glb"
                    position={[15, -1, -13]}
                  />
                }
              />
            </div>
          )}
        </motion.div>

        <motion.div
          className="  h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Third />
        </motion.div>

        <motion.div
          className="  h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Fourth />
        </motion.div>

        <motion.div
          className="  h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Fifth />
        </motion.div>

        <motion.div
          className="  h-auto lg:min-h-screen w-full"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Sixth />
        </motion.div>

        <motion.div
          className="  h-auto lg:min-h-screen"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: isDesktop ? "-100px" : "-50px" }}
        >
          <Seventh />
        </motion.div>
      </div>
    </div>
  );
}
