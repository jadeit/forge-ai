# Forge AI

The aim of this project is to create agents, hooks and tools with which AI assisted coding can be done quickly, effectively and accurately. Everything described in this project is aimed towards creating the correct cadence, documentation and steps to aid in creating quality projects that are scalable, maintainable and cost effective.

## Design Principles

### Tooling Principles

The following principles govern how the Forge tools themselves are built:

1. **Single Responsibility** — each tool, agent, or hook does one thing well.
2. **Clear Contracts** — every operation has defined inputs, outputs, and side effects. No implicit dependencies.
3. **Composability** — tools can be chained. The output of one operation is a valid input for the next. Phase-level commands orchestrate atomic operations.
4. **Minimal Coupling** — tools depend on the artifact structure (files in `docs/` and `.forge/`), not on each other. Changing one tool doesn't break another.
5. **Idempotency Where Possible** — running a tool twice with the same input produces the same result. Particularly important for AI agents where you might need to regenerate an artifact.
6. **Transparency** — every tool logs what it did, what it produced, and what it changed. No silent side effects.

### Code Generation Principles

Agent prompts for code generation and design phases must instruct the AI to:

- Apply SOLID principles.
- Use established and accepted design patterns.
- Follow language-specific best practices and conventions.
- Produce code that is simple, DRY, and maintainable.

### Tooling Philosophy

- **Deterministic tooling is preferred over AI** for tasks with well-defined, repeatable outcomes. Use linters, formatters, static analysers, test runners, and validators where they exist. Reserve AI agents for tasks requiring judgment, context interpretation, or content generation.
- Use existing coding tools extensively to lift the quality of the AI generated code base.
- Use linting and static code analysis tools extensively to ensure code quality and security. Use language-specific linting and complexity guidelines where available; fall back to SonarQube-defined guidelines otherwise.
- Diagrams must be created using Mermaid.
- Documentation must be created using Markdown with YAML frontmatter.
- Implementation must be done step by step.

## Platform Compatibility

Forge must be compatible with both Claude Code and OpenCode, with clean switching between the two mid-project. A user may use Claude Code for specific phases and OpenCode for others depending on model quality and cost considerations.

### Architecture

- **Platform-agnostic core** — the artifact structure (`docs/` and `.forge/`), document templates, frontmatter schemas, state management, and agent prompts are plain files with no platform-specific dependencies. This is the source of truth.
- **Thin platform adapters** — each platform gets a minimal adapter layer that wires the core into its plugin system. Adapters live in `.forge/adapters/claude-code/` and `.forge/adapters/opencode/`.
- **Generic prompts** — agent prompts must not use platform-specific features. Prompts are written against a generic capability set; the adapter translates to platform specifics at runtime.

## Artifact Structure

### Directory Layout

```
docs/
  constitution.md          # Phase 0 — project principles and governance
  conversion-report.md     # Conversion summary (only for converted projects)
  planning/                # Phase 1 outputs
  design/                  # Phase 2 outputs
    tasks/                 # Individual task documents
  testing/                 # Phase 4 results
  deployment/              # Phase 5 runbooks and configuration docs
  defects/                 # Defect reports from any phase
.forge/
  state.yaml               # Phase tracking, feature status, gates
  config.yaml              # Tool configuration, thresholds, extensions
  adapters/
    claude-code/           # Claude Code platform adapter
    opencode/              # OpenCode platform adapter
```

### Naming Conventions

All artifact files use strict naming conventions so that tooling can locate them reliably.

#### Phase 0: Constitution

| File | Path |
|------|------|
| Project Constitution | `docs/constitution.md` |

#### Phase 1: Planning

| File | Path |
|------|------|
| Project Scope | `docs/planning/project-scope.md` |
| User Stories | `docs/planning/user-stories.md` |
| Implementation Plan | `docs/planning/implementation-plan.md` |
| Technology & Architecture | `docs/planning/technology-and-architecture.md` |

#### Phase 2: Design

| File | Path |
|------|------|
| Design Decisions | `docs/design/design-decisions.md` |
| Task List | `docs/design/task-list.md` |
| Individual Task | `docs/design/tasks/{task-slug}.md` |

#### Phase 4: Testing

