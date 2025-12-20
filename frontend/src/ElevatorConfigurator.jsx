import React, { useState } from "react";

// Material library
const MATERIALS = {
  stainless: { name: "Stainless Steel", color: "#C5C9CC" },
  bronze: { name: "Bronze", color: "#B8860B" },
  darkSteel: { name: "Dark Steel", color: "#3a3a3a" },
  champagne: { name: "Champagne", color: "#D4AF87" },
  mirror: { name: "Mirror", color: "#E8E8E8" },
  white: { name: "White", color: "#F5F5F5" },
  woodLight: { name: "Light Wood", color: "#C19A6B" },
  woodDark: { name: "Dark Wood", color: "#654321" },
  glass: { name: "Glass", color: "#E0F0FF" },
};

const ElevatorConfigurator = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("stainless");
  const [config, setConfig] = useState({
    materials: {
      A: "woodLight",
      B: "stainless",
      C: "stainless",
      D: "stainless",
      E: "stainless",
      F: "stainless",
      G: "woodLight",
      H: "stainless",
      1: "woodLight",
      2: "woodLight",
      3: "woodLight",
    },
  });

  const [activeTab, setActiveTab] = useState("configurations");
  const [selectedSubPanels, setSelectedSubPanels] = useState(["1", "2", "3"]);

  const applyMaterialToZone = (material) => {
    if (selectedZone) {
      setConfig((prev) => ({
        ...prev,
        materials: {
          ...prev.materials,
          [selectedZone]: material,
        },
      }));
      setSelectedMaterial(material);
    }
  };

  const toggleSubPanel = (num) => {
    setSelectedSubPanels((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const zones = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const subPanels = ["1", "2", "3"];

  // Get color for a zone
  const getZoneColor = (zone) => {
    const material = config.materials[zone] || "stainless";
    return MATERIALS[material].color;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#f5f5f5",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: "480px",
          background: "white",
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #ddd",
            background: "#f9f9f9",
          }}
        >
          {[
            { id: "configurations", label: "CONFIGURATIONS", icon: "📦" },
            { id: "wall", label: "WALL PANELS", icon: "🔲" },
            { id: "handrails", label: "HANDRAILS", icon: "━" },
            { id: "ceilings", label: "CEILINGS", icon: "⬜" },
            { id: "review", label: "REVIEW", icon: "✓" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "15px 5px",
                background: activeTab === tab.id ? "white" : "transparent",
                border: "none",
                borderBottom:
                  activeTab === tab.id
                    ? "3px solid #7bc043"
                    : "3px solid transparent",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: activeTab === tab.id ? "bold" : "normal",
                color: activeTab === tab.id ? "#333" : "#666",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                {tab.icon}
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {activeTab === "configurations" && (
            <>
              <h3
                style={{
                  fontSize: "13px",
                  color: "#333",
                  marginBottom: "15px",
                }}
              >
                LEVELe-105A | MATERIAL SELECTION
              </h3>
              <p
                style={{
                  fontSize: "11px",
                  color: "#666",
                  marginBottom: "20px",
                }}
              >
                Click on a letter to choose a zone within the elevator interior.
                This will reveal the library of materials available for that
                zone. Click on a swatch to see a close-up view of a material,
                and to apply it to your highlighted zone.
              </p>

              {/* Zone Selection */}
              <div style={{ marginBottom: "25px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "8px",
                    marginBottom: "15px",
                  }}
                >
                  {zones.slice(0, 6).map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setSelectedZone(zone)}
                      style={{
                        padding: "15px",
                        background: selectedZone === zone ? "#7bc043" : "white",
                        color: selectedZone === zone ? "white" : "#333",
                        border: "2px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "18px",
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
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "8px",
                  }}
                >
                  {zones.slice(6).map((zone) => (
                    <button
                      key={zone}
                      onClick={() => setSelectedZone(zone)}
                      style={{
                        padding: "15px",
                        background: selectedZone === zone ? "#7bc043" : "white",
                        color: selectedZone === zone ? "white" : "#333",
                        border: "2px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-panels */}
              <div style={{ marginBottom: "25px" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    marginBottom: "10px",
                  }}
                >
                  SUB-PANELS{" "}
                  <span style={{ fontStyle: "italic" }}>
                    ({selectedSubPanels.length} of 3 sub-panels selected)
                  </span>
                  <button
                    onClick={() => setSelectedSubPanels(["1", "2", "3"])}
                    style={{
                      marginLeft: "10px",
                      padding: "2px 8px",
                      fontSize: "10px",
                      background: "#555",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setSelectedSubPanels([])}
                    style={{
                      marginLeft: "5px",
                      padding: "2px 8px",
                      fontSize: "10px",
                      background: "#999",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    None
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {subPanels.map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        toggleSubPanel(num);
                        setSelectedZone(num);
                      }}
                      style={{
                        padding: "12px 20px",
                        background: selectedSubPanels.includes(num)
                          ? "#7bc043"
                          : "white",
                        color: selectedSubPanels.includes(num)
                          ? "white"
                          : "#333",
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

                <p
                  style={{ fontSize: "10px", color: "#666", marginTop: "8px" }}
                >
                  Select one or more of the numbered sub-panels. You can select
                  multiple sub-panels by clicking on the numbers above or from
                  the rendering on right.
                </p>
              </div>

              {/* Selected Zone Info */}
              {selectedZone && (
                <div
                  style={{
                    padding: "12px",
                    background: "#f0f8e8",
                    border: "2px solid #7bc043",
                    borderRadius: "4px",
                    marginBottom: "20px",
                    fontSize: "12px",
                  }}
                >
                  <strong>Selected Zone: {selectedZone}</strong>
                  <div
                    style={{
                      fontSize: "11px",
                      marginTop: "5px",
                      color: "#666",
                    }}
                  >
                    Current Material:{" "}
                    {MATERIALS[config.materials[selectedZone]]?.name ||
                      "Not Set"}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      marginTop: "5px",
                      color: "#7bc043",
                    }}
                  >
                    👇 Click a material below to apply it to this zone
                  </div>
                </div>
              )}

              {/* Material Library */}
              <div
                style={{
                  background: "black",
                  padding: "15px",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                    color: "white",
                  }}
                >
                  <span style={{ fontSize: "20px", marginRight: "10px" }}>
                    🔍
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Search Surfaces
                  </span>
                  <button
                    style={{
                      marginLeft: "auto",
                      padding: "5px 10px",
                      background: "#444",
                      color: "white",
                      border: "1px solid #666",
                      borderRadius: "3px",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    F+S
                  </button>
                  <button
                    style={{
                      marginLeft: "5px",
                      padding: "5px 10px",
                      background: "#444",
                      color: "white",
                      border: "1px solid #666",
                      borderRadius: "3px",
                      fontSize: "11px",
                      cursor: "pointer",
                    }}
                  >
                    ⭐
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "10px",
                    color: "#ccc",
                    marginBottom: "15px",
                  }}
                >
                  First, choose a material by selecting a swatch from one of the
                  material families below. Click any swatch to apply it to your
                  selected zone ({selectedZone || "none selected"}).
                </p>

                {/* Stainless Steel */}
                <div style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    STAINLESS STEEL & FUSED METAL
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: "6px",
                    }}
                  >
                    {[
                      "stainless",
                      "bronze",
                      "darkSteel",
                      "champagne",
                      "mirror",
                      "white",
                    ].map((mat) => {
                      const material = MATERIALS[mat];
                      return (
                        <div
                          key={mat}
                          onClick={() => applyMaterialToZone(mat)}
                          style={{
                            width: "100%",
                            paddingTop: "100%",
                            position: "relative",
                            background: material.color,
                            border:
                              selectedMaterial === mat
                                ? "3px solid #7bc043"
                                : "1px solid #555",
                            borderRadius: "4px",
                            cursor: selectedZone ? "pointer" : "not-allowed",
                            opacity: selectedZone ? 1 : 0.5,
                          }}
                          title={material.name}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Wood */}
                <div style={{ marginBottom: "15px" }}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "11px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      letterSpacing: "0.5px",
                    }}
                  >
                    BONDED METAL & BONDED QUARTZ
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: "6px",
                    }}
                  >
                    {["woodLight", "woodDark", "glass"].map((mat) => {
                      const material = MATERIALS[mat];
                      return (
                        <div
                          key={mat}
                          onClick={() => applyMaterialToZone(mat)}
                          style={{
                            width: "100%",
                            paddingTop: "100%",
                            position: "relative",
                            background: material.color,
                            border:
                              selectedMaterial === mat
                                ? "3px solid #7bc043"
                                : "1px solid #555",
                            borderRadius: "4px",
                            cursor: selectedZone ? "pointer" : "not-allowed",
                            opacity: selectedZone ? 1 : 0.5,
                          }}
                          title={material.name}
                        />
                      );
                    })}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "10px",
                    color: "#7bc043",
                    marginTop: "15px",
                    padding: "8px",
                    background: "rgba(123, 192, 67, 0.1)",
                    borderRadius: "3px",
                  }}
                >
                  💡 Tip: First select a zone (A-H or 1-3), then click a
                  material swatch to apply it!
                </div>
              </div>
            </>
          )}

          {activeTab === "wall" && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🔲</div>
              <h3>Wall Panels Section</h3>
              <p style={{ fontSize: "12px" }}>Coming soon...</p>
            </div>
          )}

          {activeTab === "handrails" && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>━</div>
              <h3>Handrails Section</h3>
              <p style={{ fontSize: "12px" }}>Coming soon...</p>
            </div>
          )}

          {activeTab === "ceilings" && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>⬜</div>
              <h3>Ceilings Section</h3>
              <p style={{ fontSize: "12px" }}>Coming soon...</p>
            </div>
          )}

          {activeTab === "review" && (
            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "14px", marginBottom: "15px" }}>
                Configuration Summary
              </h3>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {Object.entries(config.materials).map(([zone, material]) => (
                  <div
                    key={zone}
                    style={{
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      <strong>Zone {zone}:</strong>
                    </span>
                    <span
                      style={{
                        padding: "4px 12px",
                        background: MATERIALS[material].color,
                        borderRadius: "3px",
                        fontSize: "11px",
                      }}
                    >
                      {MATERIALS[material].name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - 3D View */}
      <div style={{ flex: 1, position: "relative", background: "#e8e8e8" }}>
        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "white",
            padding: "10px 20px",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            zIndex: 10,
            fontSize: "12px",
            color: "#666",
          }}
        >
          <div style={{ fontWeight: "bold", color: "#333" }}>
            LEVELe-105A #1
          </div>
          <div style={{ fontSize: "10px", color: "#7bc043" }}>(edit)</div>
        </div>

        {/* 3D View - SVG Based for simplicity */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <svg
            viewBox="0 0 800 600"
            style={{ width: "90%", maxWidth: "900px" }}
          >
            {/* Ceiling */}
            <polygon
              points="150,100 650,100 750,150 250,150"
              fill="#fafafa"
              stroke="#888"
              strokeWidth="2"
            />

            {/* Ceiling lights */}
            <circle cx="300" cy="115" r="15" fill="#fff" stroke="#aaa" />
            <circle cx="400" cy="120" r="15" fill="#fff" stroke="#aaa" />
            <circle cx="500" cy="120" r="15" fill="#fff" stroke="#aaa" />
            <circle cx="600" cy="125" r="15" fill="#fff" stroke="#aaa" />

            {/* Back Wall - with zones */}
            <polygon
              points="150,100 650,100 650,450 150,450"
              fill={getZoneColor("A")}
              stroke="#666"
              strokeWidth="2"
            />

            {/* Back wall panels */}
            <rect
              x="170"
              y="120"
              width="140"
              height="150"
              fill={getZoneColor("1")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="240"
              y="200"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              1
            </text>

            <rect
              x="330"
              y="120"
              width="140"
              height="150"
              fill={getZoneColor("B")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="400"
              y="200"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              B
            </text>

            <rect
              x="490"
              y="120"
              width="140"
              height="150"
              fill={getZoneColor("2")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="560"
              y="200"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              2
            </text>

            <rect
              x="170"
              y="290"
              width="140"
              height="140"
              fill={getZoneColor("C")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="240"
              y="365"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              C
            </text>

            <rect
              x="330"
              y="290"
              width="140"
              height="140"
              fill={getZoneColor("D")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="400"
              y="365"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              D
            </text>

            <rect
              x="490"
              y="290"
              width="140"
              height="140"
              fill={getZoneColor("C")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="560"
              y="365"
              fontSize="40"
              fill="#7bc043"
              fontWeight="bold"
            >
              C
            </text>

            {/* Right Wall - visible side */}
            <polygon
              points="650,100 750,150 750,500 650,450"
              fill={getZoneColor("3")}
              stroke="#666"
              strokeWidth="2"
            />

            {/* Right wall panel */}
            <polygon
              points="660,180 740,220 740,350 660,310"
              fill={getZoneColor("3")}
              stroke="#888"
              strokeWidth="2"
            />
            <text
              x="680"
              y="270"
              fontSize="36"
              fill="#7bc043"
              fontWeight="bold"
            >
              3
            </text>

            {/* Floor */}
            <polygon
              points="150,450 650,450 750,500 250,500"
              fill="#f5f5f5"
              stroke="#888"
              strokeWidth="2"
            />

            {/* Left Wall outline */}
            <line
              x1="150"
              y1="100"
              x2="250"
              y2="150"
              stroke="#666"
              strokeWidth="2"
            />
            <line
              x1="150"
              y1="450"
              x2="250"
              y2="500"
              stroke="#666"
              strokeWidth="2"
            />
            <line
              x1="250"
              y1="150"
              x2="250"
              y2="500"
              stroke="#666"
              strokeWidth="2"
            />

            {/* Handrail indicators */}
            <line
              x1="260"
              y1="300"
              x2="640"
              y2="300"
              stroke="#888"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="660"
              y1="305"
              x2="740"
              y2="340"
              stroke="#888"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            right: "40px",
            color: "#ccc",
            fontSize: "72px",
            fontWeight: "100",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        >
          LEVELe-105A
        </div>

        {/* Instructions */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "30px",
            background: "rgba(255,255,255,0.95)",
            padding: "15px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            maxWidth: "300px",
            fontSize: "12px",
            color: "#333",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "8px",
              color: "#7bc043",
            }}
          >
            ✨ How to Use:
          </div>
          <ol
            style={{
              margin: "0",
              paddingLeft: "20px",
              fontSize: "11px",
              lineHeight: "1.6",
            }}
          >
            <li>Click a zone button (A-H or 1-3) on the left</li>
            <li>Click a material color swatch</li>
            <li>Watch the zone change color in the 3D view!</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ElevatorConfigurator;
