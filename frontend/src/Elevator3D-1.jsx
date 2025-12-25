// import { Canvas } from "@react-three/fiber";
// import { PerspectiveCamera, Edges } from "@react-three/drei";
// import { useRef, useEffect } from "react";

// export default function Elevator3D() {
//   const cameraRef = useRef();

//   useEffect(() => {
//     if (cameraRef.current) {
//       cameraRef.current.lookAt(0, 2, 0);
//     }
//   }, []);

//   // Ceiling Panel Component with grid and lights
//   const CeilingPanel = ({ position, width, depth }) => {
//     const gridLines = 3;
//     const lights = [];

//     for (let i = 0; i < gridLines; i++) {
//       for (let j = 0; j < gridLines; j++) {
//         const x = (i - 1) * (width / 3);
//         const z = (j - 1) * (depth / 3);
//         lights.push({ x, z });
//       }
//     }

//     return (
//       <group position={position}>
//         {/* Main ceiling surface */}
//         <mesh>
//           <boxGeometry args={[width, 0.05, depth]} />
//           <meshStandardMaterial
//             color="#f8f8f8"
//             side={2}
//             metalness={0.2}
//             roughness={0.8}
//           />
//         </mesh>

//         {/* Grid lines - horizontal */}
//         {[...Array(gridLines - 1)].map((_, i) => (
//           <mesh
//             key={`h-${i}`}
//             position={[0, -0.03, (i + 1 - gridLines / 2) * (depth / gridLines)]}
//           >
//             <boxGeometry args={[width, 0.015, 0.025]} />
//             <meshStandardMaterial
//               color="#d0d0d0"
//               metalness={0.4}
//               roughness={0.6}
//             />
//           </mesh>
//         ))}

//         {/* Grid lines - vertical */}
//         {[...Array(gridLines - 1)].map((_, i) => (
//           <mesh
//             key={`v-${i}`}
//             position={[(i + 1 - gridLines / 2) * (width / gridLines), -0.03, 0]}
//           >
//             <boxGeometry args={[0.025, 0.015, depth]} />
//             <meshStandardMaterial
//               color="#d0d0d0"
//               metalness={0.4}
//               roughness={0.6}
//             />
//           </mesh>
//         ))}

//         {/* Ceiling lights */}
//         {lights.map((light, idx) => (
//           <group key={idx} position={[light.x, -0.04, light.z]}>
//             {/* Light fixture outer ring */}
//             <mesh>
//               <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
//               <meshStandardMaterial
//                 color="#e5e5e5"
//                 metalness={0.3}
//                 roughness={0.7}
//               />
//             </mesh>
//             {/* Light center (glowing) */}
//             <mesh position={[0, -0.015, 0]}>
//               <cylinderGeometry args={[0.16, 0.16, 0.01, 24]} />
//               <meshStandardMaterial
//                 color="#fffef8"
//                 emissive="#fffef8"
//                 emissiveIntensity={1.2}
//               />
//             </mesh>
//           </group>
//         ))}
//       </group>
//     );
//   };

//   // Wood Panel Component for walls
//   const WoodPanel = ({
//     position,
//     width,
//     height,
//     rotation,
//     horizontal = false,
//   }) => {
//     const panelCount = horizontal ? 6 : 8;

//     return (
//       <group position={position} rotation={rotation}>
//         {/* Main panel background */}
//         <mesh>
//           <boxGeometry args={[width, height, 0.08]} />
//           <meshStandardMaterial
//             color="#a68a64"
//             side={2}
//             metalness={0.1}
//             roughness={0.6}
//           />
//         </mesh>

//         {/* Horizontal grooves */}
//         {[...Array(panelCount)].map((_, i) => (
//           <mesh
//             key={i}
//             position={[
//               0,
//               height / 2 - (i + 0.5) * (height / panelCount),
//               0.045,
//             ]}
//           >
//             <boxGeometry
//               args={[width - 0.1, height / panelCount - 0.05, 0.001]}
//             />
//             <meshStandardMaterial
//               color="#8a7054"
//               metalness={0.05}
//               roughness={0.7}
//             />
//           </mesh>
//         ))}

//         {/* Vertical accent line (darker wood grain) */}
//         <mesh position={[0, 0, 0.046]}>
//           <boxGeometry args={[0.015, height - 0.1, 0.001]} />
//           <meshStandardMaterial color="#6a5844" />
//         </mesh>
//       </group>
//     );
//   };

//   // Colored accent strip component
//   const AccentStrip = ({ position, height, color }) => (
//     <mesh position={position}>
//       <boxGeometry args={[0.08, height, 0.02]} />
//       <meshStandardMaterial
//         color={color}
//         metalness={0.6}
//         roughness={0.3}
//         emissive={color}
//         emissiveIntensity={0.3}
//       />
//     </mesh>
//   );

//   return (
//     <div style={{ width: "100%", height: "100vh", background: "#f0f0f0" }}>
//       <Canvas shadows>
//         {/* PERSPECTIVE CAMERA - Straight on view */}
//         <PerspectiveCamera
//           ref={cameraRef}
//           makeDefault
//           position={[0, 2.0, 6.5]}
//           fov={50}
//           near={0.1}
//           far={100}
//         />

//         {/* LIGHTING */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[3, 6, 5]} intensity={0.7} castShadow />
//         <pointLight position={[0, 4, 0]} intensity={0.4} color="#fffef8" />

