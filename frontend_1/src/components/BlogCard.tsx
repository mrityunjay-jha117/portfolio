import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-56 flex-1 min-w-[280px] max-w-[calc(33.333%-1rem)]"
    >
      {/* Background Image - Full Card */}
      <div className="absolute inset-0">
        <motion.img
          src="icons/thumbnails/thumb.jpg"
          alt={blog.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Light overlay for better text visibility */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/0 group-hover:via-purple-500/0 group-hover:to-pink-500/0 transition-all duration-500" />

      {/* Border */}
      <div className="absolute inset-0 border border-gray-700/50 group-hover:border-gray-500/50 rounded-2xl transition-all duration-300" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5">
        {/* Title - Moves up on hover */}
        <motion.h3
          className={`text-lg font-bold line-clamp-2 ${
            isHovered
              ? "text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text"
              : "text-white"
          }`}
          animate={{
            y: isHovered ? -12 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth easing
          }}
        >
          {blog.title}
        </motion.h3>

        {/* Description - Appears on hover with animation */}
        <motion.div
          className="overflow-hidden"
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <p className="text-gray-200 text-sm mt-2 line-clamp-2">
            {blog.description}
          </p>
          <div className="text-purple-300 text-sm font-semibold flex items-center gap-2 mt-2">
            Read More
            <ChevronRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export type { Blog };
