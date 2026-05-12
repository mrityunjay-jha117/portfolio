import { MorphingText } from "@/components/ui/morphing-text";
import { useEffect, useState } from "react";

type Props = {
  onFinish?: () => void;
};

export default function Overlay({ onFinish }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // MorphText animation takes about 2 seconds for one full transition.
    // We wait 3 seconds to let it show "MRITYUNJAY", then morph into "PORTFOLIO" and read it.
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Once faded out (1 second later), remove the overlay from the DOM
    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-black h-screen w-full flex tracking-wider items-center justify-center text-4xl font-black text-white pointer-events-none whitespace-nowrap transition-opacity duration-1000 ease-in-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <MorphingText texts={["MRITYUNJAY", "PORTFOLIO"]} />
    </div>
  );
}
