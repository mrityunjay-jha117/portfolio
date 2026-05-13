import RapierPhysics from "./components/Three js components/ball animation/rapier";
import { motion } from "framer-motion";
import { HyperText } from "@/components/ui/hyper-text";
import { useState, useEffect } from "react";

export default function Landing_Page() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Tailwind 'lg' breakpoint is 1024px
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Check initial screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };
  return (
    <div
      id="home-section"
      className="relative h-screen w-full mx-auto text-white flex flex-row items-center justify-center select-none"
    >
      {/* Physics layer - put below UI but give it pointer events */}
      {isDesktop && (
        <div className="absolute inset-0 z-10">
          <RapierPhysics />
        </div>
      )}
      {/* Content above physics layer - Wrapper is pointer-events-none so we can click through empty space */}
      <div className="flex flex-col my-30 w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 relative z-20 pointer-events-none">
        <motion.div
          className="max-w-sm mx-auto sm:mx-0 sm:max-w-md md:max-w-lg lg:max-w-4xl w-full text-center lg:text-left lg:w-3/5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Main heading with consistent sizing */}
          <motion.h1
            variants={item}
            className="text-md sm:text-2xl md:text-3xl text-white font-black mb-3 sm:mb-4 lg:mb-6 text-center lg:text-left pointer-events-auto"
          >
            <HyperText variants={item} duration={1000} delay={0}>
              FULL STACK WEB DEVELOPER
            </HyperText>

            <motion.div
              variants={item}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-blue-400 font-black block mt-2 sm:mt-3"
            >
              Mrityunjay Jha
            </motion.div>
          </motion.h1>

          {/* Description with improved wording and sizing */}
          <motion.p
            variants={item}
            className="w-full lg:w-7/8 text-sm lg:text-lg sm:mb-6 lg:mb-8 leading-relaxed text-center lg:text-left pointer-events-auto"
          >
            I design and build polished web experiences — from performant
            frontends and scalable backends to immersive 3D scenes. I care about
            clarity, performance and secure engineering. Whether it’s a product
            UI, a realtime dashboard, or a creative WebGL demo, I turn
            thoughtful ideas into reliable, maintainable code.
          </motion.p>

          {/* Location with subtle entrance */}
          <motion.h2
            variants={item}
            className="text-sm sm:text-base text-blue-400 md:text-lg font-medium sm:mb-8 lg:mb-10 text-center lg:text-left tracking-wider pointer-events-auto"
          >
            New Delhi , INDIA
          </motion.h2>

          {/* Buttons with improved layout and sizing + motion hover */}
          <div className="flex h-8 sm:h-10 flex-row relative w-4/5 mx-auto sm:mr-auto sm:ml-0 z-[100] justify-center lg:justify-start items-center gap-3 sm:gap-6 mt-5 pointer-events-auto">
            <motion.a
              variants={item}
              href="https://drive.google.com/file/d/1pszshrx1FGB3yUIYwUOMrDXJEaye1Mpl/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="w-full font-bold rounded-full sm:rounded-xl sm:w-36 md:w-40 lg:w-44 h-9 h-full z-[25] relative cursor-pointer bg-red-400 hover:bg-red-500 transition-all duration-300 flex items-center justify-center text-white no-underline text-sm shadow-lg"
            >
              Resume
            </motion.a>

            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                const contactSection =
                  document.getElementById("contact-section");
                if (contactSection) {
                  contactSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className="w-full font-bold rounded-full sm:rounded-xl sm:w-36 md:w-40 lg:w-44 h-9 h-full z-[25] relative cursor-pointer bg-blue-400 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center text-white no-underline text-sm shadow-lg"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
