import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Segment = { text?: string; images?: string[] };
type BlogDetail = {
  id: string;
  title: string;
  description: Segment[];
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
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const dummy: BlogDetail = {
          id: String(id ?? "1"),
          title: `Blog Post ${id ?? "1"}: Exploring Modern Web Development`,
          description: [
            {
              text: "Intro paragraph",
              images: [
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=600&fit=crop",
              ],
            },
            {
              text: "Second paragraph",
              images: [
                "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1200&h=600&fit=crop",
              ],
            },
          ],
          createdAt: new Date().toISOString(),
          tags: ["web development", "react"],
          additional_links: ["https://example.com"],
          code_link: "https://github.com/example/repo",
        };

        await new Promise((r) => setTimeout(r, 200));
        setBlog(dummy);
        setSlideIndices(dummy.description.map(() => 0));
      } catch (err) {
        console.error(err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading blog...</p>
        </div>
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-purple-600 rounded-lg"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );

  const prev = (si: number) =>
    setSlideIndices((s) => {
      const c = [...s];
      const imgs = blog.description[si].images || [];
      c[si] = ((c[si] || 0) - 1 + imgs.length) % Math.max(1, imgs.length);
      return c;
    });
  const next = (si: number) =>
    setSlideIndices((s) => {
      const c = [...s];
      const imgs = blog.description[si].images || [];
      c[si] = ((c[si] || 0) + 1) % Math.max(1, imgs.length);
      return c;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50" />
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-40 flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-full border border-gray-700"
      >
        <ArrowLeft className="w-5 h-5" />{" "}
        <span className="hidden sm:inline">Back</span>
      </button>

      <div className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          src="/icons/thumbnails/thumb.jpg"
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 md:left-12 md:right-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {(blog.tags || []).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
              {blog.title}
            </h1>
            <div className="text-gray-300 flex items-center gap-3">
              <Calendar className="w-4 h-4 text-purple-400" />{" "}
              <span>
                {blog.createdAt
                  ? new Date(blog.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <main className="lg:col-span-8 space-y-8">
            {blog.description.map((seg, si) => {
              const imgs = seg.images || [];
              const idx = slideIndices[si] ?? 0;
              return (
                <article key={si} className="space-y-4">
                  {imgs.length > 0 && (
                    <div className="relative rounded-lg overflow-hidden">
                      <button
                        onClick={() => prev(si)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-800/50 rounded-full"
                      >
                        ‹
                      </button>
                      <motion.div
                        key={`${si}-${idx}`}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 120 }}
                      >
                        <img
                          src={imgs[idx % imgs.length]}
                          alt={`seg-${si}`}
                          className="w-full h-64 sm:h-80 object-cover rounded-lg"
                        />
                      </motion.div>
                      <button
                        onClick={() => next(si)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-gray-800/50 rounded-full"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  {seg.text && (
                    <p className="text-gray-300 leading-relaxed">{seg.text}</p>
                  )}
                </article>
              );
            })}
          </main>

          <aside className="lg:col-span-4 sticky top-8 space-y-6">
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <div className="text-sm text-gray-300 space-y-2">
                {blog.code_link && (
                  <a
                    href={blog.code_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-300 block hover:underline"
                  >
                    View code repository
                  </a>
                )}
                {(blog.additional_links || []).map((l, i) => (
                  <a
                    key={i}
                    href={l}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-gray-300 hover:underline"
                  >
                    {l}
                  </a>
                ))}
                {!blog.code_link && !(blog.additional_links || []).length && (
                  <div className="text-gray-500">
                    No external links provided.
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {(blog.tags || []).map((tg, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-sm text-purple-300"
                  >
                    #{tg.toLowerCase().replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
