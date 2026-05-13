import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import First from "./heroSection";
import Second from "./Projects";
import Third from "./about";
import Experience from "./experience";
import Sixth from "./contactMe";
import Header from "../dashboard/header";
import Sidenav from "../dashboard/sidenav";
import BlogPage from "./BlogPage";
import SkillsMarquee from "./SkillsMarquee";
import PortfolioSection from "./components/Three js components/car_model_animation/canvas_setter";
import AnimatedModel from "./components/Three js components/car_model_animation/animated_model";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
interface SpringConfig {
  damping: number; // Controls how quickly the animation settles
  stiffness: number; // Controls the spring stiffness
  mass: number; // Controls the virtual mass of the animated object
  restDelta: number; // Controls the threshold at which animation is considered complete
}
export default function Portfolio() {
  const defaultSpringConfig: SpringConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  };
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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

  const openGame = () => {
    navigate("/game");
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
      {isDesktop && <SmoothCursor springConfig={defaultSpringConfig} />}
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[138] bg-black bg-opacity-50 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 h-full w-80 bg-gray-900 border-l border-gray-700 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white text-xl font-bold">Connect</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Social Links */}
              <div className="space-y-4">
                {[
                  {
                    href: "https://www.linkedin.com/in/mrityunjay-jha-7b0436303/",
                    label: "LinkedIn",
                    src: "icons/sidebar_icons/linkedin.png",
                  },
                  {
                    href: "https://x.com/Mrityunjay2027",
                    label: "Twitter",
                    src: "icons/sidebar_icons/twitter.png",
                  },
                  {
                    href: "https://github.com/mrityunjay-jha117",
                    label: "Github",
                    src: "icons/sidebar_icons/github2.png",
                  },
                  {
                    href: "https://leetcode.com/u/idk_the_answer/",
                    label: "LeetCode",
                    src: "icons/sidebar_icons/leetcode.png",
                  },
                  {
                    href: "https://codeforces.com/profile/silent_cartographer",
                    label: "Codeforces",
                    src: "icons/sidebar_icons/codeforces.png",
                  },
                ].map(({ href, label, src }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <img
                      src={src}
                      alt={label}
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-white font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Floating Action Buttons */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="fixed bottom-6 sm:bottom-10 z-[105] w-15 h-auto flex flex-col gap-3 sm:gap-5 items-center justify-center right-4 sm:right-10"
        layout
      >
        {/* Mobile Menu Button - Only on mobile */}
        <motion.button
          layout
          onClick={() => setShowMobileMenu(true)}
          className="lg:hidden w-12 h-12 sm:w-15 sm:h-15 rounded-full text-white flex items-center justify-center bg-purple-500 hover:bg-purple-600 transition-colors cursor-pointer shadow-lg z-[105] relative"
          title="Social Links"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </motion.button>

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

        {/* Game Button */}
        <motion.button
          layout
          transition={{
            layout: {
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openGame}
          className="w-12 hidden sm:block h-12 sm:w-15 sm:h-15 rounded-full text-white flex items-center justify-center bg-white hover:bg-blue-400 transition-colors cursor-pointer shadow-lg z-[105] relative"
          title="Open 3D Game"
        />
      </motion.div>

      <div className="w-full flex flex-col gap-0   ">
        <motion.div
          className="snap-start min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <First />
        </motion.div>

        <motion.div
          className="relative snap-start flex flex-row min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Third />
          {isDesktop && (
            <div className="absolute z-10 h-screen w-full">
              <PortfolioSection
                Scene={
                  <AnimatedModel
                    gltfPath="/models/stylized_mustang.glb"
                    // gltfPath="/models/seedhi_gaadi.glb"
                    position={[15, -1, -13]}
                  />
                }
              />
            </div>
          )}
        </motion.div>

        <motion.div
          className="snap-start min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Experience />
        </motion.div>

        <motion.div
          className="snap-start min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Second />
        </motion.div>

        <motion.div
          className="snap-start min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <BlogPage />
        </motion.div>

        <motion.div
          className="snap-start min-h-screen w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <SkillsMarquee />
        </motion.div>

        <motion.div
          className="snap-start min-h-screen"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <Sixth />
        </motion.div>
      </div>
    </div>
  );
}