| File | Path |
|------|------|
| UAT Results | `docs/testing/uat-results.md` |

#### Defects (any phase)

| File | Path |
|------|------|
| Defect Report | `docs/defects/{defect-slug}.md` |

#### Conversion (standalone)

| File | Path |
|------|------|
| Conversion Report | `docs/conversion-report.md` |

### Document Format

All documents use Markdown with YAML frontmatter. Frontmatter provides structured metadata that tooling can query; the body contains narrative content.

Illustrative code snippets (interfaces, schemas, API signatures, pseudo-code) are permitted in design artifacts to clarify intent. No executable implementations, project scaffolding, dependency installation, or infrastructure provisioning may be produced during Phases 1 or 2.

### Task Document Template

```yaml
---
title: Implement user authentication
status: not-started
mode: brownfield
complexity: medium
categories:
  - backend
  - database
dependencies:
  - database-schema-setup
affected_modules:
  - src/auth/
  - src/middleware/
---
```

#### Required Frontmatter Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Task title |
| `status` | enum | `not-started`, `in-progress:discover`, `in-progress:explore`, `in-progress:research`, `in-progress:clarify`, `in-progress:approach`, `in-progress:implement`, `in-progress:review`, `in-progress:validate`, `complete`, `blocked` |
| `mode` | enum | `greenfield` or `brownfield` |
| `complexity` | enum | `small`, `medium`, `large` |
| `categories` | list | One or more from configured categories |
| `dependencies` | list | Task slugs that must be completed first |
| `affected_modules` | list | File paths or directories this task touches |

#### Required Body Sections

| Section | Description |
|---------|-------------|
| Summary / Objective | What this task achieves and why |
| Acceptance Criteria | What must be true for the task to be considered done |
| Implementation Detail | How to implement (may include illustrative code) |
| Testing Criteria | How to verify the acceptance criteria are met |

#### Task Categories

Default categories are defined in `.forge/config.yaml` and can be extended per project:

```yaml
task_categories:
  - infrastructure
  - backend
  - frontend
  - database
  - devops
  - documentation
```

The tooling validates that task documents only use recognised categories and warns on unknown ones.

### Defect Report Template

```yaml
---
title: Auth token not refreshing on expiry
severity: critical | high | medium | low
classification: design | implementation
status: open | routed | resolved
source:
  type: sentry | logs | test | uat | user-report
  url: https://sentry.io/issues/12345
  discovered: 2026-03-22T10:30:00Z
affected_features:
  - auth-system
routed_to: forge 2:design | forge 3:build
---
```

Body contains reproduction steps, expected vs actual behaviour, and any additional context.

## State Management

### State File

`.forge/state.yaml` tracks project progress:

```yaml
project_phase: 3
phase_history:
  - phase: 0
    status: complete
    completed: 2026-03-17T09:00:00Z
  - phase: 1
    status: complete
    completed: 2026-03-18T12:00:00Z
  - phase: 2
    status: complete
    completed: 2026-03-20T09:00:00Z
  - phase: 3
    status: in-progress
    started: 2026-03-20T10:00:00Z

features:
  auth-system:
    phase: 6
    mode: brownfield
    started: 2026-03-20T10:00:00Z
  api-pagination:
    phase: 4
    mode: greenfield
    started: 2026-03-21T14:00:00Z
```

### Artifact Tracking

A phase is not complete until all required artifacts for that phase exist and pass basic validation (frontmatter present, required fields populated). The tooling checks artifact completeness before proposing a state transition.

### Gate Behaviour

When a user attempts to run a phase whose prerequisites are not met, the tooling **warns and proceeds**. The warning identifies what is missing. The user can override and continue.

### State Transitions

State transitions use a hybrid approach:

1. Tooling checks artifact completeness for the current phase.
2. Tooling proposes the transition with reasoning (e.g., "Phase 1 complete — all required artifacts found. Confirm transition to Phase 2?").
3. User confirms or rejects.

## Project Phases

Project Phases operate at the **project level**. They govern the overall software development lifecycle.

### Phase 0: Constitution — `forge 0:constitution`

Establish the project's governing principles and development guidelines. The constitution is a user-defined document that shapes AI behaviour across all subsequent phases. It codifies non-negotiable standards — coding conventions, quality expectations, architectural boundaries, performance requirements, UX consistency rules, and any organisational constraints.

