import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Edges, useTexture } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";

const MATERIALS = {
  stainless: {
    name: "Stainless Steel",
    texture: "/download.jpeg",
    metalness: 0.8,
    roughness: 0.2,
  },
  woodLight: {
    name: "Light Wood",
    texture: "/W2008_2.jpg",
    metalness: 0.1,
    roughness: 0.7,
  },
};

export default function Elevator3D() {
  const [viewMode, setViewMode] = useState("front");
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("stainless");
  const [config, setConfig] = useState({
    A: "woodLight",
    B: "stainless",
    C: "stainless",
    D: "stainless",
    E: "stainless",
    F: "stainless",
    G: "stainless",
    H: "stainless",
    1: "woodLight",
    2: "woodLight",
    3: "woodLight",
  });

  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 2, viewMode === "front" ? -0.5 : 0);
    }
  }, [viewMode]);

  const applyMaterialToZone = (material) => {
    if (selectedZone) {
      setConfig((prev) => ({ ...prev, [selectedZone]: material }));
      setSelectedMaterial(material);
    }
  };

  const getCameraPosition = () =>
    viewMode === "front" ? [0, 2, 7] : [0, 2, 6.5];

  const getCameraRotation = () =>
    viewMode === "front" ? [-0.05, Math.PI / 4.5, 0] : [0, 0, 0];

  const zones = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const subPanels = ["1", "2", "3"];

  // 3D Scene - useTexture is now safely inside Canvas
  function Scene() {
    const textures = useTexture({
      stainless: "/download.jpeg",
      woodLight: "/W2008_2.jpg",
    });

    const getZoneMaterial = (zone) => {
      const matKey = config[zone];
      const mat = MATERIALS[matKey];
      if (!mat) return {};
      return {
        map: textures[matKey],
        metalness: mat.metalness,
        roughness: mat.roughness,
      };
    };

    const CeilingPanel = ({ position }) => {
      const gridLines = 3;
      const lights = [];
      for (let i = 0; i < gridLines; i++) {
        for (let j = 0; j < gridLines; j++) {
          lights.push({
            x: (i - 1) * (4 / 3),
            z: (j - 1) * (3 / 3),
          });
        }
      }

      return (
        <group position={position}>
          <mesh onClick={() => setSelectedZone("E")}>
            <boxGeometry args={[4, 0.08, 3]} />
            <meshStandardMaterial {...getZoneMaterial("E")} side={2} />
            <Edges color="#999" />
          </mesh>

          {[...Array(gridLines - 1)].map((_, i) => (
            <mesh
              key={`h-${i}`}
              position={[0, -0.04, (i + 1 - gridLines / 2) * (3 / gridLines)]}
            >
              <boxGeometry args={[4 - 0.1, 0.02, 0.03]} />
              <meshStandardMaterial color="#bbb" />
            </mesh>
          ))}

          {[...Array(gridLines - 1)].map((_, i) => (
            <mesh
              key={`v-${i}`}
              position={[(i + 1 - gridLines / 2) * (4 / gridLines), -0.04, 0]}
            >
              <boxGeometry args={[0.03, 0.02, 3 - 0.1]} />
              <meshStandardMaterial color="#bbb" />
            </mesh>
          ))}

          {lights.map((light, idx) => (
            <group key={idx} position={[light.x, -0.06, light.z]}>
              <mesh
                name="BackWall"
                userData={{ zone: "A", label: "Back Wall Panel" }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  console.log("Hovered mesh:", e.object);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked mesh:", e.object.name);
                  console.log("Zone:", e.object.userData.zone);
                }}
              >
                <cylinderGeometry args={[0.1, 0.15, 0.04, 20]} />
                <meshStandardMaterial color="#ddd" />
              </mesh>
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

    const WallPanel = ({
      position,
      width,
      height,
      rotation,
      visible = true,
      zone,
    }) => {
      if (!visible) return null;
      return (
        <group position={position} rotation={rotation}>
          <mesh onClick={() => setSelectedZone(zone)}>
            <boxGeometry args={[width, height, 0.1]} />
            <meshStandardMaterial {...getZoneMaterial(zone)} side={2} />
            <Edges color="#999" />
          </mesh>
          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[(i - 1) * (width / 3), 0, 0.06]}>
              <boxGeometry args={[0.02, height - 0.2, 0.01]} />
              <meshStandardMaterial color="#ccc" />
            </mesh>
          ))}
        </group>
      );
    };

    const WoodPanel = ({
      position,
      width,
      height,
      rotation,
      visible = true,
      zone,
    }) => {
      if (!visible) return null;
      return (
        <group position={position} rotation={rotation}>
          <mesh onClick={() => setSelectedZone(zone)}>
            <boxGeometry args={[width, height, 0.08]} />
            <meshStandardMaterial {...getZoneMaterial(zone)} side={2} />
          </mesh>
          {[...Array(8)].map((_, i) => {
            const subPanel = i < 3 ? "1" : i < 6 ? "2" : "3";
            return (
              <mesh
                key={i}
                position={[0, height / 2 - (i + 0.5) * (height / 8), 0.045]}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZone(subPanel);
                }}
              >
                <boxGeometry args={[width - 0.1, height / 8 - 0.05, 0.001]} />
                <meshStandardMaterial {...getZoneMaterial(subPanel)} />
              </mesh>
            );
          })}
          <mesh position={[0, 0, 0.046]}>
            <boxGeometry args={[0.015, height - 0.1, 0.001]} />
            <meshStandardMaterial map={textures.stainless} />
          </mesh>
        </group>
      );
    };

    return (
      <>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={getCameraPosition()}
          fov={60}
        />
        <ambientLight intensity={4.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.8} castShadow />
        <directionalLight position={[-5, 8, -5]} intensity={1.5} />
        <pointLight position={[0, 4, 0]} intensity={2.4} color="#fffbf0" />

        <group rotation={getCameraRotation()}>
          {/* Back Wall - Zone A */}
          <WallPanel
            position={[0, 2, -2]}
            width={4}
            height={5}
            zone="A"
            visible={true}
          />

          {/* Right Wall - Zone B (with sub-panels) */}
          <WoodPanel
            position={[2.05, 2, -0.5]}
            width={3}
            height={5}
            rotation={[0, -Math.PI / 2, 0]}
            zone="B"
          />

          {/* Left Wall - Zone C */}
          <WoodPanel
            position={[-2.05, 2, -0.5]}
            width={3}
            height={5}
            rotation={[0, Math.PI / 2, 0]}
            visible={viewMode !== "front"}
            zone="C"
          />

          {/* Floor - Zone D */}
          <group position={[0, -0.35, -0.5]}>
            <mesh receiveShadow onClick={() => setSelectedZone("D")}>
              <boxGeometry args={[4, 0.1, 3]} />
              <meshStandardMaterial {...getZoneMaterial("D")} />
              <Edges color="#ccc" />
            </mesh>
          </group>

          {/* Ceiling - Zone E */}
          <CeilingPanel position={[0, 4.45, -0.5]} />

          {/* Button Panel - Zone H */}
          {/* <group position={[1.85, 2, -1.75]}>
            <mesh castShadow onClick={() => setSelectedZone("H")}>
              <boxGeometry args={[0.35, 1.4, 0.08]} />
              <meshStandardMaterial
                {...getZoneMaterial("H")}
                metalness={0.4}
                roughness={0.6}
              />
              <Edges color="#aaa" />
            </mesh>
            <mesh position={[0.02, 0, 0.03]}>
              <boxGeometry args={[0.32, 1.35, 0.02]} />
              <meshStandardMaterial color="#999" />
            </mesh>
            <mesh position={[0.02, 0.5, 0.04]}>
              <boxGeometry args={[0.22, 0.3, 0.01]} />
              <meshStandardMaterial color="#1a3a5a" />
            </mesh>
            <mesh position={[0.02, 0.5, 0.045]}>
              <boxGeometry args={[0.18, 0.25, 0.005]} />
              <meshStandardMaterial
                color="#4a8fff"
                emissive="#4a8fff"
                emissiveIntensity={0.8}
              />
            </mesh>
            {[...Array(12)].map((_, i) => {
              const row = Math.floor(i / 2);
              const col = i % 2;
              return (
                <mesh
                  key={i}
                  position={[
                    0.02 + (col - 0.5) * 0.12,
                    0.15 - row * 0.14,
                    0.045,
                  ]}
                  castShadow
                >
                  <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
                  <meshStandardMaterial
                    color={i === 0 ? "#4a9eff" : "#3a3a3a"}
                    metalness={0.7}
                    roughness={0.3}
                    emissive={i === 0 ? "#4a9eff" : "#000"}
                    emissiveIntensity={i === 0 ? 0.6 : 0}
                  />
                </mesh>
              );
            })}
            <mesh position={[0.02, -0.6, 0.045]}>
              <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
              <meshStandardMaterial
                color="#cc0000"
                emissive="#cc0000"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group> */}

          {/* Accent Strip Right - Zone F */}
          <mesh position={[2.01, 2, 0.6]} onClick={() => setSelectedZone("F")}>
            <boxGeometry args={[0.08, 4.5, 0.02]} />
            <meshStandardMaterial
              {...getZoneMaterial("F")}
              metalness={0.6}
              roughness={0.3}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Accent Strip Left - Zone G */}
          {viewMode !== "front" && (
            <mesh
              position={[-2.01, 2, 0.6]}
              onClick={() => setSelectedZone("G")}
            >
              <boxGeometry args={[0.08, 4.5, 0.02]} />
              <meshStandardMaterial
                {...getZoneMaterial("G")}
                metalness={0.6}
                roughness={0.3}
                emissiveIntensity={0.3}
              />
            </mesh>
          )}

          {/* Handrails */}
          <mesh position={[1.95, 1.1, -0.5]}>
            <boxGeometry args={[0.05, 0.08, 2.8]} />
            <meshStandardMaterial
              color="#c0c0c0"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {viewMode !== "front" && (
            <mesh position={[-1.95, 1.1, -0.5]}>
              <boxGeometry args={[0.05, 0.08, 2.8]} />
              <meshStandardMaterial
                color="#c0c0c0"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          )}
        </group>
      </>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "360px",
          background: "white",
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
          <h2 style={{ margin: 0, fontSize: "18px", color: "#333" }}>
            Elevator Configurator
          </h2>
          <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#666" }}>
            LEVELe-105A
          </p>
        </div>

        <div
          style={{
            padding: "15px",
            borderBottom: "1px solid #ddd",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setViewMode("front")}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "13px",
              fontWeight: viewMode === "front" ? "bold" : "normal",
              backgroundColor: viewMode === "front" ? "#7bc043" : "#fff",
              color: viewMode === "front" ? "#fff" : "#333",
              border: "2px solid #7bc043",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Front
          </button>
          <button
            onClick={() => setViewMode("straight")}
            style={{
              flex: 1,
              padding: "10px",
              fontSize: "13px",
              fontWeight: viewMode === "straight" ? "bold" : "normal",
              backgroundColor: viewMode === "straight" ? "#7bc043" : "#fff",
              color: viewMode === "straight" ? "#fff" : "#333",
              border: "2px solid #7bc043",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Straight
          </button>
        </div>

        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <h3 style={{ fontSize: "13px", color: "#333", marginBottom: "10px" }}>
            SELECT ZONE
          </h3>
          <p style={{ fontSize: "11px", color: "#666", marginBottom: "15px" }}>
            Click a zone letter or number to customize
          </p>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              {zones.slice(0, 4).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    padding: "12px",
                    background: selectedZone === zone ? "#7bc043" : "white",
                    color: selectedZone === zone ? "white" : "#333",
                    border: "2px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {zone}
                </button>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
              }}
            >
              {zones.slice(4).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    padding: "12px",
                    background: selectedZone === zone ? "#7bc043" : "white",
                    color: selectedZone === zone ? "white" : "#333",
                    border: "2px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div
              style={{ fontSize: "11px", color: "#666", marginBottom: "10px" }}
            >
              SUB-PANELS
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {subPanels.map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedZone(num)}
                  style={{
                    padding: "12px 20px",
                    background: selectedZone === num ? "#7bc043" : "white",
                    color: selectedZone === num ? "white" : "#333",
                    border: "2px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {selectedZone && (
            <div
              style={{
                padding: "12px",
                background: "#f0f8e8",
                border: "2px solid #7bc043",
                borderRadius: "4px",
                marginBottom: "15px",
                fontSize: "12px",
              }}
            >
              <strong>Selected: Zone {selectedZone}</strong>
              <div
                style={{ fontSize: "10px", marginTop: "5px", color: "#7bc043" }}
              >
                👇 Click a material below to apply
              </div>
            </div>
          )}

          <div
            style={{
              background: "black",
              padding: "15px",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              MATERIAL LIBRARY
            </div>
            <p
              style={{ fontSize: "10px", color: "#ccc", marginBottom: "15px" }}
            >
              Select a material to apply to zone {selectedZone || "none"}
            </p>

            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                METALS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "6px",
                }}
              >
                {Object.keys(MATERIALS).map((mat) => (
                  <div
                    key={mat}
                    onClick={() => applyMaterialToZone(mat)}
                    style={{
                      paddingTop: "100%",
                      position: "relative",
                      backgroundImage: `url(${MATERIALS[mat].texture})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border:
                        selectedMaterial === mat
                          ? "3px solid #7bc043"
                          : "1px solid #555",
                      borderRadius: "4px",
                      cursor: selectedZone ? "pointer" : "not-allowed",
                      opacity: selectedZone ? 1 : 0.5,
                    }}
                    title={MATERIALS[mat].name}
                  />
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "bold",
                  marginBottom: "8px",
                }}
              >
                WOOD & GLASS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "6px",
                }}
              >
                {Object.keys(MATERIALS).map((mat) => (
                  <div
                    key={mat}
                    onClick={() => applyMaterialToZone(mat)}
                    style={{
                      paddingTop: "100%",
                      position: "relative",
                      backgroundImage: `url(${MATERIALS[mat].texture})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      border:
                        selectedMaterial === mat
                          ? "3px solid #7bc043"
                          : "1px solid #555",
                      borderRadius: "4px",
                      cursor: selectedZone ? "pointer" : "not-allowed",
                      opacity: selectedZone ? 1 : 0.5,
                    }}
                    title={MATERIALS[mat].name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D View */}
      <div style={{ flex: 1, background: "#e8e8e8" }}>
        <Canvas shadows>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}
