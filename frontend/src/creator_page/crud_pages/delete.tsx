import { useState } from "react";

export default function DeleteBlog() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submit = async () => {
    const pwd = sessionStorage.getItem("admin_password") || "";
    try {
      const res = await fetch(`/api/v1/blog/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-password": pwd },
      });
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
          placeholder="ID or slug"
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