**Outputs:**

- `docs/constitution.md` — project principles, governance rules, and development guidelines

The constitution is loaded into agent context for every phase. All agent prompts reference it as a constraint. It can be updated at any time; changes take effect on the next phase invocation.

**When to use:** Run once at project inception. Revisit when project standards evolve or when AI-generated output consistently drifts from expectations.

### Phase 1: Planning — `forge 1:plan`

Ensure that the goals of the project and the implementation phases are well understood before moving onto design and development. Define stakeholders, user personas, and user stories to ensure clarity. Use the C4 Model approach to create diagrams that describe the system.

**Outputs:**

- `docs/planning/project-scope.md` — aim of the project, high-level design, high-level tech choices
- `docs/planning/user-stories.md` — user stories that drive development
- `docs/planning/implementation-plan.md` — high-level phases to be implemented
- `docs/planning/technology-and-architecture.md` — technology choices and high-level architecture

**Constraints:** No executable code, scaffolding, or infrastructure. Illustrative code snippets are permitted.

### Phase 2: Design — `forge 2:design`

Design each phase of the project. Use the documentation and existing code to design and plan a solution. If there are multiple alternatives, present them to the user for feedback.

**Outputs:**

- `docs/design/design-decisions.md` — documented design decisions
- `docs/design/task-list.md` — summary list of tasks
- `docs/design/tasks/{task-slug}.md` — one document per task following the task document template

Task documents must contain enough detail for a human or AI coder to pick up with limited or no context of the project.

**Constraints:** No executable code, scaffolding, or infrastructure. Illustrative code snippets are permitted.

**Consistency Check:**

Before Phase 2 is considered complete, the tooling runs a cross-artifact consistency analysis that verifies:

1. Every user story from Phase 1 is addressed by at least one task document.
2. Task dependencies reference valid task slugs that exist.
3. Acceptance criteria in task documents are consistent with the user stories they implement.
4. Technology choices in task implementation details align with the technology & architecture document.
5. No contradictions exist between design decisions and task documents.

The consistency check can also be invoked independently at any time via `forge 2:design --only consistency-check`. Findings are presented to the user for resolution before proceeding to Phase 3.

### Phase 3: Development — `forge 3:build`

Create the code necessary to implement the project and its implementation phase goals. This phase uses the Feature Development lifecycle described below.

### Phase 4: Functional Testing — `forge 4:test`

Use the project user stories and high-level requirements to test the project to ensure it aligns with expectations.

**UAT Gate Process:**

1. Tooling presents a checklist of user stories with their acceptance criteria.
2. For each, the user confirms: passed / failed / skipped.
3. Failed items produce defect reports in `docs/defects/`.
4. Skipped items are logged with a reason.
5. Results are stored in `docs/testing/uat-results.md`.
6. State transition to Phase 5 proceeds only after user sign-off.

User acceptance testing must be done by running the project locally and validating each user story.

### Phase 5: Deployment — `forge 5:deploy`

Deploy the project using the chosen methods and technologies.

### Phase 6: Maintenance — `forge 6:maintain`

Monitor the deployed project for issues using logs and APMs (e.g., Sentry) and capture issues for resolution. No code is written in this phase; issues are routed to the appropriate phase for resolution.

**Sub-operations:**

1. **Triage** — take an incident, error, or observation and produce a structured defect report in `docs/defects/`.
2. **Route** — based on classification, propose next action. Design defect → `forge 2:design`. Implementation defect → `forge 3:build` in greenfield mode. User confirms.
3. **Audit** — scan existing defect reports and summarise status (open, routed, resolved).

## Feature Development Lifecycle

Feature Development is the **engine inside Phase 3** (`forge 3:build`). It operates at the **feature/task level**, taking a single task and executing it through a build cycle.

Feature Dev is also **reusable standalone** — it can be invoked independently to implement new features or fix bugs outside of a full project lifecycle.

### Operating Modes

Feature Dev operates in one of two modes, detected automatically and confirmed by the user before proceeding:

