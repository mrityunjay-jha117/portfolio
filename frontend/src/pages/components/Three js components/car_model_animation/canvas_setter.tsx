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
  cameraPosition = [28, 2, -15],
  fov = 40,
}: PortfolioSectionProps) {
  return (
    <div className="h-full w-full flex items-end justify-end">
      <Canvas camera={{ position: cameraPosition, fov }}>{Scene}</Canvas>
    </div>
  );
}
