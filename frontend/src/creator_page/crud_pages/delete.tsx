import { useState } from "react";

export default function DeleteBlog() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async () => {
    if (!id.trim()) return setStatus("ID is required");
    try {
      const res = await fetch(
        `https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/${encodeURIComponent(
          id
        )}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setStatus("Deleted");
    } catch (err: any) {
      setStatus("Error: " + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Delete Blog</h2>
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Blog ID (exact UUID from list)"
          className="w-full p-3 mb-2 rounded-lg bg-gray-800/50"
        />
        <div className="flex gap-3">
          <button onClick={submit} className="px-4 py-2 bg-red-600 rounded-lg">
            Delete
          </button>
        </div>
        {status && <div className="mt-4">{status}</div>}
      </div>
    </div>
  );
}
