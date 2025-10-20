import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Creator() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const env = (import.meta as any).env || {};
    const storedPassword = env.VITE_PASSWORD || "";

    if (password.trim() === String(storedPassword).trim()) {
      // store only in session for this tab
      sessionStorage.setItem("admin_password", password.trim());
      navigate("/real_admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={submit}
        className="p-8 bg-gray-800/60 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4">Welcome Mrityunjay Jha</h2>
        <p className="text-sm text-gray-400 mb-4">
          Enter the admin password to access the editor.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700/50 mb-4"
        />
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 rounded-lg">Enter</button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
