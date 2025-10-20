import { motion } from "framer-motion";

export default function ContactCard({
  onSubmit,
}: {
  onSubmit?: (data: any) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-gradient-to-br from-gray-900/60 to-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Get in touch
      </h3>
      <p className="text-sm text-gray-300 mb-4">
        Prefer email? Use the form or mail me directly.
      </p>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit({});
        }}
      >
        <div>
          <label className="text-xs text-gray-300">Name</label>
          <input
            className="w-full mt-1 p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-xs text-gray-300">Email</label>
          <input
            className="w-full mt-1 p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="you@domain.com"
          />
        </div>

        <div>
          <label className="text-xs text-gray-300">Message</label>
          <textarea
            className="w-full mt-1 p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            rows={5}
            placeholder="Tell me about your project..."
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="mx-auto py-2 rounded-full w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow flex items-center justify-center cursor-pointer"
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </motion.div>
  );
}
