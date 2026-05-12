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
      className="relative flex w-full h-[100vh] flex-col items-center justify-center overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
    >
      <ScrollVelocityContainer className="w-full space-y-6 sm:space-y-10">
        <ScrollVelocityRow baseVelocity={3} direction={1} className="py-2">
          {part1.map((item, idx) => (
            <SkillCard key={`p1-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>
        
        <ScrollVelocityRow baseVelocity={3} direction={-1} className="py-2">
          {part2.map((item, idx) => (
            <SkillCard key={`p2-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>

        <ScrollVelocityRow baseVelocity={3} direction={1} className="py-2">
          {part3.map((item, idx) => (
            <SkillCard key={`p3-${idx}`} item={item} idx={idx} />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
