import { useState } from "react";

type DescriptionSegment = { text: string; images?: string[] };

type BlogPayload = {
  title: string;
  // store array of segments; each segment has text and images array
  description: DescriptionSegment[];
  tags?: string[];
  additional_links?: string[];
  code_link?: string;
  published?: boolean;
};

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  // start with one description segment (text + images array)
  const [descriptions, setDescriptions] = useState<DescriptionSegment[]>([
    { text: "", images: [] },
  ]);
  const [tagsText, setTagsText] = useState(""); // comma-separated input
  const [additionalLinks, setAdditionalLinks] = useState<string[]>([]);
  const [codeLink, setCodeLink] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);

  function addDescriptionSegment() {
    setDescriptions((s) => [...s, { text: "", images: [] }]);
  }

  function updateDescription(idx: number, value: string) {
    setDescriptions((s) => {
      const copy = [...s];
      copy[idx] = { ...(copy[idx] || { text: "", images: [] }), text: value };
      return copy;
    });
  }
  // update images array for a specific description segment (replace whole array)
  function setSegmentImages(idx: number, urls: string[]) {
    setDescriptions((s) => {
      const copy = [...s];
      copy[idx] = { ...(copy[idx] || { text: "", images: [] }), images: urls };
      return copy;
    });
  }

  // upload files for a specific description segment and append returned URLs
  async function handleFilesForSegment(idx: number, files: FileList | null) {
    if (!files || files.length === 0) return;
    setStatus("Uploading...");
    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const form = new FormData();
        form.append("file", file);

        const res = await fetch("/api/v1/image/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || data?.message || "Upload failed");
        }
        uploadedUrls.push(data.url);
      } catch (err: any) {
        console.error("Upload error", err);
        setStatus("Upload error: " + (err?.message || err));
      }
    }

    if (uploadedUrls.length > 0) {
      setDescriptions((s) => {
        const copy = [...s];
        const existing = copy[idx]?.images || [];
        copy[idx] = {
          ...(copy[idx] || { text: "", images: [] }),
          images: [...existing, ...uploadedUrls],
        };
        return copy;
      });
      setStatus(null);
    }
  }

  function removeImageFromSegment(idx: number, url: string) {
    setDescriptions((s) => {
      const copy = [...s];
      const arr = (copy[idx]?.images || []).filter((u) => u !== url);
      copy[idx] = { ...(copy[idx] || { text: "", images: [] }), images: arr };
      return copy;
    });
  }

  function addAdditionalLink() {
    setAdditionalLinks((a) => [...a, ""]);
  }

  function updateAdditionalLink(i: number, v: string) {
    setAdditionalLinks((a) => {
      const c = [...a];
      c[i] = v;
      return c;
    });
  }

  function removeAdditionalLink(i: number) {
    setAdditionalLinks((a) => a.filter((_, idx) => idx !== i));
  }

  async function submit() {
    setStatus(null);
    if (!title.trim()) {
      setStatus("Title is required");
      return;
    }
    if (
      descriptions.length === 0 ||
      descriptions.every((d) => !d.text || !d.text.trim())
    ) {
      setStatus("Add at least one description segment");
      return;
    }

    // build payload according to prisma schema
    const payload: BlogPayload = {
      title: title.trim(),
      description: descriptions.map((d) => ({
        text: (d.text || "").trim(),
        images: (d.images || []).map((u) => u.trim()).filter(Boolean),
      })),
      tags: tagsText
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      additional_links: additionalLinks.map((l) => l.trim()).filter(Boolean),
      code_link: codeLink.trim() || undefined,
      published: true,
    };

    const pwd = sessionStorage.getItem("admin_password") || "";
    try {
      const res = await fetch("/api/v1/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": pwd,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");
      setStatus("Created: " + data.id);
      // reset form
      setTitle("");
      setDescriptions([{ text: "", images: [] }]);
      setTagsText("");
      setAdditionalLinks([]);
      setCodeLink("");
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight mb-1">
                Create Blog
              </h2>
              <p className="text-sm text-gray-400">
                Add content, images and metadata for a new post.
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <button
                type="button"
                onClick={addDescriptionSegment}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium"
              >
                + Add paragraph
              </button>
              <button
                onClick={submit}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 rounded-lg text-sm font-semibold"
              >
                Create
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full p-3 mb-0 rounded-lg bg-gray-800/40 border border-transparent focus:border-blue-500 focus:ring-0 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Description segments
              </label>
              <div className="space-y-4">
                {descriptions.map((seg, i) => (
                  <div key={i} className="bg-gray-800/30 p-4 rounded-lg">
                    <div className="mb-3">
                      <textarea
                        value={seg.text}
                        onChange={(e) => updateDescription(i, e.target.value)}
                        placeholder={`Paragraph ${i + 1}`}
                        className="w-full p-3 rounded-lg bg-gray-900/30 h-28 resize-none border border-transparent focus:border-blue-500 outline-none"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          onChange={(e) =>
                            handleFilesForSegment(i, e.target.files)
                          }
                          className="p-1 rounded bg-gray-800/30"
                        />
                      </div>

                      <input
                        value={(seg.images || []).join(",")}
                        onChange={(e) =>
                          setSegmentImages(
                            i,
                            e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                          )
                        }
                        placeholder="Or paste comma-separated image URLs"
                        className="flex-1 p-2 rounded-lg bg-gray-800/40"
                      />
                    </div>

                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {(seg.images || []).map((url) => (
                        <div
                          key={url}
                          className="relative rounded overflow-hidden bg-black/20"
                        >
                          <img
                            src={url}
                            alt="thumb"
                            className="object-cover w-full h-20"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageFromSegment(i, url)}
                            className="absolute top-1 right-1 bg-red-600 text-xs px-1 rounded"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Tags (comma-separated)
              </label>
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                placeholder="tag1, tag2, tag3"
                className="w-full p-3 mb-0 rounded-lg bg-gray-800/40"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Additional links (optional)
              </label>
              <div className="space-y-2">
                {additionalLinks.map((l, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={l}
                      onChange={(e) => updateAdditionalLink(i, e.target.value)}
                      placeholder={`Additional link ${i + 1}`}
                      className="flex-1 p-2 rounded-lg bg-gray-800/40"
                    />
                    <button
                      type="button"
                      onClick={() => removeAdditionalLink(i)}
                      className="px-3 py-1 bg-red-600 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAdditionalLink}
                  className="px-4 py-2 bg-blue-600 rounded-lg mt-2"
                >
                  + Add link
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Code link (optional)
              </label>
              <input
                value={codeLink}
                onChange={(e) => setCodeLink(e.target.value)}
                placeholder="https://github.com/your/repo"
                className="w-full p-3 mb-0 rounded-lg bg-gray-800/40"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-gray-400">{status || ""}</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addDescriptionSegment}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium"
                >
                  + Add paragraph
                </button>
                <button
                  onClick={submit}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-sm font-semibold"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
