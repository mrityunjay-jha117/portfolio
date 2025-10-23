import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type AnimatedModelProps = {
  gltfPath: string;
  scale?: number;
};

export default function AnimatedModel({
  gltfPath,
  scale = 1,
}: AnimatedModelProps) {
  const groupRef = useRef<THREE.Group | null>(null);
  const { scene, animations } = useGLTF(gltfPath) as any;
  const { actions } = useAnimations(animations, groupRef as any);

  // steers are the empty parents that control wheel orientation
  const steerFL = useRef<THREE.Object3D | null>(null);
  const steerFR = useRef<THREE.Object3D | null>(null);
  const steerBL = useRef<THREE.Object3D | null>(null);
  const steerBR = useRef<THREE.Object3D | null>(null);

  // wheel meshes
  const [wheels, setWheels] = useState<THREE.Mesh[]>([]);

  // control state
  const input = useRef({ forward: 0, turn: 0, boost: 0 }); // forward: -1..1, turn: -1..1, boost: 0/1

  // movement state
  const speedRef = useRef(0);
  const tmpVec = useRef(new THREE.Vector3());
  const tmpQuat = useRef(new THREE.Quaternion());

  useEffect(() => {
    // gather nodes from scene by names described in your model
    if (!scene) return;

    const find = (name: string) =>
      scene.getObjectByName(name) as THREE.Object3D | undefined;

    steerFL.current = find("Steer_FL") ?? null;
    steerFR.current = find("Steer_FR") ?? null;
    steerBL.current = find("Steer_BL") ?? null;
    steerBR.current = find("Steer_BR") ?? null;

    const wheelNames = ["Wheel_FL", "Wheel_FR", "Wheel_BL", "Wheel_BR"];
    const found: THREE.Mesh[] = [];
    // first try: exact wheel names
    scene.traverse((child: any) => {
      if (child.isMesh && wheelNames.includes(child.name)) {
        found.push(child as THREE.Mesh);
      }
    });

    // fallback 1: if steer parents exist, find the first mesh descendant under each steer parent
    const pushFirstMeshUnder = (parent: THREE.Object3D | null) => {
      if (!parent) return;
      let picked: THREE.Mesh | null = null;
      parent.traverse((c: any) => {
        if (!picked && c.isMesh) picked = c as THREE.Mesh;
      });
      if (picked) found.push(picked);
    };

    if (
      found.length < 4 &&
      (steerFL.current || steerFR.current || steerBL.current || steerBR.current)
    ) {
      // prefer ordered wheels matching steer parents: FL, FR, BL, BR
      pushFirstMeshUnder(steerFL.current);
      pushFirstMeshUnder(steerFR.current);
      pushFirstMeshUnder(steerBL.current);
      pushFirstMeshUnder(steerBR.current);
    }

    // fallback 2: match generic mesh names like "Mesh.017" or anything containing "wheel"
    if (found.length < 4) {
      scene.traverse((child: any) => {
        if (child.isMesh) {
          const n = String(child.name || "").toLowerCase();
          if (n.includes("wheel") || /^mesh\.\d+/i.test(child.name)) {
            // avoid duplicates
            if (!found.includes(child as THREE.Mesh))
              found.push(child as THREE.Mesh);
          }
        }
      });
    }

    // dedupe while preserving order
    const unique: THREE.Mesh[] = [];
    found.forEach((m) => {
      if (m && !unique.includes(m)) unique.push(m);
    });

    setWheels(unique);

    // play first animation if present
    if (actions && animations && animations.length > 0) {
      const a = actions[animations[0].name];
      a?.reset().play().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3);
    }
  }, [scene]);

  // keyboard handlers
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w") input.current.forward = 1;
      if (k === "s") input.current.forward = -1;
      if (k === "a") input.current.turn = 1;
      if (k === "d") input.current.turn = -1;
      if (e.key === "Shift") input.current.boost = 1;
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "s") input.current.forward = 0;
      if (k === "a" || k === "d") input.current.turn = 0;
      if (e.key === "Shift") input.current.boost = 0;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // Parameters
    const maxSpeed = 4.0;
    const accel = 6.0;
    const brake = 8.0;
    const turnSpeed = 1.6;
    const maxSteerAngle = 0.6;
    const rearSteerFactor = 0.3;

    // Inputs
    const f = input.current.forward; // -1..1
    const t = input.current.turn; // -1..1

    // --- 1. Steering ---
    const steerPairs = [
      { ref: steerFL, factor: 1 },
      { ref: steerFR, factor: 1 },
      { ref: steerBL, factor: rearSteerFactor },
      { ref: steerBR, factor: rearSteerFactor },
    ];
    steerPairs.forEach(({ ref, factor }) => {
      if (ref.current) {
        ref.current.rotation.y = THREE.MathUtils.lerp(
          ref.current.rotation.y,
          maxSteerAngle * t * factor,
          0.2
        );
      }
    });

    // --- 2. Update speed ---
    const boostFactor = input.current.boost ? 4 : 1; // Shift multiplies speed by 4
    const targetSpeed = f * maxSpeed * boostFactor;
    if (f !== 0) {
      const dv =
        Math.sign(targetSpeed - speedRef.current) *
        Math.min(Math.abs(targetSpeed - speedRef.current), accel * delta);
      speedRef.current += dv;
    } else {
      const dec =
        Math.sign(speedRef.current) *
        Math.min(Math.abs(speedRef.current), brake * delta);
      speedRef.current -= dec;
    }

    // --- 3. Compute move direction ---
    const forwardLocal = tmpVec.current.set(1, 0, 0);
    const wheelRefs = [steerFL, steerFR, steerBL, steerBR].filter(
      Boolean
    ) as (typeof steerFL)[];
    const moveDir = new THREE.Vector3();
    wheelRefs.forEach((s) => {
      if (s.current) {
        s.current.getWorldQuaternion(tmpQuat.current);
        moveDir.add(
          forwardLocal.clone().applyQuaternion(tmpQuat.current).normalize()
        );
      }
    });
    moveDir.normalize();

    // --- 4. Correct reverse movement ---
    // When reversing, invert rotation influence
    const speedFactor = Math.min(1, Math.abs(speedRef.current) / maxSpeed);
    const yawDirection = speedRef.current >= 0 ? 1 : -1; // forward vs reverse
    if (Math.abs(speedRef.current) > 0.001 || f !== 0) {
      group.rotation.y +=
        t * turnSpeed * (0.4 + 0.6 * speedFactor) * delta * yawDirection;
    }

    // --- 5. Move car ---
    if (Math.abs(speedRef.current) > 0.0001) {
      // reverse the movement vector if speed is negative
      const moveVector = moveDir
        .clone()
        .multiplyScalar(speedRef.current * delta);
      group.position.add(moveVector);
    }

    // --- 6. Spin wheels ---
    const spinMultiplier = 6 * (input.current.boost ? 4 : 1); // boost increases spin too
    let spin = 0;
    if (f !== 0) spin = f * (0.6 + 0.4 * speedFactor) * spinMultiplier;
    else if (Math.abs(speedRef.current) > 0.0001)
      spin =
        Math.sign(speedRef.current) *
        Math.abs(speedRef.current) *
        spinMultiplier;

    wheels.forEach((w) => {
      if (w && w.rotation) w.rotation.z -= spin * delta;
    });
  });

  // Render the imported scene wrapped so we can control it
  return <primitive ref={groupRef} object={scene} scale={scale} />;
}
