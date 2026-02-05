import React, { useState, useRef } from "react";

const BenchmarkDemo = () => {
  const [started, setStarted] = useState(false);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);
  const [showUI, setShowUI] = useState(true);
  const [isAutoplaying, setIsAutoplaying] = useState(false);

  // Phase 1: Why AI Agent Management?
  const [showWhyTitle, setShowWhyTitle] = useState(false);
  const [showWhySubtitle, setShowWhySubtitle] = useState(false);
  const [showWhyPoints, setShowWhyPoints] = useState([false, false, false]);
  const [showWhyConclusion, setShowWhyConclusion] = useState(false);

  // Phase 2: The Solution - AI Agent Management (moved before benchmark)
  const [showSolutionTitle, setShowSolutionTitle] = useState(false);
  const [showSolutionText, setShowSolutionText] = useState(false);
  const [showSolutionBenefits, setShowSolutionBenefits] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Phase 3: The Flywheel (moved before benchmark)
  const [showFlywheelTitle, setShowFlywheelTitle] = useState(false);
  const [showFlywheelSubtitle, setShowFlywheelSubtitle] = useState(false);
  const [showFlywheelSteps, setShowFlywheelSteps] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [activeFlywheelStep, setActiveFlywheelStep] = useState(-1);
  const [showFlywheelArrows, setShowFlywheelArrows] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [showFlywheelLoop, setShowFlywheelLoop] = useState(false);

  // Phase 4: Knowledge Gathering (segway to benchmark)
  const [showGatherTitle, setShowGatherTitle] = useState(false);
  const [showGatherText1, setShowGatherText1] = useState(false);
  const [showGatherSources, setShowGatherSources] = useState([
    false,
    false,
    false,
  ]);
  const [showGatherText2, setShowGatherText2] = useState(false);

  // Phase 5: What is Benchmark Testing? (moved after flywheel)
  const [showWhatTitle, setShowWhatTitle] = useState(false);
  const [showWhatDefinition, setShowWhatDefinition] = useState(false);
  const [streamedWhatDefinition, setStreamedWhatDefinition] = useState("");
  const [showWhatDiagram, setShowWhatDiagram] = useState([false, false, false]);
  const [showWhatSummary, setShowWhatSummary] = useState(false);

  // Phase 6: Step 1 - Create Benchmark
  const [showStep1Title, setShowStep1Title] = useState(false);
  const [showStep1BigTitle, setShowStep1BigTitle] = useState(false);
  const [showStep1Definition, setShowStep1Definition] = useState(false);
  const [streamedStep1Def, setStreamedStep1Def] = useState("");
  const [showStep1Question, setShowStep1Question] = useState(false);
  const [showStep1Answer, setShowStep1Answer] = useState(false);

  // Phase 7: Step 2 - Retrieve Knowledge
  const [showStep2Title, setShowStep2Title] = useState(false);
  const [showStep2BigTitle, setShowStep2BigTitle] = useState(false);
  const [showStep2Definition, setShowStep2Definition] = useState(false);
  const [streamedStep2Def, setStreamedStep2Def] = useState("");
  const [showKnowledge, setShowKnowledge] = useState([false, false, false]);

  // Phase 8: Step 3 - Generate Response
  const [showStep3Title, setShowStep3Title] = useState(false);
  const [showStep3BigTitle, setShowStep3BigTitle] = useState(false);
  const [showStep3Definition, setShowStep3Definition] = useState(false);
  const [streamedStep3Def, setStreamedStep3Def] = useState("");
  const [showStep3Expected, setShowStep3Expected] = useState(false);
  const [showStep3AI, setShowStep3AI] = useState(false);
  const [streamedAiAnswer, setStreamedAiAnswer] = useState("");

  // Phase 9: Step 4 - Calculate Score
  const [showStep4Title, setShowStep4Title] = useState(false);
  const [showStep4BigTitle, setShowStep4BigTitle] = useState(false);
  const [showStep4Definition, setShowStep4Definition] = useState(false);
  const [streamedStep4Def, setStreamedStep4Def] = useState("");
  const [showFaithfulness, setShowFaithfulness] = useState(false);
  const [showSimilarity, setShowSimilarity] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPassReason, setShowPassReason] = useState(false);
  const [faithfulness, setFaithfulness] = useState(0);
  const [similarity, setSimilarity] = useState(0);
  const [passed, setPassed] = useState(false);

  // Phase 10: Results
  const [showResultsTitle, setShowResultsTitle] = useState(false);
  const [showResultsSubtitle, setShowResultsSubtitle] = useState(false);
  const [showResultsMetrics, setShowResultsMetrics] = useState([
    false,
    false,
    false,
  ]);
  const [showCTA, setShowCTA] = useState(false);

  // Phase 11: Final Logo Slide
  const [showFinalLogo, setShowFinalLogo] = useState(false);
  const [showFinalTagline, setShowFinalTagline] = useState(false);

  // Content
  const question = "What is your return policy?";
  const expectedAnswer =
    "Returns accepted within 30 days. $5 return shipping fee deducted from refund.";
  const aiAnswer =
    "Returns are accepted within 30 days. The customer pays a $5 fee deducted from the refund.";

  // Definition texts for typing animation
  const whatDefinitionText =
    "A way to test if your AI gives correct answers before customers see them.";
  const step1DefText = "Write down a question and the correct answer.";
  const step2DefText = "The AI searches your knowledge base for relevant info.";
  const step3DefText = "The AI creates an answer using the knowledge it found.";
  const step4DefText = "Measure how accurate the AI's answer is.";

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

  const skipToNextPhase = () => {
    if (phase < 11) {
      // Reset current phase states and move to next
      const nextPhase = phase + 1;

      // Show all elements for next phase immediately
      if (nextPhase === 1) {
        setShowWhyTitle(true);
        setShowWhySubtitle(true);
        setShowWhyPoints([true, true, true]);
        setShowWhyConclusion(true);
      } else if (nextPhase === 2) {
        setShowSolutionTitle(true);
        setShowSolutionText(true);
        setShowSolutionBenefits([true, true, true, true]);
      } else if (nextPhase === 3) {
        setShowFlywheelTitle(true);
        setShowFlywheelSubtitle(true);
        setShowFlywheelSteps([true, true, true, true]);
        setShowFlywheelArrows([true, true, true, true]);
        setShowFlywheelLoop(true);
        setActiveFlywheelStep(-1);
      } else if (nextPhase === 4) {
        setShowGatherTitle(true);
        setShowGatherText1(true);
        setShowGatherSources([true, true, true]);
        setShowGatherText2(true);
      } else if (nextPhase === 5) {
        setShowWhatTitle(true);
        setShowWhatDefinition(true);
        setStreamedWhatDefinition(
          "A way to test if your AI gives correct answers before customers see them.",
        );
        setShowWhatDiagram([true, true, true]);
        setShowWhatSummary(true);
      } else if (nextPhase === 6) {
        setShowStep1Title(true);
        setShowStep1BigTitle(true);
        setShowStep1Definition(true);
        setStreamedStep1Def("Write down a question and the correct answer.");
        setShowStep1Question(true);
        setShowStep1Answer(true);
      } else if (nextPhase === 7) {
        setShowStep2Title(true);
        setShowStep2BigTitle(true);
        setShowStep2Definition(true);
        setStreamedStep2Def(
          "The AI searches your knowledge base for relevant info.",
        );
        setShowKnowledge([true, true, true]);
      } else if (nextPhase === 8) {
        setShowStep3Title(true);
        setShowStep3BigTitle(true);
        setShowStep3Definition(true);
        setStreamedStep3Def(
          "The AI creates an answer using the knowledge it found.",
        );
        setShowStep3Expected(true);
        setShowStep3AI(true);
        setStreamedAiAnswer(
          "Returns are accepted within 30 days. The customer pays a $5 fee deducted from the refund.",
        );
      } else if (nextPhase === 9) {
        setShowStep4Title(true);
        setShowStep4BigTitle(true);
        setShowStep4Definition(true);
        setStreamedStep4Def("Measure how accurate the AI's answer is.");
        setShowFaithfulness(true);
        setShowSimilarity(true);
        setFaithfulness(0.94);
        setSimilarity(0.87);
        setShowResult(true);
        setPassed(true);
        setShowPassReason(true);
      } else if (nextPhase === 10) {
        setShowResultsTitle(true);
        setShowResultsSubtitle(true);
        setShowResultsMetrics([true, true, true]);
        setShowCTA(true);
      } else if (nextPhase === 11) {
        setShowFinalLogo(true);
        setShowFinalTagline(true);
      }

      setPhase(nextPhase);
    }
  };

  const goToPhase = (targetPhase) => {
    // Reset all states first
    setShowWhyTitle(false);
    setShowWhySubtitle(false);
    setShowWhyPoints([false, false, false]);
    setShowWhyConclusion(false);
    setShowSolutionTitle(false);
    setShowSolutionText(false);
    setShowSolutionBenefits([false, false, false, false]);
    setShowFlywheelTitle(false);
    setShowFlywheelSubtitle(false);
    setShowFlywheelSteps([false, false, false, false]);
    setActiveFlywheelStep(-1);
    setShowFlywheelArrows([false, false, false, false]);
    setShowFlywheelLoop(false);
    setShowGatherTitle(false);
    setShowGatherText1(false);
    setShowGatherSources([false, false, false]);
    setShowGatherText2(false);
    setShowWhatTitle(false);
    setShowWhatDefinition(false);
    setStreamedWhatDefinition("");
    setShowWhatDiagram([false, false, false]);
    setShowWhatSummary(false);
    setShowStep1Title(false);
    setShowStep1BigTitle(false);
    setShowStep1Definition(false);
    setStreamedStep1Def("");
    setShowStep1Question(false);
    setShowStep1Answer(false);
    setShowStep2Title(false);
    setShowStep2BigTitle(false);
    setShowStep2Definition(false);
    setStreamedStep2Def("");
    setShowKnowledge([false, false, false]);
    setShowStep3Title(false);
    setShowStep3BigTitle(false);
    setShowStep3Definition(false);
    setStreamedStep3Def("");
    setShowStep3Expected(false);
    setShowStep3AI(false);
    setStreamedAiAnswer("");
    setShowStep4Title(false);
    setShowStep4BigTitle(false);
    setShowStep4Definition(false);
    setStreamedStep4Def("");
    setShowFaithfulness(false);
    setShowSimilarity(false);
    setShowResult(false);
    setShowPassReason(false);
    setFaithfulness(0);
    setSimilarity(0);
    setPassed(false);
    setShowResultsTitle(false);
    setShowResultsSubtitle(false);
    setShowResultsMetrics([false, false, false]);
    setShowCTA(false);
    setShowFinalLogo(false);
    setShowFinalTagline(false);

    // Show all elements for target phase
    if (targetPhase === 1) {
      setShowWhyTitle(true);
      setShowWhySubtitle(true);
      setShowWhyPoints([true, true, true]);
      setShowWhyConclusion(true);
    } else if (targetPhase === 2) {
      setShowSolutionTitle(true);
      setShowSolutionText(true);
      setShowSolutionBenefits([true, true, true, true]);
    } else if (targetPhase === 3) {
      setShowFlywheelTitle(true);
      setShowFlywheelSubtitle(true);
      setShowFlywheelSteps([true, true, true, true]);
      setShowFlywheelArrows([true, true, true, true]);
      setShowFlywheelLoop(true);
      setActiveFlywheelStep(-1);
    } else if (targetPhase === 4) {
      setShowGatherTitle(true);
      setShowGatherText1(true);
      setShowGatherSources([true, true, true]);
      setShowGatherText2(true);
    } else if (targetPhase === 5) {
      setShowWhatTitle(true);
      setShowWhatDefinition(true);
      setStreamedWhatDefinition(
        "A way to test if your AI gives correct answers before customers see them.",
      );
      setShowWhatDiagram([true, true, true]);
      setShowWhatSummary(true);
    } else if (targetPhase === 6) {
      setShowStep1Title(true);
      setShowStep1BigTitle(true);
      setShowStep1Definition(true);
      setStreamedStep1Def("Write down a question and the correct answer.");
      setShowStep1Question(true);
      setShowStep1Answer(true);
    } else if (targetPhase === 7) {
      setShowStep2Title(true);
      setShowStep2BigTitle(true);
      setShowStep2Definition(true);
      setStreamedStep2Def(
        "The AI searches your knowledge base for relevant info.",
      );
      setShowKnowledge([true, true, true]);
    } else if (targetPhase === 8) {
      setShowStep3Title(true);
      setShowStep3BigTitle(true);
      setShowStep3Definition(true);
      setStreamedStep3Def(
        "The AI creates an answer using the knowledge it found.",
      );
      setShowStep3Expected(true);
      setShowStep3AI(true);
      setStreamedAiAnswer(
        "Returns are accepted within 30 days. The customer pays a $5 fee deducted from the refund.",
      );
    } else if (targetPhase === 9) {
      setShowStep4Title(true);
      setShowStep4BigTitle(true);
      setShowStep4Definition(true);
      setStreamedStep4Def("Measure how accurate the AI's answer is.");
      setShowFaithfulness(true);
      setShowSimilarity(true);
      setFaithfulness(0.94);
      setSimilarity(0.87);
      setShowResult(true);
      setPassed(true);
      setShowPassReason(true);
    } else if (targetPhase === 10) {
      setShowResultsTitle(true);
      setShowResultsSubtitle(true);
      setShowResultsMetrics([true, true, true]);
      setShowCTA(true);
    } else if (targetPhase === 11) {
      setShowFinalLogo(true);
      setShowFinalTagline(true);
    }

    setPhase(targetPhase);
  };

  const goToPreviousPhase = () => {
    if (phase > 1) {
      goToPhase(phase - 1);
    }
  };

  const startManualDemo = () => {
    setStarted(true);
    goToPhase(1);
  };

  const startAutoplay = () => {
    resetDemo();
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

  const resetDemo = () => {
    setStarted(false);
    setPhase(0);
    setShowWhyTitle(false);
    setShowWhySubtitle(false);
    setShowWhyPoints([false, false, false]);
    setShowWhyConclusion(false);
    setShowSolutionTitle(false);
    setShowSolutionText(false);
    setShowSolutionBenefits([false, false, false, false]);
    setShowFlywheelTitle(false);
    setShowFlywheelSubtitle(false);
    setShowFlywheelSteps([false, false, false, false]);
    setActiveFlywheelStep(-1);
    setShowFlywheelArrows([false, false, false, false]);
    setShowFlywheelLoop(false);
    setShowGatherTitle(false);
    setShowGatherText1(false);
    setShowGatherSources([false, false, false]);
    setShowGatherText2(false);
    setShowWhatTitle(false);
    setShowWhatDefinition(false);
    setStreamedWhatDefinition("");
    setShowWhatDiagram([false, false, false]);
    setShowWhatSummary(false);
    setShowStep1Title(false);
    setShowStep1BigTitle(false);
    setShowStep1Definition(false);
    setStreamedStep1Def("");
    setShowStep1Question(false);
    setShowStep1Answer(false);
    setShowStep2Title(false);
    setShowStep2BigTitle(false);
    setShowStep2Definition(false);
    setStreamedStep2Def("");
    setShowKnowledge([false, false, false]);
    setShowStep3Title(false);
    setShowStep3BigTitle(false);
    setShowStep3Definition(false);
    setStreamedStep3Def("");
    setShowStep3Expected(false);
    setShowStep3AI(false);
    setStreamedAiAnswer("");
    setShowStep4Title(false);
    setShowStep4BigTitle(false);
    setShowStep4Definition(false);
    setStreamedStep4Def("");
    setShowFaithfulness(false);
    setShowSimilarity(false);
    setShowResult(false);
    setShowPassReason(false);
    setFaithfulness(0);
    setSimilarity(0);
    setPassed(false);
    setShowResultsTitle(false);
    setShowResultsSubtitle(false);
    setShowResultsMetrics([false, false, false]);
    setShowCTA(false);
    setShowFinalLogo(false);
    setShowFinalTagline(false);
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

    // === PHASE 2: The Solution - AI Agent Management (MOVED BEFORE BENCHMARK) ===
    setPhase(2);
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

    // === PHASE 3: HOW - The Flywheel (MOVED BEFORE BENCHMARK) ===
    setPhase(3);
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

    // Highlight each step and show arrow to next step
    for (let i = 0; i < 4; i++) {
      setActiveFlywheelStep(i);
      await wait(1000);
      // Show arrow from current step to next step
      setShowFlywheelArrows((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(1000);
    }

    setActiveFlywheelStep(-1);
    setShowFlywheelLoop(true);
    await wait(2000);

    // === PHASE 4: Knowledge Gathering (Segway to Benchmark) ===
    setPhase(4);
    await wait(400);
    setShowGatherTitle(true);
    await wait(600);
    setShowGatherText1(true);
    await wait(800);

    // Raindrop: knowledge sources
    for (let i = 0; i < 3; i++) {
      setShowGatherSources((prev) => {
        const next = [...prev];
        next[i] = true;
        return next;
      });
      await wait(500);
    }

    await wait(600);
    setShowGatherText2(true);
    await wait(2500);

    // === PHASE 5: WHAT is Benchmark Testing? ===
    setPhase(5);
    await wait(400);
    setShowWhatTitle(true);
    await wait(600);
    setShowWhatDefinition(true);
    await wait(200);
    await streamText(whatDefinitionText, setStreamedWhatDefinition, 25);
    await wait(800);

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

    // === PHASE 6: Step 1 - Create Benchmark ===
    setPhase(6);
    await wait(400);
    setShowStep1Title(true);
    await wait(300);
    setShowStep1BigTitle(true);
    await wait(500);
    setShowStep1Definition(true);
    await wait(200);
    await streamText(step1DefText, setStreamedStep1Def, 30);
    await wait(600);
    setShowStep1Question(true);
    await wait(800);
    setShowStep1Answer(true);
    await wait(2000);

    // === PHASE 7: Step 2 - Retrieve Knowledge ===
    setPhase(7);
    await wait(400);
    setShowStep2Title(true);
    await wait(300);
    setShowStep2BigTitle(true);
    await wait(500);
    setShowStep2Definition(true);
    await wait(200);
    await streamText(step2DefText, setStreamedStep2Def, 30);
    await wait(600);

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

    // === PHASE 8: Step 3 - Generate Response ===
    setPhase(8);
    await wait(400);
    setShowStep3Title(true);
    await wait(300);
    setShowStep3BigTitle(true);
    await wait(500);
    setShowStep3Definition(true);
    await wait(200);
    await streamText(step3DefText, setStreamedStep3Def, 30);
    await wait(600);
    setShowStep3Expected(true);
    await wait(600);
    setShowStep3AI(true);
    await wait(400);
    await streamText(aiAnswer, setStreamedAiAnswer, 30);
    await wait(1800);

    // === PHASE 9: Step 4 - Calculate Score ===
    setPhase(9);
    await wait(400);
    setShowStep4Title(true);
    await wait(300);
    setShowStep4BigTitle(true);
    await wait(500);
    setShowStep4Definition(true);
    await wait(200);
    await streamText(step4DefText, setStreamedStep4Def, 30);
    await wait(600);
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
    await wait(600);
    setShowPassReason(true);
    await wait(2500);

    // === PHASE 10: Results ===
    setPhase(10);
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
    await wait(2500);

    // === PHASE 11: Final Logo Slide ===
    setPhase(11);
    await wait(600);
    setShowFinalLogo(true);
    await wait(1200);
    setShowFinalTagline(true);
    await wait(2200);
  };

  // Big step title component
  const BigStepTitle = ({ number, title, color, show }) => (
    <div
      style={{
        textAlign: "center",
        marginBottom: "16px",
        ...raindrop(show),
      }}
    >
      <h1
        style={{
          fontSize: "56px",
          fontWeight: 800,
          color: color,
          margin: 0,
          letterSpacing: "-1px",
        }}
      >
        Step {number}: {title}
      </h1>
    </div>
  );

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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/images/logo.png"
            alt="Influx"
            style={{ height: "36px", width: "auto" }}
          />
        </div>

        {started && (
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((p) => (
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
            {phase < 11 && (
              <button
                onClick={skipToNextPhase}
                style={{
                  background: "transparent",
                  border: `1px solid ${colors.hazelnut}`,
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: colors.mocha,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = colors.tangerine;
                  e.target.style.color = colors.tangerine;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = colors.hazelnut;
                  e.target.style.color = colors.mocha;
                }}
              >
                Skip →
              </button>
            )}
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
          padding: "40px 64px",
          maxWidth: "1600px",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
          minHeight: 0,
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
              onClick={startManualDemo}
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
                fontSize: "56px",
                fontWeight: 700,
                marginBottom: "20px",
                color: colors.espresso,
              }}
            >
              AI Agent Management
            </h1>
            <p
              style={{
                fontSize: "28px",
                color: colors.mocha,
                marginBottom: "48px",
              }}
            >
              How we make sure your AI gives the right answers
            </p>
            <button
              onClick={startManualDemo}
              style={{
                backgroundColor: colors.tangerine,
                color: colors.snow,
                border: "none",
                padding: "22px 64px",
                borderRadius: "14px",
                fontSize: "24px",
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
            style={{
              width: "100%",
              maxWidth: "1100px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showWhyTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.burgundy,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                The Question
              </span>
              <h1
                style={{
                  fontSize: "52px",
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
                fontSize: "26px",
                color: colors.mocha,
                marginTop: "20px",
                marginBottom: "48px",
                ...raindrop(showWhySubtitle),
              }}
            >
              Without proper management, AI agents can fail in critical ways:
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                marginBottom: "40px",
              }}
            >
              {whyPoints.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    padding: "28px 36px",
                    backgroundColor: colors.snow,
                    borderRadius: "18px",
                    borderLeft: `6px solid ${colors.redwood}`,
                    boxShadow: `0 4px 16px ${colors.espresso}06`,
                    textAlign: "left",
                    ...raindrop(showWhyPoints[i]),
                  }}
                >
                  <span style={{ fontSize: "40px" }}>{point.icon}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 600,
                        color: colors.redwood,
                        marginBottom: "6px",
                      }}
                    >
                      {point.problem}
                    </div>
                    <div style={{ fontSize: "18px", color: colors.cocoa }}>
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

        {/* Phase 2: The Solution - AI Agent Management (MOVED BEFORE BENCHMARK) */}
        {phase === 2 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1300px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showSolutionTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                Our Approach
              </span>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: 700,
                  color: colors.tangerine,
                }}
              >
                AI Agent Management
              </h1>
            </div>

            <p
              style={{
                fontSize: "26px",
                color: colors.cocoa,
                marginTop: "20px",
                marginBottom: "48px",
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
                gap: "28px",
              }}
            >
              {solutionBenefits.map((benefit, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "18px",
                    padding: "36px 28px",
                    boxShadow: `0 4px 20px ${colors.espresso}06`,
                    border: `2px solid ${colors.tangerine}`,
                    ...raindrop(showSolutionBenefits[i]),
                  }}
                >
                  <div style={{ fontSize: "52px", marginBottom: "16px" }}>
                    {benefit.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                      color: colors.espresso,
                      marginBottom: "10px",
                    }}
                  >
                    {benefit.title}
                  </div>
                  <div style={{ fontSize: "16px", color: colors.mocha }}>
                    {benefit.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 3: The Flywheel (MOVED BEFORE BENCHMARK) */}
        {phase === 3 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1300px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showFlywheelTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                How It Works
              </span>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                The Improvement Cycle
              </h1>
            </div>

            <p
              style={{
                fontSize: "24px",
                color: colors.mocha,
                marginTop: "20px",
                marginBottom: "44px",
                ...raindrop(showFlywheelSubtitle),
              }}
            >
              A repeating process that makes your AI better every week.
            </p>

            {/* Circular Flywheel */}
            <div
              style={{
                position: "relative",
                width: "600px",
                height: "600px",
                margin: "0 auto 40px",
              }}
            >
              {/* Flywheel steps positioned in a circle */}
              {flywheelSteps.map((step, i) => {
                // Position: Analyze top, Train right, Test bottom, Deploy left
                // Container is 600x600, center is 300,300
                // Box is ~150x110, so offset by 75 horizontally, 55 vertically
                const positions = [
                  { top: "40px", left: "225px" }, // Analyze - top center
                  { top: "245px", left: "410px" }, // Train - right center
                  { top: "450px", left: "225px" }, // Test - bottom center
                  { top: "245px", left: "40px" }, // Deploy - left center
                ];
                const pos = positions[i];

                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      ...pos,
                      width: "150px",
                      backgroundColor:
                        activeFlywheelStep === i ? step.color : colors.snow,
                      borderRadius: "14px",
                      padding: "16px 14px",
                      border: `3px solid ${step.color}`,
                      boxShadow:
                        activeFlywheelStep === i
                          ? `0 8px 24px ${step.color}50`
                          : `0 4px 16px ${colors.espresso}10`,
                      transition: "all 0.4s ease",
                      zIndex: activeFlywheelStep === i ? 5 : 1,
                      textAlign: "center",
                      ...raindrop(showFlywheelSteps[i]),
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "6px" }}>
                      {step.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color:
                          activeFlywheelStep === i ? colors.snow : step.color,
                        marginBottom: "4px",
                      }}
                    >
                      {step.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color:
                          activeFlywheelStep === i
                            ? "rgba(255,255,255,0.9)"
                            : colors.cocoa,
                      }}
                    >
                      {step.definition}
                    </div>
                  </div>
                );
              })}

              {/* Animated arrows connecting the cycle */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
                viewBox="0 0 600 600"
              >
                <defs>
                  {/* Arrow marker */}
                  <marker
                    id="arrowMarker"
                    markerWidth="12"
                    markerHeight="12"
                    refX="6"
                    refY="6"
                    orient="auto"
                  >
                    <path d="M2,2 L10,6 L2,10 L4,6 Z" fill={colors.hazelnut} />
                  </marker>
                  {/* Animated dash pattern */}
                  <style>
                    {`
                      @keyframes dashFlow {
                        from { stroke-dashoffset: 24; }
                        to { stroke-dashoffset: 0; }
                      }
                      .animated-arrow {
                        animation: dashFlow 1s linear infinite;
                      }
                    `}
                  </style>
                </defs>

                {/* Arrow: Analyze (top) -> Train (right) - shows when Analyze is active */}
                <path
                  d="M 375 100 Q 460 140 480 240"
                  fill="none"
                  stroke={colors.hazelnut}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowMarker)"
                  className="animated-arrow"
                  style={{
                    opacity: showFlywheelArrows[0] ? 0.7 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Arrow: Train (right) -> Test (bottom) - shows when Train is active */}
                <path
                  d="M 480 360 Q 460 460 375 500"
                  fill="none"
                  stroke={colors.hazelnut}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowMarker)"
                  className="animated-arrow"
                  style={{
                    opacity: showFlywheelArrows[1] ? 0.7 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Arrow: Test (bottom) -> Deploy (left) - shows when Test is active */}
                <path
                  d="M 225 500 Q 140 460 120 360"
                  fill="none"
                  stroke={colors.hazelnut}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowMarker)"
                  className="animated-arrow"
                  style={{
                    opacity: showFlywheelArrows[2] ? 0.7 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Arrow: Deploy (left) -> Analyze (top) - shows when Deploy is active */}
                <path
                  d="M 120 240 Q 140 140 225 100"
                  fill="none"
                  stroke={colors.hazelnut}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                  markerEnd="url(#arrowMarker)"
                  className="animated-arrow"
                  style={{
                    opacity: showFlywheelArrows[3] ? 0.7 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />
              </svg>
            </div>

            <div style={raindrop(showFlywheelLoop)}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "14px",
                  backgroundColor: colors.snow,
                  padding: "18px 36px",
                  borderRadius: "40px",
                  boxShadow: `0 4px 20px ${colors.espresso}10`,
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: colors.espresso,
                  }}
                >
                  This cycle repeats continuously
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Phase 4: Knowledge Gathering (Segway to Benchmark) */}
        {phase === 4 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showGatherTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                Building Your Knowledge Base
              </span>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                We Gather Everything
              </h1>
            </div>

            <p
              style={{
                fontSize: "24px",
                color: colors.mocha,
                marginTop: "20px",
                marginBottom: "40px",
                lineHeight: 1.6,
                ...raindrop(showGatherText1),
              }}
            >
              We gather your knowledge base from all sources:
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
                marginBottom: "40px",
              }}
            >
              {[
                {
                  icon: "💬",
                  title: "Customer Queries",
                  desc: "Real questions from your customers",
                },
                {
                  icon: "📋",
                  title: "Policy Documents",
                  desc: "Your official policies and guidelines",
                },
                {
                  icon: "👤",
                  title: "Directly From You",
                  desc: "Your expertise and knowledge",
                },
              ].map((source, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "18px",
                    padding: "32px 24px",
                    border: `2px solid ${colors.olive}`,
                    boxShadow: showGatherSources[i]
                      ? `0 8px 32px ${colors.olive}20`
                      : `0 4px 20px ${colors.espresso}06`,
                    opacity: showGatherSources[i] ? 1 : 0,
                    transform: showGatherSources[i]
                      ? "translateY(0) scale(1)"
                      : "translateY(-30px) scale(0.9)",
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      marginBottom: "16px",
                      transform: showGatherSources[i]
                        ? "scale(1)"
                        : "scale(0.5)",
                      transition: `transform 0.4s ease ${i * 0.1 + 0.2}s`,
                    }}
                  >
                    {source.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                      color: colors.espresso,
                      marginBottom: "8px",
                    }}
                  >
                    {source.title}
                  </div>
                  <div style={{ fontSize: "16px", color: colors.mocha }}>
                    {source.desc}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                backgroundColor: `${colors.olive}10`,
                border: `2px solid ${colors.olive}`,
                borderRadius: "18px",
                padding: "28px 40px",
                ...raindrop(showGatherText2),
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  color: colors.cocoa,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                After gathering, we create a{" "}
                <strong style={{ color: colors.olive }}>
                  gold-standard benchmark
                </strong>{" "}
                — our basis to check when the AI drifts and gets things wrong
                during testing.
              </p>
            </div>
          </div>
        )}

        {/* Phase 5: WHAT is Benchmark Testing? */}
        {phase === 5 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showWhatTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                The Testing Phase
              </span>
              <h1
                style={{
                  fontSize: "52px",
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
                borderRadius: "18px",
                padding: "32px 48px",
                marginTop: "28px",
                marginBottom: "40px",
                boxShadow: `0 4px 20px ${colors.espresso}06`,
                ...raindrop(showWhatDefinition),
              }}
            >
              <p
                style={{
                  fontSize: "28px",
                  color: colors.cocoa,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {streamedWhatDefinition}
                <TypingCursor
                  show={
                    streamedWhatDefinition.length > 0 &&
                    streamedWhatDefinition.length < whatDefinitionText.length
                  }
                />
              </p>
            </div>

            {/* Simple diagram */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
                marginBottom: "40px",
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
                      borderRadius: "18px",
                      padding: "32px 28px",
                      border: `2px solid ${colors.denim}`,
                      boxShadow: `0 4px 16px ${colors.espresso}06`,
                    }}
                  >
                    <div style={{ fontSize: "56px", marginBottom: "16px" }}>
                      {item.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 600,
                        color: colors.espresso,
                        marginBottom: "8px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: "16px", color: colors.mocha }}>
                      {item.desc}
                    </div>
                  </div>
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-28px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "36px",
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
                borderRadius: "18px",
                padding: "24px 40px",
                ...raindrop(showWhatSummary),
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  color: colors.olive,
                  fontWeight: 500,
                }}
              >
                ✓ If the AI's answer matches what it should be, the test passes.
              </span>
            </div>
          </div>
        )}

        {/* Phase 6: Step 1 - Create Benchmark */}
        {phase === 6 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                ...raindrop(showStep1Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 22px",
                  backgroundColor: colors.tangerine,
                  color: colors.snow,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Benchmark Testing
              </span>
            </div>

            <BigStepTitle
              number="1"
              title="Create Benchmark"
              color={colors.tangerine}
              show={showStep1BigTitle}
            />

            <div
              style={{
                backgroundColor: `${colors.tangerine}10`,
                borderRadius: "14px",
                padding: "22px 36px",
                marginBottom: "28px",
                textAlign: "center",
                ...raindrop(showStep1Definition),
              }}
            >
              <p style={{ fontSize: "22px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> {streamedStep1Def}
                <TypingCursor
                  show={
                    streamedStep1Def.length > 0 &&
                    streamedStep1Def.length < step1DefText.length
                  }
                />
              </p>
            </div>

            <div
              style={{
                backgroundColor: colors.snow,
                borderRadius: "18px",
                padding: "32px",
                marginBottom: "20px",
                borderLeft: `6px solid ${colors.tangerine}`,
                boxShadow: `0 4px 16px ${colors.espresso}06`,
                ...raindrop(showStep1Question),
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  color: colors.tangerine,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "12px",
                  fontWeight: 600,
                }}
              >
                Customer Question
              </div>
              <div
                style={{
                  fontSize: "28px",
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
                borderRadius: "18px",
                padding: "32px",
                borderLeft: `6px solid ${colors.olive}`,
                boxShadow: `0 4px 16px ${colors.espresso}06`,
                ...raindrop(showStep1Answer),
              }}
            >
              <div
                style={{
                  fontSize: "15px",
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
                  fontSize: "24px",
                  lineHeight: 1.5,
                  color: colors.cocoa,
                }}
              >
                {expectedAnswer}
              </div>
            </div>
          </div>
        )}

        {/* Phase 7: Step 2 - Retrieve Knowledge */}
        {phase === 7 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                ...raindrop(showStep2Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 22px",
                  backgroundColor: colors.denim,
                  color: colors.snow,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Benchmark Testing
              </span>
            </div>

            <BigStepTitle
              number="2"
              title="Retrieve Knowledge"
              color={colors.denim}
              show={showStep2BigTitle}
            />

            <div
              style={{
                backgroundColor: `${colors.denim}10`,
                borderRadius: "14px",
                padding: "22px 36px",
                marginBottom: "28px",
                textAlign: "center",
                ...raindrop(showStep2Definition),
              }}
            >
              <p style={{ fontSize: "22px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> {streamedStep2Def}
                <TypingCursor
                  show={
                    streamedStep2Def.length > 0 &&
                    streamedStep2Def.length < step2DefText.length
                  }
                />
              </p>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {knowledgeSnippets.map((snippet, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                    backgroundColor: colors.snow,
                    borderRadius: "16px",
                    padding: "26px 32px",
                    borderLeft: `6px solid ${colors.denim}`,
                    boxShadow: `0 4px 16px ${colors.espresso}06`,
                    ...raindrop(showKnowledge[i]),
                  }}
                >
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: colors.denim,
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {snippet.relevance}%
                    <div
                      style={{
                        fontSize: "12px",
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
                        fontSize: "15px",
                        color: colors.denim,
                        fontWeight: 600,
                        marginBottom: "6px",
                      }}
                    >
                      {snippet.source}
                    </div>
                    <div style={{ fontSize: "20px", color: colors.cocoa }}>
                      {snippet.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 8: Step 3 - Generate Response */}
        {phase === 8 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1100px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                ...raindrop(showStep3Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 22px",
                  backgroundColor: colors.salmon,
                  color: colors.snow,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                }}
              >
                Benchmark Testing
              </span>
            </div>

            <BigStepTitle
              number="3"
              title="Generate Response"
              color={colors.salmon}
              show={showStep3BigTitle}
            />

            <div
              style={{
                backgroundColor: `${colors.salmon}15`,
                borderRadius: "14px",
                padding: "22px 36px",
                marginBottom: "28px",
                textAlign: "center",
                ...raindrop(showStep3Definition),
              }}
            >
              <p style={{ fontSize: "22px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> {streamedStep3Def}
                <TypingCursor
                  show={
                    streamedStep3Def.length > 0 &&
                    streamedStep3Def.length < step3DefText.length
                  }
                />
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "18px",
                  padding: "32px",
                  borderLeft: `6px solid ${colors.olive}`,
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showStep3Expected),
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
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
                    fontSize: "22px",
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
                  borderRadius: "18px",
                  padding: "32px",
                  borderLeft: `6px solid ${colors.salmon}`,
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showStep3AI),
                }}
              >
                <div
                  style={{
                    fontSize: "15px",
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
                    fontSize: "22px",
                    lineHeight: 1.6,
                    color: colors.cocoa,
                    minHeight: "60px",
                  }}
                >
                  {streamedAiAnswer}
                  <TypingCursor
                    show={
                      streamedAiAnswer.length > 0 &&
                      streamedAiAnswer.length < aiAnswer.length
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 9: Step 4 - Calculate Score */}
        {phase === 9 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginBottom: "10px",
                ...raindrop(showStep4Title),
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 22px",
                  backgroundColor: passed ? colors.olive : colors.tangerine,
                  color: colors.snow,
                  borderRadius: "20px",
                  fontSize: "16px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  transition: "background-color 0.4s",
                }}
              >
                {passed ? "✓ Test Passed!" : "Benchmark Testing"}
              </span>
            </div>

            <BigStepTitle
              number="4"
              title="Calculate Score"
              color={passed ? colors.olive : colors.tangerine}
              show={showStep4BigTitle}
            />

            <div
              style={{
                backgroundColor: `${colors.tangerine}10`,
                borderRadius: "14px",
                padding: "22px 36px",
                marginBottom: "28px",
                textAlign: "center",
                ...raindrop(showStep4Definition),
              }}
            >
              <p style={{ fontSize: "22px", color: colors.cocoa, margin: 0 }}>
                <strong>What this means:</strong> {streamedStep4Def}
                <TypingCursor
                  show={
                    streamedStep4Def.length > 0 &&
                    streamedStep4Def.length < step4DefText.length
                  }
                />
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: "24px",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "18px",
                  padding: "32px",
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showFaithfulness),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Faithfulness
                  </span>
                  <span
                    style={{
                      fontSize: "44px",
                      fontWeight: 700,
                      color: colors.denim,
                    }}
                  >
                    {faithfulness.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginBottom: "14px",
                  }}
                >
                  Is the answer factually correct?
                </div>
                <div
                  style={{
                    height: "12px",
                    backgroundColor: colors.sand,
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${faithfulness * 100}%`,
                      backgroundColor: colors.denim,
                      borderRadius: "6px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.mocha,
                    marginTop: "10px",
                    textAlign: "right",
                  }}
                >
                  Target: ≥0.90
                </div>
              </div>

              <div
                style={{
                  backgroundColor: colors.snow,
                  borderRadius: "18px",
                  padding: "32px",
                  boxShadow: `0 4px 16px ${colors.espresso}06`,
                  ...raindrop(showSimilarity),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 600,
                      color: colors.espresso,
                    }}
                  >
                    Similarity
                  </span>
                  <span
                    style={{
                      fontSize: "44px",
                      fontWeight: 700,
                      color: colors.olive,
                    }}
                  >
                    {similarity.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    color: colors.mocha,
                    marginBottom: "14px",
                  }}
                >
                  Does it mean the same thing?
                </div>
                <div
                  style={{
                    height: "12px",
                    backgroundColor: colors.sand,
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${similarity * 100}%`,
                      backgroundColor: colors.olive,
                      borderRadius: "6px",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: colors.mocha,
                    marginTop: "10px",
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
                  padding: "28px",
                  ...raindrop(showResult),
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    backgroundColor: passed ? `${colors.olive}15` : colors.sand,
                    border: `4px solid ${passed ? colors.olive : colors.hazelnut}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "14px",
                    boxShadow: passed ? `0 8px 24px ${colors.olive}25` : "none",
                    transition: "all 0.4s ease",
                  }}
                >
                  {passed ? (
                    <svg
                      width="60"
                      height="60"
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
                        width: "40px",
                        height: "40px",
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
                    fontSize: "26px",
                    fontWeight: 700,
                    color: passed ? colors.olive : colors.mocha,
                  }}
                >
                  {passed ? "PASSED" : "Checking..."}
                </div>
              </div>
            </div>

            {/* Pass Reason - NEW SECTION */}
            {showPassReason && (
              <div
                style={{
                  marginTop: "28px",
                  backgroundColor: `${colors.olive}10`,
                  border: `2px solid ${colors.olive}`,
                  borderRadius: "18px",
                  padding: "24px 36px",
                  animation: "fadeIn 0.5s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                  }}
                >
                  <span style={{ fontSize: "36px" }}>✅</span>
                  <div>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: colors.olive,
                        marginBottom: "10px",
                      }}
                    >
                      Why This Test Passed
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        color: colors.cocoa,
                        lineHeight: 1.6,
                      }}
                    >
                      <strong>Both metrics exceeded their thresholds:</strong>
                      <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
                        •{" "}
                        <strong style={{ color: colors.denim }}>
                          Faithfulness (0.94)
                        </strong>{" "}
                        ≥ 0.90 target — The AI's answer is factually consistent
                        with the knowledge base
                        <br />•{" "}
                        <strong style={{ color: colors.olive }}>
                          Similarity (0.87)
                        </strong>{" "}
                        ≥ 0.70 target — The AI's response conveys the same
                        meaning as the expected answer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase 10: Results */}
        {phase === 10 && (
          <div
            style={{
              width: "100%",
              maxWidth: "1200px",
              textAlign: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div style={raindrop(showResultsTitle)}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  backgroundColor: colors.olive,
                  color: colors.snow,
                  borderRadius: "24px",
                  fontSize: "18px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "28px",
                }}
              >
                Our Results
              </span>
              <h1
                style={{
                  fontSize: "52px",
                  fontWeight: 700,
                  color: colors.espresso,
                }}
              >
                AI That Keeps Getting Better
              </h1>
            </div>

            <p
              style={{
                fontSize: "26px",
                color: colors.mocha,
                marginTop: "20px",
                marginBottom: "44px",
                ...raindrop(showResultsSubtitle),
              }}
            >
              Real results from our AI Agent Management service:
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px",
                marginBottom: "44px",
              }}
            >
              {resultMetrics.map((metric, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.snow,
                    borderRadius: "22px",
                    padding: "40px 32px",
                    boxShadow: `0 4px 20px ${colors.espresso}06`,
                    border: `2px solid ${colors.olive}`,
                    ...raindrop(showResultsMetrics[i]),
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>
                    {metric.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "56px",
                      fontWeight: 700,
                      color: colors.olive,
                      marginBottom: "8px",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                      color: colors.espresso,
                      marginBottom: "8px",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div style={{ fontSize: "17px", color: colors.mocha }}>
                    {metric.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={raindrop(showCTA)}>
              <p
                style={{
                  fontSize: "22px",
                  color: colors.mocha,
                }}
              >
                Trusted by 750+ brands worldwide
              </p>
            </div>
          </div>
        )}

        {/* Phase 11: Final Logo Slide */}
        {phase === 11 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              animation: "fadeIn 0.5s ease",
            }}
          >
            <div
              style={{
                ...raindrop(showFinalLogo),
                marginBottom: "32px",
              }}
            >
              <img
                src="/images/logo.png"
                alt="Influx"
                style={{
                  height: "80px",
                  width: "auto",
                }}
              />
            </div>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 700,
                color: colors.espresso,
                textAlign: "center",
                margin: 0,
                ...raindrop(showFinalTagline, 0.2),
              }}
            >
              AI that gets better every day.
            </h1>
          </div>
        )}
      </main>

      {/* Control Panel - shows when demo started and UI visible */}
      {started && showUI && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 100,
            background: colors.snow,
            padding: "10px 16px",
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
            disabled={phase >= 11}
            style={{
              background: phase >= 11 ? colors.sand : colors.tangerine,
              color: phase >= 11 ? colors.hazelnut : colors.snow,
              border: `2px solid ${phase >= 11 ? colors.hazelnut : colors.tangerine}`,
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: phase >= 11 ? "not-allowed" : "pointer",
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
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: colors.sand,
            color: colors.mocha,
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            opacity: 0.3,
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
