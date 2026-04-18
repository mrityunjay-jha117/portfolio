import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BlogCard, { type Blog } from "../components/BlogCard";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const limit = 6;
      const res = await fetch(
        `https://portfolio_backend.mrityunjay-jha2005.workers.dev/api/v1/blog?page=1&limit=${limit}`,
      );
      if (res.ok) {
        const data = await res.json();
        const items = data.items || [];
        const mapped = items.slice(0, limit).map((b: any) => ({
          id: String(b.id),
          title: String(b.title || ""),
          tags: Array.isArray(b.tags) ? b.tags : [],
        }));
        setBlogs(mapped);
      } else {
        // fallback to dummy data when backend not available
        const dummyData = {
          blogs: Array.from({ length: 6 }, (_, i) => ({
            id: String(i + 1),
            title: `Exploring Modern Web Development`,
          })),
        };
        setBlogs(dummyData.blogs as any);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      // fallback dummy
      const dummyData = {
        blogs: Array.from({ length: 6 }, (_, i) => ({
          id: String(i + 1),
          title: `Exploring Modern Web Development`,
        })),
      };
      setBlogs(dummyData.blogs as any);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    navigate("/blogs/all");
  };

  return (
    <div
      id="blog-section"
      className="h-full mb-20 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-36 mb-6 sm:mb-10 rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden bg-transparent text-white py-8 sm:py-12 lg:py-16"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-12 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl md:text-5xl lg:text-8xl font-black mb-3 text-blue-400 ">
          BLOGS
        </h1>
      </motion.div>

      {/* Blog Grid - Left Justified */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-wrap gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800/50 rounded-2xl h-56 flex-1 min-w-[280px] max-w-[calc(33.333%-1rem)] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </motion.div>
        )}

        {/* Centered Show All Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-8 px-4"
        >
          <button
            onClick={handleViewAll}
            className="group relative px-8 py-3 rounded-xl bg-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-400/30"
          >
            <span className="flex items-center gap-2 text-white font-semibold text-sm">
              View More
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
