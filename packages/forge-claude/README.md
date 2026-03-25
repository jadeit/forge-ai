# Forge AI - Claude Code Plugin

Forge AI is a structured AI-augmented coding methodology implemented as a Claude Code plugin. It provides a 6-phase SDLC workflow that guides you from initial planning through to ongoing maintenance.

## Installation

### Via Custom Marketplace (recommended)

Register the Forge AI marketplace with Claude Code, then install the plugin:

```bash
claude marketplace add jadeit/forge-ai
claude plugin install forge-ai@jadeit/forge-ai
```

### Via Local Path

Clone the repository and install directly:

```bash
git clone https://github.com/jadeit/forge-ai.git
claude plugin install /path/to/forge-ai/packages/forge-claude
```

## Commands

All commands are available under the `forge-ai` namespace:

### Lifecycle

| Command | Description |
|---------|-------------|
| `/forge-ai:forge-init` | Initialise Forge AI in a new project |
| `/forge-ai:forge-plan` | Phase 1 — Planning and requirement analysis |
| `/forge-ai:forge-design` | Phase 2 — System design and task breakdown |
| `/forge-ai:forge-build` | Phase 3 — Development via Feature Dev lifecycle |
| `/forge-ai:forge-test` | Phase 4 — User acceptance testing |
| `/forge-ai:forge-deploy` | Phase 5 — Deployment |
| `/forge-ai:forge-maintain` | Phase 6 — Maintenance triage and routing |
| `/forge-ai:forge-status` | Diagnose and recover state inconsistencies |

### Feature Dev Sub-phases

| Command | Description |
|---------|-------------|
| `/forge-ai:forge-build-discover` | Sub-phase 1 — Understand what needs to be built |
| `/forge-ai:forge-build-explore` | Sub-phase 2 — Explore relevant existing code |
| `/forge-ai:forge-build-clarify` | Sub-phase 3 — Resolve ambiguities |
| `/forge-ai:forge-build-approach` | Sub-phase 4 — Design or validate approach |
| `/forge-ai:forge-build-implement` | Sub-phase 5 — Build the feature |
| `/forge-ai:forge-build-review` | Sub-phase 6 — Quality review |
| `/forge-ai:forge-build-validate` | Sub-phase 7 — Validate tests against acceptance criteria |
| `/forge-ai:forge-build-summarise` | Sub-phase 8 — Document accomplishments |

## Workflow

```
forge-init        → Initialise .forge/ directory and templates
forge-plan        → Create planning docs in docs/planning/
forge-design      → Create task documents in docs/design/tasks/
forge-build       → Implement each task via 8-sub-phase lifecycle
forge-test        → UAT facilitation and defect management
forge-deploy      → Execute deployment and create runbooks
forge-maintain    → Ongoing triage and defect routing
```

## Project Structure

After running `/forge-ai:forge-init`, your project will have:

```
.forge/
├── config.yaml          — Model tiers, quality thresholds
├── state.yaml           — Current phase and feature state
└── templates/           — Document templates

docs/
├── planning/            — Phase 1 artifacts
├── design/tasks/        — Phase 2 task documents
├── testing/             — UAT results
├── deployment/          — Runbooks
└── defects/             — Defect reports
```

## State File

Forge tracks progress in `.forge/state.yaml`:

```yaml
project_phase: 3
phase_history:
  - phase: 1
    status: complete
  - phase: 2
    status: complete
  - phase: 3
    status: in-progress
features:
  my-feature:
    status: in-progress
    current_sub_phase: 5_implement
```

## Related

- [OpenCode plugin](../forge-opencode/) — The OpenCode version of this plugin
- [GitHub repository](https://github.com/jadeit/forge-ai)
