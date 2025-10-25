import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type blogprops = {
  id: string;
  link: string;
  title: string;
};

export default function Individual_Blog() {
  const params = useParams();
  const id = params.id as string | undefined;

  const [blogi, setBlogi] = useState<blogprops>({
    id: "",
    link: "",
    title: "",
  });

  useEffect(() => {
    let mounted = true;
    const isUrl = (s?: string) =>
      typeof s === "string" && /^https?:\/\//i.test(s);

    async function fetchData() {
      if (!id) return;
      try {
        const res = await fetch(
          `https://backend.mrityunjay-jha2005.workers.dev/api/v1/blog/${encodeURIComponent(
            id
          )}`
        );
        if (!res.ok) {
          console.error("Failed to fetch blog:", res.status, res.statusText);
          return;
        }
        const data = await res.json().catch((e) => {
          console.error("Invalid JSON in blog response:", e);
          return null;
        });
        if (!data) return;

        // Accept responses that include a valid link. Otherwise ignore.
        const candidateLink = data.link || data.url || data.notion_link || "";
        const safe = {
          id: String(data.id ?? id ?? ""),
          link: isUrl(candidateLink) ? candidateLink : "",
          title: String(data.title ?? ""),
        };
        if (mounted) setBlogi(safe);
      } catch (err) {
        console.error("Error fetching blog data:", err);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  // only render the iframe when we have a safe URL
  const isUrl = (s?: string) =>
    typeof s === "string" && /^https?:\/\//i.test(s);

  if (!id) return null; // nothing to show without route param
  if (!isUrl(blogi.link)) return null;

  return (
    <div className="w-full h-screen m-0 p-0">
      <iframe
        src={blogi.link}
        // src="https://curly-brain-ff4.notion.site/ebd/2973ebe05c8f80fe8df3e810379926ff"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        title={blogi.title || "Notion Embed"}
      />
    </div>
  );
}
