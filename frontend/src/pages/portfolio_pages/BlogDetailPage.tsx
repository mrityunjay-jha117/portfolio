import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Segment = { text?: string; images?: string[] };
type BlogDetail = {
  id: string;
  title: string;
  description: Segment[]; // array of segments with images
  createdAt?: string;
  tags?: string[];
  additional_links?: string[];
  code_link?: string;
};

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [slideIndices, setSlideIndices] = useState<number[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    setLoading(true);
    try {
      // Dummy API call - replace with your actual endpoint
      // const response = await fetch(`/api/blogs/${id}`);
      // const data = await response.json();

      // Dummy data matching the Prisma schema
      const dummyBlog: BlogDetail = {
        id: String(id || "1"),
        title: `Blog Post ${id}: Exploring Modern Web Development`,
        description: [
          {
            text: "Dive deep into the latest trends and best practices in web development.",
            images: [
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop",
              "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=600&fit=crop",
            ],
          },
          {
            text: "Learn about performance optimization and creating stunning user experiences.",
            images: [
              "https://images.unsplash.com/photo-1526378722571-2a3a3ad6e1d7?w=1200&h=600&fit=crop",
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        tags: ["web development", "react"],
        additional_links: ["https://example.com"],
        code_link: "https://github.com/example/repo",
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setBlog(dummyBlog);
      // initialize slide indices (one per segment)
      setSlideIndices((dummyBlog.description || []).map(() => 0));
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  // Engagement UI (likes/bookmarks/share) removed to match Prisma schema fields.

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading blog...</p>
        </motion.div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-40 flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-400 hover:text-white hover:border-purple-500/50 transition-all group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        {/* Hero Image */}
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src="/icons/thumbnails/thumb.jpg"
          alt={blog.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {(blog.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-sm text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
            >
              {blog.title}
            </motion.h1>

            {/* Meta Info: show createdAt only if available */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-8"
          >

            {/* Render description segments: images slider BEFORE text for each segment */}
            <div className="space-y-12">
              {(blog.description || []).map((seg, si) => (
                <motion.section
                  key={si}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + si * 0.1 }}
                  className="space-y-4"
                >
                  {/* Image slider for this segment */}
                  {seg.images &&
                    seg.images.length > 0 &&
                    (() => {
                      const imgs = seg.images || [];
                      return (
                        <div className="relative w-full rounded-lg overflow-hidden">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setSlideIndices((s) => {
                                  const copy = [...s];
                                  copy[si] = Math.max(0, (copy[si] || 0) - 1);
                                  return copy;
                                })
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-800/40 rounded-full"
                            >
                              ‹
                            </button>

                            <motion.div className="w-full overflow-hidden">
                              <motion.div
                                key={`slider-${si}-${slideIndices[si] || 0}`}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 120 }}
                              >
                                <img
                                  src={
                                    imgs[(slideIndices[si] || 0) % imgs.length]
                                  }
                                  alt={`segment-${si}-img`}
                                  className="w-full h-64 sm:h-80 object-cover rounded-lg"
                                />
                              </motion.div>
                            </motion.div>

                            <button
                              onClick={() =>
                                setSlideIndices((s) => {
                                  const copy = [...s];
                                  copy[si] =
                                    ((copy[si] || 0) + 1) % imgs.length;
                                  return copy;
                                })
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-800/40 rounded-full"
                            >
                              ›
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                  {/* Text for this segment */}
                  {seg.text && (
                    <p className="text-gray-300 leading-relaxed">{seg.text}</p>
                  )}
                </motion.section>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8 space-y-6">
              {/* Action Buttons */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Links</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  {blog.code_link && (
                    <a
                      href={blog.code_link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-purple-300 hover:underline"
                    >
                      View code repository
                    </a>
                  )}
                  {(blog.additional_links || []).map((lnk, idx) => (
                    <a
                      key={idx}
                      href={lnk}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-gray-300 hover:underline"
                    >
                      {lnk}
                    </a>
                  ))}
                  {!(
                    blog.code_link || (blog.additional_links || []).length
                  ) && (
                    <div className="text-gray-500">
                      No external links provided.
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {(blog.tags || []).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300 hover:bg-purple-500/20 cursor-pointer transition-colors"
                    >
                      #{tag.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-12 border-t border-gray-700/50"
        >
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
                onClick={() => navigate(`/blogs/${Number(id) + i}`)}
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      1499750310107 + i
                    }?w=400&h=300&fit=crop`}
                    alt="Related post"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                    Related Blog Post {i}: Amazing Content
                  </h3>
                  <p className="text-sm text-gray-400 mt-2">5 min read</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
