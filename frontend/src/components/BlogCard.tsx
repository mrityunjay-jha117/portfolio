import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Blog {
  id: string;
  title: string;
  tags?: string[];
}

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      onClick={() => navigate(`/blogs/${blog.id}`)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer h-36 sm:h-48 lg:h-56 w-full"
    >
      {/* Background Image - Full Card */}
      <div className="absolute inset-0">
        <img
          src="/icons_webp/thumbnails/thumb.webp"
          className="w-full h-full object-cover"
        />
        {/* Light overlay for better text visibility */}
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        />
      </div>

      {/* Border */}
      <div className="absolute inset-0 border border-gray-700/50 rounded-2xl" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5">
        <h3 className="text-lg font-bold text-white line-clamp-2">
          {blog.title}
        </h3>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {(blog.tags || []).slice(0, 4).map((t, i) => (
            <span
              key={i}
              className="text-xs bg-black/40 px-2 py-1 rounded text-gray-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export type { Blog };
