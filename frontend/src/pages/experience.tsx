import { motion } from "framer-motion";
import Text3DFlip from "@/components/ui/text-3d-flip";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "QuickIntell",
    location: "Delhi, India",
    period: "Nov 2025 – May 2026",
    certificateLink:"https://drive.google.com/file/d/1S0L4o9jjQVGmE749-CcCAREo66CRjDdl/view?usp=drive_link",
    description: [
      "Enforced granular role-based access control across 15+ application modules using CASL and Prisma, ensuring secure invite lifecycles and strict compliance for sensitive PHI records.",
      "Orchestrated an idempotent, event-driven billing pipeline via Stripe Webhooks to manage multi-tenant subscriptions and usage-based overages, effectively preventing critical revenue leakage errors.",
      "Devised an asynchronous background processing engine, implementing fault-tolerant batching to handle heavy loads without service degradation while respecting strict external API limits.",
      "Operationalized an AI-driven RAG pipeline on AWS EC2, processing 3,000+ complex rows via persistent tmux sessions and indexing 50,000+ vector entries in Pinecone for precise automated mapping.",
    ],
    color: "blue",
  },
  {
    title: "Web Development Intern",
    company: "University School of Innovation and Entrepreneurship (USIP), DTU",
    location: "Delhi, India",
    period: "Mar 2025 – May 2025",
    certificateLink:
      "https://drive.google.com/file/d/1PKdviZF6PkCDA8858tXr7N_MkHTKVhOQ/view?usp=drive_link",
    description: [
      "Authored comprehensive technical documentation for internal web platforms, ensuring code maintainability and clearer API specifications.",
      "Implemented frontend performance optimizations, including search debouncing and customized form validation, to improve UI responsiveness.",
      "Collaborated on bug fixes and minor feature updates while gaining hands-on proficiency in full-stack web development standards.",
    ],
    color: "red",
  },
];

const colorMap: Record<string, { border: string; hoverBorder: string; glow: string; accent: string; badge: string; dot: string }> = {
  blue: {
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-400/60",
    glow: "hover:shadow-blue-500/10",
    accent: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    dot: "bg-blue-400",
  },
  red: {
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-400/60",
    glow: "hover:shadow-red-500/10",
    accent: "text-red-400",
    badge: "bg-red-500/15 text-red-300 border-red-500/30",
    dot: "bg-red-400",
  },
};

export default function Experience() {
  return (
    <div
      id="experience_section"
      className="min-h-screen w-full flex flex-col items-start px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 justify-center py-16 sm:py-20 select-none"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full mb-10 sm:mb-14"
      >
        <Text3DFlip
          as="h1"
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-blue-400 mb-2"
          textClassName="text-blue-400"
          flipTextClassName="text-blue-400"
          rotateDirection="top"
        >
          Experience
        </Text3DFlip>
        <div className="h-2 w-24 bg-red-400 rounded-full" />
      </motion.div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {experiences.map((exp, index) => {
          const colors = colorMap[exp.color] || colorMap.blue;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-xl bg-gray-800/40 backdrop-blur-md border ${colors.border} ${colors.hoverBorder} ${colors.glow} shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  exp.color === "blue"
                    ? "bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
                    : "bg-gradient-to-r from-red-500 via-red-400 to-orange-400"
                } opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="p-4 sm:p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors leading-tight">
                      {exp.title}
                    </h3>
                    <p className={`${colors.accent} font-semibold text-xs sm:text-sm mt-0.5`}>
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-700/60 text-gray-300 border border-gray-600/40">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {exp.location}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-700/50 mb-3" />

                {/* Description bullets */}
                <ul className="w-9/10  space-y-2">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs  text-gray-300 leading-relaxed"
                    >
                      <span className={`mt-1.5 w-1 h-1 rounded-full ${colors.dot} shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Certificate link */}
                {exp.certificateLink && (
                  <motion.a
                    href={exp.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer group/link"
                  >
                    View Certificate
                    <span className="group-hover/link:translate-x-1 transition-transform">
                      →
                    </span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
