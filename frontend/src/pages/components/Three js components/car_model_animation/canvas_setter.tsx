import React from "react";
import { Canvas } from "@react-three/fiber";
type PortfolioSectionProps = {
  Scene: React.ReactElement;
  cameraPosition?: [number, number, number];
  fov?: number;
  lightIntensity?: number;
};

export default function PortfolioSection({
  Scene,
  cameraPosition = [30, -1, -15],
  fov = 40,
  lightIntensity = 1,
}: PortfolioSectionProps) {
  return (
    <div className="h-full w-full flex items-end justify-end">
      <Canvas camera={{ position: cameraPosition, fov }}>
        <directionalLight position={[2,-1, 1]} intensity={lightIntensity} />
        <directionalLight position={[-4, 0, 20]} intensity={lightIntensity} />
        <ambientLight intensity={1.5} />
        {/* <OrbitControls enableZoom enablePan /> */}
        {Scene}
      </Canvas>
    </div>
  );
}
