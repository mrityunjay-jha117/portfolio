import PortfolioSection from "../components/canvas_setter";
import AnimatedModel from "../components/animated_model";
export default function Try() {
  return (
    <div className="relative w-full h-full z-10">
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <PortfolioSection
          Scene={
            <AnimatedModel
              gltfPath="/tukmon.glb"
              // gltfPath="/explicit.glb"
            />
          }
        />
      </div>
    </div>
  );
}
