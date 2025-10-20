import { ThreeDMarquee } from "@/pages/components/3d-marquee";
import { useState, useEffect, useMemo } from "react";

export default function ThreeDMarqueeDemo() {
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      // Responsive column count for better performance
      if (width < 640) {
        setColumns(3); // Fewer columns on mobile
      } else if (width < 1024) {
        setColumns(4);
      } else {
        setColumns(5);
      }
    };

    updateColumns();

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateColumns, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoize images array to prevent re-creation
  const images = useMemo(
    () => [
      "icons/1.png",
      "icons/2.png",
      "icons/3.png",
      "icons/4.png",
      "icons/5.png",
      "icons/6.png",
      "icons/7.png",
      "icons/8.png",
      "icons/9.png",
      "icons/10.png",
      "icons/11.png",
      "icons/12.png",
      "icons/13.png",
      "icons/14.webp",
      "icons/15.webp",
      "icons/1.png",
      "icons/2.png",
      "icons/3.png",
      "icons/4.png",
      "icons/5.png",
    ],
    []
  );

  return (
    <div
      id="skills-section"
      className="h-screen relative w-full mx-auto mb-6 sm:mb-10 overflow-hidden flex flex-col items-start justify-center py-4 sm:py-6 lg:py-8" // Reduced padding
      style={{ willChange: "auto" }} // Remove unnecessary willChange
    >
      <div className="text-blue-500 font-black text-3xl lg:text-7xl xl:text-8xl mb-3 sm:mb-4 lg:mb-6 z-0 text-left w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36 ">
        Skills
      </div>
      <div
        className="rounded-xl sm:rounded-2xl lg:rounded-3xl border-t-3 sm:border-t-4 lg:border-t-6 border-b-3 sm:border-b-4 lg:border-b-6 overflow-hidden h-[30vh] sm:h-[40vh] md:h-[55vh] lg:h-[65vh] xl:h-[75vh] w-full"
        style={{
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden",
        }}
      >
        <ThreeDMarquee
          columns={columns}
          images={images}
          speed={0.6} // Slightly faster for smoother feel
        />
      </div>
    </div>
  );
}
