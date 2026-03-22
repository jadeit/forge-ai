# Forge AI

Forge AI is a structured methodology for AI-augmented coding built on 6 project phases.

## Quick Reference

### Phase Commands

| Command | Description |
|---------|-------------|
| `/forge-1-plan` | Phase 1: Planning |
| `/forge-2-design` | Phase 2: Design |
| `/forge-3-build` | Phase 3: Development |
| `/forge-4-test` | Phase 4: Testing |
| `/forge-5-deploy` | Phase 5: Deployment |
| `/forge-6-maintain` | Phase 6: Maintenance |

### Feature Dev Sub-Commands (Phase 3)

| Command | Description |
|---------|-------------|
| `/forge-3-build-1-discover` | Understand what needs to be built |
| `/forge-3-build-2-explore` | Explore relevant existing code |
| `/forge-3-build-3-clarify` | Resolve ambiguities |
| `/forge-3-build-4-approach` | Design/validate approach |
| `/forge-3-build-5-implement` | Build the feature |
| `/forge-3-build-6-review` | Quality review |
| `/forge-3-build-7-validate` | Test validation |
| `/forge-3-build-8-summarise` | Document accomplishments |

## Design Principles

- **Single Responsibility** — each tool does one thing well
- **Composability** — tools can be chained
- **Minimal Coupling** — tools depend on artifact structure
- **Transparency** — log all actions and changes
- **Deterministic tooling preferred** — use linters, formatters, validators

## Code Generation

When generating code, always:
- Apply SOLID principles
- Use established design patterns
- Follow language-specific conventions
- Produce simple, DRY, maintainable code
- Use Mermaid diagrams for architecture
- Use Markdown with YAML frontmatter for documentation

## Artifact Structure

```
docs/
├── planning/           # Phase 1 outputs
├── design/tasks/       # Phase 2 task documents
├── testing/            # Phase 4 results
├── deployment/          # Phase 5 runbooks
└── defects/            # Defect reports

.forge/
├── state.yaml          # Phase tracking
├── config.yaml         # Configuration
└── adapters/opencode/  # OpenCode adapter
```

## State Management

Check `.forge/state.yaml` for:
- Current project phase
- Phase completion status
- Active features and sub-phases

## Context Loading

Load **minimum context needed** for the current operation, not everything.

## Quality Gates

Before considering Phase 3 features complete:
- Lint must pass
- Type check must pass
- Security audit must pass
- Test coverage >= 80% (configurable)
