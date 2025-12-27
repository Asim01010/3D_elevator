import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Edges,
  useTexture,
  Environment,
} from "@react-three/drei";
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
  const [currentWall, setCurrentWall] = useState(null); // New: tracks selected wall (A/B/C)
  const [selectedMaterial, setSelectedMaterial] = useState("stainless");
  const [config, setConfig] = useState({
    // Whole walls
    A: "woodLight",
    B: "stainless",
    C: "stainless",
    D: "stainless",
    E: "stainless",
    F: "stainless",
    G: "stainless",
    H: "stainless",
    // Wall A sub-panels
    A1: "woodLight",
    A2: "woodLight",
    A3: "woodLight",
    A4: "woodLight",
    A5: "woodLight",
    // Wall B sub-panels
    B1: "stainless",
    B2: "stainless",
    B3: "stainless",
    B4: "stainless",
    B5: "stainless",
    // Wall C sub-panels
    C1: "stainless",
    C2: "stainless",
    C3: "stainless",
    C4: "stainless",
    C5: "stainless",
  });

  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(0, 2, viewMode === "front" ? -0.5 : 0);
    }
  }, [viewMode]);

const applyMaterialToZone = (material) => {
  if (selectedZone) {
    // Apply the material immediately
    setConfig((prev) => ({ ...prev, [selectedZone]: material }));
    // Update the selected material for border highlight
    setSelectedMaterial(material);
  }
};

  const handleZoneSelect = (zone) => {
    if (["A", "B", "C"].includes(zone)) {
      setCurrentWall(zone);
      setSelectedZone(zone); // Select whole wall
    } else {
      setSelectedZone(zone);
    }
  };

  const handleSubPanelSelect = (num) => {
    if (currentWall) {
      const subZone = currentWall + num;
      setSelectedZone(subZone);
    }
  };

  const getCameraPosition = () =>
    viewMode === "front" ? [0, 2, 7] : [0, 2, 6.5];

  const getCameraRotation = () =>
    viewMode === "front" ? [-0.05, Math.PI / 4.5, 0] : [0, 0, 0];

  const zones = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const subPanels = ["1", "2", "3", "4", "5"];

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
        envMapIntensity: 1.5, // Boost reflections for realism
      };
    };

    const CeilingPanel = ({ position }) => {
      const lights = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          lights.push({
            x: (i - 1) * (4 / 3),
            z: (j - 1) * (3 / 3),
          });
        }
      }

      return (
        <group position={position}>
          <mesh onClick={() => handleZoneSelect("E")}>
            <boxGeometry args={[4, 0.08, 3]} />
            <meshStandardMaterial {...getZoneMaterial("E")} side={2} />
            <Edges color="#999" />
          </mesh>

          {lights.map((light, idx) => (
            <group key={idx} position={[light.x, -0.06, light.z]}>
              {/* Visual light fixture */}
              <mesh>
                <cylinderGeometry args={[0.1, 0.15, 0.04, 20]} />
                <meshStandardMaterial color="#ddd" />
              </mesh>
              <mesh position={[0, -0.01, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.02, 20]} />
                <meshStandardMaterial
                  color="#fffbf0"
                  emissive="#fffbf0"
                  emissiveIntensity={0.4}
                />
              </mesh>
              {/* Actual point light for realism */}
              <pointLight
                position={[0.01, -0.01, 0]}
                intensity={0.6}
                color="#fffae6"
                distance={2}
                decay={3}
                castShadow
              />
            </group>
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
      zone, // 'A', 'B', or 'C'
    }) => {
      if (!visible) return null;
      const panelCount = 5;
      return (
        <group position={position} rotation={rotation}>
          {/* Main wall background - clickable for whole wall */}
          <mesh onClick={() => handleZoneSelect(zone)}>
            <boxGeometry args={[width, height, 0.08]} />
            <meshStandardMaterial {...getZoneMaterial(zone)} side={2} />
          </mesh>

          {/* Individual panels - 5 clickable sub-panels (e.g., A1 to A5) */}
          {[...Array(panelCount)].map((_, i) => {
            const subPanel = zone + (i + 1).toString(); // e.g., 'A1', 'A2'
            return (
              <mesh
                key={i}
                position={[
                  0,
                  height / 2 - (i + 0.5) * (height / panelCount),
                  0.045,
                ]}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedZone(subPanel);
                }}
              >
                <boxGeometry
                  args={[width - 0.1, height / panelCount - 0.05, 0.001]}
                />
                <meshStandardMaterial {...getZoneMaterial(subPanel)} />
              </mesh>
            );
          })}
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
        {/* Realistic, professional elevator lighting - no green tint, soft & elegant */}
        <ambientLight intensity={0.25} />

        <directionalLight
          position={[4, 10, 6]}
          intensity={0.7}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        <directionalLight position={[-4, 8, -4]} intensity={0.4} />

        {/* Soft natural sky/ground light - neutral tones, no green! */}
        <hemisphereLight
          intensity={0.35}
          color="#ffffff" // Pure white sky
          groundColor="#d0d0d0" // Soft gray ground reflection
        />

        {/* Environment map for perfect metal reflections - indoor luxury */}
        <Environment preset="city" background={false} />
        {/* "city" gives clean, subtle reflections - better than "lobby" for no color cast */}
        {/* Indoor reflections without changing background */}
        <group rotation={getCameraRotation()}>
          {/* Back Wall - Zone A */}
          <WoodPanel
            position={[0, 2, -2]}
            width={4}
            height={5}
            zone="A"
            visible={true}
          />

          {/* Right Wall - Zone B */}
          <WoodPanel
            position={[2.05, 2, -0.5]}
            width={3}
            height={5}
            rotation={[0, -Math.PI / 2, 0]}
            zone="B"
            visible={true}
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
            <mesh receiveShadow onClick={() => handleZoneSelect("D")}>
              <boxGeometry args={[4, 0.1, 3]} />
              <meshStandardMaterial {...getZoneMaterial("D")} />
              <Edges color="#ccc" />
            </mesh>
          </group>

          {/* Ceiling - Zone E */}
          <CeilingPanel position={[0, 4.45, -0.5]} />

          {/* Accent Strip Right - Zone F */}
          {/* <mesh position={[2.01, 2, 0.6]} onClick={() => handleZoneSelect("F")}>
            <boxGeometry args={[0.08, 4.5, 0.02]} />
            <meshStandardMaterial
              {...getZoneMaterial("F")}
              metalness={0.6}
              roughness={0.3}
              emissiveIntensity={0.3}
            />
          </mesh> */}

          {/* Accent Strip Left - Zone G */}
          {/* {viewMode !== "front" && (
            <mesh
              position={[-2.01, 2, 0.6]}
              onClick={() => handleZoneSelect("G")}
            >
              <boxGeometry args={[0.08, 4.5, 0.02]} />
              <meshStandardMaterial
                {...getZoneMaterial("G")}
                metalness={0.6}
                roughness={0.3}
                emissiveIntensity={0.3}
              />
            </mesh>
          )} */}
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
                  onClick={() => handleZoneSelect(zone)}
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
                  onClick={() => handleZoneSelect(zone)}
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

          {/* Sub-panels only show when a wall (A/B/C) is selected */}
          {currentWall && (
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "#666",
                  marginBottom: "10px",
                }}
              >
                SUB-PANELS for {currentWall}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {subPanels.map((num) => {
                  const subZone = currentWall + num;
                  return (
                    <button
                      key={num}
                      onClick={() => handleSubPanelSelect(num)}
                      style={{
                        padding: "12px 20px",
                        background:
                          selectedZone === subZone ? "#7bc043" : "white",
                        color: selectedZone === subZone ? "white" : "#333",
                        border: "2px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                        config[selectedZone] === mat
                          ? "4px solid #7bc043"
                          : "2px solid #666",
                      borderRadius: "6px",
                      cursor: selectedZone ? "pointer" : "not-allowed",
                      opacity: selectedZone ? 1 : 0.6,
                      boxShadow:
                        config[selectedZone] === mat
                          ? "0 0 12px rgba(123, 192, 67, 0.7)"
                          : "none",
                      transition: "all 0.2s ease",
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
                        config[selectedZone] === mat
                          ? "4px solid #7bc043"
                          : "2px solid #666",
                      boxShadow:
                        config[selectedZone] === mat
                          ? "0 0 10px rgba(123, 192, 67, 0.6)"
                          : "none",
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
