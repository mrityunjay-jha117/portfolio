import { useMemo, memo } from "react";

interface Skill {
  name: string;
  icon: string;
  category: string;
  level: number;
}

export default function SkillsMarquee() {
  const skills: Skill[] = useMemo(
    () => [
      { name: "React", icon: "icons/1.png", category: "Frontend", level: 95 },
      { name: "Node.js", icon: "icons/2.png", category: "Backend", level: 90 },
      {
        name: "TypeScript",
        icon: "icons/3.png",
        category: "Language",
        level: 88,
      },
      { name: "Python", icon: "icons/4.png", category: "Language", level: 85 },
      { name: "MongoDB", icon: "icons/5.png", category: "Database", level: 82 },
      { name: "Docker", icon: "icons/6.png", category: "DevOps", level: 80 },
      { name: "AWS", icon: "icons/7.png", category: "Cloud", level: 78 },
      { name: "GraphQL", icon: "icons/8.png", category: "Backend", level: 85 },
      { name: "Next.js", icon: "icons/9.png", category: "Frontend", level: 92 },
      {
        name: "PostgreSQL",
        icon: "icons/10.png",
        category: "Database",
        level: 80,
      },
      { name: "Redis", icon: "icons/11.png", category: "Database", level: 75 },
      {
        name: "Kubernetes",
        icon: "icons/12.png",
        category: "DevOps",
        level: 72,
      },
      { name: "Git", icon: "icons/13.png", category: "Tools", level: 90 },
      {
        name: "Vue.js",
        icon: "icons/14.webp",
        category: "Frontend",
        level: 70,
      },
      { name: "Firebase", icon: "icons/15.webp", category: "Cloud", level: 85 },
    ],
    []
  );

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
      className="relative flex-shrink-0"
      style={{ width: "160px", height: "144px" }}
    >
      <div className="absolute inset-0 transform-gpu will-change-transform animate-slow-float">
        <div className="group relative h-full w-full rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-gray-700/30 transition-colors duration-300" />

          <div className="relative h-full flex flex-col items-center justify-center p-3">
            <div className="w-16 h-16 mb-2 relative transform-gpu transition-transform duration-700">
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

          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/0 transition-all duration-300 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/0 transition-all duration-300 rounded-br-2xl" />
        </div>
      </div>
    </div>
  );
});