| Mode | Condition | Behaviour |
|------|-----------|-----------|
| **Brownfield** | Task document exists in `docs/design/tasks/` with implementation detail | Lighter discovery. Implementation Approach validates rather than designs. |
| **Greenfield** | No task document exists, or document is a stub | Full scoping. Feature Dev produces its own task document. Heavier Discovery and Implementation Approach phases. |

**Detection:** Tooling checks `.forge/state.yaml` and `docs/design/tasks/` for a matching task document and evaluates its completeness.

**Override:** The `mode` field in task document frontmatter can explicitly set the mode regardless of detection.

**Confirmation:** Tooling proposes a mode with reasoning. User confirms or overrides before proceeding.

### Phases

| Command | Phase | Description |
|---------|-------|-------------|
| `forge 3:build 1:discover` | Discovery | Understand what needs to be built. In brownfield mode, orient within the existing task doc. In greenfield mode, scope the work and produce a task document. |
| `forge 3:build 2:explore` | Codebase Exploration | Understand relevant existing code, patterns, and conventions. |
| `forge 3:build 3:research` | Research | Research rapidly-evolving technologies, libraries, or frameworks relevant to the task. Produce or update a research document with findings on specific technical questions identified during discovery and exploration. See Research below. |
| `forge 3:build 4:clarify` | Clarifying Questions | Fill in gaps and resolve ambiguities. Output updates the task document. |
| `forge 3:build 5:approach` | Implementation Approach | In brownfield mode, validate the existing design against current code and flag deviations. In greenfield mode, design the implementation approach. Micro-decisions, not system architecture. |
| `forge 3:build 6:implement` | Implementation | Build the feature. |
| `forge 3:build 7:review` | Quality Review | Automated checks (linting, formatting, static analysis, tests, coverage, security audit) followed by AI code review. |
| `forge 3:build 8:validate` | Test Validation | Validate tests against the task document's acceptance criteria. See Test Validation below. |
| `forge 3:build 9:summarise` | Summary | Document what was accomplished. |

Sub-operations within any phase can be invoked independently using the `--only` flag (e.g., `forge 1:plan --only user-stories`).

### Research

Research (`forge 3:build 3:research`) is a dedicated step for investigating rapidly-evolving technologies, libraries, APIs, or frameworks relevant to the current task. Rather than relying on potentially outdated training data, this step explicitly instructs the AI to look up current documentation, version-specific behaviour, and known issues.

**When it matters:** Tasks involving technologies with frequent breaking changes (e.g., frontend frameworks, cloud SDKs, AI libraries) benefit most. For tasks using stable, well-established technology, this step can be lightweight or skipped.

**Process:**

1. Identify specific technical questions from discovery and exploration — not broad "research React" queries, but targeted questions like "does React 19 support concurrent rendering in server components?"
2. Use web search to find current documentation, release notes, and migration guides.
3. Produce or update a research document attached to the task with findings, version-specific details, and any implications for the implementation approach.

**Output:** Research findings are appended to the task document under a `## Research` section, or stored as a companion file at `docs/design/tasks/{task-slug}-research.md` for extensive findings.

**Platform Prerequisites:**

When running on OpenCode, the tooling must verify that web search and code search capabilities are enabled before the research step proceeds. If either capability is disabled, the tooling warns the user and provides instructions for enabling them. Without web search, the research step cannot access current documentation and should not proceed — the user must either enable web search or explicitly skip the research phase.

### Test Validation

Test validation (`forge 3:build 8:validate`) is a dedicated step that ensures tests prove the feature works as specified, not just that tests pass. It evaluates:

1. **Coverage mapping** — for each acceptance criterion in the task document, identify which test(s) validate it. Flag any acceptance criteria with no corresponding test.
2. **Assertion quality** — check that tests assert outcomes defined in the spec, not implementation details. Flag tests with no meaningful assertions, excessive mocking, or tautological checks.
3. **Negative testing** — verify that error cases and edge cases from the acceptance criteria are tested, not just the happy path.
4. **Independence check** — reason about whether tests would actually fail if the implementation were removed or broken.

### Quality Review Configuration

Quality thresholds are defined in `.forge/config.yaml`:

```yaml
quality:
  test_coverage_minimum: 80
  lint_must_pass: true
  type_check_must_pass: true
  security_audit_must_pass: true
```

