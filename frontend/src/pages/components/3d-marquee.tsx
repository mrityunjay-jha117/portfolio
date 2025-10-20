import { motion } from "motion/react";
import { useState, useEffect, useMemo, useCallback } from "react";

export const ThreeDMarquee = ({
  images,
  columns = 3,
  className = "",
  speed = 0.5, // lower = slower, higher = faster
}: {
  images: string[];
  columns?: number;
  className?: string;
  speed?: number;
}) => {
  const [itemSize, setItemSize] = useState({ width: 150, height: 150 });

  // Optimized resize handler with debouncing
  const updateSize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemSize({ width: 100, height: 80 }); // Further reduced for mobile
    } else if (width < 768) {
      setItemSize({ width: 90, height: 90 });
    } else if (width < 1024) {
      setItemSize({ width: 110, height: 110 });
    } else {
      setItemSize({ width: 130, height: 130 }); // Reduced from 150
    }
  }, []);

  useEffect(() => {
    updateSize();

    // Debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 150);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [updateSize]);

  // Memoize calculations to prevent re-computation
  const config = useMemo(() => {
    const gap = itemSize.width < 90 ? 12 : itemSize.width < 110 ? 12 : 20; // Reduced gaps
    const { width: itemWidth, height: itemHeight } = itemSize;
    const chunkSize = Math.ceil(images.length / columns);
    const loopHeight = (itemHeight + gap) * chunkSize;
    const midOffset = loopHeight / 2;

    return { gap, itemWidth, itemHeight, chunkSize, loopHeight, midOffset };
  }, [itemSize, images.length, columns]);

  // Memoize column data
  const cols = useMemo(() => {
    return Array.from({ length: columns }, (_, i) => {
      const slice = images.slice(
        i * config.chunkSize,
        i * config.chunkSize + config.chunkSize
      );
      return [...slice, ...slice];
    });
  }, [columns, images, config.chunkSize]);

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      <div
        className="w-full h-full flex justify-center items-center"
        style={{
          perspective: "800px", // Reduced perspective for better performance
          transform: "translateZ(0)", // Force hardware acceleration
          willChange: "transform",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, ${config.itemWidth}px)`,
            gap: `${config.gap}px`,
            transform: "rotateX(35deg) rotateY(0deg) rotateZ(-25deg)", // Reduced rotation angles
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden", // Performance optimization
          }}
        >
          {cols.map((col, ci) => {
            const dir = ci % 2 === 0 ? 1 : -1;
            const startY = dir * config.midOffset;

            return (
              <motion.div
                key={ci}
                className="flex flex-col items-center"
                style={{
                  rowGap: `${config.gap}px`,
                  y: startY,
                  willChange: "transform",
                }}
                animate={{
                  y: [startY, startY + dir * -config.loopHeight],
                }}
                transition={{
                  duration: (config.loopHeight / 80) * (1 / speed), // Faster base speed
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {col.map((src, idx) => (
                  <motion.img
                    key={idx}
                    src={src}
                    className="rounded-md object-contain cursor-pointer" // Reduced border radius
                    style={{
                      width: `${config.itemWidth}px`,
                      height: `${config.itemHeight}px`,
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                    }}
                    // Simplified hover effects
                    whileHover={{
                      scale: 1.15, // Reduced from 1.25
                      y: -10, // Reduced from -20
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{
                      scale: 0.98, // Reduced from 0.95
                      y: -2, // Reduced from -5
                      transition: { duration: 0.1 },
                    }}
                    loading="lazy" // Lazy loading for images
                    decoding="async" // Async decoding
                  />
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
