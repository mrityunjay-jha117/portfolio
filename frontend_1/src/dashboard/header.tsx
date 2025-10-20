import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { id: "projects-section", label: "Projects" },
    { id: "blog-section", label: "Blogs" },
    { id: "contact-section", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sm:mr-20 w-auto max-w-2xl bg-black/90 backdrop-blur-md border border-gray-800 h-12 lg:h-14 ml-auto items-center justify-center rounded-full px-4 lg:px-8 shadow-2xl z-[110] relative">
        <nav className="w-full">
          <ul className="flex items-center justify-center space-x-4 lg:space-x-8 text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-3 py-2 text-sm lg:text-base font-medium hover:text-red-400 transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden w-11/12 max-w-sm mx-auto flex items-center justify-center bg-black/90 backdrop-blur-md border border-gray-800 h-12 rounded-full px-4 shadow-2xl z-[110] relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-red-400 transition-colors p-2 flex items-center gap-2"
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
            className="md:hidden absolute top-20 left-4 right-4 bg-black/95 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl z-[105] overflow-hidden"
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
                      className="w-full text-left px-4 py-3 text-white font-medium hover:text-red-400 hover:bg-gray-800/50 rounded-lg transition-all duration-200 flex items-center space-x-3"
                    >
                      <span className="w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
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
