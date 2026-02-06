import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import BenchmarkDemo from "./demo.jsx";
import SimulatorDemo from "./SimulatorDemo.jsx";

const DemoSelector = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);

  const colors = {
    tangerine: "#FFA400",
    salmon: "#F38454",
    espresso: "#201B13",
    cocoa: "#4E403B",
    sand: "#E9E5D6",
    bone: "#F0F7EF",
    cream: "#FFFDF8",
    snow: "#FFFFFF",
    mocha: "#75665F",
    hazelnut: "#D3C5BF",
    olive: "#587322",
    denim: "#547099",
  };

  if (selectedDemo === "benchmark") {
    return <BenchmarkDemo />;
  }

  if (selectedDemo === "simulator") {
    return <SimulatorDemo />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.bone} 100%)`,
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <img
        src="./images/logo.png"
        alt="Influx"
        style={{ height: "60px", marginBottom: "48px" }}
      />

      <h1
        style={{
          fontSize: "56px",
          fontWeight: 700,
          color: colors.espresso,
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Influx Demo Selection
      </h1>

      <p
        style={{
          fontSize: "24px",
          color: colors.mocha,
          marginBottom: "56px",
          textAlign: "center",
        }}
      >
        Choose a demo to view
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        {/* Benchmark Demo Card */}
        <div
          onClick={() => setSelectedDemo("benchmark")}
          style={{
            backgroundColor: colors.snow,
            borderRadius: "24px",
            padding: "48px 40px",
            cursor: "pointer",
            border: `3px solid ${colors.hazelnut}`,
            boxShadow: `0 8px 32px ${colors.espresso}08`,
            transition: "all 0.3s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.tangerine;
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 12px 40px ${colors.tangerine}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.hazelnut;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 8px 32px ${colors.espresso}08`;
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎯</div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: colors.espresso,
              marginBottom: "12px",
            }}
          >
            AI Agent Management
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: colors.cocoa,
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            Overview of AI Agent Management service.
            <br />
            Explains the improvement cycle, benchmark testing, and results.
          </p>
          <div
            style={{
              backgroundColor: colors.sand,
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "16px",
              color: colors.mocha,
            }}
          >
            11 phases • ~45 seconds
          </div>
        </div>

        {/* Simulator Demo Card */}
        <div
          onClick={() => setSelectedDemo("simulator")}
          style={{
            backgroundColor: colors.snow,
            borderRadius: "24px",
            padding: "48px 40px",
            cursor: "pointer",
            border: `3px solid ${colors.hazelnut}`,
            boxShadow: `0 8px 32px ${colors.espresso}08`,
            transition: "all 0.3s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.olive;
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = `0 12px 40px ${colors.olive}20`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.hazelnut;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = `0 8px 32px ${colors.espresso}08`;
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🧪</div>
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: colors.espresso,
              marginBottom: "12px",
            }}
          >
            AI Agent Simulator
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: colors.cocoa,
              lineHeight: 1.6,
              marginBottom: "24px",
            }}
          >
            Client-side evaluation tools walkthrough.
            <br />
            Demonstrates sim, lint, and score commands.
          </p>
          <div
            style={{
              backgroundColor: colors.sand,
              borderRadius: "12px",
              padding: "12px 20px",
              fontSize: "16px",
              color: colors.mocha,
            }}
          >
            9 phases • Larger for video • ~50 seconds
          </div>
        </div>
      </div>

      <p
        style={{
          marginTop: "48px",
          fontSize: "16px",
          color: colors.mocha,
        }}
      >
        Press{" "}
        <kbd
          style={{
            backgroundColor: colors.sand,
            padding: "4px 10px",
            borderRadius: "6px",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          Esc
        </kbd>{" "}
        during a demo to return to this screen
      </p>
    </div>
  );
};

// Add global escape key listener
const App = () => {
  const [key, setKey] = useState(0);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setKey((k) => k + 1); // Force re-render to reset to selector
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return <DemoSelector key={key} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
