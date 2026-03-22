---
description: Forge AI - Structured AI-augmented coding methodology
agent: forge-orchestrator
---

# Forge AI

Forge AI is a structured methodology for AI-augmented coding built on 6 project phases.

## Project Phases

| Phase | Command | Description |
|-------|---------|-------------|
| 1 | `/forge-1-plan` | Planning and requirement analysis |
| 2 | `/forge-2-design` | System design and task breakdown |
| 3 | `/forge-3-build` | Development via Feature Dev lifecycle |
| 4 | `/forge-4-test` | Functional testing and UAT |
| 5 | `/forge-5-deploy` | Deployment |
| 6 | `/forge-6-maintain` | Maintenance triage, routing, and audit |

## Utility Commands

| Command | Description |
|---------|-------------|
| `/forge-init` | Initialize Forge in a new project |
| `/forge-status` | Diagnose and recover from state inconsistencies |

## Feature Development (Phase 3 Sub-Phases)

| Sub-Phase | Command | Description |
|-----------|---------|-------------|
| 1 | `/forge-3-build-1-discover` | Understand what needs to be built |
| 2 | `/forge-3-build-2-explore` | Explore relevant existing code |
| 3 | `/forge-3-build-3-clarify` | Resolve ambiguities |
| 4 | `/forge-3-build-4-approach` | Design/validate approach |
| 5 | `/forge-3-build-5-implement` | Build the feature |
| 6 | `/forge-3-build-6-review` | Quality review |
| 7 | `/forge-3-build-7-validate` | Test validation |
| 8 | `/forge-3-build-8-summarise` | Document accomplishments |

## Current State

@.forge/state.yaml

## Quick Start

1. Run `/forge-1-plan` to begin Phase 1: Planning
2. Progress through phases as needed
3. Use `/forge-3-build` for development with Feature Dev lifecycle

## Flags

- `--only {sub-operation}` - Run specific sub-operation within a phase
- `--model {tier}` - Override model tier (high, medium, low)
- `--task {slug}` - Work on specific task (for Phase 3)

## Design Principles

- Single Responsibility — each tool does one thing well
- Composability — tools can be chained
- Minimal Coupling — tools depend on artifact structure
- Transparency — log all actions and changes
- Deterministic tooling preferred — use linters, formatters, validators

## Git Commit Hooks

After completing sub-phases, commit your changes:

```bash
git add -A
git commit -m "forge: {type} - {description}"
```

## Learn More

See `.forge/state.yaml` for current project state.
See `.forge/config.yaml` for Forge configuration.
