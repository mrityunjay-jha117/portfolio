import { useEffect, useRef } from "react";

type Props = {
  onFinish?: () => void;
  /** base reveal duration in milliseconds (will be divided by speed if provided) */
  revealMs?: number;
  /** base fade duration in milliseconds (will be divided by speed if provided) */
  fadeMs?: number;
  /** speed multiplier: 1 = normal, 2 = twice as fast, etc. */
  speed?: number;
};

export default function SignatureDemo({
  onFinish,
  revealMs,
  fadeMs,
  speed,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const clip = svg.querySelector("#clipRect") as SVGRectElement | null;
    const text = svg.querySelector("#sig") as SVGTextElement | null;
    const vb = svg.viewBox.baseVal;

    requestAnimationFrame(() => {
      try {
        if (!text || !clip) throw new Error("missing elements");
        const bbox = text.getBBox();

        // target width in viewBox units (50% of viewBox width)
        const targetWidth = vb.width * 0.5;
        // also cap by height (70% of viewBox height)
        const targetHeight = vb.height * 0.35;

        const scaleW = targetWidth / bbox.width;
        const scaleH = targetHeight / bbox.height;
        const scale = Math.min(scaleW, scaleH);

        const cx = vb.width / 2;
        const cy = vb.height / 2;
        const tx = bbox.x + bbox.width / 2;
        const ty = bbox.y + bbox.height / 2;

        // wrap text in a group and transform to center & scale
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const parent = text.parentNode as Node | null;
        if (!parent) throw new Error("text parent missing");
        parent.replaceChild(g, text);
        g.appendChild(text);

        const transform = `translate(${cx},${cy}) scale(${scale}) translate(${-tx},${-ty})`;
        g.setAttribute("transform", transform);

        const paddedWidth = bbox.width * scale + 12;
        const paddedHeight = bbox.height * scale + 8;
        const left = cx - paddedWidth / 2;
        const top = cy - paddedHeight / 2;

        clip.setAttribute("x", String(left));
        clip.setAttribute("y", String(top));
        clip.setAttribute("height", String(paddedHeight));

        // reveal + fade timings (compute from props)
        const baseReveal = typeof revealMs === "number" ? revealMs : 2000;
        const baseFade = typeof fadeMs === "number" ? fadeMs : 800;
        const actualRevealMs =
          speed && speed > 0 ? Math.max(100, baseReveal / speed) : baseReveal;
        const actualFadeMs =
          speed && speed > 0 ? Math.max(80, baseFade / speed) : baseFade;

        // ensure group is visible initially
        g.style.opacity = "1";

        clip.style.transition = `width ${actualRevealMs}ms ease`;

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            clip.setAttribute("width", String(Math.ceil(paddedWidth)));
            // schedule fade-out shortly after reveal completes
            const fadeTimer = window.setTimeout(() => {
              g.style.transition = `opacity ${actualFadeMs}ms ease`;
              g.style.opacity = "0";
            }, actualRevealMs + 120);
            timersRef.current.push(fadeTimer as unknown as number);

            // call onFinish after full reveal + fade
            const finishTimer = window.setTimeout(() => {
              onFinish && onFinish();
            }, actualRevealMs + 120 + actualFadeMs);
            timersRef.current.push(finishTimer as unknown as number);
          })
        );
      } catch (err) {
        if (clip) clip.setAttribute("width", "100%");
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    // lock body scroll while overlay is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      aria-hidden={false}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        margin: 0,
        background: "#000",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        padding: "40px",
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 200"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <defs>
          <clipPath id="reveal">
            <rect id="clipRect" x="0" y="0" width="0" height="200" />
          </clipPath>
        </defs>

        <g clipPath="url(#reveal)">
          <text
            id="sig"
            x="50%"
            y="50%"
            textAnchor="middle"
            fontFamily="'Segoe Script', 'Brush Script MT', cursive, system-ui"
            fontSize="48px"
            style={{
              fill: "#fff",
              stroke: "#fff",
              strokeWidth:4,
              paintOrder: "stroke fill",
              dominantBaseline: "middle",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
          >
            .....Mrityunjay Jha.....
          </text>
        </g>
      </svg>
    </div>
  );
}
