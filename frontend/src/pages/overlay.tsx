type Props = {
  onFinish?: () => void;
};

export default function Overlay({ onFinish }: Props) {
  return (
    <div 
      onAnimationEnd={() => onFinish?.()}
      className="fixed inset-0 z-[999] bg-black h-screen w-full bg-black flex tracking-wider items-center justify-center text-4xl font-black text-white blur-out-expand-fwd pointer-events-none whitespace-nowrap"
    >
     ASPIRE
    </div>
  );
}
