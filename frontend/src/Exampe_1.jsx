import { Canvas, useLoader } from "@react-three/fiber";
import { PerspectiveCamera, Edges } from "@react-three/drei";
import { useControls, folder, button } from "leva";
import { useState } from "react";
import * as THREE from "three";

// Import your images - Change these paths to your actual image locations
const TEXTURE_IMAGES = {
  wood1: "/download.jpeg",
  wood2: "/W2008_2.jpg",
};

function ElevatorStructure() {
  const [viewMode, setViewMode] = useState("front");
  const [selectedMesh, setSelectedMesh] = useState(null);
  const [appliedTextures, setAppliedTextures] = useState({});

  // Load textures
  const textures = {
    wood1: useLoader(THREE.TextureLoader, TEXTURE_IMAGES.wood1),
    wood2: useLoader(THREE.TextureLoader, TEXTURE_IMAGES.wood2),
  };

  // Configure texture repeat
  Object.values(textures).forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  // Texture Application Controls
  useControls("Texture Application", {
    selectedMesh: { value: selectedMesh || "Click a mesh", editable: false },
    "Apply Wood 1": button(
      () => selectedMesh && applyTexture(selectedMesh, "wood1")
    ),
    "Apply Wood 2": button(
      () => selectedMesh && applyTexture(selectedMesh, "wood2")
    ),
    "Clear Texture": button(() => selectedMesh && clearTexture(selectedMesh)),
    "Clear All Textures": button(() => setAppliedTextures({})),
  });

  useControls("View", {
    view: {
      value: viewMode,
      options: ["front", "straight"],
      onChange: (v) => setViewMode(v),
    },
  });

  const applyTexture = (meshId, textureKey) => {
    setAppliedTextures((prev) => ({ ...prev, [meshId]: textureKey }));
  };

  const clearTexture = (meshId) => {
    setAppliedTextures((prev) => {
      const newTextures = { ...prev };
      delete newTextures[meshId];
      return newTextures;
    });
  };

  const getMaterial = (meshId) => {
    const textureKey = appliedTextures[meshId];
    if (textureKey && textures[textureKey]) {
      return (
        <meshStandardMaterial
          map={textures[textureKey]}
          side={THREE.DoubleSide}
          roughness={0.8}
        />
      );
    }
    return (
      <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
    );
  };

  const cam = useControls("Camera", {
    posX: { value: viewMode === "front" ? 0 : 0, min: -20, max: 20, step: 0.1 },
    posY: { value: viewMode === "front" ? 2 : 2, min: -10, max: 10, step: 0.1 },
    posZ: {
      value: viewMode === "front" ? 7 : 6.5,
      min: -20,
      max: 20,
      step: 0.1,
    },
    fov: { value: 60, min: 20, max: 120, step: 1 },
  });

  const lights = useControls("Lights", {
    ambient: { value: 0.6, min: 0, max: 2, step: 0.1 },
    dir1: { value: 1, min: 0, max: 3, step: 0.1 },
    dir2: { value: 0.5, min: 0, max: 3, step: 0.1 },
  });

  const walls = useControls("Walls", {
    backVisible: { value: viewMode === "front", label: "Back Wall" },
    leftVisible: { value: viewMode !== "front", label: "Left Wall" },
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[cam.posX, cam.posY, cam.posZ]}
        fov={cam.fov}
      />
      <ambientLight intensity={lights.ambient} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={lights.dir1}
        castShadow
      />
      <directionalLight position={[-5, 8, -5]} intensity={lights.dir2} />

      <group
        rotation={viewMode === "front" ? [-0.05, Math.PI / 4.5, 0] : [0, 0, 0]}
      >
        {/* Back Wall */}
        {walls.backVisible && (
          <mesh
            position={[0, 2, -2]}
            onClick={() => setSelectedMesh("backWall")}
          >
            <boxGeometry args={[4, 5, 0.1]} />
            {getMaterial("backWall")}
            <Edges color={selectedMesh === "backWall" ? "#00ff00" : "#999"} />
          </mesh>
        )}

        {/* Right Wall */}
        <group position={[2.05, 2, -0.5]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh onClick={() => setSelectedMesh("rightWall")}>
            <boxGeometry args={[3, 5, 0.08]} />
            {getMaterial("rightWall")}
            <Edges color={selectedMesh === "rightWall" ? "#00ff00" : "#999"} />
          </mesh>
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[(i - 3.5) * 0.375, 0, 0.045]}>
              <boxGeometry args={[0.015, 4.9, 0.001]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#ccc" />
            </mesh>
          ))}
        </group>

        {/* Left Wall */}
        {walls.leftVisible && (
          <group position={[-2.05, 2, -0.5]} rotation={[0, Math.PI / 2, 0]}>
            <mesh onClick={() => setSelectedMesh("leftWall")}>
              <boxGeometry args={[3, 5, 0.08]} />
              {getMaterial("leftWall")}
              <Edges color={selectedMesh === "leftWall" ? "#00ff00" : "#999"} />
            </mesh>
            {[...Array(8)].map((_, i) => (
              <mesh key={i} position={[(i - 3.5) * 0.375, 0, 0.045]}>
                <boxGeometry args={[0.015, 4.9, 0.001]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#ccc" />
              </mesh>
            ))}
          </group>
        )}

        {/* Floor */}
        <mesh
          position={[0, -0.35, -0.5]}
          onClick={() => setSelectedMesh("floor")}
        >
          <boxGeometry args={[4, 0.1, 3]} />
          {getMaterial("floor")}
          <Edges color={selectedMesh === "floor" ? "#00ff00" : "#999"} />
        </mesh>

        {/* Ceiling */}
        <group position={[0, 4.45, -0.5]}>
          <mesh onClick={() => setSelectedMesh("ceiling")}>
            <boxGeometry args={[4, 0.08, 3]} />
            {getMaterial("ceiling")}
            <Edges color={selectedMesh === "ceiling" ? "#00ff00" : "#999"} />
          </mesh>

          {/* Ceiling Grid */}
          {[...Array(2)].map((_, i) => (
            <mesh key={`h${i}`} position={[0, -0.04, (i - 0.5) * 1]}>
              <boxGeometry args={[3.9, 0.02, 0.03]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#aaa" />
            </mesh>
          ))}
          {[...Array(2)].map((_, i) => (
            <mesh key={`v${i}`} position={[(i - 0.5) * 1.33, -0.04, 0]}>
              <boxGeometry args={[0.03, 0.02, 2.9]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#aaa" />
            </mesh>
          ))}

          {/* Lights */}
          {[...Array(9)].map((_, idx) => {
            const i = Math.floor(idx / 3);
            const j = idx % 3;
            return (
              <group key={idx} position={[(i - 1) * 1.33, -0.06, (j - 1) * 1]}>
                <mesh>
                  <cylinderGeometry args={[0.25, 0.25, 0.04, 24]} />
                  <meshStandardMaterial transparent opacity={0} />
                  <Edges color="#888" />
                </mesh>
                <mesh position={[0, -0.01, 0]}>
                  <cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />
                  <meshStandardMaterial transparent opacity={0} />
                  <Edges color="#aaa" />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Button Panel */}
        <group position={[1.85, 2, -1.75]}>
          <mesh onClick={() => setSelectedMesh("buttonPanel")}>
            <boxGeometry args={[0.35, 1.4, 0.08]} />
            {getMaterial("buttonPanel")}
            <Edges
              color={selectedMesh === "buttonPanel" ? "#00ff00" : "#999"}
            />
          </mesh>

          {[...Array(12)].map((_, i) => (
            <mesh
              key={i}
              position={[
                0.02 + ((i % 2) - 0.5) * 0.12,
                0.15 - Math.floor(i / 2) * 0.14,
                0.045,
              ]}
            >
              <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#888" />
            </mesh>
          ))}
        </group>

        {/* Handrails */}
        <mesh
          position={[1.95, 1.1, -0.5]}
          onClick={() => setSelectedMesh("handrailRight")}
        >
          <boxGeometry args={[0.05, 0.08, 2.8]} />
          {getMaterial("handrailRight")}
          <Edges
            color={selectedMesh === "handrailRight" ? "#00ff00" : "#999"}
          />
        </mesh>

        {walls.leftVisible && (
          <mesh
            position={[-1.95, 1.1, -0.5]}
            onClick={() => setSelectedMesh("handrailLeft")}
          >
            <boxGeometry args={[0.05, 0.08, 2.8]} />
            {getMaterial("handrailLeft")}
            <Edges
              color={selectedMesh === "handrailLeft" ? "#00ff00" : "#999"}
            />
          </mesh>
        )}
      </group>
    </>
  );
}

export default function Example_2() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}>
      <Canvas shadows>
        <ElevatorStructure />
      </Canvas>
    </div>
  );
}