Language-specific linting and complexity guidelines are used where available. Where no language-specific tooling exists, fall back to SonarQube-defined linting and complexity guidelines.

The specific linting and analysis tools are project-specific and use their own configuration files (`.eslintrc`, `pyproject.toml`, etc.). Forge checks that they pass.

### Rework Flow

When Quality Review or Test Validation finds issues:

- **Minor issues** (code fixes, missing assertions) — loop back to `forge 3:build 6:implement`.
- **Approach-level issues** (design was flawed) — loop back to `forge 3:build 5:approach`.
- The loop continues until review and validation pass.

When Functional Testing (Phase 4) or Maintenance (Phase 6) finds issues:

- **Design defects** — route to `forge 2:design`, which produces an updated task doc, then flows through Feature Dev as brownfield.
- **Implementation defects** — route directly to `forge 3:build` in greenfield mode, which generates its own task document during scoping.

## Context Budget

AI agents have finite context windows. The tooling loads the **minimum context needed** for the current operation, not everything the project has ever produced.

### Per-Phase Context Defaults

| Phase | Context Loaded |
|-------|---------------|
| `forge 0:constitution` | User input, existing README or project brief, existing constitution (if updating) |
| `forge 1:plan` | Constitution, user input, existing README or project brief |
| `forge 2:design` | Constitution, all Phase 1 outputs. Existing codebase structure if applicable. |
| `forge 3:build` (Feature Dev) | Constitution, specific task document, technology & architecture doc, relevant source files identified during explore phase. Not all task documents. Research findings when available. |
| `forge 4:test` | Constitution, user stories, task documents for implemented features, test results. |
| `forge 5:deploy` | Constitution, technology & architecture doc, infrastructure-related task docs. |
| `forge 6:maintain` | Constitution, specific error/incident context, relevant source files, related defect history. |

Context defaults are defined in `.forge/config.yaml` and can be overridden per project. If total context exceeds a configured threshold, the tooling warns the user to trim.

## Model Selection

Different phases have different demands on model capability. Planning, design, and review require deep reasoning. Implementation needs solid code generation. Summarisation needs very little. Matching models to phases optimises both quality and cost.

### Capability Tiers

Phases are mapped to capability tiers, and tiers are mapped to specific models. When a new model is released, update the tier mapping once rather than every phase.

```yaml
model_tiers:
  high:   claude-opus-4        # deep reasoning, architecture, review
  medium: claude-sonnet-4      # code generation, exploration, general
  low:    claude-haiku-4       # summarisation, simple transforms
```

### Phase-to-Tier Mapping

| Phase | Tier | Rationale |
|-------|------|-----------|
| `forge convert` | high | Complex assessment, cross-referencing existing artifacts with Forge structure |
| `forge 0:constitution` | high | Foundational principles with project-wide impact |
| `forge 1:plan` | high | Project-level decisions with lasting consequences |
| `forge 2:design` | high | System design, task decomposition, architectural choices |
| `forge 3:build 1:discover` | medium | Orienting within existing context |
| `forge 3:build 2:explore` | medium | Codebase navigation and pattern recognition |
| `forge 3:build 3:research` | medium | Web search and documentation lookup |
| `forge 3:build 4:clarify` | medium | Identifying gaps, formulating questions |
| `forge 3:build 5:approach` | high | Implementation strategy, design validation |
| `forge 3:build 6:implement` | medium | Code generation |
| `forge 3:build 7:review` | high | Judgment on code quality, SOLID compliance, pattern adherence |
| `forge 3:build 8:validate` | high | Reasoning about test adequacy and assertion quality |
| `forge 3:build 9:summarise` | low | Reformatting known information |
| `forge 4:test` | medium | UAT facilitation |
| `forge 5:deploy` | medium | Deployment execution |
| `forge 6:maintain` | medium | Triage, routing, audit |

### Behaviour

- Where the platform adapter supports it, the tooling sets the model automatically based on the tier mapping.
- Where the platform does not support automatic model switching, the tooling displays a recommendation to the user before proceeding.
- The user can override the tier for any invocation using the `--model` flag (e.g., `forge 3:build 6:implement --model high` for a particularly complex implementation task).

### Configuration

Tier mappings and phase assignments are defined in `.forge/config.yaml`:

