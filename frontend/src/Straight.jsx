import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Edges } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Leva , useControls } from "leva";

export default function Elevator3D() {
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 2, -0.5);
    }
  }, []);

  // Ceiling Panel Component with grid and lights
  const CeilingPanel = ({ position, width, depth }) => {
    const gridLines = 3;
    const lights = [];

    for (let i = 0; i < gridLines; i++) {
      for (let j = 0; j < gridLines; j++) {
        const x = (i - 1) * (width / 3);
        const z = (j - 1) * (depth / 3);
        lights.push({ x, z });
      }
    }

    return (
      <group position={position}>
        {/* Main ceiling surface */}
        <mesh>
          <boxGeometry args={[width, 0.08, depth]} />
          <meshStandardMaterial
            color="#f5f5f5"
            side={2}
            metalness={0.3}
            roughness={0.7}
          />
          <Edges color="#999" />
        </mesh>

        {/* Grid lines - horizontal */}
        {[...Array(gridLines - 1)].map((_, i) => (
          <mesh
            key={`h-${i}`}
            position={[0, -0.04, (i + 1 - gridLines / 2) * (depth / gridLines)]}
          >
            <boxGeometry args={[width - 0.1, 0.02, 0.03]} />
            <meshStandardMaterial
              color="#bbb"
              metalness={0.5}
              roughness={0.5}
            />
          </mesh>
        ))}

        {/* Grid lines - vertical */}
        {[...Array(gridLines - 1)].map((_, i) => (
          <mesh
            key={`v-${i}`}
            position={[(i + 1 - gridLines / 2) * (width / gridLines), -0.04, 0]}
          >
            <boxGeometry args={[0.03, 0.02, depth - 0.1]} />
            <meshStandardMaterial
              color="#bbb"
              metalness={0.5}
              roughness={0.5}
            />
          </mesh>
        ))}

        {/* Ceiling lights */}
        {lights.map((light, idx) => (
          <group key={idx} position={[light.x, -0.06, light.z]}>
            {/* Light fixture ring */}
            <mesh>
              <cylinderGeometry args={[0.25, 0.25, 0.04, 20]} />
              <meshStandardMaterial
                color="#ddd"
                metalness={0.4}
                roughness={0.6}
              />
            </mesh>
            {/* Light center (glowing) */}
            <mesh position={[0, -0.01, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.02, 20]} />
              <meshStandardMaterial
                color="#fffbf0"
                emissive="#fffbf0"
                emissiveIntensity={0.8}
              />
            </mesh>
          </group>
        ))}
      </group>
    );
  };

  // Wall Panel Component with vertical lines
  const WallPanel = ({ position, width, height, rotation }) => {
    const panelCount = 4;

    return (
      <group position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[width, height, 0.1]} />
          <meshStandardMaterial
            color="#f0f0f0"
            side={2}
            metalness={0.2}
            roughness={0.8}
          />
          <Edges color="#999" />
        </mesh>

        {/* Vertical panel lines */}
        {[...Array(panelCount - 1)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (i + 1 - panelCount / 2) * (width / panelCount),
              0,
              0.06,
            ]}
          >
            <boxGeometry args={[0.02, height - 0.2, 0.01]} />
            <meshStandardMaterial
              color="#ccc"
              metalness={0.3}
              roughness={0.7}
            />
          </mesh>
        ))}
      </group>
    );
  };

  return (
    <div style={{ width: "100%", height: "100vh", background: "#e5e5e5" }}>
      <Canvas shadows>
        {/* PERSPECTIVE CAMERA */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 2, 7]}
          fov={60}
          near={0.1}
          far={10}
        />

        {/* LIGHTING */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 4, 0]} intensity={0.3} color="#fffbf0" />

        {/* ELEVATOR GROUP */}
        <group position={[0, 0, 0]} rotation={[-0.05, Math.PI / 4.5, 0]}>
          {/* Back Wall with panels */}
          <WallPanel
            position={[0, 2, -2]}
            width={4}
            height={5}
            rotation={[0, 0, 0]}
          />


        

          {/* Right Wall with panels */}
          <WallPanel
            position={[2.05, 2, -0.5]}
            width={3}
            height={5}
            rotation={[0, -Math.PI / 2, 0]}
          />

          {/* Floor with pattern */}
          <group position={[0, -0.35, -0.5]}>
            <mesh receiveShadow>
              <boxGeometry args={[4, 0.1, 3]} />
              <meshStandardMaterial
                color="#e8e8e8"
                side={2}
                metalness={0.1}
                roughness={0.9}
              />
              <Edges color="#999" />
            </mesh>

            {/* Floor center line */}
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[3.8, 0.01, 0.02]} />
              <meshStandardMaterial color="#ccc" />
            </mesh>
          </group>

          {/* Ceiling with grid and lights */}
          <CeilingPanel position={[0, 4.45, -0.5]} width={4} depth={3} />

          {/* Button Panel Background */}
          <mesh position={[1.85, 2, -1.75]} castShadow>
            <boxGeometry args={[0.35, 1.2, 0.08]} />
            <meshStandardMaterial
              color="#d8d8d8"
              metalness={0.5}
              roughness={0.7}
            />
            <Edges color="#aaa" />
          </mesh>

          {/* Button Panel Frame */}
          <mesh position={[1.87, 2, -1.72]}>
            <boxGeometry args={[0.32, 1.15, 0.02]} />
            <meshStandardMaterial
              color="#999"
              metalness={0.4}
              roughness={0.6}
            />
          </mesh>

          {/* Buttons */}
          {[...Array(10)].map((_, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            return (
              <group key={i}>
                <mesh
                  position={[
                    1.88 + (col - 0.5) * 0.12,
                    2.4 - row * 0.18,
                    -1.71,
                  ]}
                  castShadow
                >
                  <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
                  <meshStandardMaterial
                    color={i === 0 ? "#4a9eff" : "#2a2a2a"}
                    metalness={0.7}
                    roughness={0.3}
                    emissive={i === 0 ? "#4a9eff" : "#000000"}
                    emissiveIntensity={i === 0 ? 0.5 : 0}
                  />
                </mesh>
              </group>
            );
          })}

          {/* Display Panel */}
          {/* <mesh position={[1.87, 3.2, -1.72]} castShadow>
            <boxGeometry args={[0.25, 0.15, 0.02]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh> */}

          {/* Display Number */}
          {/* <mesh position={[1.88, 3.2, -1.71]}>
            <boxGeometry args={[0.08, 0.12, 0.01]} />
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={1}
            />
          </mesh> */}
        </group>
      </Canvas>
    </div>
  );
}
