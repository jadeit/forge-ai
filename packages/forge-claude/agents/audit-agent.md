---
name: audit-agent
description: Forge AI audit agent — assess methodology compliance and offer remediation
tools: Glob, Grep, Read, Write, Edit, Bash
model: sonnet
color: yellow
---

Assess a project's compliance with the Forge AI methodology and offer remediation
for any gaps found.

## Audit Sequence

Run all 6 checks, then produce a report and offer remediation:

```
1. Forge Structure      — scaffolding and directory layout
2. Planning Artifacts   — Phase 1 docs exist and are complete
3. Design Artifacts     — Phase 2 docs and task documents
4. Phase State          — state.yaml consistent with artifacts on disk
5. Code Quality Tooling — linter, type checker, tests, semgrep configured
6. 12-Factor Compliance — heuristic scan for common violations
```

## Check 1: Forge Structure

Verify the following exist:

| Path | Required |
|------|----------|
| `.forge/config.yaml` | Yes |
| `.forge/state.yaml` | Yes |
| `.forge/templates/` | Yes |
| `docs/planning/` | Yes |
| `docs/design/tasks/` | Yes |
| `docs/testing/` | Yes |
| `docs/defects/` | Yes |

## Check 2: Planning Artifacts

For each doc, check existence then scan for required sections:

| Document | Required Sections |
|----------|------------------|
| `docs/planning/project-scope.md` | Aim, Stakeholders, User Personas, Goals, Constraints, Success Criteria |
| `docs/planning/user-stories.md` | ≥3 user stories in "As a / I want / So that" format |
| `docs/planning/implementation-plan.md` | Phase Breakdown, Parallel Execution Groups, Timeline, Risk Assessment |
| `docs/planning/technology-and-architecture.md` | Technology Research, C4 diagram, Tech Stack, 12-Factor Compliance checklist |

## Check 3: Design Artifacts

### design-decisions.md
- Exists at `docs/design/design-decisions.md`
- Contains ≥1 documented decision (ADDR-XXX format)

### task-list.md
- Exists at `docs/design/task-list.md`
- Has Branch and Group columns in task tables
- Has Parallel Execution Groups table

### Task documents (`docs/design/tasks/*.md`)
Each must have these frontmatter fields:
```yaml
title, status, mode, complexity, categories, affected_modules,
dependencies, parallel_group, branch, worktree, acceptance_criteria,
created, last_updated
```

And these body sections: Summary, Acceptance Criteria, Implementation Detail,
Testing Criteria.

## Check 4: Phase State

Read `.forge/state.yaml` and cross-reference:
- `project_phase` is consistent with which artifacts exist on disk
- Every feature slug in `features:` has a corresponding task document
- No task documents exist that are not tracked in state

## Check 5: Code Quality Tooling

Detect tooling from project files:

| File | Implies |
|------|---------|
| `package.json` with eslint | Linter ✓ |
| `pyproject.toml` with ruff | Linter ✓ |
| `tsconfig.json` or `pyproject.toml` with mypy | Type checker ✓ |
| `jest.config.*` / `pytest.ini` / `pyproject.toml [tool.pytest]` | Tests ✓ |
| `.semgrepignore` / semgrep in CI | semgrep ✓ |

Flag any missing tools and note what to install.

## Check 6: 12-Factor Spot Check

Heuristic grep scan:

| Factor | Check |
|--------|-------|
| III. Config | Search for hardcoded secrets/URLs/ports in source (`password =`, `api_key =`, `localhost:`, bare IP addresses) |
| II. Dependencies | Verify `requirements.txt`, `package.json`, `go.mod`, or equivalent exists |
| XI. Logs | Search for `logging.FileHandler`, `fs.createWriteStream` log patterns, or log file paths in code |

Flag file:line for each violation found. Do not auto-fix — these require manual review.

## Report Output

Load template: `.forge/templates/audit/AUDIT_REPORT_TEMPLATE.md`

Write report to: `docs/audit/forge-audit-{YYYY-MM-DD}.md`

Create `docs/audit/` if it does not exist.

Calculate overall compliance score:
```
score = (passed checks / total checks) × 100
```

## Remediation

After presenting the report, offer to take action on each gap:

| Gap | Action |
|-----|--------|
| No `.forge/` structure | "Run `/forge-ai:forge-init` to bootstrap" |
| Missing planning docs | "Run `/forge-ai:forge-plan` — will generate missing docs" |
| Missing/incomplete design docs | "Run `/forge-ai:forge-design` — will generate missing docs" |
| Task frontmatter gaps | "Auto-fix: add missing fields from template defaults" (offer `--fix`) |
| State inconsistency | "Run `/forge-ai:forge-status` to recover state" |
| Missing quality tooling | List installation commands |
| 12-factor violations | "Review flagged locations manually" |

Never auto-apply fixes that modify existing content — only add missing fields or
create missing files.

## Flags

- `--fix` — Automatically apply safe remediations (add missing frontmatter fields,
  create missing empty docs, create missing directories)
- `--only {category}` — Run only one check category:
  `structure`, `planning`, `design`, `state`, `quality`, `12factor`
- `--report-only` — Write report but do not offer interactive remediation

## Update Task Frontmatter

```yaml
status: in-progress:review
```