```yaml
model_tiers:
  high:   claude-opus-4
  medium: claude-sonnet-4
  low:    claude-haiku-4

phase_models:
  convert:               high
  0_constitution:        high
  1_plan:              high
  2_design:            high
  3_build_1_discover:  medium
  3_build_2_explore:   medium
  3_build_3_research:  medium
  3_build_4_clarify:   medium
  3_build_5_approach:  high
  3_build_6_implement: medium
  3_build_7_review:    high
  3_build_8_validate:  high
  3_build_9_summarise: low
  4_test:              medium
  5_deploy:            medium
  6_maintain:          medium
```

## Project Conversion — `forge convert`

`forge convert` is a standalone command for adopting Forge on an existing project that was not built using the Forge process. It assesses the current state of the project, creates the `.forge/` and `docs/` structure, generates Forge-compatible artifacts from existing documentation and code, and flags gaps for the user to address.

### When to Use

Run `forge convert` once on an existing project that has code, documentation, or deployment artifacts but no `.forge/` directory. The command detects if `.forge/state.yaml` already exists and refuses to run on a project that has already been converted or initialised with Forge.

### Multi-Project Scope

For monorepos or multi-service projects, the tool asks the user whether to treat the repository as a single Forge project or multiple independent Forge projects. The user defines the boundary. Each Forge project gets its own `.forge/` directory and artifact structure.

### Conversion Flow

Conversion proceeds sequentially through each Forge phase, starting from Phase 0 (Constitution). The user may stop at any step and resume later. Stopping does not invalidate the work already done — completed conversion steps are recorded in state and the user can pick up where they left off.

#### Step 1: Scan

Discover what already exists in the project:

- **Documentation:** Scan common locations (`README.md`, `docs/`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, wiki directories, inline comments).
- **Configuration:** Detect project configuration that implies tech choices (`package.json`, `pyproject.toml`, `Dockerfile`, `terraform/`, CI/CD configs, linting configs).
- **Code structure:** Analyse the codebase to understand modules, services, and architectural patterns.
- **Tests:** Detect test frameworks, test suites, and coverage configuration.
- **Deployment:** Identify deployment configurations, infrastructure-as-code, container orchestration.
- **External sources:** The user may provide additional context not discoverable from the filesystem — links to Jira boards, Confluence pages, Google Docs, architecture diagrams, or pasted content. The tool accepts these and incorporates them into the assessment.

Present all findings to the user for confirmation before proceeding.

#### Step 2: Assess

Map findings to Forge phases. For each phase, classify as:

| Status | Meaning |
|--------|---------|
| **Complete** | Sufficient information exists to generate the Forge artifact. The phase's intent is fulfilled. |
| **Partial** | Some information exists but gaps remain. The Forge artifact can be scaffolded with what's available but needs user completion. |
| **Missing** | No meaningful information exists for this phase. |

Special handling for Phase 3 (Development): existing code is classified as **inherited** — it was not built through Forge, but it exists and does not need to be rebuilt.

Present the assessment to the user for confirmation or adjustment before proceeding.

#### Step 3: Generate — Phase by Phase

Work through each phase sequentially from Phase 0 upwards. For each phase:

1. Create the `.forge/` directory structure and configuration files (on first phase only).
2. Generate the Forge-format artifact(s) for the phase from existing documentation, code analysis, and user-provided context.
3. For **complete** phases: generate full artifacts. Mark phase as `converted:complete` in state.
4. For **partial** phases: generate artifacts with `TODO` markers identifying what's missing. Mark phase as `converted:partial` in state.
5. For **missing** phases: create stub artifacts with `TODO` markers for all required content. Mark phase as `converted:missing` in state.
6. Present the generated artifacts to the user for review.
7. The user may choose to refine the artifacts now, accept them as-is, or **stop conversion** and resume later.

Phase-specific generation notes:

