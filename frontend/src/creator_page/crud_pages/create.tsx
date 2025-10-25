import { useState } from "react";

type BlogPayload = {
  title: string;
  link: string;
  tags?: string[];
};

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async () => {
    setStatus(null);
    if (!title.trim()) return setStatus("Title is required");
    if (!link.trim()) return setStatus("Link is required");

    const payload: BlogPayload = {
      title: title.trim(),
      link: link.trim(),
      tags: tagsText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        "https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Create failed");
      setStatus("Created: " + data.id);
      setTitle("");
      setLink("");
      setTagsText("");
    } catch (err: any) {
      setStatus("Error: " + (err?.message || String(err)));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800/60 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Create Blog (simple)</h3>
        <label className="block text-sm mb-1">Title</label>
        <input
          value={title}
          placeholder="put your title here"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-900/30"
        />
        <label className="block text-sm mb-1">Notion Link</label>
        <input
          value={link}
          placeholder="put your notion link here"
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 mb-3 rounded bg-gray-900/30"
        />
        <label className="block text-sm mb-1">Tags </label>
        <input
          value={tagsText}
          placeholder="comma seprated values"
          onChange={(e) => setTagsText(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900/30"
        />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">{status || ""}</div>
          <button onClick={submit} className="px-4 py-2 bg-green-600 rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
