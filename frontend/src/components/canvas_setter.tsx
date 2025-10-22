// PortfolioSection.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

type PortfolioSectionProps = {
  Scene: React.ReactElement;
  cameraPosition?: [number, number, number];
  fov?: number;
  lightIntensity?: number;
};


export default function PortfolioSection({
  Scene,
  cameraPosition = [10, 0, 5],
  fov = 40,
  lightIntensity = 2,
}: PortfolioSectionProps) {
  
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: cameraPosition, fov }}>
        <directionalLight position={[10, 0, 0]} intensity={lightIntensity} />
        <directionalLight position={[-10, 0, 0]} intensity={lightIntensity} />
        <ambientLight intensity={2.5} />
        {/* <OrbitControls enableZoom enablePan /> */}
        {Scene}
      </Canvas>
    </div>
  );
}
