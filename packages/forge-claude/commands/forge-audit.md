---
description: Forge AI - Audit methodology compliance and offer remediation
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

## Audit Process

1. Run all 6 checks against the project
2. Write report to `docs/audit/forge-audit-{date}.md`
3. Present findings with Pass / Warn / Fail per check
4. Offer remediation for each gap

## Remediation Routing

| Gap | Route |
|-----|-------|
| No Forge structure | `/forge-ai:forge-init` |
| Missing planning docs | `/forge-ai:forge-plan` |
| Missing/incomplete design docs | `/forge-ai:forge-design` |
| Task frontmatter gaps | Auto-fix with `--fix` |
| State inconsistency | `/forge-ai:forge-status` |
| Missing quality tooling | Installation instructions |
| 12-factor violations | Flagged for manual review |

## Flags

- `--fix` — Auto-apply safe remediations (missing frontmatter fields, missing dirs)
- `--only {category}` — Run one check: `structure`, `planning`, `design`, `state`, `quality`, `12factor`
- `--report-only` — Write report without interactive remediation

## Output

Report written to: `docs/audit/forge-audit-{YYYY-MM-DD}.md`

```
Forge Audit Report — 2026-03-28
================================

Forge Structure:     6/7 checks passed  ⚠
Planning Artifacts:  3/4 docs complete  ⚠
Design Artifacts:    12/15 tasks complete ⚠
Phase State:         ✓ Consistent
Code Quality:        4/4 tools detected  ✓
12-Factor:           2 violations found  ✗

Overall: 78% compliant

Top issues:
  1. docs/planning/technology-and-architecture.md missing 12-factor section
  2. 3 task docs missing parallel_group frontmatter field
  3. src/config.py:45 — hardcoded API key (Factor III violation)

Run with --fix to auto-resolve issues 1 and 2.
```

## Prerequisites

None — can be run on any project, with or without existing Forge structure.
