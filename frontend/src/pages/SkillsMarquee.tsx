import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

import { useMemo } from "react";

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
      { name: "C", icon: "/icons_webp/c.webp", category: "Languages" },
      { name: "C++", icon: "/icons_webp/c++.webp", category: "Languages" },
      { name: "Python", icon: "/icons_webp/python.webp", category: "Languages" },
      {
        name: "JavaScript",
        icon: "/icons_webp/javascript.webp",
        category: "Languages",
      },
      {
        name: "TypeScript",
        icon: "/icons_webp/typescript.webp",
        category: "Languages",
      },
      { name: "HTML", icon: "/icons_webp/html.webp", category: "Languages" },
      { name: "XML", icon: "/icons_webp/xml.webp", category: "Languages" },
      { name: "CSS", icon: "/icons_webp/css-3.webp", category: "Languages" },

      // Frontend
      { name: "React.js", icon: "/icons_webp/react.webp", category: "Frontend" },
      { name: "Next.js", icon: "/icons_webp/nextjs.webp", category: "Frontend" },
      {
        name: "Tailwind CSS",
        icon: "/icons_webp/tailwind.webp",
        category: "Frontend",
      },
      { name: "Recoil.js", icon: "/icons_webp/recoil.webp", category: "Frontend" },
      { name: "Redux Toolkit", icon: "/icons_webp/redux.webp", category: "Frontend" },
      {
        name: "Framer Motion",
        icon: "/icons_webp/framer-motion.webp",
        category: "Frontend",
      },
      { name: "WebRTC", icon: "/icons_webp/webrtc.webp", category: "Frontend" },

      // Backend
      { name: "Node.js", icon: "/icons_webp/node-js.webp", category: "Backend" },
      { name: "Hono", icon: "/icons_webp/hono.webp", category: "Backend" },
      { name: "JWT", icon: "/icons_webp/jwt.webp", category: "Backend" },
      { name: "OAuth 2.0", icon: "/icons_webp/oauth.webp", category: "Backend" },
      { name: "WebSockets", icon: "/icons_webp/websocket.webp", category: "Backend" },
      { name: "Socket.IO", icon: "/icons_webp/socket-io.webp", category: "Backend" },
      { name: "NGINX", icon: "/icons_webp/nginx.webp", category: "Backend" },
      { name: "Redis", icon: "/icons_webp/redis.webp", category: "Backend" },

      // Databases & ORM
      {
        name: "PostgreSQL",
        icon: "/icons_webp/postgresql.webp",
        category: "Databases & ORM",
      },
      {
        name: "MongoDB",
        icon: "/icons_webp/mongo.webp",
        category: "Databases & ORM",
      },
      {
        name: "MySQL",
        icon: "/icons_webp/mysql-logo-pure.webp",
        category: "Databases & ORM",
      },
      {
        name: "Prisma ORM",
        icon: "/icons_webp/prisma-3.webp",
        category: "Databases & ORM",
      },

      // 3D & Interactive
      {
        name: "Three.js",
        icon: "/icons_webp/threejs-1.webp",
        category: "3D & Interactive",
      },
      {
        name: "Gsap",
        icon: "/icons_webp/gsap-greensock.webp",
        category: "3D & Interactive",
      },
      {
        name: "Blender",
        icon: "/icons_webp/blender-2.webp",
        category: "3D & Interactive",
      },
      {
        name: "Figma",
        icon: "/icons_webp/figma-icon.webp",
        category: "3D & Interactive",
      },

      // DevOps & Deployment
      {
        name: "GitHub",
        icon: "/icons_webp/github-icon-1.webp",
        category: "DevOps & Deployment",
      },
      {
        name: "Git",
        icon: "/icons_webp/git-icon.webp",
        category: "DevOps & Deployment",
      },
      {
        name: "Docker",
        icon: "/icons_webp/docker-4.webp",
        category: "DevOps & Deployment",
      },
      {
        name: "Vercel",
        icon: "/icons_webp/v0-1.webp",
        category: "DevOps & Deployment",
      },
      {
        name: "Cloudflare Workers",
        icon: "/icons_webp/cloudflare-1.webp",
        category: "DevOps & Deployment",
      },
      {
        name: "AWS",
        icon: "/icons_webp/aws-2.webp",
        category: "DevOps & Deployment",
      },
    ];

    return list;
  }, []);
  const partSize = Math.ceil(skills.length / 3);
  const part1 = skills.slice(0, partSize);
  const part2 = skills.slice(partSize, partSize * 2);
  const part3 = skills.slice(partSize * 2);

  const SkillCard = ({ item, idx }: { item: Skill; idx: number }) => (
    <div
      key={idx}
      className="group relative flex h-28 w-40 sm:h-36 sm:w-48 mx-4 sm:mx-6 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white/4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-105 hover:bg-white/10  hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
    >
      <img
        src={item.icon}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="h-10 w-10 sm:h-14 sm:w-14 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-xs sm:text-sm font-semibold tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-white">
        {item.name}
      </span>
    </div>
  );

  return (
    <div 
      id="skills-section"
      className="relative flex w-full min-h-screen lg:h-screen py-20 lg:py-0 flex-col items-center justify-center overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <ScrollVelocityContainer className="w-full space-y-6 sm:space-y-10">
        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-2">
          {part1.map((item, idx) => (
            <SkillCard key={`p1-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>
        
        <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-2">
          {part2.map((item, idx) => (
            <SkillCard key={`p2-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>

        <ScrollVelocityRow baseVelocity={6} direction={1} className="py-2">
          {part3.map((item, idx) => (
            <SkillCard key={`p3-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