//         {/* ELEVATOR GROUP */}
//         <group position={[0, 0, 0]}>
//           {/* Floor - White */}
//           <mesh position={[0, -0.3, 0]} receiveShadow>
//             <boxGeometry args={[3, 0.08, 2.8]} />
//             <meshStandardMaterial
//               color="#fafafa"
//               side={2}
//               metalness={0.1}
//               roughness={0.9}
//             />
//           </mesh>

//           {/* Back Wall - Metallic Doors */}
//           <group position={[0, 2, -1.4]}>
//             {/* Left Door */}
//             <mesh position={[-0.38, 0, 0]}>
//               <boxGeometry args={[0.72, 4.6, 0.08]} />
//               <meshStandardMaterial
//                 color="#b8b8b8"
//                 metalness={0.8}
//                 roughness={0.2}
//                 side={2}
//               />
//             </mesh>

//             {/* Right Door */}
//             <mesh position={[0.38, 0, 0]}>
//               <boxGeometry args={[0.72, 4.6, 0.08]} />
//               <meshStandardMaterial
//                 color="#b8b8b8"
//                 metalness={0.8}
//                 roughness={0.2}
//                 side={2}
//               />
//             </mesh>

//             {/* Center Door Gap */}
//             <mesh position={[0, 0, 0.01]}>
//               <boxGeometry args={[0.04, 4.5, 0.01]} />
//               <meshStandardMaterial color="#3a3a3a" />
//             </mesh>

//             {/* Door Logo/Text Area */}
//             <mesh position={[0, 0, 0.05]}>
//               <boxGeometry args={[0.8, 1, 0.01]} />
//               <meshStandardMaterial
//                 color="#9a9a9a"
//                 metalness={0.7}
//                 roughness={0.3}
//                 transparent
//                 opacity={0.3}
//               />
//             </mesh>
//           </group>

//           {/* Left Wall - Wood Panels */}
//           <WoodPanel
//             position={[-1.46, 2, 0]}
//             width={2.8}
//             height={4.6}
//             rotation={[0, Math.PI / 2, 0]}
//           />

//           {/* Left Wall - Cyan Accent Strip */}
//           <AccentStrip
//             position={[-1.42, 2, 0.6]}
//             height={4.5}
//             color="#00d4d4"
//           />

//           {/* Right Wall - Wood Panels */}
//           <WoodPanel
//             position={[1.46, 2, 0]}
//             width={2.8}
//             height={4.6}
//             rotation={[0, -Math.PI / 2, 0]}
//           />

//           {/* Right Wall - Orange Accent Strip */}
//           <AccentStrip position={[1.42, 2, 0.6]} height={4.5} color="#ff8800" />

//           {/* Control Panel on Right Wall */}
//           <group position={[1.08, 2.2, -0.8]}>
//             {/* Panel Background */}
//             <mesh>
//               <boxGeometry args={[0.28, 1.4, 0.06]} />
//               <meshStandardMaterial
//                 color="#e0e0e0"
//                 metalness={0.3}
//                 roughness={0.7}
//               />
//               <Edges color="#999" />
//             </mesh>

//             {/* Display Screen */}
//             <mesh position={[0, 0.5, 0.035]}>
//               <boxGeometry args={[0.22, 0.3, 0.01]} />
//               <meshStandardMaterial
//                 color="#1a3a5a"
//                 metalness={0.5}
//                 roughness={0.3}
//               />
//             </mesh>

//             {/* Display Content */}
//             <mesh position={[0, 0.5, 0.04]}>
//               <boxGeometry args={[0.15, 0.22, 0.005]} />
//               <meshStandardMaterial
//                 color="#4a8fff"
//                 emissive="#4a8fff"
//                 emissiveIntensity={0.8}
//               />
//             </mesh>

//             {/* Buttons Grid */}
//             {[...Array(12)].map((_, i) => {
//               const row = Math.floor(i / 2);
//               const col = i % 2;
//               return (
//                 <mesh
//                   key={i}
//                   position={[(col - 0.5) * 0.1, 0.15 - row * 0.13, 0.035]}
//                 >
//                   <cylinderGeometry args={[0.025, 0.025, 0.01, 16]} />
//                   <meshStandardMaterial
//                     color="#3a3a3a"
//                     metalness={0.6}
//                     roughness={0.4}
//                   />
//                 </mesh>
//               );
//             })}

//             {/* Emergency Button (Red) */}
//             <mesh position={[0, -0.6, 0.035]}>
//               <cylinderGeometry args={[0.035, 0.035, 0.015, 16]} />
//               <meshStandardMaterial
//                 color="#cc0000"
//                 metalness={0.5}
//                 roughness={0.3}
//                 emissive="#cc0000"
//                 emissiveIntensity={0.4}
//               />
//             </mesh>
//           </group>

//           {/* Ceiling with grid and lights */}
//           <CeilingPanel position={[0, 4.3, 0]} width={3} depth={2.8} />

//           {/* Ceiling Frame/Trim */}
//           <mesh position={[0, 4.27, 0]}>
//             <boxGeometry args={[3.1, 0.08, 2.9]} />
//             <meshStandardMaterial
//               color="#d0d0d0"
//               metalness={0.4}
//               roughness={0.6}
//               side={1}
//             />
//           </mesh>
//         </group>
//       </Canvas>
//     </div>
//   );
// }
