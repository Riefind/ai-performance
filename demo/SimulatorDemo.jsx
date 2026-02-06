import React, { useState, useRef } from "react";

const SimulatorDemo = () => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const [showUI, setShowUI] = useState(true); // Controls header and control panel visibility
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  // Phase 1: Intro
  const [showIntroTitle, setShowIntroTitle] = useState(false);
  const [showIntroSubtitle, setShowIntroSubtitle] = useState(false);
  const [showToolPreviews, setShowToolPreviews] = useState([
    false,
    false,
    false,
  ]);
  const [showIntroTagline, setShowIntroTagline] = useState(false);

  // Phase 2: Overview
  const [showOverviewTitle, setShowOverviewTitle] = useState(false);
  const [showOverviewSubtitle, setShowOverviewSubtitle] = useState(false);
  const [showToolCards, setShowToolCards] = useState([false, false, false]);

  // Phase 3: Sim Setup
  const [showSimSetupTitle, setShowSimSetupTitle] = useState(false);
  const [showSimSetupBigTitle, setShowSimSetupBigTitle] = useState(false);
  const [showSimCommand, setShowSimCommand] = useState(false);
  const [streamedSimCommand, setStreamedSimCommand] = useState("");
  const [showTestCase, setShowTestCase] = useState(false);
  const [showExpectedAnswer, setShowExpectedAnswer] = useState(false);
  const [streamedExpected, setStreamedExpected] = useState("");
  const [showContextSnippet, setShowContextSnippet] = useState(false);

  // Phase 4: Sim Results
  const [showSimResultsTitle, setShowSimResultsTitle] = useState(false);
  const [showSimResultsBigTitle, setShowSimResultsBigTitle] = useState(false);
  const [showExpectedCard, setShowExpectedCard] = useState(false);
  const [showAiResponseCard, setShowAiResponseCard] = useState(false);
  const [streamedAiResponse, setStreamedAiResponse] = useState("");
  const [showFaithfulness, setShowFaithfulness] = useState(false);
  const [showSimilarity, setShowSimilarity] = useState(false);
  const [faithfulness, setFaithfulness] = useState(0);
  const [similarity, setSimilarity] = useState(0);
  const [showSimPass, setShowSimPass] = useState(false);
  const [simPassed, setSimPassed] = useState(false);
  const [showSimExplanation, setShowSimExplanation] = useState(false);

  // Phase 5: Lint Input
  const [showLintTitle, setShowLintTitle] = useState(false);
  const [showLintBigTitle, setShowLintBigTitle] = useState(false);
  const [showLintCommand, setShowLintCommand] = useState(false);
  const [streamedLintCommand, setStreamedLintCommand] = useState("");
  const [showMarkdownBlock, setShowMarkdownBlock] = useState(false);
  const [showLintHighlights, setShowLintHighlights] = useState([
    false,
    false,
    false,
  ]);

  // Phase 6: Lint Results
  const [showLintResultsTitle, setShowLintResultsTitle] = useState(false);
  const [showLintItems, setShowLintItems] = useState([false, false, false]);
  const [showCorrectedMarkdown, setShowCorrectedMarkdown] = useState(false);
  const [showTokenSavings, setShowTokenSavings] = useState(false);
  const [tokenSavings, setTokenSavings] = useState(0);

  // Phase 7: Score
  const [showScoreTitle, setShowScoreTitle] = useState(false);
  const [showScoreBigTitle, setShowScoreBigTitle] = useState(false);
  const [showScoreCommand, setShowScoreCommand] = useState(false);
  const [streamedScoreCommand, setStreamedScoreCommand] = useState("");
  const [showContextBlock, setShowContextBlock] = useState(false);
  const [showCrispnessGauge, setShowCrispnessGauge] = useState(false);
  const [showEfficiencyGauge, setShowEfficiencyGauge] = useState(false);
  const [crispness, setCrispness] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [showOverallScore, setShowOverallScore] = useState(false);
  const [showWaste, setShowWaste] = useState(false);

  // Phase 8: Video Showcase
  const [showVideoTitle, setShowVideoTitle] = useState(false);
  const [showVideoSubtitle, setShowVideoSubtitle] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  // Phase 9: Summary
  const [showSummaryTitle, setShowSummaryTitle] = useState(false);
  const [showSummarySubtitle, setShowSummarySubtitle] = useState(false);
  const [showSummaryCards, setShowSummaryCards] = useState([
    false,
    false,
    false,
  ]);
  const [showReadyBadge, setShowReadyBadge] = useState(false);
  const [showFinalLogo, setShowFinalLogo] = useState(false);
  const [showFinalTagline, setShowFinalTagline] = useState(false);

  // Content Data
  const simCommand = "sim ai-services-sales";
  const testQuery = "How do I cancel my subscription?";
  const expectedAnswer =
    "Go to Account Settings, click Subscriptions, then Cancel. Your subscription will end at the current billing period.";
  const aiAnswer =
    "To cancel your subscription, navigate to Account Settings, select the Subscriptions tab, and click the Cancel button. Your access continues until your current billing cycle ends.";
  const lintCommand = "lint ai-services-sales";
  const scoreCommand = "score ai-services-sales";

  const toolPreviews = [
    { icon: "🧪", name: "sim", desc: "Benchmark Simulator" },
    { icon: "📝", name: "lint", desc: "Markdown Linter" },
    { icon: "📊", name: "score", desc: "Quality Evaluator" },
  ];

  const toolCards = [
    {
      icon: "🧪",
      command: "sim",
      title: "Benchmark Simulator",
      desc: "Automatically tests your AI agent against predefined question-answer pairs. Measures if responses are factually correct (faithfulness) and semantically similar to expected answers (similarity).",
      metric: "Pass/Fail with Scores",
      details: "Runs all test cases in benchmarks.yaml",
    },
    {
      icon: "📝",
      command: "lint",
      title: "Markdown Linter",
      desc: "Analyzes your agent's knowledge files and instructions for formatting issues. Ensures consistent markdown structure and identifies wasteful formatting that costs extra tokens.",
      metric: "Errors & Warnings",
      details: "Checks all .md files in agent folder",
    },
    {
      icon: "📊",
      command: "score",
      title: "Context Quality Evaluator",
      desc: "Grades your agent's context files on a 0-10 scale. Evaluates crispness (no redundancy, atomic sentences) and token efficiency (maximum information per token).",
      metric: "Quality Score 0-10",
      details: "AI-powered context analysis",
    },
  ];

  const lintIssues = [
    {
      type: "error",
      icon: "❌",
      message: "Incorrect indentation: 3 spaces at line 5",
      detail:
        "Markdown lists require exactly 2-space indentation. Using 3 or 4 spaces wastes tokens and can cause parsing issues.",
    },
    {
      type: "warning",
      icon: "⚠️",
      message: "Bold formatting detected: **Important**",
      detail:
        "Bold and italic text are visual cues for humans. AI agents ignore formatting - these characters waste tokens without adding value.",
    },
    {
      type: "info",
      icon: "ℹ️",
      message: "Empty line gap found in list at line 8",
      detail:
        "Blank lines between list items break the list structure and add unnecessary whitespace tokens.",
    },
  ];

  const contextSample = `## Return Policy

Customers may return any item within 30 days of the original purchase date.
A restocking fee of $5 will be deducted from the refund amount.
Items must be returned in original, unopened packaging.
Refunds are processed within 3-5 business days after we receive the return.
Damaged or used items are not eligible for return.`;

  const summaryResults = [
    {
      tool: "sim",
      icon: "🧪",
      label: "Benchmark Test",
      result: "PASSED",
      detail: "Faithfulness: 0.92 | Similarity: 0.85",
      color: "#587322",
    },
    {
      tool: "lint",
      icon: "📝",
      label: "Markdown Quality",
      result: "0 Errors",
      detail: "All formatting issues resolved",
      color: "#547099",
    },
    {
      tool: "score",
      icon: "📊",
      label: "Context Score",
      result: "7.85 / 10",
      detail: "Excellent quality rating",
      color: "#FFA400",
    },
  ];

  const demoVideos = [
    {
      key: "sim",
      label: "Simulation",
      icon: "🧪",
      embed: "https://streamable.com/e/05d5b7",
    },
    {
      key: "lint",
      label: "Lint",
      icon: "🔍",
      embed: "https://streamable.com/e/irbotm",
    },
    {
      key: "score",
      label: "Score",
      icon: "📊",
      embed: "https://streamable.com/e/s6yi1a",
    },
    {
      key: "report",
      label: "Generate Report",
      icon: "📋",
      embed: "https://streamable.com/e/edf53q",
    },
  ];

  // Colors (1.4x scaled demo)
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
    terminal: "#1E1E1E",
    syntax: "#D4D4D4",
  };

  // Animation helpers (scaled for video)
  const raindrop = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(-40px)",
    transition: `all 0.7s ease ${delay}s`,
  });

  const streamText = (text, setter, speed = 40) => {
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

  const animateScore = (target, setter, duration = 1800) => {
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

  const wait = (ms) =>
    new Promise((resolve) => {
      const checkPause = () => {
        if (pausedRef.current) {
          setTimeout(checkPause, 100);
        } else {
          setTimeout(resolve, ms / speedRef.current);
        }
      };
      checkPause();
    });

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(!paused);
  };

  const changeSpeed = (newSpeed) => {
    speedRef.current = newSpeed;
    setSpeed(newSpeed);
  };

  const goToPreviousPhase = () => {
    if (phase > 1) {
      const prevPhase = phase - 1;
      goToPhase(prevPhase);
    }
  };

  const skipToNextPhase = () => {
    if (phase < 9) {
      const nextPhase = phase + 1;
      goToPhase(nextPhase);
    }
  };

  const goToPhase = (targetPhase) => {
    // Reset all phase states first
    setShowIntroTitle(false);
    setShowIntroSubtitle(false);
    setShowToolPreviews([false, false, false]);
    setShowIntroTagline(false);
    setShowOverviewTitle(false);
    setShowOverviewSubtitle(false);
    setShowToolCards([false, false, false]);
    setShowSimSetupTitle(false);
    setShowSimSetupBigTitle(false);
    setShowSimCommand(false);
    setStreamedSimCommand("");
    setShowTestCase(false);
    setShowExpectedAnswer(false);
    setStreamedExpected("");
    setShowContextSnippet(false);
    setShowSimResultsTitle(false);
    setShowSimResultsBigTitle(false);
    setShowExpectedCard(false);
    setShowAiResponseCard(false);
    setStreamedAiResponse("");
    setShowFaithfulness(false);
    setShowSimilarity(false);
    setFaithfulness(0);
    setSimilarity(0);
    setShowSimPass(false);
    setSimPassed(false);
    setShowSimExplanation(false);
    setShowLintTitle(false);
    setShowLintBigTitle(false);
    setShowLintCommand(false);
    setStreamedLintCommand("");
    setShowMarkdownBlock(false);
    setShowLintHighlights([false, false, false]);
    setShowLintResultsTitle(false);
    setShowLintItems([false, false, false]);
    setShowCorrectedMarkdown(false);
    setShowTokenSavings(false);
    setTokenSavings(0);
    setShowScoreTitle(false);
    setShowScoreBigTitle(false);
    setShowScoreCommand(false);
    setStreamedScoreCommand("");
    setShowContextBlock(false);
    setShowCrispnessGauge(false);
    setShowEfficiencyGauge(false);
    setCrispness(0);
    setEfficiency(0);
    setShowOverallScore(false);
    setShowWaste(false);
    setShowVideoTitle(false);
    setShowVideoSubtitle(false);
    setShowVideoPlayer(false);
    setActiveVideoIndex(null);
    setShowSummaryTitle(false);
    setShowSummarySubtitle(false);
    setShowSummaryCards([false, false, false]);
    setShowReadyBadge(false);
    setShowFinalLogo(false);
    setShowFinalTagline(false);

    // Show all elements for target phase
    if (targetPhase === 1) {
      setShowIntroTitle(true);
      setShowIntroSubtitle(true);
      setShowToolPreviews([true, true, true]);
      setShowIntroTagline(true);
    } else if (targetPhase === 2) {
      setShowOverviewTitle(true);
      setShowOverviewSubtitle(true);
      setShowToolCards([true, true, true]);
    } else if (targetPhase === 3) {
      setShowSimSetupTitle(true);
      setShowSimSetupBigTitle(true);
      setShowSimCommand(true);
      setStreamedSimCommand(simCommand);
      setShowTestCase(true);
      setShowExpectedAnswer(true);
      setStreamedExpected(expectedAnswer);
      setShowContextSnippet(true);
    } else if (targetPhase === 4) {
      setShowSimResultsTitle(true);
      setShowSimResultsBigTitle(true);
      setShowExpectedCard(true);
      setShowAiResponseCard(true);
      setStreamedAiResponse(aiAnswer);
      setShowFaithfulness(true);
      setShowSimilarity(true);
      setFaithfulness(0.92);
      setSimilarity(0.85);
      setShowSimPass(true);
      setSimPassed(true);
      setShowSimExplanation(true);
    } else if (targetPhase === 5) {
      setShowLintTitle(true);
      setShowLintBigTitle(true);
      setShowLintCommand(true);
      setStreamedLintCommand(lintCommand);
      setShowMarkdownBlock(true);
      setShowLintHighlights([true, true, true]);
    } else if (targetPhase === 6) {
      setShowLintResultsTitle(true);
      setShowLintItems([true, true, true]);
      setShowCorrectedMarkdown(true);
      setShowTokenSavings(true);
      setTokenSavings(15);
    } else if (targetPhase === 7) {
      setShowScoreTitle(true);
      setShowScoreBigTitle(true);
      setShowScoreCommand(true);
      setStreamedScoreCommand(scoreCommand);
      setShowContextBlock(true);
      setShowCrispnessGauge(true);
      setShowEfficiencyGauge(true);
      setCrispness(7.5);
      setEfficiency(8.2);
      setShowOverallScore(true);
      setShowWaste(true);
    } else if (targetPhase === 8) {
      setShowVideoTitle(true);
      setShowVideoSubtitle(true);
      setShowVideoPlayer(true);
    } else if (targetPhase === 9) {
      setShowSummaryTitle(true);
      setShowSummarySubtitle(true);
      setShowSummaryCards([true, true, true]);
      setShowReadyBadge(true);
      setShowFinalLogo(true);
      setShowFinalTagline(true);
    }

    setPhase(targetPhase);
  };

  const resetDemo = () => {
    setStarted(false);
    setPhase(0);
    // Reset all states
    setShowIntroTitle(false);
    setShowIntroSubtitle(false);
    setShowToolPreviews([false, false, false]);
    setShowIntroTagline(false);
    setShowOverviewTitle(false);
    setShowOverviewSubtitle(false);
    setShowToolCards([false, false, false]);
    setShowSimSetupTitle(false);
    setShowSimSetupBigTitle(false);
    setShowSimCommand(false);
    setStreamedSimCommand("");
    setShowTestCase(false);
    setShowExpectedAnswer(false);
    setStreamedExpected("");
    setShowContextSnippet(false);
    setShowSimResultsTitle(false);
    setShowSimResultsBigTitle(false);
    setShowExpectedCard(false);
    setShowAiResponseCard(false);
    setStreamedAiResponse("");
    setShowFaithfulness(false);
    setShowSimilarity(false);
    setFaithfulness(0);
    setSimilarity(0);
    setShowSimPass(false);
    setSimPassed(false);
    setShowSimExplanation(false);
    setShowLintTitle(false);
    setShowLintBigTitle(false);
    setShowLintCommand(false);
    setStreamedLintCommand("");
    setShowMarkdownBlock(false);
    setShowLintHighlights([false, false, false]);
    setShowLintResultsTitle(false);
    setShowLintItems([false, false, false]);
    setShowCorrectedMarkdown(false);
    setShowTokenSavings(false);
    setTokenSavings(0);
    setShowScoreTitle(false);
    setShowScoreBigTitle(false);
    setShowScoreCommand(false);
    setStreamedScoreCommand("");
    setShowContextBlock(false);
    setShowCrispnessGauge(false);
    setShowEfficiencyGauge(false);
    setCrispness(0);
    setEfficiency(0);
    setShowOverallScore(false);
    setShowWaste(false);
    setShowVideoTitle(false);
    setShowVideoSubtitle(false);
    setShowVideoPlayer(false);
    setActiveVideoIndex(null);
    setShowSummaryTitle(false);
    setShowSummarySubtitle(false);
    setShowSummaryCards([false, false, false]);
    setShowReadyBadge(false);
    setShowFinalLogo(false);
    setShowFinalTagline(false);
  };

  const startManualDemo = () => {
    setStarted(true);
    goToPhase(1);
  };

  const startAutoplay = () => {
    resetDemo();
    pausedRef.current = false;
    setPaused(false);
    speedRef.current = 0.5;
    setSpeed(0.5);
    setShowUI(false);
    setIsAutoplaying(true);
    setTimeout(() => {
      runFullDemo();
    }, 100);
  };

  const stopAutoplay = () => {
    setIsAutoplaying(false);
    pausedRef.current = true;
    setPaused(true);
    setShowUI(true);
  };

  const runFullDemo = async () => {
    setStarted(true);

    // === PHASE 1: Intro ===
    setPhase(1);
    await wait(500);
    setShowIntroTitle(true);
    await wait(700);
    setShowIntroSubtitle(true);
    await wait(600);

    for (let i = 0; i < 3; i++) {
      setShowToolPreviews((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(400);
    }

    await wait(500);
    setShowIntroTagline(true);
    await wait(2500);

    // === PHASE 2: Overview ===
    setPhase(2);
    await wait(500);
    setShowOverviewTitle(true);
    await wait(600);
    setShowOverviewSubtitle(true);
    await wait(700);

    for (let i = 0; i < 3; i++) {
      setShowToolCards((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }
    await wait(2500);

    // === PHASE 3: Sim Setup ===
    setPhase(3);
    await wait(500);
    setShowSimSetupTitle(true);
    await wait(400);
    setShowSimSetupBigTitle(true);
    await wait(500);
    setShowSimCommand(true);
    await wait(300);
    await streamText(simCommand, setStreamedSimCommand, 50);
    await wait(600);
    setShowTestCase(true);
    await wait(500);
    setShowExpectedAnswer(true);
    await wait(300);
    await streamText(expectedAnswer, setStreamedExpected, 35);
    await wait(500);
    setShowContextSnippet(true);
    await wait(2000);

    // === PHASE 4: Sim Results ===
    setPhase(4);
    await wait(500);
    setShowSimResultsTitle(true);
    await wait(400);
    setShowSimResultsBigTitle(true);
    await wait(500);
    setShowExpectedCard(true);
    await wait(500);
    setShowAiResponseCard(true);
    await wait(400);
    await streamText(aiAnswer, setStreamedAiResponse, 30);
    await wait(600);
    setShowFaithfulness(true);
    await wait(400);
    setShowSimilarity(true);
    await wait(400);

    await Promise.all([
      animateScore(0.92, setFaithfulness, 1800),
      animateScore(0.85, setSimilarity, 1800),
    ]);

    await wait(500);
    setShowSimPass(true);
    await wait(400);
    setSimPassed(true);
    await wait(600);
    setShowSimExplanation(true);
    await wait(2500);

    // === PHASE 5: Lint Input ===
    setPhase(5);
    await wait(500);
    setShowLintTitle(true);
    await wait(400);
    setShowLintBigTitle(true);
    await wait(500);
    setShowLintCommand(true);
    await wait(300);
    await streamText(lintCommand, setStreamedLintCommand, 50);
    await wait(600);
    setShowMarkdownBlock(true);
    await wait(800);

    for (let i = 0; i < 3; i++) {
      setShowLintHighlights((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(600);
    }
    await wait(2000);

    // === PHASE 6: Lint Results ===
    setPhase(6);
    await wait(500);
    setShowLintResultsTitle(true);
    await wait(600);

    for (let i = 0; i < 3; i++) {
      setShowLintItems((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }

    await wait(600);
    setShowCorrectedMarkdown(true);
    await wait(600);
    setShowTokenSavings(true);
    await animateScore(15, setTokenSavings, 1200);
    await wait(2000);

    // === PHASE 7: Score ===
    setPhase(7);
    await wait(500);
    setShowScoreTitle(true);
    await wait(400);
    setShowScoreBigTitle(true);
    await wait(500);
    setShowScoreCommand(true);
    await wait(300);
    await streamText(scoreCommand, setStreamedScoreCommand, 50);
    await wait(600);
    setShowContextBlock(true);
    await wait(800);
    setShowCrispnessGauge(true);
    await wait(400);
    setShowEfficiencyGauge(true);
    await wait(400);

    await Promise.all([
      animateScore(7.5, setCrispness, 2000),
      animateScore(8.2, setEfficiency, 2000),
    ]);

    await wait(500);
    setShowOverallScore(true);
    await wait(500);
    setShowWaste(true);
    await wait(2500);

    // === PHASE 8: Video Showcase ===
    setPhase(8);
    await wait(500);
    setShowVideoTitle(true);
    await wait(600);
    setShowVideoSubtitle(true);
    await wait(700);
    setShowVideoPlayer(true);
    await wait(500);

    // Auto-play videos sequentially inline
    // Auto-play each video for 15 seconds
    for (let vi = 0; vi < demoVideos.length; vi++) {
      setActiveVideoIndex(vi);
      await wait(15000);
    }
    setActiveVideoIndex(null);

    // === PHASE 9: Summary ===
    setPhase(9);
    await wait(500);
    setShowSummaryTitle(true);
    await wait(600);
    setShowSummarySubtitle(true);
    await wait(700);

    for (let i = 0; i < 3; i++) {
      setShowSummaryCards((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }

    await wait(600);
    setShowReadyBadge(true);
    await wait(800);
    setShowFinalLogo(true);
    await wait(600);
    setShowFinalTagline(true);
    await wait(2500);
  };

  // Typing cursor component
  const TypingCursor = ({ show }) =>
    show ? (
      <span
        style={{
          color: colors.tangerine,
          animation: "blink 0.5s infinite",
          marginLeft: "2px",
        }}
      >
        |
      </span>
    ) : null;

  // Big step title component
  const BigStepTitle = ({ title, color, show }) => (
    <div
      style={{
        textAlign: "center",
        marginBottom: "24px",
        ...raindrop(show),
      }}
    >
      <h1
        style={{
          fontSize: "72px",
          fontWeight: 800,
          color: color,
          margin: 0,
          letterSpacing: "-1px",
        }}
      >
        {title}
      </h1>
    </div>
  );

  // Code block component
  const CodeBlock = ({ code, show, isTyping = false, fullText = "" }) => (
    <div
      style={{
        backgroundColor: colors.terminal,
        borderRadius: "20px",
        padding: "32px 44px",
        fontFamily: "'Fira Code', 'Monaco', monospace",
        fontSize: "28px",
        color: colors.syntax,
        boxShadow: `0 8px 32px ${colors.espresso}15`,
        ...raindrop(show),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ color: colors.olive }}>$</span>
        <span>
          {code}
          <TypingCursor show={isTyping && code.length < fullText.length} />
        </span>
      </div>
    </div>
  );

  // Handle Enter key to start demo (manual mode)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !started) {
        startManualDemo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started]);

  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.bone} 100%)`,
        fontFamily: "Inter, system-ui, sans-serif",
        color: colors.espresso,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header - conditionally shown */}
      {showUI && (
        <header
          style={{
            padding: "16px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${colors.hazelnut}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src="/demo/images/logo.png"
              alt="Influx"
              style={{ height: "44px", width: "auto", cursor: "pointer" }}
              onClick={() =>
                window.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "Escape" }),
                )
              }
            />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 40px 40px",
          maxWidth: "1800px",
          margin: "0 auto",
          width: "100%",
          zoom: 0.75,
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Start Screen */}
        {!started && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div
              style={{
                width: "140px",
                height: "140px",
                margin: "0 auto 48px",
                borderRadius: "50%",
                backgroundColor: colors.snow,
                border: `4px solid ${colors.tangerine}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 8px 40px ${colors.tangerine}30`,
                animation: "pulse 2s infinite",
                cursor: "pointer",
              }}
              onClick={startManualDemo}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill={colors.tangerine}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "78px",
                fontWeight: 700,
                marginBottom: "24px",
                color: colors.espresso,
              }}
            >
              Influx AI Agent Simulator
            </h1>
            <p
              style={{
                fontSize: "36px",
                color: colors.mocha,
                marginBottom: "56px",
              }}
            >
              Client-side evaluation tools for AI agent performance
            </p>
            <button
              onClick={startManualDemo}
              style={{
                backgroundColor: colors.tangerine,
                color: colors.snow,
                border: "none",
                padding: "28px 80px",
                borderRadius: "18px",
                fontSize: "30px",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: `0 8px 40px ${colors.tangerine}40`,
              }}
            >
              Start Demo →
            </button>
          </div>
        )}

        {/* Phase 1: Intro */}
        {phase === 1 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showIntroTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "30px",
                  fontSize: "22px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "36px",
                }}
              >
                Client-Side Evaluation Tools
              </span>
              <h1
                style={{
                  fontSize: "78px",
                  fontWeight: 700,
                  color: colors.espresso,
                  marginBottom: "0",
                }}
              >
                Influx AI Agent Simulator
              </h1>
            </div>

            <p
              style={{
                fontSize: "32px",
                color: colors.mocha,
                marginTop: "28px",
                marginBottom: "20px",
                lineHeight: 1.5,
                ...raindrop(showIntroSubtitle),
              }}
            >
              A suite of command-line tools that help you test, validate, and
              improve
              <br />
              your AI agent's responses before deploying to production.
            </p>

            <p
              style={{
                fontSize: "24px",
                color: colors.cocoa,
                marginBottom: "48px",
                ...raindrop(showIntroSubtitle, 0.2),
              }}
            >
              Run these tools locally to catch issues early and ensure
              consistent, high-quality AI responses.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginBottom: "48px",
              }}
            >
              {toolPreviews.map((tool, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "24px",
                    padding: "44px 52px",
                    boxShadow: `0 8px 32px ${colors.espresso}08`,
                    border: `2px solid ${colors.hazelnut}`,
                    minWidth: "240px",
                    ...raindrop(showToolPreviews[i]),
                  }}
                >
                  <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                    {tool.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: colors.tangerine,
                      fontFamily: "'Fira Code', monospace",
                    }}
                  >
                    {tool.name}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      color: colors.mocha,
                      marginTop: "12px",
                    }}
                  >
                    {tool.desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: `${colors.olive}15`,
                border: `2px solid ${colors.olive}`,
                borderRadius: "20px",
                padding: "32px 56px",
                ...raindrop(showIntroTagline),
              }}
            >
              <span
                style={{
                  fontSize: "26px",
                  color: colors.olive,
                  fontWeight: 600,
                }}
              >
                Validate AI quality before your customers see it.
                <br />
                <span style={{ fontWeight: 400, fontSize: "22px" }}>
                  Test responses. Lint markdown. Score context quality.
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Phase 2: Overview */}
        {phase === 2 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1700px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showOverviewTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "30px",
                  fontSize: "22px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "36px",
                }}
              >
                Tool Overview
              </span>
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                Three Tools for AI Quality Assurance
              </h1>
            </div>

            <p
              style={{
                fontSize: "28px",
                color: colors.mocha,
                marginTop: "24px",
                marginBottom: "16px",
                lineHeight: 1.5,
                ...raindrop(showOverviewSubtitle),
              }}
            >
              Each tool addresses a different aspect of AI agent quality.
              <br />
              Run them individually or together as part of your development
              workflow.
            </p>

            <p
              style={{
                fontSize: "22px",
                color: colors.cocoa,
                marginBottom: "48px",
                ...raindrop(showOverviewSubtitle, 0.15),
              }}
            >
              All tools run locally using the command line — no cloud services
              required.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "36px",
              }}
            >
              {toolCards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "24px",
                    padding: "44px 36px",
                    boxShadow: `0 8px 32px ${colors.espresso}08`,
                    border: `3px solid ${colors.hazelnut}`,
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    ...raindrop(showToolCards[i]),
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <span style={{ fontSize: "52px" }}>{card.icon}</span>
                    <div>
                      <div
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: colors.tangerine,
                          fontFamily: "'Fira Code', monospace",
                        }}
                      >
                        {card.command}
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 600,
                          color: colors.espresso,
                        }}
                      >
                        {card.title}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "20px",
                      color: colors.cocoa,
                      lineHeight: 1.6,
                      marginBottom: "20px",
                      flex: 1,
                    }}
                  >
                    {card.desc}
                  </p>
                  <div
                    style={{
                      backgroundColor: colors.sand,
                      borderRadius: "12px",
                      padding: "16px 20px",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        color: colors.mocha,
                        marginBottom: "4px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      Output
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 600,
                        color: colors.espresso,
                      }}
                    >
                      {card.metric}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: colors.mocha,
                      fontStyle: "italic",
                    }}
                  >
                    {card.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: Sim Setup */}
        {phase === 3 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
                ...raindrop(showSimSetupTitle),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Tool 1: Benchmark Simulator
              </span>
            </div>

            <BigStepTitle
              title="sim - Test AI Responses"
              color={colors.olive}
              show={showSimSetupBigTitle}
            />

            <p
              style={{
                textAlign: "center",
                fontSize: "24px",
                color: colors.cocoa,
                marginBottom: "32px",
                lineHeight: 1.5,
                ...raindrop(showSimSetupBigTitle, 0.1),
              }}
            >
              The simulator runs your AI agent against predefined test cases
              from{" "}
              <code
                style={{
                  backgroundColor: colors.sand,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                benchmarks.yaml
              </code>
              .
              <br />
              Each test case has a question and an expected answer that the AI's
              response is compared against.
            </p>

            <CodeBlock
              code={streamedSimCommand}
              show={showSimCommand}
              isTyping={true}
              fullText={simCommand}
            />

            <div
              style={{
                marginTop: "36px",
                backgroundColor: colors.snow,
                borderRadius: "24px",
                padding: "40px",
                borderLeft: `8px solid ${colors.olive}`,
                boxShadow: `0 8px 32px ${colors.espresso}08`,
                ...raindrop(showTestCase),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.olive,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontWeight: 600,
                  }}
                >
                  Test Case: Customer Question
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.mocha,
                    backgroundColor: colors.sand,
                    padding: "6px 14px",
                    borderRadius: "12px",
                  }}
                >
                  From benchmarks.yaml
                </div>
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 600,
                  color: colors.espresso,
                }}
              >
                "{testQuery}"
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: colors.mocha,
                  marginTop: "12px",
                }}
              >
                This simulates a real customer asking about subscription
                cancellation.
              </div>
            </div>

            <div
              style={{
                marginTop: "28px",
                backgroundColor: colors.snow,
                borderRadius: "24px",
                padding: "40px",
                borderLeft: `8px solid ${colors.denim}`,
                boxShadow: `0 8px 32px ${colors.espresso}08`,
                ...raindrop(showExpectedAnswer),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.denim,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontWeight: 600,
                  }}
                >
                  Expected Answer (Gold Standard)
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.mocha,
                    backgroundColor: colors.sand,
                    padding: "6px 14px",
                    borderRadius: "12px",
                  }}
                >
                  Human-verified correct response
                </div>
              </div>
              <div
                style={{
                  fontSize: "26px",
                  color: colors.cocoa,
                  lineHeight: 1.5,
                }}
              >
                {streamedExpected}
                <TypingCursor
                  show={
                    streamedExpected.length > 0 &&
                    streamedExpected.length < expectedAnswer.length
                  }
                />
              </div>
              <div
                style={{
                  fontSize: "18px",
                  color: colors.mocha,
                  marginTop: "16px",
                }}
              >
                The AI's response will be compared against this expected answer
                for accuracy and meaning.
              </div>
            </div>

            <div
              style={{
                marginTop: "28px",
                backgroundColor: `${colors.denim}10`,
                borderRadius: "20px",
                padding: "28px 36px",
                ...raindrop(showContextSnippet),
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "32px" }}>📚</span>
                <div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: colors.denim,
                      fontWeight: 600,
                      marginBottom: "4px",
                    }}
                  >
                    Knowledge Context Loaded
                  </div>
                  <div style={{ fontSize: "16px", color: colors.cocoa }}>
                    The AI will use{" "}
                    <code
                      style={{
                        backgroundColor: colors.snow,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontFamily: "'Fira Code', monospace",
                      }}
                    >
                      knowledge/policies/subscriptions.md
                    </code>{" "}
                    to generate its response. This ensures the AI has access to
                    the correct information.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Sim Results */}
        {phase === 4 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              animation: "fadeIn 0.5s ease",
              zoom: 0.85,
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
                ...raindrop(showSimResultsTitle),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  backgroundColor: simPassed ? colors.olive : colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  transition: "background-color 0.4s",
                }}
              >
                {simPassed ? "✓ Test Passed!" : "Evaluating..."}
              </span>
            </div>

            <BigStepTitle
              title="Benchmark Results"
              color={simPassed ? colors.olive : colors.tangerine}
              show={showSimResultsBigTitle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "32px",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "36px",
                  borderLeft: `8px solid ${colors.denim}`,
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showExpectedCard),
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.denim,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "16px",
                    fontWeight: 600,
                  }}
                >
                  Expected Answer
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    color: colors.cocoa,
                    lineHeight: 1.5,
                  }}
                >
                  {expectedAnswer}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "36px",
                  borderLeft: `8px solid ${colors.salmon}`,
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showAiResponseCard),
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.salmon,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "16px",
                    fontWeight: 600,
                  }}
                >
                  AI Response
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    color: colors.cocoa,
                    lineHeight: 1.5,
                    minHeight: "80px",
                  }}
                >
                  {streamedAiResponse}
                  <TypingCursor
                    show={
                      streamedAiResponse.length > 0 &&
                      streamedAiResponse.length < aiAnswer.length
                    }
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "32px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "36px",
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showFaithfulness),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Faithfulness
                  </span>
                  <span
                    style={{
                      fontSize: "52px",
                      fontWeight: 700,
                      color: colors.denim,
                    }}
                  >
                    {faithfulness.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: colors.mocha,
                    marginBottom: "16px",
                  }}
                >
                  Is the answer factually correct?
                </div>
                <div
                  style={{
                    height: "16px",
                    backgroundColor: colors.sand,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${faithfulness * 100}%`,
                      backgroundColor: colors.denim,
                      borderRadius: "8px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginTop: "12px",
                    textAlign: "right",
                  }}
                >
                  Target: ≥0.90
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "36px",
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showSimilarity),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Similarity
                  </span>
                  <span
                    style={{
                      fontSize: "52px",
                      fontWeight: 700,
                      color: colors.olive,
                    }}
                  >
                    {similarity.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: colors.mocha,
                    marginBottom: "16px",
                  }}
                >
                  Does it mean the same thing?
                </div>
                <div
                  style={{
                    height: "16px",
                    backgroundColor: colors.sand,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${similarity * 100}%`,
                      backgroundColor: colors.olive,
                      borderRadius: "8px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginTop: "12px",
                    textAlign: "right",
                  }}
                >
                  Target: ≥0.70
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "36px",
                  ...raindrop(showSimPass),
                }}
              >
                <div
                  style={{
                    width: "140px",
                    height: "140px",
                    borderRadius: "50%",
                    backgroundColor: simPassed
                      ? `${colors.olive}15`
                      : colors.sand,
                    border: `4px solid ${simPassed ? colors.olive : colors.hazelnut}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    boxShadow: simPassed
                      ? `0 8px 32px ${colors.olive}25`
                      : "none",
                    transition: "all 0.4s ease",
                  }}
                >
                  {simPassed ? (
                    <svg
                      width="70"
                      height="70"
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
                        width: "50px",
                        height: "50px",
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
                    fontSize: "32px",
                    fontWeight: 700,
                    color: simPassed ? colors.olive : colors.mocha,
                  }}
                >
                  {simPassed ? "PASSED" : "Checking..."}
                </div>
              </div>
            </div>

            {showSimExplanation && (
              <div
                style={{
                  marginTop: "32px",
                  backgroundColor: `${colors.olive}10`,
                  border: `2px solid ${colors.olive}`,
                  borderRadius: "24px",
                  padding: "32px 44px",
                  animation: "fadeIn 0.5s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "24px",
                  }}
                >
                  <span style={{ fontSize: "44px" }}>✅</span>
                  <div>
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: 700,
                        color: colors.olive,
                        marginBottom: "12px",
                      }}
                    >
                      Why This Test Passed
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        color: colors.cocoa,
                        lineHeight: 1.7,
                      }}
                    >
                      <strong>
                        Both metrics exceeded their minimum thresholds:
                      </strong>
                      <div style={{ marginTop: "16px", paddingLeft: "24px" }}>
                        <div style={{ marginBottom: "12px" }}>
                          •{" "}
                          <strong style={{ color: colors.denim }}>
                            Faithfulness (0.92)
                          </strong>{" "}
                          ≥ 0.90 threshold
                          <div
                            style={{
                              paddingLeft: "20px",
                              fontSize: "18px",
                              color: colors.mocha,
                              marginTop: "4px",
                            }}
                          >
                            The AI's response is factually accurate and doesn't
                            contradict the knowledge base. All claims can be
                            verified against the source documents.
                          </div>
                        </div>
                        <div>
                          •{" "}
                          <strong style={{ color: colors.olive }}>
                            Similarity (0.85)
                          </strong>{" "}
                          ≥ 0.70 threshold
                          <div
                            style={{
                              paddingLeft: "20px",
                              fontSize: "18px",
                              color: colors.mocha,
                              marginTop: "4px",
                            }}
                          >
                            The AI's response conveys the same meaning as the
                            expected answer, even though the exact wording
                            differs. Semantic similarity is measured using
                            embeddings.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase 5: Lint Input */}
        {phase === 5 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
                ...raindrop(showLintTitle),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Tool 2: Markdown Linter
              </span>
            </div>

            <BigStepTitle
              title="lint - Validate Formatting"
              color={colors.denim}
              show={showLintBigTitle}
            />

            <p
              style={{
                textAlign: "center",
                fontSize: "24px",
                color: colors.cocoa,
                marginBottom: "32px",
                lineHeight: 1.5,
                ...raindrop(showLintBigTitle, 0.1),
              }}
            >
              The linter scans your agent's markdown files for formatting issues
              that waste tokens.
            </p>

            <CodeBlock
              code={streamedLintCommand}
              show={showLintCommand}
              isTyping={true}
              fullText={lintCommand}
            />

            <div
              style={{
                marginTop: "36px",
                backgroundColor: colors.terminal,
                borderRadius: "24px",
                padding: "40px",
                fontFamily: "'Fira Code', monospace",
                fontSize: "22px",
                color: colors.syntax,
                boxShadow: `0 8px 32px ${colors.espresso}15`,
                ...raindrop(showMarkdownBlock),
              }}
            >
              <div
                style={{
                  color: colors.mocha,
                  marginBottom: "20px",
                  fontSize: "18px",
                }}
              >
                # instructions.md
              </div>
              <pre style={{ margin: 0, lineHeight: 1.8 }}>
                <span style={{ color: "#569CD6" }}># Return Policy</span>
                {"\n\n"}
                <span
                  style={{
                    backgroundColor: showLintHighlights[1]
                      ? `${colors.tangerine}30`
                      : "transparent",
                    padding: showLintHighlights[1] ? "2px 4px" : 0,
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  }}
                >
                  **Important**
                </span>
                : Returns accepted within 30 days.{"\n\n"}
                <span
                  style={{
                    backgroundColor: showLintHighlights[0]
                      ? `${colors.redwood}30`
                      : "transparent",
                    padding: showLintHighlights[0] ? "2px 4px" : 0,
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {"   "}- First item
                </span>
                {"\n"}
                {"  "}- Second item{"\n"}
                <span
                  style={{
                    backgroundColor: showLintHighlights[2]
                      ? `${colors.denim}30`
                      : "transparent",
                    padding: showLintHighlights[2] ? "2px 4px" : 0,
                    borderRadius: "4px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {"\n"}
                </span>
                {"\n"}
                <span style={{ color: "#569CD6" }}>## Contact</span>
              </pre>
            </div>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {showLintHighlights[0] && (
                <span
                  style={{
                    backgroundColor: `${colors.redwood}20`,
                    color: colors.redwood,
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: 500,
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  ❌ Error: Wrong indentation (3 spaces instead of 2)
                </span>
              )}
              {showLintHighlights[1] && (
                <span
                  style={{
                    backgroundColor: `${colors.tangerine}20`,
                    color: colors.tangerine,
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: 500,
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  ⚠️ Warning: Bold formatting wastes tokens
                </span>
              )}
              {showLintHighlights[2] && (
                <span
                  style={{
                    backgroundColor: `${colors.denim}20`,
                    color: colors.denim,
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontSize: "18px",
                    fontWeight: 500,
                    animation: "fadeIn 0.3s ease",
                  }}
                >
                  ℹ️ Info: Unnecessary blank line in list
                </span>
              )}
            </div>
          </div>
        )}

        {/* Phase 6: Lint Results */}
        {phase === 6 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                ...raindrop(showLintResultsTitle),
              }}
            >
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: 700,
                  color: colors.denim,
                }}
              >
                Lint Analysis Results
              </h1>
              <p
                style={{
                  fontSize: "24px",
                  color: colors.cocoa,
                  marginTop: "16px",
                  lineHeight: 1.5,
                }}
              >
                The linter found 3 issues that should be fixed to optimize your
                agent's context files.
                <br />
                Each issue includes an explanation of why it matters and how to
                fix it.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              {lintIssues.map((issue, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    padding: "28px 36px",
                    backgroundColor: colors.snow,
                    borderRadius: "20px",
                    borderLeft: `8px solid ${
                      issue.type === "error"
                        ? colors.redwood
                        : issue.type === "warning"
                          ? colors.tangerine
                          : colors.denim
                    }`,
                    boxShadow: `0 4px 20px ${colors.espresso}08`,
                    ...raindrop(showLintItems[i]),
                  }}
                >
                  <span style={{ fontSize: "40px" }}>{issue.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: colors.espresso,
                        marginBottom: "6px",
                      }}
                    >
                      {issue.message}
                    </div>
                    <div style={{ fontSize: "20px", color: colors.mocha }}>
                      {issue.detail}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: "8px 20px",
                      borderRadius: "20px",
                      fontSize: "16px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      backgroundColor:
                        issue.type === "error"
                          ? `${colors.redwood}15`
                          : issue.type === "warning"
                            ? `${colors.tangerine}15`
                            : `${colors.denim}15`,
                      color:
                        issue.type === "error"
                          ? colors.redwood
                          : issue.type === "warning"
                            ? colors.tangerine
                            : colors.denim,
                    }}
                  >
                    {issue.type}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "32px",
              }}
            >
              <div
                style={{
                  backgroundColor: `${colors.olive}10`,
                  border: `2px solid ${colors.olive}`,
                  borderRadius: "24px",
                  padding: "32px 40px",
                  ...raindrop(showCorrectedMarkdown),
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: colors.olive,
                    marginBottom: "16px",
                  }}
                >
                  ✓ After Fixes
                </div>
                <div
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "20px",
                    color: colors.cocoa,
                    lineHeight: 1.6,
                  }}
                >
                  # Return Policy
                  <br />
                  Important: Returns accepted within 30 days.
                  <br />
                  {"  "}- First item
                  <br />
                  {"  "}- Second item
                  <br />
                  ## Contact
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "40px",
                  textAlign: "center",
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showTokenSavings),
                }}
              >
                <div
                  style={{
                    fontSize: "64px",
                    fontWeight: 700,
                    color: colors.olive,
                  }}
                >
                  ~{Math.round(tokenSavings)}%
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    color: colors.mocha,
                    marginTop: "8px",
                  }}
                >
                  Token Reduction
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    color: colors.cocoa,
                    marginTop: "12px",
                  }}
                >
                  after applying fixes
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 7: Score */}
        {phase === 7 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              animation: "fadeIn 0.5s ease",
              zoom: 0.85,
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "16px",
                ...raindrop(showScoreTitle),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "20px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Tool 3: Context Quality Evaluator
              </span>
            </div>

            <BigStepTitle
              title="score - Evaluate Context Quality"
              color={colors.tangerine}
              show={showScoreBigTitle}
            />

            <p
              style={{
                textAlign: "center",
                fontSize: "24px",
                color: colors.cocoa,
                marginBottom: "32px",
                lineHeight: 1.5,
                ...raindrop(showScoreBigTitle, 0.1),
              }}
            >
              The evaluator uses AI to analyze your context files and rate them
              on a 0-10 scale.
              <br />
              Higher scores mean better AI responses with lower token costs.
            </p>

            <CodeBlock
              code={streamedScoreCommand}
              show={showScoreCommand}
              isTyping={true}
              fullText={scoreCommand}
            />

            <div
              style={{
                marginTop: "36px",
                backgroundColor: colors.snow,
                borderRadius: "24px",
                padding: "36px 44px",
                borderLeft: `8px solid ${colors.tangerine}`,
                boxShadow: `0 8px 32px ${colors.espresso}08`,
                ...raindrop(showContextBlock),
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: colors.tangerine,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                Context Being Evaluated
              </div>
              <pre
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "22px",
                  color: colors.cocoa,
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {contextSample}
              </pre>
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "32px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "40px",
                  textAlign: "center",
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showCrispnessGauge),
                }}
              >
                <div
                  style={{
                    fontSize: "72px",
                    fontWeight: 700,
                    color: colors.denim,
                  }}
                >
                  {crispness.toFixed(1)}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.mocha,
                    marginBottom: "16px",
                  }}
                >
                  / 10
                </div>
                <div
                  style={{
                    height: "12px",
                    backgroundColor: colors.sand,
                    borderRadius: "6px",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${crispness * 10}%`,
                      backgroundColor: colors.denim,
                      borderRadius: "6px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 600,
                    color: colors.espresso,
                  }}
                >
                  Crispness Score
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginTop: "8px",
                    lineHeight: 1.5,
                  }}
                >
                  Measures clarity and conciseness.
                  <br />
                  No redundancy, atomic sentences, easy to scan.
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "24px",
                  padding: "40px",
                  textAlign: "center",
                  boxShadow: `0 8px 32px ${colors.espresso}08`,
                  ...raindrop(showEfficiencyGauge),
                }}
              >
                <div
                  style={{
                    fontSize: "72px",
                    fontWeight: 700,
                    color: colors.olive,
                  }}
                >
                  {efficiency.toFixed(1)}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.mocha,
                    marginBottom: "16px",
                  }}
                >
                  / 10
                </div>
                <div
                  style={{
                    height: "12px",
                    backgroundColor: colors.sand,
                    borderRadius: "6px",
                    overflow: "hidden",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${efficiency * 10}%`,
                      backgroundColor: colors.olive,
                      borderRadius: "6px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 600,
                    color: colors.espresso,
                  }}
                >
                  Token Efficiency Score
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginTop: "8px",
                    lineHeight: 1.5,
                  }}
                >
                  Measures information density.
                  <br />
                  Maximum value per token, no wasted words.
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <div
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "24px",
                    padding: "36px 44px",
                    textAlign: "center",
                    boxShadow: `0 8px 32px ${colors.espresso}08`,
                    border: `3px solid ${colors.tangerine}`,
                    ...raindrop(showOverallScore),
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      color: colors.mocha,
                      marginBottom: "8px",
                    }}
                  >
                    Overall Score
                  </div>
                  <div
                    style={{
                      fontSize: "64px",
                      fontWeight: 700,
                      color: colors.tangerine,
                    }}
                  >
                    {((crispness + efficiency) / 2).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "18px", color: colors.mocha }}>
                    / 10
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: `${colors.redwood}10`,
                    borderRadius: "20px",
                    padding: "24px 32px",
                    textAlign: "center",
                    ...raindrop(showWaste),
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color: colors.redwood,
                      fontWeight: 500,
                    }}
                  >
                    Estimated Waste
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: colors.redwood,
                    }}
                  >
                    12%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 8: Video Showcase */}
        {phase === 8 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1400px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showVideoTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  backgroundColor: colors.salmon,
                  color: colors.snow,
                  borderRadius: "30px",
                  fontSize: "22px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "36px",
                }}
              >
                Live Demo
              </span>
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                See It In Action
              </h1>
            </div>

            <p
              style={{
                fontSize: "32px",
                color: colors.mocha,
                marginTop: "24px",
                marginBottom: "48px",
                ...raindrop(showVideoSubtitle),
              }}
            >
              Watch the full evaluation workflow
            </p>

            <div style={raindrop(showVideoPlayer)}>
              {activeVideoIndex === null ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                  }}
                >
                  {demoVideos.map((v, i) => (
                    <div
                      key={v.key}
                      style={{
                        backgroundColor: colors.snow,
                        borderRadius: "16px",
                        aspectRatio: "16/9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 8px 32px ${colors.espresso}10`,
                        border: `1px solid ${colors.hazelnut}`,
                        position: "relative",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onClick={() => setActiveVideoIndex(i)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                        e.currentTarget.style.boxShadow = `0 12px 40px ${colors.espresso}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = `0 8px 32px ${colors.espresso}10`;
                      }}
                    >
                      <div style={{ fontSize: "72px", marginBottom: "16px" }}>
                        {v.icon}
                      </div>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          color: colors.espresso,
                          marginBottom: "8px",
                        }}
                      >
                        {v.label}
                      </div>
                      <div style={{ fontSize: "14px", color: colors.forest }}>
                        Click to play
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                  }}
                >
                  <button
                    onClick={() => setActiveVideoIndex(null)}
                    style={{
                      background: "none",
                      border: `2px solid ${colors.tangerine}`,
                      color: colors.tangerine,
                      padding: "10px 24px",
                      borderRadius: "10px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginBottom: "24px",
                    }}
                  >
                    ← Back to videos
                  </button>
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: `0 8px 32px ${colors.espresso}20`,
                      aspectRatio: "16/9",
                      position: "relative",
                    }}
                  >
                    <iframe
                      key={demoVideos[activeVideoIndex].embed}
                      src={`${demoVideos[activeVideoIndex].embed}?autoplay=1`}
                      data-autoplay-video
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "16px",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    {demoVideos[activeVideoIndex].icon}{" "}
                    {demoVideos[activeVideoIndex].label}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Phase 9: Summary */}
        {phase === 9 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1500px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showSummaryTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "30px",
                  fontSize: "22px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "36px",
                }}
              >
                All Tests Complete
              </span>
              <h1
                style={{
                  fontSize: "72px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                Evaluation Summary
              </h1>
            </div>

            <p
              style={{
                fontSize: "28px",
                color: colors.mocha,
                marginTop: "24px",
                marginBottom: "16px",
                lineHeight: 1.5,
                ...raindrop(showSummarySubtitle),
              }}
            >
              All three evaluation tools have completed successfully.
              <br />
              Your AI agent has passed quality checks and is ready for
              deployment.
            </p>

            <p
              style={{
                fontSize: "22px",
                color: colors.cocoa,
                marginBottom: "48px",
                ...raindrop(showSummarySubtitle, 0.15),
              }}
            >
              Run these tools regularly as part of your development workflow to
              maintain quality.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "40px",
                marginBottom: "48px",
              }}
            >
              {summaryResults.map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "24px",
                    padding: "44px 36px",
                    boxShadow: `0 8px 32px ${colors.espresso}08`,
                    border: `3px solid ${item.color}`,
                    ...raindrop(showSummaryCards[i]),
                  }}
                >
                  <div style={{ fontSize: "56px", marginBottom: "20px" }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      color: colors.mocha,
                      marginBottom: "8px",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: 700,
                      color: item.color,
                      marginBottom: "8px",
                    }}
                  >
                    {item.result}
                  </div>
                  <div style={{ fontSize: "20px", color: colors.cocoa }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginBottom: "48px",
                ...raindrop(showReadyBadge),
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "20px",
                  backgroundColor: `${colors.olive}15`,
                  border: `3px solid ${colors.olive}`,
                  borderRadius: "60px",
                  padding: "24px 56px",
                  boxShadow: `0 8px 40px ${colors.olive}25`,
                }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.olive}
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 700,
                    color: colors.olive,
                  }}
                >
                  Production Ready
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Progress Bar */}
      {started && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 64px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: `${colors.cream}ee`,
            borderTop: `1px solid ${colors.hazelnut}`,
            zIndex: 50,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => (
            <div
              key={p}
              style={{
                flex: 1,
                height: "6px",
                borderRadius: "3px",
                backgroundColor:
                  phase >= p ? colors.tangerine : colors.hazelnut,
                transition: "all 0.3s ease",
                cursor: "pointer",
                opacity: phase >= p ? 1 : 0.4,
              }}
              onClick={() => goToPhase(p)}
            />
          ))}
          <span
            style={{
              fontSize: "12px",
              color: colors.mocha,
              marginLeft: "12px",
              whiteSpace: "nowrap",
            }}
          >
            {phase} / 9
          </span>
        </div>
      )}

      {/* Control Panel - shows when demo started and UI visible */}
      {started && showUI && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
            zIndex: 100,
            background: colors.snow,
            padding: "16px 10px",
            borderRadius: "16px",
            boxShadow: `0 4px 24px ${colors.espresso}20`,
          }}
        >
          {/* Navigation */}
          <button
            onClick={goToPreviousPhase}
            disabled={phase <= 1}
            style={{
              background: phase <= 1 ? colors.sand : colors.snow,
              color: phase <= 1 ? colors.hazelnut : colors.espresso,
              border: `2px solid ${phase <= 1 ? colors.hazelnut : colors.tangerine}`,
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: phase <= 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            ← Prev
          </button>
          <button
            onClick={skipToNextPhase}
            disabled={phase >= 9}
            style={{
              background: phase >= 9 ? colors.sand : colors.tangerine,
              color: phase >= 9 ? colors.hazelnut : colors.snow,
              border: `2px solid ${phase >= 9 ? colors.hazelnut : colors.tangerine}`,
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: phase >= 9 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Next →
          </button>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "24px",
              background: colors.hazelnut,
              margin: "0 8px",
            }}
          />

          {/* Speed controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: colors.sand,
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            {[0.5, 1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => changeSpeed(s)}
                style={{
                  background: speed === s ? colors.tangerine : "transparent",
                  color: speed === s ? colors.snow : colors.espresso,
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Pause/Resume */}
          <button
            onClick={togglePause}
            style={{
              background: paused ? colors.tangerine : colors.snow,
              color: paused ? colors.snow : colors.espresso,
              border: `2px solid ${colors.tangerine}`,
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {paused ? "▶ Resume" : "⏸ Pause"}
          </button>

          {/* Autoplay */}
          <button
            onClick={startAutoplay}
            style={{
              background: colors.denim,
              color: colors.snow,
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            title="Reset and autoplay demo"
          >
            ▶ Autoplay
          </button>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "24px",
              background: colors.hazelnut,
              margin: "0 8px",
            }}
          />

          {/* Hide UI */}
          <button
            onClick={() => setShowUI(false)}
            style={{
              background: "transparent",
              color: colors.mocha,
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 0.2s ease",
            }}
            title="Hide controls for recording"
          >
            👁️ Hide
          </button>
        </div>
      )}

      {/* Show UI Button - when UI is hidden */}
      {started && !showUI && (
        <button
          onClick={stopAutoplay}
          style={{
            position: "fixed",
            right: "8px",
            bottom: "8px",
            background: colors.sand,
            color: colors.mocha,
            border: "none",
            borderRadius: "6px",
            padding: "4px 8px",
            fontSize: "10px",
            fontWeight: 500,
            cursor: "pointer",
            opacity: 0.15,
            transition: "opacity 0.2s ease",
            zIndex: 100,
          }}
          onMouseEnter={(e) => (e.target.style.opacity = 0.9)}
          onMouseLeave={(e) => (e.target.style.opacity = 0.3)}
          title="Show controls"
        >
          👁️ Show Controls
        </button>
      )}

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
          0%, 100% { transform: scale(1); box-shadow: 0 8px 40px rgba(255,164,0,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 12px 56px rgba(255,164,0,0.5); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SimulatorDemo;
