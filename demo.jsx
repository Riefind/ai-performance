import React, { useState } from "react";

const BenchmarkDemo = () => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);

  // Phase 1: Why AI Agent Management?
  const [showWhyTitle, setShowWhyTitle] = useState(false);
  const [showWhySubtitle, setShowWhySubtitle] = useState(false);
  const [showWhyPoints, setShowWhyPoints] = useState([false, false, false]);
  const [showWhyConclusion, setShowWhyConclusion] = useState(false);

  // Phase 2: What is Benchmark Testing?
  const [showWhatTitle, setShowWhatTitle] = useState(false);
  const [showWhatDefinition, setShowWhatDefinition] = useState(false);
  const [showWhatDiagram, setShowWhatDiagram] = useState([false, false, false]);
  const [showWhatSummary, setShowWhatSummary] = useState(false);

  // Phase 3: The Solution
  const [showSolutionTitle, setShowSolutionTitle] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);
  const [showSolutionBenefits, setShowSolutionBenefits] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Phase 4: The Flywheel
  const [showFlywheelTitle, setShowFlywheelTitle] = useState(false);
  const [showFlywheelSubtitle, setShowFlywheelSubtitle] = useState(false);
  const [showFlywheelSteps, setShowFlywheelSteps] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [activeFlywheelStep, setActiveFlywheelStep] = useState(-1);
  const [showFlywheelLoop, setShowFlywheelLoop] = useState(false);

  // Phase 5: Step 1 - Create Benchmark
  const [showStep1Title, setShowStep1Title] = useState(false);
  const [showStep1Definition, setShowStep1Definition] = useState(false);
  const [showStep1Question, setShowStep1Question] = useState(false);
  const [showStep1Answer, setShowStep1Answer] = useState(false);

  // Phase 6: Step 2 - Retrieve Knowledge
  const [showStep2Title, setShowStep2Title] = useState(false);
  const [showStep2Definition, setShowStep2Definition] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState([false, false, false]);

  // Phase 7: Step 3 - Generate Response
  const [showStep3Title, setShowStep3Title] = useState(false);
  const [showStep3Definition, setShowStep3Definition] = useState(false);
  const [showStep3Expected, setShowStep3Expected] = useState(false);
  const [showStep3AI, setShowStep3AI] = useState(false);
  const [streamedAiAnswer, setStreamedAiAnswer] = useState("");

  // Phase 8: Step 4 - Calculate Score
  const [showStep4Title, setShowStep4Title] = useState(false);
  const [showStep4Definition, setShowStep4Definition] = useState(false);
  const [showFaithfulness, setShowFaithfulness] = useState(false);
  const [showSimilarity, setShowSimilarity] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [faithfulness, setFaithfulness] = useState(0);
  const [similarity, setSimilarity] = useState(0);
  const [passed, setPassed] = useState(false);

  // Phase 9: Results
  const [showResultsTitle, setShowResultsTitle] = useState(false);
  const [showResultsSubtitle, setShowResultsSubtitle] = useState(false);
  const [showResultsMetrics, setShowResultsMetrics] = useState([
    false,
    false,
    false,
  ]);
  const [showCTA, setShowCTA] = useState(false);

  // Content
  const question = "What is your return policy?";
  const expectedAnswer =
    "Returns accepted within 30 days. $5 return shipping fee deducted from refund.";
  const aiAnswer =
    "Returns are accepted within 30 days. The customer pays a $5 fee deducted from the refund.";

  // Why AI Agent Management - problems without management
  const whyPoints = [
    {
      icon: "❌",
      problem: "Wrong Information",
      desc: "AI gives outdated or incorrect answers to customers",
    },
    {
      icon: "❌",
      problem: "Inconsistent Responses",
      desc: "Different answers to the same question each time",
    },
    {
      icon: "❌",
      problem: "No Quality Control",
      desc: "No way to catch errors before customers see them",
    },
  ];

  // What is benchmark testing - simple diagram
  const whatDiagram = [
    { icon: "❓", label: "Question", desc: "A real customer question" },
    { icon: "🤖", label: "AI Answer", desc: "What the AI responds" },
    { icon: "✓", label: "Check", desc: "Compare to correct answer" },
  ];

  const solutionBenefits = [
    { icon: "📚", title: "Build Knowledge", desc: "AI-ready knowledge bases" },
    { icon: "🧪", title: "Test Before Launch", desc: "Catch errors early" },
    { icon: "🤝", title: "Human Oversight", desc: "Quality protection" },
    { icon: "📈", title: "Weekly Updates", desc: "Continuous improvement" },
  ];

  const flywheelSteps = [
    {
      icon: "🔍",
      title: "Analyze",
      color: "#547099",
      definition: "Look at how the AI is performing",
      detail: "Find where the AI struggles or gives wrong answers",
    },
    {
      icon: "🎓",
      title: "Train",
      color: "#587322",
      definition: "Update the AI's knowledge",
      detail: "Add new information, fix mistakes, improve answers",
    },
    {
      icon: "🧪",
      title: "Test",
      color: "#FFA400",
      definition: "Check if the changes work",
      detail: "Run benchmarks before going live",
    },
    {
      icon: "🚀",
      title: "Deploy",
      color: "#F38454",
      definition: "Push changes to production",
      detail: "Release improvements to customers",
    },
  ];

  const knowledgeSnippets = [
    {
      source: "Policies › Returns",
      content: "Returns accepted within 30 days of purchase.",
      relevance: 94,
    },
    {
      source: "Policies › Shipping",
      content: "Non-warranty returns: $5 deducted from refund.",
      relevance: 89,
    },
    {
      source: "FAQ › Refunds",
      content: "Refunds issued within 3 business days.",
      relevance: 72,
    },
  ];

  // Real Influx results
  const resultMetrics = [
    {
      icon: "📈",
      label: "+15%",
      value: "AI First-Response",
      desc: "While CSAT held at 4.5+",
    },
    {
      icon: "🤖",
      label: "3x",
      value: "More Queries Solved",
      desc: "Without human agent",
    },
    {
      icon: "⚡",
      label: "1 Day",
      value: "Update Turnaround",
      desc: "For new answers",
    },
  ];

  const colors = {
    tangerine: "#FFA400",
    salmon: "#F38454",
    espresso: "#201B13",
    cocoa: "#4E403B",
    sand: "#E9E5D6",
    bone: "#F0F7EF",
    cream: "#FFFDF8",
    snow: "#FFFFFF",
    charcoal: "#55524E",
    mocha: "#75665F",
    hazelnut: "#D3C5BF",
    forest: "#354A0A",
    olive: "#587322",
    cerulean: "#122849",
    denim: "#547099",
    burgundy: "#660016",
    redwood: "#8C152F",
  };

  // Raindrop animation style - always top to bottom
  const raindrop = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(-30px)",
    transition: `all 0.6s ease ${delay}s`,
  });

  const streamText = (text, setter, speed = 35) => {
    return new Promise((resolve) => {
      let i = 0;
      setter("");
      const interval = setInterval(() => {
        if (i < text.length) {
          setter(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  const animateScore = (target, setter, duration = 1500) => {
    return new Promise((resolve) => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setter(target * eased);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      animate();
    });
  };

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const resetDemo = () => {
    setStarted(false);
    setPhase(0);
    setShowWhyTitle(false);
    setShowWhySubtitle(false);
    setShowWhyPoints([false, false, false]);
    setShowWhyConclusion(false);
    setShowWhatTitle(false);
    setShowWhatDefinition(false);
    setShowWhatDiagram([false, false, false]);
    setShowWhatSummary(false);
    setShowSolutionTitle(false);
    setShowSolutionText(false);
    setShowSolutionBenefits([false, false, false, false]);
    setShowFlywheelTitle(false);
    setShowFlywheelSubtitle(false);
    setShowFlywheelSteps([false, false, false, false]);
    setActiveFlywheelStep(-1);
    setShowFlywheelLoop(false);
    setShowStep1Title(false);
    setShowStep1Definition(false);
    setShowStep1Question(false);
    setShowStep1Answer(false);
    setShowStep2Title(false);
    setShowStep2Definition(false);
    setShowKnowledge([false, false, false]);
    setShowStep3Title(false);
    setShowStep3Definition(false);
    setShowStep3Expected(false);
    setShowStep3AI(false);
    setStreamedAiAnswer("");
    setShowStep4Title(false);
    setShowStep4Definition(false);
    setShowFaithfulness(false);
    setShowSimilarity(false);
    setShowResult(false);
    setFaithfulness(0);
    setSimilarity(0);
    setPassed(false);
    setShowResultsTitle(false);
    setShowResultsSubtitle(false);
    setShowResultsMetrics([false, false, false]);
    setShowCTA(false);
  };

  const runFullDemo = async () => {
    setStarted(true);

    // === PHASE 1: WHY AI Agent Management? ===
    setPhase(1);
    await wait(400);
    setShowWhyTitle(true);
    await wait(600);
    setShowWhySubtitle(true);
    await wait(800);

    // Raindrop: points appear top to bottom
    for (let i = 0; i < 3; i++) {
      setShowWhyPoints((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(600);
    }

    await wait(600);
    setShowWhyConclusion(true);
    await wait(2500);

    // === PHASE 2: WHAT is Benchmark Testing? ===
    setPhase(2);
    await wait(400);
    setShowWhatTitle(true);
    await wait(600);
    setShowWhatDefinition(true);
    await wait(1000);

    // Raindrop: diagram items top to bottom (left to right visually, but same vertical)
    for (let i = 0; i < 3; i++) {
      setShowWhatDiagram((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }

    await wait(600);
    setShowWhatSummary(true);
    await wait(2500);

    // === PHASE 3: The Solution ===
    setPhase(3);
    await wait(400);
    setShowSolutionTitle(true);
    await wait(600);
    setShowSolutionText(true);
    await wait(800);

    // Raindrop: benefits appear top to bottom (row by row)
    for (let i = 0; i < 4; i++) {
      setShowSolutionBenefits((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(400);
    }
    await wait(2000);

    // === PHASE 4: HOW - The Flywheel ===
    setPhase(4);
    await wait(400);
    setShowFlywheelTitle(true);
    await wait(600);
    setShowFlywheelSubtitle(true);
    await wait(600);

    // Show all steps (raindrop)
    for (let i = 0; i < 4; i++) {
      setShowFlywheelSteps((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(300);
    }
    await wait(400);

    // Highlight each step
    for (let i = 0; i < 4; i++) {
      setActiveFlywheelStep(i);
      await wait(2000);
    }

    setActiveFlywheelStep(-1);
    setShowFlywheelLoop(true);
    await wait(2000);

    // === PHASE 5: Step 1 - Create Benchmark ===
    setPhase(5);
    await wait(400);
    setShowStep1Title(true);
    await wait(500);
    setShowStep1Definition(true);
    await wait(800);
    setShowStep1Question(true);
    await wait(800);
    setShowStep1Answer(true);
    await wait(2000);

    // === PHASE 6: Step 2 - Retrieve Knowledge ===
    setPhase(6);
    await wait(400);
    setShowStep2Title(true);
    await wait(500);
    setShowStep2Definition(true);
    await wait(800);

    // Raindrop: knowledge items
    for (let i = 0; i < 3; i++) {
      setShowKnowledge((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }
    await wait(1800);

    // === PHASE 7: Step 3 - Generate Response ===
    setPhase(7);
    await wait(400);
    setShowStep3Title(true);
    await wait(500);
    setShowStep3Definition(true);
    await wait(800);
    setShowStep3Expected(true);
    await wait(600);
    setShowStep3AI(true);
    await wait(400);
    await streamText(aiAnswer, setStreamedAiAnswer, 30);
    await wait(1800);

    // === PHASE 8: Step 4 - Calculate Score ===
    setPhase(8);
    await wait(400);
    setShowStep4Title(true);
    await wait(500);
    setShowStep4Definition(true);
    await wait(800);
    setShowFaithfulness(true);
    await wait(400);
    setShowSimilarity(true);
    await wait(400);

    await Promise.all([
      animateScore(0.94, setFaithfulness, 1500),
      animateScore(0.87, setSimilarity, 1500),
    ]);

    await wait(500);
    setShowResult(true);
    await wait(400);
    setPassed(true);
    await wait(2000);

    // === PHASE 9: Results ===
    setPhase(9);
    await wait(400);
    setShowResultsTitle(true);
    await wait(500);
    setShowResultsSubtitle(true);
    await wait(600);

    // Raindrop: metrics
    for (let i = 0; i < 3; i++) {
      setShowResultsMetrics((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }

    await wait(800);
    setShowCTA(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.bone} 100%)`,
        fontFamily: "Inter, system-ui, sans-serif",
        color: colors.espresso,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${colors.hazelnut}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <circle
              cx="16"
              cy="16"
              r="14"
              stroke={colors.tangerine}
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="16"
              cy="16"
              r="6"
              stroke={colors.tangerine}
              strokeWidth="3"
              fill="none"
            />
            <line
              x1="16"
              y1="2"
              x2="16"
              y2="10"
              stroke={colors.tangerine}
              strokeWidth="3"
            />
            <line
              x1="16"
              y1="22"
              x2="16"
              y2="30"
              stroke={colors.tangerine}
              strokeWidth="3"
            />
            <line
              x1="2"
              y1="16"
              x2="10"
              y2="16"
              stroke={colors.tangerine}
              strokeWidth="3"
            />
            <line
              x1="22"
              y1="16"
              x2="30"
              y2="16"
              stroke={colors.tangerine}
              strokeWidth="3"
            />
          </svg>
          <span
            style={{
              fontWeight: 600,
              fontSize: "22px",
              color: colors.espresso,
            }}
          >
            Context Engine
          </span>
        </div>

        {started && (
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
              <div
                key={p}
                style={{
                  width: p === phase ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor:
                    phase >= p ? colors.tangerine : colors.hazelnut,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 48px",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Start Screen */}
        {!started && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                margin: "0 auto 40px",
                borderRadius: "50%",
                backgroundColor: colors.snow,
                border: `4px solid ${colors.tangerine}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 32px ${colors.tangerine}30`,
                animation: "pulse 2s infinite",
                cursor: "pointer",
              }}
              onClick={runFullDemo}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill={colors.tangerine}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 700,
                marginBottom: "16px",
                color: colors.espresso,
              }}
            >
              AI Agent Management
            </h1>
            <p
              style={{
                fontSize: "24px",
                color: colors.mocha,
                marginBottom: "40px",
              }}
            >
              How we make sure your AI gives the right answers
            </p>
            <button
              onClick={runFullDemo}
              style={{
                backgroundColor: colors.tangerine,
                color: colors.snow,
                border: "none",
                padding: "18px 56px",
                borderRadius: "12px",
                fontSize: "20px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 8px 32px ${colors.tangerine}40`,
              }}
            >
              Start Demo →
            </button>
          </div>
        )}

        {/* Phase 1: WHY AI Agent Management? */}
        {phase === 1 && (
          <div
            style={{ width: "100%", maxWidth: "900px", textAlign: "center" }}
          >
            <div style={raindrop(showWhyTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.burgundy,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                The Question
              </span>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  color: colors.espresso,
                  marginBottom: "0",
                }}
              >
                Why Do You Need
                <br />
                AI Agent Management?
              </h1>
            </div>

            <p
              style={{
                fontSize: "22px",
                color: colors.mocha,
                marginTop: "16px",
                marginBottom: "40px",
                ...raindrop(showWhySubtitle),
              }}
            >
              Without proper management, AI agents can fail in critical ways:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {whyPoints.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "24px 32px",
                    backgroundColor: colors.snow,
                    borderRadius: "16px",
                    borderLeft: `5px solid ${colors.redwood}`,
                    boxShadow: `0 4px 16px ${colors.espresso}06`,
                    textAlign: "left",
                    ...raindrop(showWhyPoints[i]),
                  }}
                >
                  <span style={{ fontSize: "32px" }}>{point.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: colors.redwood,
                        marginBottom: "4px",
                      }}
                    >
                      {point.problem}
                    </div>
                    <div style={{ fontSize: "16px", color: colors.cocoa }}>
                      {point.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: `${colors.redwood}10`,
                border: `2px solid ${colors.redwood}30`,
                borderRadius: "16px",
                padding: "24px 36px",
                ...raindrop(showWhyConclusion),
              }}
            >
              <span
                style={{
                  fontSize: "20px",
                  color: colors.redwood,
                  fontWeight: 500,
                }}
              >
                ⚠️ This frustrates customers and creates more work for your
                team.
              </span>
            </div>
          </div>
        )}

        {/* Phase 2: WHAT is Benchmark Testing? */}
        {phase === 2 && (
          <div
            style={{ width: "100%", maxWidth: "1000px", textAlign: "center" }}
          >
            <div style={raindrop(showWhatTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                The Solution
              </span>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                Benchmark Testing
              </h1>
            </div>

            <div
              style={{
                backgroundColor: colors.snow,
                borderRadius: "16px",
                padding: "28px 40px",
                marginTop: "24px",
                marginBottom: "32px",
                boxShadow: `0 4px 20px ${colors.espresso}06`,
                ...raindrop(showWhatDefinition),
              }}
            >
              <p
                style={{
                  fontSize: "24px",
                  color: colors.cocoa,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                A way to{" "}
                <strong style={{ color: colors.denim }}>
                  test if your AI gives correct answers
                </strong>
                <br />
                before customers see them.
              </p>
            </div>

            {/* Simple diagram */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "32px",
              }}
            >
              {whatDiagram.map((item, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    ...raindrop(showWhatDiagram[i]),
                  }}
                >
                  <div
                    style={{
                      backgroundColor: colors.snow,
                      borderRadius: "16px",
                      padding: "24px 20px",
                      border: `2px solid ${colors.denim}`,
                      boxShadow: `0 4px 16px ${colors.espresso}06`,
                    }}
                  >
                    <div style={{ fontSize: "44px", marginBottom: "12px" }}>
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: colors.espresso,
                        marginBottom: "6px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: "14px", color: colors.mocha }}>
                      {item.desc}
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-24px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "28px",
                        color: colors.tangerine,
                        zIndex: 1,
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: `${colors.olive}15`,
                border: `2px solid ${colors.olive}`,
                borderRadius: "16px",
                padding: "20px 32px",
                ...raindrop(showWhatSummary),
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: colors.olive,
                  fontWeight: 500,
                }}
              >
                ✓ If the AI's answer matches what it should be, the test passes.
              </span>
            </div>
          </div>
        )}

        {/* Phase 3: The Solution - AI Agent Management */}
        {phase === 3 && (
          <div
            style={{ width: "100%", maxWidth: "1100px", textAlign: "center" }}
          >
            <div style={raindrop(showSolutionTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                Our Approach
              </span>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  color: colors.tangerine,
                }}
              >
                AI Agent Management
              </h1>
            </div>

            <p
              style={{
                fontSize: "22px",
                color: colors.cocoa,
                marginTop: "16px",
                marginBottom: "40px",
                lineHeight: 1.5,
                ...raindrop(showSolutionText),
              }}
            >
              We continuously optimize the AI agent you already use,
              <br />
              with human oversight that protects quality, brand and customer
              trust.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {solutionBenefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "16px",
                    padding: "28px 20px",
                    boxShadow: `0 4px 20px ${colors.espresso}06`,
                    border: `2px solid ${colors.tangerine}`,
                    ...raindrop(showSolutionBenefits[i]),
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>
                    {benefit.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors.espresso,
                      marginBottom: "8px",
                    }}
                  >
                    {benefit.title}
                  </div>
                  <div style={{ fontSize: "14px", color: colors.mocha }}>
                    {benefit.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 4: The Flywheel */}
        {phase === 4 && (
          <div
            style={{ width: "100%", maxWidth: "1100px", textAlign: "center" }}
          >
            <div style={raindrop(showFlywheelTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                How It Works
              </span>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                The Improvement Cycle
              </h1>
            </div>

            <p
              style={{
                fontSize: "20px",
                color: colors.mocha,
                marginTop: "16px",
                marginBottom: "36px",
                ...raindrop(showFlywheelSubtitle),
              }}
            >
              A repeating process that makes your AI better every week.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {flywheelSteps.map((step, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor:
                      activeFlywheelStep === i ? step.color : colors.snow,
                    borderRadius: "16px",
                    padding: "24px 18px",
                    border: `3px solid ${step.color}`,
                    boxShadow:
                      activeFlywheelStep === i
                        ? `0 12px 32px ${step.color}40`
                        : `0 4px 16px ${colors.espresso}06`,
                    transform:
                      activeFlywheelStep === i
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    transition: "all 0.4s ease",
                    ...raindrop(showFlywheelSteps[i]),
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {step.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color:
                        activeFlywheelStep === i ? colors.snow : step.color,
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color:
                        activeFlywheelStep === i
                          ? "rgba(255,255,255,0.95)"
                          : colors.cocoa,
                      marginBottom: activeFlywheelStep === i ? "10px" : "0",
                    }}
                  >
                    {step.definition}
                  </div>
                  {activeFlywheelStep === i && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.8)",
                        borderTop: "1px solid rgba(255,255,255,0.3)",
                        paddingTop: "10px",
                        marginTop: "6px",
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                      {step.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={raindrop(showFlywheelLoop)}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  backgroundColor: colors.snow,
                  padding: "14px 28px",
                  borderRadius: "40px",
                  boxShadow: `0 4px 20px ${colors.espresso}10`,
                }}
              >
                <span style={{ fontSize: "24px" }}>🔄</span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: colors.espresso,
                  }}
                >
                  This cycle repeats to keep improving
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Phase 5: Step 1 - Create Benchmark */}
        {phase === 5 && (
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                ...raindrop(showStep1Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Step 1: Create Benchmark
              </span>
            </div>

            <div
              style={{
                backgroundColor: `${colors.tangerine}10`,
                borderRadius: "12px",
                padding: "18px 28px",
                marginBottom: "24px",
                textAlign: "center",
                ...raindrop(showStep1Definition),
              }}
            >
              <p style={{ fontSize: "18px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> Write down a question and the
                correct answer.
              </p>
            </div>

            <div
              style={{
                backgroundColor: colors.snow,
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "16px",
                borderLeft: `5px solid ${colors.tangerine}`,
                boxShadow: `0 4px 16px ${colors.espresso}06`,
                ...raindrop(showStep1Question),
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: colors.tangerine,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}
              >
                Customer Question
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: colors.espresso,
                }}
              >
                {question}
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.snow,
                borderRadius: "16px",
                padding: "28px",
                borderLeft: `5px solid ${colors.olive}`,
                boxShadow: `0 4px 16px ${colors.espresso}06`,
                ...raindrop(showStep1Answer),
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: colors.olive,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}
              >
                Correct Answer
              </div>
              <div
                style={{
                  fontSize: "20px",
                  lineHeight: 1.5,
                  color: colors.cocoa,
                }}
              >
                {expectedAnswer}
              </div>
            </div>
          </div>
        )}

        {/* Phase 6: Step 2 - Retrieve Knowledge */}
        {phase === 6 && (
          <div style={{ width: "100%", maxWidth: "900px" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                ...raindrop(showStep2Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Step 2: Retrieve Knowledge
              </span>
            </div>

            <div
              style={{
                backgroundColor: `${colors.denim}10`,
                borderRadius: "12px",
                padding: "18px 28px",
                marginBottom: "24px",
                textAlign: "center",
                ...raindrop(showStep2Definition),
              }}
            >
              <p style={{ fontSize: "18px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> The AI searches your knowledge
                base for relevant info.
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {knowledgeSnippets.map((snippet, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    backgroundColor: colors.snow,
                    borderRadius: "14px",
                    padding: "22px 26px",
                    borderLeft: `5px solid ${colors.denim}`,
                    boxShadow: `0 4px 16px ${colors.espresso}06`,
                    ...raindrop(showKnowledge[i]),
                  }}
                >
                  <div
                    style={{
                      fontSize: "26px",
                      fontWeight: 700,
                      color: colors.denim,
                      minWidth: "65px",
                      textAlign: "center",
                    }}
                  >
                    {snippet.relevance}%
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: 400,
                        color: colors.mocha,
                      }}
                    >
                      match
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        color: colors.denim,
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    >
                      {snippet.source}
                    </div>
                    <div style={{ fontSize: "16px", color: colors.cocoa }}>
                      {snippet.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 7: Step 3 - Generate Response */}
        {phase === 7 && (
          <div style={{ width: "100%", maxWidth: "1000px" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                ...raindrop(showStep3Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.salmon,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Step 3: Generate Response
              </span>
            </div>

            <div
              style={{
                backgroundColor: `${colors.salmon}15`,
                borderRadius: "12px",
                padding: "18px 28px",
                marginBottom: "24px",
                textAlign: "center",
                ...raindrop(showStep3Definition),
              }}
            >
              <p style={{ fontSize: "18px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> The AI creates an answer using
                the knowledge it found.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "16px",
                  padding: "26px",
                  borderLeft: `5px solid ${colors.olive}`,
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showStep3Expected),
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.olive,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "12px",
                    fontWeight: 600,
                  }}
                >
                  Correct Answer
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.6,
                    color: colors.cocoa,
                  }}
                >
                  {expectedAnswer}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "16px",
                  padding: "26px",
                  borderLeft: `5px solid ${colors.salmon}`,
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showStep3AI),
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.salmon,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "12px",
                    fontWeight: 600,
                  }}
                >
                  AI's Answer
                </div>
                <div
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.6,
                    color: colors.cocoa,
                    minHeight: "54px",
                  }}
                >
                  {streamedAiAnswer}
                  {streamedAiAnswer.length > 0 &&
                    streamedAiAnswer.length < aiAnswer.length && (
                      <span
                        style={{
                          color: colors.salmon,
                          animation: "blink 0.5s infinite",
                        }}
                      >
                        |
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 8: Step 4 - Calculate Score */}
        {phase === 8 && (
          <div style={{ width: "100%", maxWidth: "1000px" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                ...raindrop(showStep4Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: passed ? colors.olive : colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  transition: "background-color 0.4s",
                }}
              >
                {passed ? "✓ Test Passed!" : "Step 4: Calculate Score"}
              </span>
            </div>

            <div
              style={{
                backgroundColor: `${colors.tangerine}10`,
                borderRadius: "12px",
                padding: "18px 28px",
                marginBottom: "24px",
                textAlign: "center",
                ...raindrop(showStep4Definition),
              }}
            >
              <p style={{ fontSize: "18px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> Measure how accurate the AI's
                answer is.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "20px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "16px",
                  padding: "26px",
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showFaithfulness),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Faithfulness
                  </span>
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: colors.denim,
                    }}
                  >
                    {faithfulness.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.mocha,
                    marginBottom: "12px",
                  }}
                >
                  Is the answer factually correct?
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: colors.sand,
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${faithfulness * 100}%`,
                      backgroundColor: colors.denim,
                      borderRadius: "5px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "16px",
                  padding: "26px",
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showSimilarity),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Similarity
                  </span>
                  <span
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: colors.olive,
                    }}
                  >
                    {similarity.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.mocha,
                    marginBottom: "12px",
                  }}
                >
                  Does it mean the same thing?
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: colors.sand,
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${similarity * 100}%`,
                      backgroundColor: colors.olive,
                      borderRadius: "5px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px",
                  ...raindrop(showResult),
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: passed ? `${colors.olive}15` : colors.sand,
                    border: `4px solid ${passed ? colors.olive : colors.hazelnut}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    boxShadow: passed ? `0 8px 24px ${colors.olive}25` : "none",
                    transition: "all 0.4s ease",
                  }}
                >
                  {passed ? (
                    <svg
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.olive}
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        border: `4px solid ${colors.hazelnut}`,
                        borderTopColor: colors.tangerine,
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: passed ? colors.olive : colors.mocha,
                  }}
                >
                  {passed ? "PASSED" : "Checking..."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 9: Results */}
        {phase === 9 && (
          <div
            style={{ width: "100%", maxWidth: "1000px", textAlign: "center" }}
          >
            <div style={raindrop(showResultsTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 24px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "24px",
                }}
              >
                Our Results
              </span>
              <h1
                style={{
                  fontSize: "44px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                AI That Keeps Getting Better
              </h1>
            </div>

            <p
              style={{
                fontSize: "20px",
                color: colors.mocha,
                marginTop: "16px",
                marginBottom: "36px",
                ...raindrop(showResultsSubtitle),
              }}
            >
              Real results from our AI Agent Management service:
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "36px",
              }}
            >
              {resultMetrics.map((metric, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "20px",
                    padding: "32px 24px",
                    boxShadow: `0 4px 20px ${colors.espresso}06`,
                    border: `2px solid ${colors.olive}`,
                    ...raindrop(showResultsMetrics[i]),
                  }}
                >
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>
                    {metric.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "44px",
                      fontWeight: 700,
                      color: colors.olive,
                      marginBottom: "6px",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: colors.espresso,
                      marginBottom: "6px",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "14px", color: colors.mocha }}>
                    {metric.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={raindrop(showCTA)}>
              <p
                style={{
                  fontSize: "16px",
                  color: colors.mocha,
                  marginBottom: "20px",
                }}
              >
                Trusted by 750+ brands worldwide
              </p>
              <button
                onClick={resetDemo}
                style={{
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  border: "none",
                  padding: "16px 44px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: `0 8px 32px ${colors.tangerine}40`,
                }}
              >
                ↺ Watch Again
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "16px 48px",
          borderTop: `1px solid ${colors.hazelnut}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: colors.snow,
        }}
      >
        <span style={{ color: colors.mocha, fontSize: "14px" }}>
          Context Engine
        </span>
        <span style={{ color: colors.mocha, fontSize: "14px" }}>
          Analyze → Train → Test → Deploy
        </span>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(255,164,0,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 12px 48px rgba(255,164,0,0.5); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BenchmarkDemo;
