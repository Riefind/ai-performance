# Influx - AI Context Engine

AI-optimized context for Influx's fleet of AI agents, with tools to evaluate and improve agent performance.

**Quick links:**
- [Dashboard](docs/index.html) - Quality scores and simulation results
- [Brand Guidelines](docs/BRAND.md) - Visual design guide for docs and dashboards
- [Context Engineering Guidelines](AGENTS.md) - AI assistant instructions for editing context

## Getting Started

This guide walks you through setting up your context engineering environment. Follow these steps in order for the best experience.

### Step 1: Request Claude Access

1. Ping **@mikey** on Slack to request an Influx Claude Teams account
2. Wait for the invitation email
3. Visit [claude.ai](https://claude.ai) and sign up using your **Influx company email address**
4. Verify your email and complete account setup

### Step 2: Download Zed Editor

1. Visit [zed.dev](https://zed.dev)
2. Download Zed for your operating system (macOS, Linux, or Windows)
3. Install and launch Zed

### Step 3: Authenticate Claude Code

1. Open Zed's Agent Panel (right side of the editor)
2. Ask Claude any question to trigger the authentication flow
3. When prompted to select a login method, choose **Claude account with subscription** (Pro, Max, Team, or Enterprise)
4. Sign in with your Influx Claude Teams account credentials when the browser opens

### Step 4: Clone and Open Repository

**Option A: Clone in Zed (Recommended)**

1. Launch Zed
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Linux/Windows) to open the command palette
3. Type "clone" and select **"projects: Clone Repository"**
4. Paste the repository URL: `git@github.com:influx-context-engine/influx.git`
5. Choose a location to save the repository
6. Zed will automatically open the cloned repository

**Option B: Clone via Terminal**

```bash
# Clone context repository
git clone git@github.com:influx-context-engine/influx.git
cd influx
```

Then launch Zed and use File → Open Folder to select the `influx` folder.

### Step 5: Add MotherDuck Data Pipeline (Optional)

Connect to Influx's data pipeline for analytics queries (CSAT scores, conversation metrics, etc.).

**1. Get API Key**

Ping **@mikey** on Slack to request:
- MotherDuck API key
- Confirmation that the data pipeline is set up for your use case

**2. Add Custom Server in Zed**

1. Open the Assistant Panel (right side of the editor)
2. Click the three dots menu (⋯) in the top right corner
3. Select **Add Custom Server**
4. Enter the following:

```json
{
  "name": "MotherDuck",
  "url": "https://api.motherduck.com/mcp",
  "headers": {
    "Authorization": "Bearer YOUR_API_KEY_FROM_MIKEY"
  }
}
```

Replace `YOUR_API_KEY_FROM_MIKEY` with the API key you received from Mikey.

**3. Usage Examples**

Once configured, use Claude Code to query the data pipeline:

```
Get CSAT scores from [your client] for the last 30 days
```

```
Show me conversation volume trends by agent
```

```
What's the average resolution time for ai-services-sales?
```

### Step 6: Install Evaluation Tools

Open Zed's integrated terminal with `Cmd+\`` (macOS) or `Ctrl+\`` (Linux/Windows), then follow the installation steps below.

#### Prerequisites

- Python 3.14+
- [uv](https://docs.astral.sh/uv/) package manager
- Google Gemini API key

#### Installation - Unix/macOS

```bash
# Install uv package manager
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install tools
uv venv
uv pip install git+ssh://git@github.com/influx-context-engine/tools.git

# Configure API key
echo "GOOGLE_API_KEY=your-key-here" > .env

# Set up shell aliases (optional - for convenience)
echo 'alias sim="uv run sim"' >> ~/.zshrc
echo 'alias lint="uv run lint"' >> ~/.zshrc
echo 'alias score="uv run score"' >> ~/.zshrc
source ~/.zshrc
```

#### Installation - Windows

```powershell
# Install uv package manager
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Create virtual environment and install tools
uv venv
uv pip install git+ssh://git@github.com/influx-context-engine/tools.git

# Configure API key (create .env file)
# Use a text editor to create .env with:
# GOOGLE_API_KEY=your-key-here

# Set up PowerShell functions (optional - for convenience)
@"
function sim { uv run sim @args }
function lint { uv run lint @args }
function score { uv run score @args }
"@ | Add-Content $PROFILE
. $PROFILE
```

**Important for Windows users:**
- Save all `.env`, `.yaml`, and `.md` files as **UTF-8** encoding (not UTF-16 or ANSI)
- Most modern editors default to UTF-8, but verify in "Save As" dialog
- If you see encoding errors, check file encoding in your editor

#### Environment Configuration

The evaluation tools use the Gemini API for automated testing. Configure via `.env`:

```
GOOGLE_API_KEY=your-key-here
```

**Note**: This API key is used exclusively by the evaluation tools (`sim`, `lint`, `score`) for automated benchmarking with Gemini models. It is **not** used by Claude Code, which has its own separate authentication.

### Verify Setup

#### Test Claude

In Zed's Agent Panel, try a test prompt:
```
Show me the project structure and explain what this repository does
```

#### Test Evaluation Tools

In Zed's terminal, run your first simulation:

```bash
sim ai-services-sales
```

**Note:** If you skipped setting up aliases, use `uv run sim ai-services-sales` instead.

View results in Zed's terminal:
```bash
# Summary report
cat agents/ai-services-sales/report.yaml

# Detailed cache (JSON)
cat .cache/simulation/ai-services-sales.json
```

## Why Claude for Context Engineering?

Claude outperforms other models for the context engineering tasks required by AI Agent Managers:

- **Superior technical writing**: Claude consistently produces crisper, more token-efficient documentation than other models. It naturally writes in atomic sentences, avoids redundancy, and maximizes information density without prompting.

- **Context engineering specialization**: Claude is trained on instruction design patterns and understands how AI agents consume context. It writes agent instructions that are both human-readable and optimally structured for AI consumption.

- **Multi-file reasoning**: Claude can hold entire agent configurations in context (instructions.md + knowledge files + benchmarks.yaml + config.yaml) and reason about how changes propagate across files. Other models struggle with this cross-file dependency tracking.

- **Automatic AGENTS.md compliance**: Claude reads your `AGENTS.md` file and enforces those standards without explicit reminders. Other assistants require constant prompting to follow context engineering principles.

- **Better at iterative refinement**: When you ask Claude to "make this crisper" or "reduce token count by 20%", it understands the nuanced trade-offs between clarity and brevity. Other models often over-simplify or miss the intent.

**Use Claude for**: Writing/editing agent instructions, optimizing knowledge files, generating test cases, conducting quality reviews.

**Use evaluation tools (`sim`, `lint`, `score`) for**: Automated evaluation, benchmarking, and scoring.

## Context Engineering Workflows

Once your environment is set up, use Claude in Zed for these common tasks:

**Editing Agent Instructions:**
```
Review agents/ai-services-sales/instructions.md for crispness and token efficiency
```

**Multi-file Agent Updates:**
```
Update the ai-services-sales agent to handle pricing questions.
Update instructions.md, add knowledge/products/pricing.md, and add 3 test cases to benchmarks.yaml
```

**Knowledge Base Optimization:**
```
Audit knowledge/products/ for redundancy. Consolidate overlapping content and improve token efficiency.
```

**Test Case Generation:**
```
Generate 10 test cases for the security-questionnaire-responder based on common security questionnaire patterns
```

**Quality Reviews:**
```
Review this file following AGENTS.md principles. Identify redundancy, improve crispness, suggest atomic sentence rewrites.
```

## Claude in Zed - Key Features

- **Auto-reads AGENTS.md**: Automatically understands your context engineering standards
- **File mentions**: Use `@filename` to add files to context
- **Multi-file edits**: Edits multiple related files in a single operation
- **Terminal integration**: Run `sim`, `lint`, `score` commands and interpret results
- **Git awareness**: Reviews diffs, writes commits, and manages branches

## Evaluation Tools

The tools package provides CLI commands for automated testing and deployment:

### Simulator (`sim`)

Evaluate agent performance with faithfulness and similarity scoring.

```bash
# Interactive agent picker (if no agent specified)
sim

# Run benchmarks for an agent
sim ai-services-sales

# Rerun specific test by hash
sim ai-services-sales --rerun 98e1a9a7

# Show cached result details
sim ai-services-sales --show 98e1a9a7

# Force complete rerun (ignore cache)
sim ai-services-sales --force

# Compact output (dots for pass/fail, for CI)
sim ai-services-sales --compact

# Parallel execution (default: 5 workers)
sim ai-services-sales --workers 20

# Verbose output
sim ai-services-sales --verbose
```

**Agent Selection:**
- Run without arguments to see interactive picker
- Auto-selects if only one agent exists
- Ctrl+C exits cleanly at any point

**Parallel Execution:**
- Default: 10 concurrent workers
- Use `--workers N` to adjust parallelism
- Use `--interactive` for sequential mode with failure prompts

**Caching:**
- Results cached in `.cache/simulation/`
- Embeddings cached in `.cache/embeddings/`
- Default behavior resumes from last run and skips passed tests
- `--force` ignores all cache and reruns everything

### Markdown Linter (`lint`)

Enforce token-efficient markdown standards.

```bash
# Interactive agent picker
lint

# Lint an agent
lint ai-services-sales

# Strict mode (warnings as errors)
lint ai-services-sales --strict

# Compact output (for CI)
lint ai-services-sales --compact
```

**Rules enforced:**
- 2-space list indentation (not 4-space)
- Proper heading syntax (`## Title`, not `##Title`)
- No gaps in lists
- Warnings for bold/italic (redundant for AI)

### Context Quality Evaluator (`score`)

Score context quality with detailed feedback.

```bash
# Interactive agent picker
score

# Score an agent
score ai-services-sales

# Compact output (for CI)
score ai-services-sales --compact
```

**Scoring criteria (0-10):**
- **Crispness**: Zero redundancy, atomic sentences, DRY, scannable
- **Token Efficiency**: High information density, no boilerplate

**Output:**
- Score (0-10)
- Estimated waste percentage
- Strengths (bullet list)
- Improvements (3-4 highest-impact fixes)

## Project Structure

```
influx/
├── agents/
│   ├── ai-services-sales/
│   │   ├── config.yaml         # id, context, actions
│   │   ├── instructions.md     # Agent behavioral config
│   │   ├── greeting.md         # Initial greeting
│   │   ├── benchmarks.yaml     # Test cases
│   │   └── report.yaml         # Quality & simulation results
│   └── _template.html          # HTML template for agent reports
├── knowledge/
│   ├── general/
│   ├── products/
│   └── policies/
├── docs/                       # Documentation site
│   ├── index.html              # Agent dashboard (quality scores & simulation results)
│   ├── agents/                 # Per-agent report pages
│   ├── assets/                 # Styles, images, logo
│   └── BRAND.md                # Visual design guidelines
├── observations/               # Conversation data for analysis (gitignored)
├── .cache/                     # All cached data (gitignored)
│   ├── agents/                 # Per-agent cache
│   ├── embeddings/             # Embedding cache
│   └── quality/                # Quality eval cache
└── AGENTS.md                   # AI assistant instructions (auto-read by Claude)
```

### Observations Folder

The `observations/` folder stores conversation data, support tickets, and other behavioral evidence for context engineering analysis. Add files from:

- LiveKit conversation transcripts
- Gorgias/Intercom support tickets
- Agent behavioral logs
- User feedback sessions

Context engineers and AI analyze these observations to identify improvement opportunities and refine agent instructions and knowledge. The folder is gitignored to prevent committing sensitive conversation data.

## Agent Configuration

### config.yaml

```yaml
id: 1

context:
  - knowledge/general/about-influx.md
  - knowledge/products/ai-agent-management.md

actions:
  - ignore
  - snooze
  - close
  - handover
```

**Fields:**
- `id` - Unique numeric identifier
- `context` - Knowledge files to include
- `actions` - Valid post-turn actions

### benchmarks.yaml

```yaml
cases:
  - query: What is Influx AI?
    expected_response:
      Influx AI is our managed service that helps improve your AI agents every single day.
    expected_action: ignore
    variables: {}
    context:
      - knowledge/general/about-influx.md

  - query: How do I get started with {{product}}?
    expected_response:
      To get started with AI Agent Management...
    expected_action: ignore
    variables:
      product: AI Agent Management
    context:
      - knowledge/products/ai-agent-management.md
```

**Fields:**
- `query` - User input to test
- `expected_response` - Expected agent response
- `expected_action` - Expected action (optional)
- `variables` - Template substitution (optional)
- `context` - Override default context (optional)

**Per-case context:**
- Overrides agent's default context for isolated testing
- Tests specific knowledge files independently
- Faster (smaller prompts), clearer diagnostics
- Use for pinpointing which knowledge needs improvement

### instructions.md Template

```markdown
# Agent Name

## Role Identity
Define who the agent is and their primary purpose.

## Tone Personality
- Communication style
- Key traits
- Formality level

## Output Rules
- Format requirements
- Length constraints
- Structure guidelines

## Conversational Flow
- Greeting handling
- Topic transitions
- Conversation closing

## Tool Use Guidance
- When/how to use actions
- Decision criteria
- Fallback behavior

## Guardrails
- What agent must never do
- Topics to avoid
- Ethical boundaries
```

## Evaluation Metrics

### Similarity (0.0-1.0)
- Cosine similarity of embeddings (Gemini embedding-001)
- Measures how similar generated response is to expected response
- Threshold: 0.7 (default)

### Faithfulness (0.0-1.0)
- Two-stage LLM verification:
  1. Extract atomic statements from response
  2. Verify each statement supported by context
- Score = (supported statements) / (total statements)
- Threshold: 0.9 (default)

### Pass/Fail
Test passes if **both** metrics exceed thresholds.

## Documentation Site

The `docs/` directory contains a visual dashboard for agent quality and performance:

- **Dashboard** (`docs/index.html`): Overview of all agents with quality scores, pass rates, and test counts
- **Agent Reports** (`docs/agents/{agent}.html`): Detailed per-agent quality feedback, file scores, and benchmark results
- **Assets** (`docs/assets/`): Shared styles (`styles.css`), logo, and images
- **Brand Guidelines** (`docs/BRAND.md`): Visual design standards for all documentation

Reports are auto-generated from `data/{agent}/report.json` and `data/{agent}/simulation.json` (produced by evaluation tools).

### Brand Guidelines

Review [`docs/BRAND.md`](docs/BRAND.md) before creating any visual artifacts. Key standards:

**Color Palette:**
- Primary: Tangerine (#FFA400), Salmon (#F38454), Espresso (#201B13)
- Secondary: Forest (#354A0A), Sunflower (#FFBB00), Cerulean (#122849), Burgundy (#660016)
- Neutrals: Cocoa, Sand, Bone, Snow
- All colors available in 500-50 weights

**Typography:**
- Primary: Calibre
- Fallback: Inter Display Medium (headlines), Inter Regular/Italic (body)
- Load from Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`

**Logo Usage:**
- Light background: Tangerine lifebuoy + Espresso wordmark
- Dark background: Tangerine lifebuoy + White wordmark
- Clearspace: One lifebuoy width around full logo
- Assets: [Google Drive](https://drive.google.com/drive/folders/1QAvlGGan64dFr54on7EaFkAsNpw6iYbB)

**Copywriting:**
- Clear & concise, customer benefit first
- Human tone, not corporate
- Use: support, scale, on-demand, experts, brands, partners
- Avoid: cheap (use affordable), speedy (use efficient), buzzwords, unexplained acronyms

### Creating New Dashboards

When building visual artifacts (dashboards, reports, HTML pages):

1. Read [`docs/BRAND.md`](docs/BRAND.md) for complete color palette and design standards
2. Reference [`docs/assets/styles.css`](docs/assets/styles.css) for CSS variables and component styles
3. Use single-file HTML with inline CSS (no external dependencies beyond fonts)
4. Apply semantic color variables from styles.css:
   - `--color-primary` (Tangerine)
   - `--color-success` (Olive), `--color-warning` (Sunflower), `--color-error` (Redwood)
   - `--color-text`, `--color-text-muted`, `--color-surface`, `--color-border`
5. Link required assets:
   - `<link rel="stylesheet" href="../assets/styles.css" />`
   - `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />`
   - `<link rel="icon" href="../assets/images/icon.png" type="image/png" />`
6. Output to `docs/` directory with descriptive filenames

**Template Structure:**

See [`agents/_template.html`](agents/_template.html) for reference implementation:
- Header with logo and navigation
- Score badges with color-coded quality levels (`.score--high`, `.score--medium`, `.score--low`)
- Stats grid for metrics display
- Card layouts for content sections
- Tables with hover states for benchmark results
- Footer with timestamp
- JavaScript for dynamic data loading from JSON files

**Common Components:**
- `.card`: White background, border, rounded corners, hover shadow
- `.stat`: Centered metric display with value + label
- `.score`: Circular badge (48px) with quality color coding
- `.badge`: Inline status indicator (pass/fail/pending)
- `.table-container`: Responsive table wrapper with overflow scrolling

## Context Engineering Guidelines

When editing context files in this repository, follow the principles in [`AGENTS.md`](./AGENTS.md).

**Key principles:**
- **Conciseness and Clarity**: Ruthlessly edit for brevity without losing meaning
- **Iterative Simplification**: Challenge every component—is this word necessary?
- **Function Over Form**: Primary audience is AI agents (functional, unambiguous, structured)

**For AI assistants**: Review `AGENTS.md` before editing any context files. It defines:
- Quality criteria (crispness, token efficiency)
- Markdown formatting standards
- 7 core behavioral configuration fields
- Knowledge & Guidance structure (IF-THEN format, DRY principle)
- Refinement process (duplication check, Pascal pass, output strategy)

## Best Practices

### Use Per-Case Context

```yaml
# config.yaml - broad default context
context:
  - knowledge/general/about.md
  - knowledge/products/features.md

# benchmarks.yaml - isolated testing
cases:
  - query: What is Influx?
    context:
      - knowledge/general/about.md  # Test ONLY general knowledge
  
  - query: What features exist?
    context:
      - knowledge/products/features.md  # Test ONLY product docs
```

**Benefits:**
- Pinpoint which knowledge file needs improvement
- Faster tests (smaller prompts)
- Clearer diagnostic intent
- Better AI collaboration during review

**Use when:**
- Testing specific knowledge files
- Debugging failures
- Need clear isolation

**Don't use when:**
- Query requires multiple knowledge sources
- Testing integration across files

### Context Engineering Quality

Use `score` tool for systematic audits:
- Run `score <agent>` regularly
- Before releases: check all agent contexts
- Track improvements over time

Use Claude for real-time editing:
- "Review this for crispness"
- "Any redundancy here?"

## Development

### Add New Agent

1. Copy existing agent as template (in Zed's terminal):

```bash
cp -r agents/ai-services-sales agents/my-agent
```

2. Edit agent files in Zed:
   - `config.yaml`: Update id, context, actions
   - `instructions.md`: Update role, tone, flow, guardrails
   - `greeting.md`: Update greeting text
   - `benchmarks.yaml`: Update test cases

3. Create agent report page:
   - Copy `agents/_template.html` to `docs/agents/my-agent.html`
   - Update `docs/index.html` AGENTS array with new agent info

4. Run evaluation tools to generate data:

```bash
sim my-agent
score my-agent
```

5. Open `docs/index.html` in browser to view updated dashboard

### Add Knowledge

Add markdown files to `knowledge/` subdirectories, reference in `config.yaml`.

## Updating

### Get Latest Context

Use Zed's Git Panel to fetch updates:

1. Open the Git Panel with `cmd-shift-g` (or `ctrl-shift-g` on Linux)
2. Click the **Fetch** button in the panel toolbar
3. If updates are available, click **Pull** to download them
