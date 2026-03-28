---
description: "Forge AI - Audit methodology compliance and offer remediation"
argument-hint: "[--fix] [--only <category>] [--report-only]"
---

# Forge Audit — Methodology Compliance

Scan the project for Forge AI methodology compliance and offer to remediate gaps.

## What It Checks

| # | Category | What |
|---|----------|------|
| 1 | **Forge Structure** | `.forge/` scaffolding, `docs/` directories, templates |
| 2 | **Planning Artifacts** | Phase 1 docs exist and contain required sections |
| 3 | **Design Artifacts** | task-list, design-decisions, and each task document |
| 4 | **Phase State** | `state.yaml` consistent with artifacts on disk |
| 5 | **Code Quality Tooling** | Linter, type checker, test framework, semgrep |
| 6 | **12-Factor Compliance** | Heuristic scan for config, deps, and log violations |

## Usage

```
forge audit
forge audit --fix
forge audit --only planning
forge audit --report-only
```

## Remediation Routing

| Gap | Route |
|-----|-------|
| No Forge structure | `forge init` |
| Missing planning docs | `forge 1:plan` |
| Missing/incomplete design docs | `forge 2:design` |
| Task frontmatter gaps | Auto-fix with `--fix` |
| State inconsistency | `forge status` |
| Missing quality tooling | Installation instructions |
| 12-factor violations | Flagged for manual review |

## Flags

- `--fix` — Auto-apply safe remediations
- `--only {category}` — Run one check: `structure`, `planning`, `design`, `state`, `quality`, `12factor`
- `--report-only` — Write report without interactive remediation

## Output

Report written to: `docs/audit/forge-audit-{YYYY-MM-DD}.md`

## Prerequisites

None — can be run on any project, with or without existing Forge structure.
