import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RigidBody, Physics, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

interface BodyProps {
  position: [number, number, number];
  color: number;
  mousePosition: THREE.Vector3;
}

interface MouseBallProps {
  mousePosition: THREE.Vector3;
}

interface RapierPhysicsProps {
  className?: string;
  style?: React.CSSProperties;
}

// Constants
const SCENE_MIDDLE = new THREE.Vector3(3, 0, 0);
// slow idle rotation (radians per second)
const IDLE_ROTATION_SPEED = 0.0087; // ~0.5 degrees/sec
const COLOR_PALETTE = [
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xfacc15, // yellow-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xfacc15, // yellow-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0xf87171, // red-400
  0xfb923c, // orange-400
  0x4ade80, // green-400
  0x34d399, // emerald-400
  0x4ade80, // green-400
  0x34d399, // emerald-400
  0x4ade80, // green-400
  0x34d399, // emerald-400
  0x60a5fa, // blue-400
  0x818cf8, // indigo-400
  0xc084fc, // purple-400
  0xf472b6, // pink-400
  0x94a3b8, // slate-400
  0xc084fc, // purple-400
  0xf472b6, // pink-400
  0x94a3b8, // slate-400
];

// Physical Body Component
const PhysicalBody: React.FC<BodyProps> = ({
  position,
  color,
  mousePosition,
}) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!rigidBodyRef.current || !meshRef.current) return;

    const rigidBody = rigidBodyRef.current;
    rigidBody.resetForces(true);

    const translation = rigidBody.translation();
    const pos = new THREE.Vector3(translation.x, translation.y, translation.z);
    const dir = pos.clone().sub(SCENE_MIDDLE).normalize();
    const distance = pos.length();

    // Apply force towards center with distance-based scaling to prevent overshooting
    const forceStrength = Math.min(-1.5, -distance * 0.3);
    rigidBody.addForce(dir.multiplyScalar(forceStrength), true);

    // Add mouse repulsion force
    const mouseDistance = pos.distanceTo(mousePosition);
    const repulsionRadius = 3; // Distance at which repulsion starts
    const repulsionStrength = 20; // Strength of repulsion

    if (mouseDistance < repulsionRadius) {
      const mouseDir = pos.clone().sub(mousePosition).normalize();
      const repulsionForce =
        (repulsionStrength * (repulsionRadius - mouseDistance)) /
        repulsionRadius;
      rigidBody.addForce(mouseDir.multiplyScalar(repulsionForce), true);
    }

    // Orbit the body slowly around the Y axis that passes through SCENE_MIDDLE.
    // We compute the relative vector to the scene middle, rotate it around Y by
    // a small angle, and set the body's translation so it visually orbits even
    // when physics would otherwise keep it stationary.
    const angle = delta * IDLE_ROTATION_SPEED; // small per-frame angle
    const rel = pos.clone().sub(SCENE_MIDDLE);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rotatedX = rel.x * cos - rel.z * sin;
    const rotatedZ = rel.x * sin + rel.z * cos;
    const newPos = new THREE.Vector3(rotatedX, rel.y, rotatedZ).add(
      SCENE_MIDDLE
    );
    try {
      // Try to set the physics body's translation so the movement is authoritative
      // in the physics simulation as well.
      rigidBody.setTranslation({ x: newPos.x, y: newPos.y, z: newPos.z }, true);
    } catch (e) {
      // If setTranslation isn't available, fall back to moving the visual mesh.
      meshRef.current.position.copy(newPos);
    }

    // Also apply a small tangential force to encourage orbital motion via physics.
    // Reduce that tangential force as bodies approach the scene middle, but
    // never drop it to zero so they keep a subtle orbit.
    const tangential = new THREE.Vector3(-rel.z, 0, rel.x).normalize();
    const ORBIT_FORCE = 0.8; // base force at larger radii
    const ORBIT_FALLOFF_RADIUS = 15; // distance at which force reaches full strength
    const MIN_ORBIT_FACTOR = 0.12; // minimum fraction of force near the center
    const distFromCenter = rel.length();
    // compute factor in range [MIN_ORBIT_FACTOR, 1]
    const factor = Math.max(
      MIN_ORBIT_FACTOR,
      Math.min(1, distFromCenter / ORBIT_FALLOFF_RADIUS)
    );
    const scaledForce = ORBIT_FORCE * factor;
    rigidBody.addForce(tangential.clone().multiplyScalar(scaledForce), true);

    // Update mesh rotation
    const rotation = rigidBody.rotation();
    const quaternion = new THREE.Quaternion(
      rotation.x,
      rotation.y,
      rotation.z,
      rotation.w
    );
    // Apply a slow idle rotation around the Y axis on top of physics rotation
    // so the balls slowly spin even when they are otherwise idle or stuck.
    const idleQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * IDLE_ROTATION_SPEED
    );

    // Compose the physics quaternion with the idle rotation
    const composed = quaternion.clone().multiply(idleQuat);

    // Update the physics body's rotation so the change persists even when bodies
    // are in contact or sleeping.
    try {
      rigidBody.setRotation(
        { x: composed.x, y: composed.y, z: composed.z, w: composed.w },
        true
      );
    } catch (e) {
      // If the RigidBody API doesn't support setRotation in this environment,
      // fall back to rotating the mesh only.
      meshRef.current.setRotationFromQuaternion(quaternion);
      meshRef.current.rotateY(delta * IDLE_ROTATION_SPEED);
      return;
    }

    // Reflect the new rotation on the visual mesh
    meshRef.current.setRotationFromQuaternion(composed);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="ball"
      linearDamping={1.0}
      angularDamping={4.0}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshLambertMaterial color={color} />
      </mesh>
    </RigidBody>
  );
};

