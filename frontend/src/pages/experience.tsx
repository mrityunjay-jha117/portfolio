import { motion } from "framer-motion";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "QuickIntell",
    location: "Delhi, India",
    period: "Nov 2025 – April 2026",
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

export default function Experience() {
  return (
    <div
      id="experience_section"
      className="min-h-screen w-full flex flex-col items-start px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 justify-center py-12 select-none bg-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full mb-12"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-blue-400 mb-2">
          Experience
        </h1>
        <div className="h-2 w-24 bg-red-400 rounded-full" />
      </motion.div>

      <div className="w-full relative">
        {/* Timeline Line */}
        <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-1 bg-gray-800 transform lg:-translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center w-full`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] lg:left-1/2 lg:-translate-x-1/2 top-0 w-4 h-4 rounded-full bg-blue-400 border-4 border-gray-900 z-10 hidden md:block" />

              <div className="w-full lg:w-[45%]">
                <div className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-blue-400/50 transition-all duration-300 shadow-xl group">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {exp.location}
                  </p>

                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm sm:text-base text-gray-300 leading-relaxed"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {exp.certificateLink && (
                    <motion.a
                      href={exp.certificateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer group/link"
                    >
                      View Certificate
                      <span className="group-hover/link:translate-x-1 transition-transform">
                        →
                      </span>
                    </motion.a>
                  )}
                </div>
              </div>
              <div className="hidden lg:block w-[10%]" />
              <div className="hidden lg:block w-[45%]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
