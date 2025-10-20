import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Heart,
  Bookmark,
  Eye,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface BlogDetail {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  views: number;
  likes: number;
  tags: string[];
}

export default function BlogDetailPage() {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
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

      // Dummy data for demonstration
      const dummyBlog: BlogDetail = {
        id: Number(id),
        title: `Blog Post ${id}: Exploring Modern Web Development and Best Practices`,
        description:
          "Dive deep into the latest trends and best practices in web development. Learn about cutting-edge technologies, performance optimization, and creating stunning user experiences.",
        content: `
# Introduction

Welcome to this comprehensive guide on modern web development. In this article, we'll explore the latest trends, technologies, and best practices that are shaping the future of web development.

## The Evolution of Web Development

Web development has come a long way from simple static HTML pages. Today's web applications are complex, interactive, and highly dynamic. The introduction of modern frameworks like React, Vue, and Angular has revolutionized how we build web applications.

### Key Technologies

Let's explore some of the key technologies that are driving modern web development:

1. **React and TypeScript** - Type-safe component-based architecture
2. **Next.js** - Server-side rendering and static site generation
3. **Tailwind CSS** - Utility-first CSS framework
4. **Framer Motion** - Beautiful animations and interactions

## Performance Optimization

Performance is crucial for user experience. Here are some key strategies:

### Code Splitting
Breaking your code into smaller chunks that can be loaded on demand significantly improves initial load times.

### Image Optimization
Using modern image formats like WebP and implementing lazy loading can dramatically reduce page load times.

### Caching Strategies
Implementing proper caching strategies ensures that returning users have a fast experience.

## Best Practices

### 1. Component Architecture
Build reusable, maintainable components that follow the single responsibility principle.

### 2. State Management
Choose the right state management solution for your application's complexity.

### 3. Accessibility
Ensure your applications are accessible to all users, including those with disabilities.

### 4. Testing
Write comprehensive tests to catch bugs early and ensure code quality.

## Modern Design Trends

Design plays a crucial role in user engagement. Current trends include:

- **Dark Mode** - Providing a comfortable viewing experience in low-light environments
- **Glassmorphism** - Frosted glass effect for modern, sleek designs
- **Micro-interactions** - Subtle animations that enhance user experience
- **Responsive Design** - Ensuring seamless experience across all devices

## The Future of Web Development

The web development landscape continues to evolve rapidly. Emerging technologies like:

- **WebAssembly** - Near-native performance in the browser
- **Progressive Web Apps** - Bridging the gap between web and native apps
- **AI Integration** - Intelligent features and personalization
- **Edge Computing** - Faster response times with distributed computing

## Conclusion

Modern web development is an exciting field that continues to evolve. By staying up-to-date with the latest trends and best practices, you can build better, faster, and more user-friendly applications.

Remember, the key to success is continuous learning and adaptation. Keep experimenting, keep building, and keep pushing the boundaries of what's possible on the web.

Happy coding! 🚀
        `,
        image:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop",
        author: {
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
          bio: "Full-stack developer and tech enthusiast. Passionate about building amazing web experiences.",
        },
        date: "October 15, 2025",
        readTime: "8 min read",
        views: 1234,
        likes: 89,
        tags: ["Web Development", "React", "TypeScript", "Best Practices"],
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setBlog(dummyBlog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Send like to backend
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Send bookmark to backend
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

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
          src={blog.image}
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
              {blog.tags.map((tag, index) => (
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

            {/* Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>{blog.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span>{blog.views.toLocaleString()} views</span>
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
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-12 p-6 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-16 h-16 rounded-full border-2 border-purple-500"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {blog.author.name}
                  <User className="w-4 h-4 text-purple-400" />
                </h3>
                <p className="text-gray-400 text-sm">{blog.author.bio}</p>
              </div>
            </div>

            {/* Blog Content */}
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="prose prose-invert prose-lg max-w-none
                prose-headings:bg-gradient-to-r prose-headings:from-blue-400 prose-headings:to-purple-500 prose-headings:bg-clip-text prose-headings:text-transparent
                prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-300 prose-ul:my-6
                prose-ol:text-gray-300 prose-ol:my-6
                prose-li:my-2
                prose-code:text-purple-400 prose-code:bg-gray-800/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
              "
            >
              {blog.content.split("\n").map((paragraph, index) => {
                // Simple markdown-like rendering
                if (paragraph.startsWith("# ")) {
                  return <h1 key={index}>{paragraph.substring(2)}</h1>;
                } else if (paragraph.startsWith("## ")) {
                  return <h2 key={index}>{paragraph.substring(3)}</h2>;
                } else if (paragraph.startsWith("### ")) {
                  return <h3 key={index}>{paragraph.substring(4)}</h3>;
                } else if (paragraph.trim().match(/^\d+\./)) {
                  return (
                    <li key={index}>
                      {paragraph.substring(paragraph.indexOf(".") + 1).trim()}
                    </li>
                  );
                } else if (paragraph.startsWith("- ")) {
                  return <li key={index}>{paragraph.substring(2)}</li>;
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </motion.article>
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
                <h3 className="text-lg font-semibold mb-4">Engage</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleLike}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      liked
                        ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                        : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Heart
                        className={`w-5 h-5 ${liked ? "fill-current" : ""}`}
                      />
                      Like
                    </span>
                    <span>{liked ? blog.likes + 1 : blog.likes}</span>
                  </button>

                  <button
                    onClick={handleBookmark}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      bookmarked
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Bookmark
                        className={`w-5 h-5 ${
                          bookmarked ? "fill-current" : ""
                        }`}
                      />
                      Bookmark
                    </span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-xl transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
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
