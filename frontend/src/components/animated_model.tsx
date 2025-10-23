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
  const input = useRef({ forward: 0, turn: 0 }); // forward: -1..1, turn: -1..1

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
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "s") input.current.forward = 0;
      if (k === "a" || k === "d") input.current.turn = 0;
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

    // parameters (tweak to taste)
    const maxSpeed = 4.0; // units/sec
    const accel = 6.0; // units/sec^2
    const brake = 8.0;
    const turnSpeed = 1.6; // rad/sec for heading
    const maxSteerAngle = 0.6; // radians for wheel parents

    // inputs
    const f = input.current.forward; // -1..1
    const t = input.current.turn; // -1..1

    // apply steering to front steer parents (visual)
    if (steerFL.current)
      steerFL.current.rotation.y = THREE.MathUtils.lerp(
        steerFL.current.rotation.y,
        maxSteerAngle * t,
        0.2
      );
    if (steerFR.current)
      steerFR.current.rotation.y = THREE.MathUtils.lerp(
        steerFR.current.rotation.y,
        maxSteerAngle * t,
        0.2
      );

    // heading change: rotate the whole group (yaw) only when moving (or when forward input exists)
    const speedFactor = Math.min(1, Math.abs(speedRef.current) / maxSpeed);
    if (Math.abs(speedRef.current) > 0.001 || f !== 0) {
      group.rotation.y += t * turnSpeed * (0.4 + 0.6 * speedFactor) * delta;
    }

    // update speed toward target
    const target = f * maxSpeed;
    if (f !== 0) {
      const dv =
        Math.sign(target - speedRef.current) *
        Math.min(Math.abs(target - speedRef.current), accel * delta);
      speedRef.current += dv;
    } else {
      // natural braking
      const dec =
        Math.sign(speedRef.current) *
        Math.min(Math.abs(speedRef.current), brake * delta);
      speedRef.current -= dec;
    }

    // move along direction defined by front steer parents if available
    let moveDir: THREE.Vector3;
    // Use model's +X as forward (adjusted from -Z). This matches how the GLTF
    // was authored where the vehicle faces the +X axis.
    const forwardLocal = tmpVec.current.set(1, 0, 0);
    if (steerFL.current && steerFR.current) {
      // get world forward for each steer parent
      steerFL.current.getWorldQuaternion(tmpQuat.current);
      const f1 = forwardLocal
        .clone()
        .applyQuaternion(tmpQuat.current)
        .normalize();
      steerFR.current.getWorldQuaternion(tmpQuat.current);
      const f2 = forwardLocal
        .clone()
        .applyQuaternion(tmpQuat.current)
        .normalize();
      moveDir = f1.add(f2).multiplyScalar(0.5).normalize();
    } else {
      // fallback to group's forward
      moveDir = forwardLocal.applyQuaternion(group.quaternion).normalize();
    }

    // Only move when there's some speed
    if (Math.abs(speedRef.current) > 0.0001) {
      group.position.addScaledVector(moveDir, speedRef.current * delta);
    }

    // spin wheels: if W/S input is pressed, spin immediately on X axis
    // direction follows input; otherwise spin according to actual speed
    const spinMultiplier = 6;
    const inputF = input.current.forward; // -1,0,1
    const speedFrac = Math.min(1, Math.abs(speedRef.current) / maxSpeed);
    let spin = 0;
    if (inputF !== 0) {
      const base = 0.6 + 0.4 * speedFrac; // base spin when input pressed
      spin = inputF * base * spinMultiplier;
    } else if (Math.abs(speedRef.current) > 0.0001) {
      spin =
        Math.sign(speedRef.current) *
        Math.abs(speedRef.current) *
        spinMultiplier;
    }

    wheels.forEach((w) => {
      if (w && w.rotation) w.rotation.z -= spin * delta; // rotate on X axis
    });
  });

  // Render the imported scene wrapped so we can control it
  return <primitive ref={groupRef} object={scene} scale={scale} />;
}
