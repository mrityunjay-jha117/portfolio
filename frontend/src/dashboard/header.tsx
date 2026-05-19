import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home-section",
        "about_section",
        "experience_section",
        "projects-section",
        "skills-section",
        "blog-section",
        "contact-section",
      ];

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (at least 40% visible)
          if (
            rect.top <= window.innerHeight * 0.4 &&
            rect.bottom >= window.innerHeight * 0.3
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Get the scrollable container
    const scrollContainer = document.querySelector(".overflow-y-auto");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position

      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const navItems = [
    { id: "about_section", label: "About" },
    { id: "experience_section", label: "Experience" },
    { id: "projects-section", label: "Projects" },
    { id: "blog-section", label: "Blogs" },
    { id: "skills-section", label: "Skills" },
    { id: "contact-section", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sm:mr-20 w-max px-20 py-5 bg-black/90 backdrop-blur-md border border-gray-800 h-10 lg:h-12 ml-auto items-center justify-center rounded-full  shadow-2xl z-[110] relative select-none">
        <nav className="w-full">
          <ul className="flex items-center justify-center space-x-2 lg:space-x-4 text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 py-2 text-xs  font-medium transition-all duration-300 group cursor-pointer ${
                    activeSection === item.id
                      ? "text-red-400"
                      : "hover:text-red-400"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-400 transition-all duration-300 ${
                      activeSection === item.id
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-11/12 max-w-sm mx-auto flex items-center justify-center bg-black/90 backdrop-blur-md border border-gray-800 h-12 rounded-full px-4 shadow-2xl z-[110] relative select-none">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-red-400 transition-colors p-2 flex items-center gap-2 cursor-pointer"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isMobileMenuOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl z-[105] overflow-hidden select-none"
          >
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 font-medium transition-all duration-200 flex items-center space-x-3 rounded-lg cursor-pointer ${
                        activeSection === item.id
                          ? "text-red-400 bg-gray-800/50"
                          : "text-white hover:text-red-400 hover:bg-gray-800/50"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 bg-red-400 rounded-full transition-opacity ${
                          activeSection === item.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></span>
                      <span>{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden w-full fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}
