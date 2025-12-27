import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Edges } from "@react-three/drei";
import { useControls, folder, button } from "leva";
import { useState } from "react";

function ElevatorStructure_1() {
  const [viewMode, setViewMode] = useState("front");

  // View Mode Controls
  useControls("View Mode", {
    "Switch View": button(() =>
      setViewMode(viewMode === "front" ? "straight" : "front")
    ),
    currentView: { value: viewMode, editable: false },
  });

  // Camera Controls
  const camera = useControls("Camera", {
    Front: folder({
      frontPosX: {
        value: 0,
        min: -20,
        max: 20,
        step: 0.1,
        label: "Position X",
      },
      frontPosY: {
        value: 2,
        min: -10,
        max: 10,
        step: 0.1,
        label: "Position Y",
      },
      frontPosZ: {
        value: 7,
        min: -20,
        max: 20,
        step: 0.1,
        label: "Position Z",
      },
      frontFov: { value: 60, min: 20, max: 120, step: 1, label: "FOV" },
    }),
    Straight: folder({
      straightPosX: {
        value: 0,
        min: -20,
        max: 20,
        step: 0.1,
        label: "Position X",
      },
      straightPosY: {
        value: 2,
        min: -10,
        max: 10,
        step: 0.1,
        label: "Position Y",
      },
      straightPosZ: {
        value: 6.5,
        min: -20,
        max: 20,
        step: 0.1,
        label: "Position Z",
      },
      straightFov: { value: 60, min: 20, max: 120, step: 1, label: "FOV" },
    }),
  });

  // Lighting Controls
  const lights = useControls("Lighting", {
    "Ambient Light": folder({
      ambientEnabled: { value: true, label: "Enabled" },
      ambientIntensity: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: "Intensity",
      },
      ambientColor: { value: "#ffffff", label: "Color" },
    }),
    "Directional Light 1": folder({
      dir1Enabled: { value: true, label: "Enabled" },
      dir1Intensity: {
        value: 0.8,
        min: 0,
        max: 3,
        step: 0.1,
        label: "Intensity",
      },
      dir1PosX: { value: 5, min: -20, max: 20, step: 0.5, label: "Position X" },
      dir1PosY: { value: 8, min: -20, max: 20, step: 0.5, label: "Position Y" },
      dir1PosZ: { value: 5, min: -20, max: 20, step: 0.5, label: "Position Z" },
      dir1Color: { value: "#ffffff", label: "Color" },
      dir1Shadow: { value: true, label: "Cast Shadow" },
    }),
    "Directional Light 2": folder({
      dir2Enabled: { value: true, label: "Enabled" },
      dir2Intensity: {
        value: 0.5,
        min: 0,
        max: 3,
        step: 0.1,
        label: "Intensity",
      },
      dir2PosX: {
        value: -5,
        min: -20,
        max: 20,
        step: 0.5,
        label: "Position X",
      },
      dir2PosY: { value: 8, min: -20, max: 20, step: 0.5, label: "Position Y" },
      dir2PosZ: {
        value: -5,
        min: -20,
        max: 20,
        step: 0.5,
        label: "Position Z",
      },
      dir2Color: { value: "#ffffff", label: "Color" },
    }),
    "Point Light": folder({
      pointEnabled: { value: true, label: "Enabled" },
      pointIntensity: {
        value: 0.4,
        min: 0,
        max: 3,
        step: 0.1,
        label: "Intensity",
      },
      pointPosX: {
        value: 0,
        min: -10,
        max: 10,
        step: 0.5,
        label: "Position X",
      },
      pointPosY: {
        value: 4,
        min: -10,
        max: 10,
        step: 0.5,
        label: "Position Y",
      },
      pointPosZ: {
        value: 0,
        min: -10,
        max: 10,
        step: 0.5,
        label: "Position Z",
      },
      pointColor: { value: "#fffbf0", label: "Color" },
    }),
  });

  // Back Wall Controls
  const backWall = useControls("Back Wall (A)", {
    backVisible: { value: true, label: "Visible" },
    backWidth: { value: 4, min: 1, max: 10, step: 0.1, label: "Width" },
    backHeight: { value: 5, min: 1, max: 10, step: 0.1, label: "Height" },
    backDepth: { value: 0.1, min: 0.01, max: 1, step: 0.01, label: "Depth" },
    backPosX: { value: 0, min: -5, max: 5, step: 0.1, label: "Position X" },
    backPosY: { value: 2, min: -5, max: 10, step: 0.1, label: "Position Y" },
    backPosZ: { value: -2, min: -5, max: 5, step: 0.1, label: "Position Z" },
    backPanels: { value: 3, min: 1, max: 6, step: 1, label: "Vertical Panels" },
  });

  // Right Wall Controls
  const rightWall = useControls("Right Wall (B)", {
    rightVisible: { value: true, label: "Visible" },
    rightWidth: { value: 3, min: 1, max: 10, step: 0.1, label: "Width" },
    rightHeight: { value: 5, min: 1, max: 10, step: 0.1, label: "Height" },
    rightDepth: { value: 0.08, min: 0.01, max: 1, step: 0.01, label: "Depth" },
    rightPosX: {
      value: 2.05,
      min: -5,
      max: 5,
      step: 0.05,
      label: "Position X",
    },
    rightPosY: { value: 2, min: -5, max: 10, step: 0.1, label: "Position Y" },
    rightPosZ: { value: -0.5, min: -5, max: 5, step: 0.1, label: "Position Z" },
    rightVerticalLines: {
      value: 8,
      min: 0,
      max: 20,
      step: 1,
      label: "Vertical Lines",
    },
    rightHorizontalDividers: {
      value: 2,
      min: 0,
      max: 5,
      step: 1,
      label: "Horizontal Dividers",
    },
  });

  // Left Wall Controls
  const leftWall = useControls("Left Wall (C)", {
    leftVisible: { value: true, label: "Visible" },
    leftWidth: { value: 3, min: 1, max: 10, step: 0.1, label: "Width" },
    leftHeight: { value: 5, min: 1, max: 10, step: 0.1, label: "Height" },
    leftDepth: { value: 0.08, min: 0.01, max: 1, step: 0.01, label: "Depth" },
    leftPosX: {
      value: -2.05,
      min: -5,
      max: 5,
      step: 0.05,
      label: "Position X",
    },
    leftPosY: { value: 2, min: -5, max: 10, step: 0.1, label: "Position Y" },
    leftPosZ: { value: -0.5, min: -5, max: 5, step: 0.1, label: "Position Z" },
    leftVerticalLines: {
      value: 8,
      min: 0,
      max: 20,
      step: 1,
      label: "Vertical Lines",
    },
    leftHorizontalDividers: {
      value: 2,
      min: 0,
      max: 5,
      step: 1,
      label: "Horizontal Dividers",
    },
  });

  // Floor Controls
  const floor = useControls("Floor (D)", {
    floorVisible: { value: true, label: "Visible" },
    floorWidth: { value: 4, min: 1, max: 10, step: 0.1, label: "Width" },
    floorDepth: { value: 3, min: 1, max: 10, step: 0.1, label: "Depth" },
    floorHeight: { value: 0.1, min: 0.01, max: 1, step: 0.01, label: "Height" },
    floorPosY: {
      value: -0.35,
      min: -3,
      max: 3,
      step: 0.05,
      label: "Position Y",
    },
    floorPosZ: { value: -0.5, min: -5, max: 5, step: 0.1, label: "Position Z" },
  });

  // Ceiling Controls
  const ceiling = useControls("Ceiling (E)", {
    ceilingVisible: { value: true, label: "Visible" },
    ceilingWidth: { value: 4, min: 1, max: 10, step: 0.1, label: "Width" },
    ceilingDepth: { value: 3, min: 1, max: 10, step: 0.1, label: "Depth" },
    ceilingHeight: {
      value: 0.08,
      min: 0.01,
      max: 1,
      step: 0.01,
      label: "Height",
    },
    ceilingPosY: {
      value: 4.45,
      min: 0,
      max: 10,
      step: 0.05,
      label: "Position Y",
    },
    ceilingPosZ: {
      value: -0.5,
      min: -5,
      max: 5,
      step: 0.1,
      label: "Position Z",
    },
    ceilingGrid: { value: 3, min: 2, max: 5, step: 1, label: "Grid Size" },
  });

  // Button Panel Controls
  const buttonPanel = useControls("Button Panel (H)", {
    buttonVisible: { value: true, label: "Visible" },
    buttonWidth: { value: 0.35, min: 0.1, max: 2, step: 0.05, label: "Width" },
    buttonHeight: { value: 1.4, min: 0.5, max: 3, step: 0.1, label: "Height" },
    buttonDepth: {
      value: 0.08,
      min: 0.01,
      max: 0.5,
      step: 0.01,
      label: "Depth",
    },
    buttonPosX: {
      value: 1.85,
      min: -3,
      max: 3,
      step: 0.05,
      label: "Position X",
    },
    buttonPosY: { value: 2, min: -3, max: 5, step: 0.05, label: "Position Y" },
    buttonPosZ: {
      value: -1.75,
      min: -3,
      max: 3,
      step: 0.05,
      label: "Position Z",
    },
    buttonCount: { value: 12, min: 4, max: 20, step: 1, label: "Button Count" },
  });

  // Handrails Controls
  const handrails = useControls("Handrails", {
    handrailsVisible: { value: true, label: "Visible" },
    handrailWidth: {
      value: 0.05,
      min: 0.01,
      max: 0.2,
      step: 0.01,
      label: "Width",
    },
    handrailHeight: {
      value: 0.08,
      min: 0.01,
      max: 0.3,
      step: 0.01,
      label: "Height",
    },
    handrailDepth: { value: 2.8, min: 1, max: 5, step: 0.1, label: "Depth" },
    handrailPosY: {
      value: 1.1,
      min: 0,
      max: 3,
      step: 0.1,
      label: "Position Y",
    },
  });

  const getCameraPosition = () => {
    if (viewMode === "front") {
      return [camera.frontPosX, camera.frontPosY, camera.frontPosZ];
    } else {
      return [camera.straightPosX, camera.straightPosY, camera.straightPosZ];
    }
  };

  const getCameraFov = () => {
    return viewMode === "front" ? camera.frontFov : camera.straightFov;
  };

  const getCameraRotation = () => {
    if (viewMode === "front") {
      return [-0.05, Math.PI / 4.5, 0];
    } else {
      return [0, 0, 0];
    }
  };

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={getCameraPosition()}
        fov={getCameraFov()}
        near={0.1}
        far={100}
      />

      {/* Lights */}
      {lights.ambientEnabled && (
        <ambientLight
          intensity={lights.ambientIntensity}
          color={lights.ambientColor}
        />
      )}

      {lights.dir1Enabled && (
        <directionalLight
          position={[lights.dir1PosX, lights.dir1PosY, lights.dir1PosZ]}
          intensity={lights.dir1Intensity}
          color={lights.dir1Color}
          castShadow={lights.dir1Shadow}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      )}

      {lights.dir2Enabled && (
        <directionalLight
          position={[lights.dir2PosX, lights.dir2PosY, lights.dir2PosZ]}
          intensity={lights.dir2Intensity}
          color={lights.dir2Color}
        />
      )}

      {lights.pointEnabled && (
        <pointLight
          position={[lights.pointPosX, lights.pointPosY, lights.pointPosZ]}
          intensity={lights.pointIntensity}
          color={lights.pointColor}
        />
      )}

      <group position={[0, 0, 0]} rotation={getCameraRotation()}>
        {/* Back Wall - Zone A */}
        {backWall.backVisible && viewMode === "front" && (
          <group
            position={[backWall.backPosX, backWall.backPosY, backWall.backPosZ]}
          >
            <mesh>
              <boxGeometry
                args={[
                  backWall.backWidth,
                  backWall.backHeight,
                  backWall.backDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Vertical panel dividers */}
            {[...Array(backWall.backPanels - 1)].map((_, i) => (
              <mesh
                key={`back-v-${i}`}
                position={[
                  (i + 1 - backWall.backPanels / 2) *
                    (backWall.backWidth / backWall.backPanels),
                  0,
                  backWall.backDepth / 2 + 0.001,
                ]}
              >
                <boxGeometry args={[0.02, backWall.backHeight - 0.2, 0.001]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#cccccc" threshold={15} />
              </mesh>
            ))}
          </group>
        )}

        {/* Right Wall - Zone B */}
        {rightWall.rightVisible && (
          <group
            position={[
              rightWall.rightPosX,
              rightWall.rightPosY,
              rightWall.rightPosZ,
            ]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            <mesh>
              <boxGeometry
                args={[
                  rightWall.rightWidth,
                  rightWall.rightHeight,
                  rightWall.rightDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Horizontal dividers */}
            {[...Array(rightWall.rightHorizontalDividers)].map((_, i) => (
              <mesh
                key={`right-h-${i}`}
                position={[
                  0,
                  rightWall.rightHeight / 2 -
                    (i + 1) *
                      (rightWall.rightHeight /
                        (rightWall.rightHorizontalDividers + 1)),
                  rightWall.rightDepth / 2 + 0.001,
                ]}
              >
                <boxGeometry args={[rightWall.rightWidth - 0.1, 0.02, 0.001]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#aaaaaa" threshold={15} />
              </mesh>
            ))}

            {/* Vertical wood grain lines */}
            {[...Array(rightWall.rightVerticalLines)].map((_, i) => {
              const spacing =
                rightWall.rightWidth / rightWall.rightVerticalLines;
              const xPos =
                (i - (rightWall.rightVerticalLines - 1) / 2) * spacing;
              return (
                <mesh
                  key={`right-v-${i}`}
                  position={[xPos, 0, rightWall.rightDepth / 2 + 0.001]}
                >
                  <boxGeometry
                    args={[0.015, rightWall.rightHeight - 0.1, 0.001]}
                  />
                  <meshStandardMaterial transparent opacity={0} />
                  <Edges color="#cccccc" threshold={15} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Left Wall - Zone C */}
        {leftWall.leftVisible && viewMode !== "front" && (
          <group
            position={[leftWall.leftPosX, leftWall.leftPosY, leftWall.leftPosZ]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <mesh>
              <boxGeometry
                args={[
                  leftWall.leftWidth,
                  leftWall.leftHeight,
                  leftWall.leftDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Horizontal dividers */}
            {[...Array(leftWall.leftHorizontalDividers)].map((_, i) => (
              <mesh
                key={`left-h-${i}`}
                position={[
                  0,
                  leftWall.leftHeight / 2 -
                    (i + 1) *
                      (leftWall.leftHeight /
                        (leftWall.leftHorizontalDividers + 1)),
                  leftWall.leftDepth / 2 + 0.001,
                ]}
              >
                <boxGeometry args={[leftWall.leftWidth - 0.1, 0.02, 0.001]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#aaaaaa" threshold={15} />
              </mesh>
            ))}

            {/* Vertical wood grain lines */}
            {[...Array(leftWall.leftVerticalLines)].map((_, i) => {
              const spacing = leftWall.leftWidth / leftWall.leftVerticalLines;
              const xPos = (i - (leftWall.leftVerticalLines - 1) / 2) * spacing;
              return (
                <mesh
                  key={`left-v-${i}`}
                  position={[xPos, 0, leftWall.leftDepth / 2 + 0.001]}
                >
                  <boxGeometry
                    args={[0.015, leftWall.leftHeight - 0.1, 0.001]}
                  />
                  <meshStandardMaterial transparent opacity={0} />
                  <Edges color="#cccccc" threshold={15} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* Floor - Zone D */}
        {floor.floorVisible && (
          <group position={[0, floor.floorPosY, floor.floorPosZ]}>
            <mesh receiveShadow>
              <boxGeometry
                args={[floor.floorWidth, floor.floorHeight, floor.floorDepth]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Floor center line */}
            <mesh position={[0, floor.floorHeight / 2 + 0.01, 0]}>
              <boxGeometry args={[floor.floorWidth - 0.2, 0.01, 0.02]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#bbbbbb" threshold={15} />
            </mesh>
          </group>
        )}

        {/* Ceiling - Zone E */}
        {ceiling.ceilingVisible && (
          <group position={[0, ceiling.ceilingPosY, ceiling.ceilingPosZ]}>
            <mesh>
              <boxGeometry
                args={[
                  ceiling.ceilingWidth,
                  ceiling.ceilingHeight,
                  ceiling.ceilingDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Ceiling Grid Lines */}
            {[...Array(ceiling.ceilingGrid - 1)].map((_, i) => (
              <mesh
                key={`ceiling-h-${i}`}
                position={[
                  0,
                  -ceiling.ceilingHeight / 2 - 0.01,
                  (i + 1 - ceiling.ceilingGrid / 2) *
                    (ceiling.ceilingDepth / ceiling.ceilingGrid),
                ]}
              >
                <boxGeometry args={[ceiling.ceilingWidth - 0.1, 0.02, 0.03]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#aaaaaa" threshold={15} />
              </mesh>
            ))}

            {[...Array(ceiling.ceilingGrid - 1)].map((_, i) => (
              <mesh
                key={`ceiling-v-${i}`}
                position={[
                  (i + 1 - ceiling.ceilingGrid / 2) *
                    (ceiling.ceilingWidth / ceiling.ceilingGrid),
                  -ceiling.ceilingHeight / 2 - 0.01,
                  0,
                ]}
              >
                <boxGeometry args={[0.03, 0.02, ceiling.ceilingDepth - 0.1]} />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#aaaaaa" threshold={15} />
              </mesh>
            ))}

            {/* Recessed Light Fixtures */}
            {[...Array(ceiling.ceilingGrid)].map((_, i) =>
              [...Array(ceiling.ceilingGrid)].map((_, j) => {
                const x =
                  (i - (ceiling.ceilingGrid - 1) / 2) *
                  (ceiling.ceilingWidth / ceiling.ceilingGrid);
                const z =
                  (j - (ceiling.ceilingGrid - 1) / 2) *
                  (ceiling.ceilingDepth / ceiling.ceilingGrid);
                return (
                  <group
                    key={`light-${i}-${j}`}
                    position={[x, -ceiling.ceilingHeight / 2 - 0.03, z]}
                  >
                    {/* Outer ring */}
                    <mesh>
                      <cylinderGeometry args={[0.25, 0.25, 0.04, 24]} />
                      <meshStandardMaterial transparent opacity={0} />
                      <Edges color="#888888" threshold={15} />
                    </mesh>
                    {/* Inner light circle */}
                    <mesh position={[0, -0.01, 0]}>
                      <cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />
                      <meshStandardMaterial transparent opacity={0} />
                      <Edges color="#aaaaaa" threshold={15} />
                    </mesh>
                  </group>
                );
              })
            )}
          </group>
        )}

        {/* Button Panel - Zone H */}
        {buttonPanel.buttonVisible && (
          <group
            position={[
              buttonPanel.buttonPosX,
              buttonPanel.buttonPosY,
              buttonPanel.buttonPosZ,
            ]}
          >
            {/* Main panel */}
            <mesh castShadow>
              <boxGeometry
                args={[
                  buttonPanel.buttonWidth,
                  buttonPanel.buttonHeight,
                  buttonPanel.buttonDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Inner panel frame */}
            <mesh position={[0.02, 0, buttonPanel.buttonDepth / 2 + 0.01]}>
              <boxGeometry
                args={[
                  buttonPanel.buttonWidth - 0.03,
                  buttonPanel.buttonHeight - 0.05,
                  0.02,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#aaaaaa" threshold={15} />
            </mesh>

            {/* Display screen frame */}
            <mesh
              position={[
                0.02,
                buttonPanel.buttonHeight / 3,
                buttonPanel.buttonDepth / 2 + 0.02,
              ]}
            >
              <boxGeometry args={[0.22, 0.3, 0.01]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#888888" threshold={15} />
            </mesh>

            {/* Screen inner */}
            <mesh
              position={[
                0.02,
                buttonPanel.buttonHeight / 3,
                buttonPanel.buttonDepth / 2 + 0.025,
              ]}
            >
              <boxGeometry args={[0.18, 0.25, 0.005]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {/* Floor buttons */}
            {[...Array(buttonPanel.buttonCount)].map((_, i) => {
              const row = Math.floor(i / 2);
              const col = i % 2;
              return (
                <mesh
                  key={i}
                  position={[
                    0.02 + (col - 0.5) * 0.12,
                    buttonPanel.buttonHeight / 6 - row * 0.14,
                    buttonPanel.buttonDepth / 2 + 0.025,
                  ]}
                  castShadow
                >
                  <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
                  <meshStandardMaterial transparent opacity={0} />
                  <Edges
                    color={i === 0 ? "#4a9eff" : "#888888"}
                    threshold={15}
                  />
                </mesh>
              );
            })}

            {/* Emergency button */}
            <mesh
              position={[
                0.02,
                -buttonPanel.buttonHeight / 3,
                buttonPanel.buttonDepth / 2 + 0.025,
              ]}
            >
              <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#cc0000" threshold={15} />
            </mesh>
          </group>
        )}

        {/* Handrails */}
        {handrails.handrailsVisible && (
          <>
            <mesh position={[1.95, handrails.handrailPosY, -0.5]}>
              <boxGeometry
                args={[
                  handrails.handrailWidth,
                  handrails.handrailHeight,
                  handrails.handrailDepth,
                ]}
              />
              <meshStandardMaterial transparent opacity={0} />
              <Edges color="#999999" threshold={15} />
            </mesh>

            {viewMode !== "front" && (
              <mesh position={[-1.95, handrails.handrailPosY, -0.5]}>
                <boxGeometry
                  args={[
                    handrails.handrailWidth,
                    handrails.handrailHeight,
                    handrails.handrailDepth,
                  ]}
                />
                <meshStandardMaterial transparent opacity={0} />
                <Edges color="#999999" threshold={15} />
              </mesh>
            )}
          </>
        )}
      </group>
    </>
  );
}

export default function Example_2() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}>
      <Canvas shadows>
        <ElevatorStructure_1 />
      </Canvas>
    </div>
  );
}
