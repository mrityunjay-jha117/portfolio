import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const MAIL_ENDPOINT =
    (import.meta as any).env.VITE_MAIL_ENDPOINT ||
    "https://mailgun-nine.vercel.app/api/send";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    if (!name.trim()) return setStatus("Name is required");
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return setStatus("Valid email is required");
    if (!message.trim()) return setStatus("Message is required");

    setSending(true);
    try {
      const res = await fetch(MAIL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        console.error("mail send error", data);
        setStatus(
          data && data.error ? String(data.error) : "Failed to send message",
        );
      } else {
        setStatus("Message sent — thank you!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setStatus("Network error sending message");
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md h-8/9 bg-gradient-to-br from-gray-900/60 to-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Get in touch
      </h3>
      <p className="text-sm text-gray-300 mb-4">
        Prefer email? Use the form or mail me directly.
      </p>

      <form className="space-y-3" onSubmit={submit}>
        <div>
          <label className="text-xs text-gray-300">Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-1 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <label className="text-xs text-gray-300">Email *</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1  p-1 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            />
          </div>

          <div>
            <label className="text-xs text-gray-300">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1 p-1 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-300">Message *</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mt-1 p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={sending}
            className="mx-auto py-2 rounded-full w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow flex items-center justify-center cursor-pointer disabled:opacity-60"
          >
            {sending ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </div>

        {status && (
          <div className="text-center text-sm text-gray-200 mt-2">{status}</div>
        )}
      </form>
    </motion.div>
  );
}
