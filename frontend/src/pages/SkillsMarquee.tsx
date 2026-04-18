import { useMemo, memo } from "react";

interface Skill {
  name: string;
  icon?: string;
  category?: string;
}

export default function SkillsMarquee() {
  const skills: Skill[] = useMemo(() => {
    // Canonical skill dataset provided by user
    const list: Skill[] = [
      // Languages
      { name: "C", icon: "/icons/c.png", category: "Languages" },
      { name: "C++", icon: "/icons/c++.png", category: "Languages" },
      { name: "Python", icon: "/icons/python.png", category: "Languages" },
      {
        name: "JavaScript",
        icon: "/icons/javascript.png",
        category: "Languages",
      },
      {
        name: "TypeScript",
        icon: "/icons/typescript.png",
        category: "Languages",
      },
      { name: "HTML", icon: "/icons/html.png", category: "Languages" },
      { name: "XML", icon: "/icons/xml.png", category: "Languages" },
      { name: "CSS", icon: "/icons/css-3.png", category: "Languages" },

      // Frontend
      { name: "React.js", icon: "/icons/react.png", category: "Frontend" },
      { name: "Next.js", icon: "/icons/nextjs.png", category: "Frontend" },
      {
        name: "Tailwind CSS",
        icon: "/icons/tailwind.png",
        category: "Frontend",
      },
      { name: "Recoil.js", icon: "/icons/recoil.png", category: "Frontend" },
      { name: "Redux Toolkit", icon: "/icons/redux.png", category: "Frontend" },
      {
        name: "Framer Motion",
        icon: "/icons/framer-motion.svg",
        category: "Frontend",
      },
      { name: "WebRTC", icon: "/icons/webrtc.svg", category: "Frontend" },

      // Backend
      { name: "Node.js", icon: "/icons/node-js.svg", category: "Backend" },
      { name: "Hono", icon: "/icons/hono.webp", category: "Backend" },
      { name: "JWT", icon: "/icons/jwt.webp", category: "Backend" },
      { name: "OAuth 2.0", icon: "/icons/oauth.svg", category: "Backend" },
      { name: "WebSockets", icon: "/icons/websocket.svg", category: "Backend" },
      { name: "Socket.IO", icon: "/icons/socket-io.svg", category: "Backend" },
      { name: "NGINX", icon: "/icons/nginx.svg", category: "Backend" },
      { name: "Redis", icon: "/icons/redis.svg", category: "Backend" },

      // Databases & ORM
      {
        name: "PostgreSQL",
        icon: "/icons/postgresql.svg",
        category: "Databases & ORM",
      },
      {
        name: "MongoDB",
        icon: "/icons/mongo.svg",
        category: "Databases & ORM",
      },
      {
        name: "MySQL",
        icon: "/icons/mysql-logo-pure.svg",
        category: "Databases & ORM",
      },
      {
        name: "Prisma ORM",
        icon: "/icons/prisma-3.svg",
        category: "Databases & ORM",
      },

      // 3D & Interactive
      {
        name: "Three.js",
        icon: "/icons/threejs-1.svg",
        category: "3D & Interactive",
      },
      {
        name: "Gsap",
        icon: "/icons/gsap-greensock.svg",
        category: "3D & Interactive",
      },
      {
        name: "Blender",
        icon: "/icons/blender-2.svg",
        category: "3D & Interactive",
      },
      {
        name: "Figma",
        icon: "/icons/figma-icon.svg",
        category: "3D & Interactive",
      },

      // DevOps & Deployment
      {
        name: "GitHub",
        icon: "/icons/github-icon-1.svg",
        category: "DevOps & Deployment",
      },
      {
        name: "Git",
        icon: "/icons/git-icon.svg",
        category: "DevOps & Deployment",
      },
      {
        name: "Docker",
        icon: "/icons/docker-4.svg",
        category: "DevOps & Deployment",
      },
      {
        name: "Vercel",
        icon: "/icons/v0-1.svg",
        category: "DevOps & Deployment",
      },
      {
        name: "Cloudflare Workers",
        icon: "/icons/cloudflare-1.svg",
        category: "DevOps & Deployment",
      },
      {
        name: "AWS",
        icon: "/icons/aws-2.svg",
        category: "DevOps & Deployment",
      },
    ];

    return list;
  }, []);

  // Reduced duplication for better performance (2x instead of 3x)
  const duplicatedSkills = useMemo(() => [...skills, ...skills], [skills]);

  return (
    <div
      id="skills-section"
      className="h-full w-full mb-20 overflow-hidden bg-transparent text-white py-8 sm:py-12 lg:py-16 select-none"
    >
      {/* Lightweight Background Accents (no heavy blur/pulse) */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-1/2 w-[48rem] h-[48rem] bg-gradient-to-br from-blue-800/12 to-transparent rounded-full blur-6xl" />
        <div className="absolute bottom-1/4 -right-1/2 w-[48rem] h-[48rem] bg-gradient-to-br from-purple-800/12 to-transparent rounded-full blur-6xl" />
      </div>

      {/* Horizontal Marquee Container */}
      <div className="relative overflow-hidden py-4">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-150 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-150 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

        {/* Multiple Rows of Marquee - CSS driven for performance */}
        <div className="space-y-4">
          <div className="marquee-row marquee-row-slow select-none">
            <div className="marquee-track flex gap-6">
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`row1-${index}`}
                  uniqueId={`row1-${index}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>

          <div className="marquee-row marquee-row-reverse select-none">
            <div className="marquee-track flex gap-6">
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`row2-${index}`}
                  uniqueId={`row2-${index}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>

          <div className="marquee-row marquee-row-fast select-none">
            <div className="marquee-track flex gap-6">
              {duplicatedSkills.map((skill, index) => (
                <SkillCard
                  key={`row3-${index}`}
                  uniqueId={`row3-${index}`}
                  skill={skill}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Memoized Skill Card Component for better performance
interface SkillCardProps {
  uniqueId: string;
  skill: Skill;
}

const SkillCard = memo(function SkillCard({
  uniqueId: _uniqueId,
  skill,
}: SkillCardProps) {
  return (
    <div
      className="relative items-center justify-center flex-shrink-0"
      style={{ width: "140px", height: "100px" }}
    >
      <div className="absolute inset-0 transform-gpu will-change-transform animate-slow-float">
        <div className="group relative h-full w-full rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700/30 transition-colors duration-300" />

          <div className="relative h-full flex flex-col items-center justify-center p-3">
            <div className="w-10 h-10 mb-2 relative transform-gpu transition-transform duration-700">
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-full h-full object-contain pointer-events-none select-none"
                loading="lazy"
                draggable="false"
              />
            </div>

            <h3 className="text-white font-bold text-sm text-center mb-1">
              {skill.name}
            </h3>
          </div>

          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400/0 transition-all duration-300 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/0 transition-all duration-300 rounded-br-2xl" />
        </div>
      </div>
    </div>
  );
});