- **Phase 0 (Constitution):** Draft a constitution inferred from the codebase — coding conventions visible in linting configs, test patterns, architectural style, directory conventions. User refines.
- **Phase 1 (Planning):** Generate project scope from README and documentation. Extract user stories from issue trackers, requirements docs, or user-provided sources. Infer implementation plan from code structure and git history.
- **Phase 2 (Design):** Generate design decisions from architecture docs. Create task documents retroactively for existing features. The tool asks the user which existing features to document rather than attempting to document everything — this prevents tedious over-documentation of large codebases.
- **Phase 3 (Development):** Code is inherited. No generation needed. Feature tracking is initialised for any features the user wants to manage going forward.
- **Phase 4 (Testing):** No retroactive test results are generated. If a test suite exists, record its existence and configuration.
- **Phase 5 (Deployment):** Generate deployment documentation from existing infrastructure config and CI/CD pipelines.
- **Phase 6 (Maintenance):** No retroactive maintenance artifacts. Initialise the defect tracking structure.

#### Step 4: Baseline

If the project has existing tests and linting:

1. Run the test suite and capture coverage metrics.
2. Run linters against the codebase and record results.
3. Use the results to set realistic quality thresholds in `.forge/config.yaml` rather than imposing defaults that the existing code may not meet.

If no tests or linting exist, set default thresholds and flag this gap in the conversion report.

#### Step 5: Report

Produce a conversion summary stored at `docs/conversion-report.md`:

- What was scanned and found.
- Phase-by-phase assessment (complete / partial / missing / inherited).
- What artifacts were generated.
- What gaps remain, with specific `TODO` markers.
- Recommended next steps — which phases to complete first, starting from the bottom up.

### State Tracking

Converted projects are flagged in `.forge/state.yaml`:

```yaml
conversion:
  converted: true
  converted_at: 2026-03-23T10:00:00Z
  source_context:
    - type: filesystem
      paths: [README.md, docs/, ARCHITECTURE.md]
    - type: external
      description: "Jira board PROJ-123"
  phase_assessments:
    0_constitution: generated
    1_plan: partial
    2_design: partial
    3_build: inherited
    4_test: missing
    5_deploy: complete
    6_maintain: missing
  conversion_progress: 2         # last completed conversion step (phase number)
```

The `conversion_progress` field tracks where the user stopped, allowing `forge convert` to resume from that point.

### Completing Gaps Post-Conversion

After conversion, the user completes partial and missing phases from the bottom up using the standard Forge commands:

1. `forge 0:constitution` — review and refine the generated constitution.
2. `forge 1:plan` — fill gaps in planning docs (flagged with `TODO` markers).
3. `forge 2:design` — complete task documents for features the user wants to manage.
4. Phase 3 is inherited — no action needed unless new features are being added.
5. `forge 4:test` — run UAT against the now-complete Phase 1 user stories.
6. Phases 5 and 6 proceed normally.

Standard phase commands detect the conversion state and operate in a gap-filling mode — they target `TODO` markers and missing content rather than generating from scratch.

## Command Reference

### Project Phases

| Command | Description |
|---------|-------------|
| `forge convert` | Adopt Forge on an existing project — scan, assess, and generate artifacts |
| `forge 0:constitution` | Establish or update project principles and governance |
| `forge 1:plan` | Planning and requirement analysis |
| `forge 2:design` | System design and task breakdown |
| `forge 3:build` | Development via Feature Dev lifecycle |
| `forge 4:test` | Functional testing and UAT |
| `forge 5:deploy` | Deployment |
| `forge 6:maintain` | Maintenance triage, routing, and audit |

### Feature Development (sub-phases of `forge 3:build`)

| Command | Description |
|---------|-------------|
| `forge 3:build 1:discover` | Understand what needs to be built |
| `forge 3:build 2:explore` | Explore relevant existing code |
| `forge 3:build 3:research` | Research current tech, libraries, and frameworks |
| `forge 3:build 4:clarify` | Resolve ambiguities, update task doc |
| `forge 3:build 5:approach` | Validate or design implementation approach |
| `forge 3:build 6:implement` | Build the feature |
| `forge 3:build 7:review` | Automated checks and AI code review |
| `forge 3:build 8:validate` | Test validation against acceptance criteria |
| `forge 3:build 9:summarise` | Document what was accomplished |

### Flags

| Flag | Description |
|------|-------------|
| `--only {sub-operation}` | Run a specific sub-operation within a phase |
| `--model {tier}` | Override the model tier for this invocation (`high`, `medium`, `low`) |