import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type RefAttributes,
} from "react";
import {
  AnimatePresence,
  motion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react";

import { cn } from "@/lib/utils";

type CharacterSet = string[] | readonly string[];

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>;
type HyperTextMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"div">, "ref"> & RefAttributes<HTMLElement>
>;

interface HyperTextProps extends Omit<MotionProps, "children"> {
  /** The text content to be animated */
  children: string;
  /** Optional className for styling */
  className?: string;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Component to render as - defaults to div */
  as?: MotionElementType;
  /** Whether to start animation when element comes into view */
  startOnView?: boolean;
  /** Whether to trigger animation on hover */
  animateOnHover?: boolean;
  /** Custom character set for scramble effect. Defaults to uppercase alphabet */
  characterSet?: CharacterSet;
}

const DEFAULT_CHARACTER_SET = Object.freeze(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-[]{}|;':,./<>?~` ".split(
    "",
  ),
) as readonly string[];

const getRandomInt = (max: number): number => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 2000,
  delay = 2,
  as: Component = "div",
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = motionElements[Component] as HyperTextMotionComponent;

  const [displayText, setDisplayText] = useState<string[]>(() =>
    children.split(""),
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef<HTMLElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const triggerAnimation = () => {
    // Cancel any running animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    iterationCount.current = 0;
    setIsAnimating(false);
    // Use microtask to ensure state resets before re-triggering
    requestAnimationFrame(() => setIsAnimating(true));
  };

  const handleAnimationTrigger = () => {
    if (animateOnHover) {
      triggerAnimation();
    }
  };

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        triggerAnimation();
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            triggerAnimation();
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px -10% 0px" },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (isAnimating) {
      const maxIterations = children.length;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        iterationCount.current = progress * maxIterations;

        setDisplayText(
          children.split("").map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)],
          ),
        );

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final text is always correct
          setDisplayText(children.split(""));
          setIsAnimating(false);
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span
            key={index}
            className={cn("inline-block", letter === " " ? "w-3" : "")}
          >
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