// Mouse Ball Component
const MouseBall: React.FC<MouseBallProps> = ({ mousePosition }) => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(mousePosition, true);
    }
    if (lightRef.current) {
      lightRef.current.position.copy(mousePosition);
    }
  });

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        type="kinematicPosition"
        colliders="ball"
        position={[0, 0, 0]}
      />
      {/* Glowing bulb mesh at mouse position */}
      <mesh position={mousePosition} />
      <pointLight
        ref={lightRef}
        position={mousePosition}
        intensity={15}
        distance={4}
        decay={3}
        color={0xffffff}
      />
    </>
  );
};

// Mouse Interaction Hook
const useMouseInteraction = () => {
  const { camera, raycaster, pointer } = useThree();
  const [mousePosition, setMousePosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const mousePlaneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mousePlaneRef.current) return;

    // Orient the mouse plane to the camera
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.multiplyScalar(-1);
    mousePlaneRef.current.lookAt(cameraDirection);

    // Raycast to get mouse position in 3D space
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(
      [mousePlaneRef.current],
      false
    );

    if (intersects.length > 0) {
      setMousePosition(intersects[0].point);
    }
  });

  return { mousePosition, mousePlaneRef };
};

// Main Physics Scene Component
export const PhysicsScene: React.FC = () => {
  const { mousePosition, mousePlaneRef } = useMouseInteraction();

  // Generate random bodies
  const bodies = useMemo(() => {
    const bodyArray = [];
    const ballCount = 35;
    const range = 30;

    for (let i = 0; i < ballCount; i++) {
      const position: [number, number, number] = [
        Math.random() * range - range * 0.5,
        Math.random() * range - range * 0.5,
        Math.random() * range - range * 0.5,
      ];

      const color =
        COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

      bodyArray.push({
        key: i,
        position,
        color,
      });
    }

    return bodyArray;
  }, []);

  return (
    <Physics gravity={[0, 0, 0]} debug={false}>
      {/* Mouse interaction plane (invisible) */}
      <mesh ref={mousePlaneRef} position={[0, 0, 0]}>
        <planeGeometry args={[48, 48]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Physical bodies */}
      {bodies.map((body) => (
        <PhysicalBody
          key={body.key}
          position={body.position}
          color={body.color}
          mousePosition={mousePosition}
        />
      ))}

      {/* Mouse ball */}
      <MouseBall mousePosition={mousePosition} />
      <directionalLight position={[-1, 0, 2]} intensity={2} />
      {/* Better lighting for 3D appearance */}
      <ambientLight intensity={1} />
    </Physics>
  );
};

// Main R3F Component
const RapierPhysics: React.FC<RapierPhysicsProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        const ext = gl?.getExtension("WEBGL_lose_context");
        ext?.loseContext();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <PhysicsScene />
      </Canvas>
    </div>
  );
};

export default RapierPhysics;
