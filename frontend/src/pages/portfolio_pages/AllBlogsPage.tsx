import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BlogCard, { type Blog } from "../../components/BlogCard";

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const blogsPerPage = 12; // More blogs per page

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog?page=${page}&limit=${blogsPerPage}`
      );
      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
      const data = await res.json();

      // backend returns { items, total, page, limit }
      const items = data.items || [];
      const total = Number(data.total || 0);
      // map items to the Blog type expected by BlogCard (id as string)
      const mapped = items.map((b: any) => ({
        id: String(b.id),
        title: String(b.title || ""),
        tags: Array.isArray(b.tags) ? b.tags : [],
      }));

      setBlogs(mapped);
      setTotalPages(Math.max(1, Math.ceil(total / blogsPerPage)));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 7; // Number of page buttons to show

    if (totalPages <= showPages) {
      // Show all pages if total is less than showPages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Back Button (left aligned inside the content container) */}
      <div className="max-w-7xl mx-auto mb-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex gap-2 text-gray-400 hover:text-white transition-colors items-center"
        >
          <ArrowLeft className="w-5 h-5 -ml-1 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back</span>
        </motion.button>
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-left mb-12"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold mb-3 leading-tight bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          All Blogs
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-3xl">
          Explore our complete collection of articles and insights
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-wrap gap-6">
            {Array.from({ length: blogsPerPage }).map((_, i) => (
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

        {/* Enhanced Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 space-y-6"
        >
          {/* Page Info */}
          <div className="text-center text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-700/50 flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && setCurrentPage(page)
                  }
                  disabled={page === "..."}
                  className={`min-w-[40px] h-12 px-3 rounded-xl transition-all duration-300 font-semibold ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/50 scale-110"
                      : page === "..."
                      ? "bg-transparent text-gray-600 cursor-default"
                      : "bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-700/50 flex items-center gap-2"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick jump removed per design */}
        </motion.div>
      </div>
    </div>
  );
}
