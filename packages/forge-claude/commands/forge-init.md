---
description: Initialize Forge AI in a new project
---

# Forge Init - Bootstrap Command

Initialize Forge AI in a new project directory.

## What It Does

### 1. Create Directory Structure

Create these directories and files:

```
.forge/
├── config.yaml
├── state.yaml
└── templates/
    ├── planning/
    ├── design/tasks/
    ├── testing/
    └── defects/

docs/
├── planning/
├── design/tasks/
├── testing/
├── deployment/
└── defects/
```

### 2. Initialize State File

Create `.forge/state.yaml`:

```yaml
project_phase: 0
phase_history: []
features: {}
context:
  last_updated: null
  current_task: null
  current_sub_phase: null
```

### 3. Create Default Config

Create `.forge/config.yaml` with defaults:

```yaml
models:
  high: claude-opus-4-6
  medium: claude-sonnet-4-6
  low: claude-haiku-4-5

quality:
  test_coverage_minimum: 80
  lint_must_pass: true
  type_check_must_pass: true
  security_audit_must_pass: true

task_categories:
  - backend
  - frontend
  - infrastructure
  - data
  - integration
  - security
  - documentation

phase_mappings:
  1: planning
  2: design
  3: development
  4: testing
  5: deployment
  6: maintenance
```

### 4. Create Document Templates

Create templates in `.forge/templates/`:

**Planning templates:**
- `planning/project-scope.md`
- `planning/user-stories.md`
- `planning/implementation-plan.md`
- `planning/technology-and-architecture.md`

**Design templates:**
- `design/design-decisions.md`
- `design/task-list.md`
- `design/tasks/TASK_TEMPLATE.md`

**Other templates:**
- `testing/uat-results.md`
- `defects/DEFECT_TEMPLATE.md`

### 5. Scan for Existing Artifacts

Check for pre-existing project files:
- `docs/planning/*`
- `docs/design/*`
- Existing task documents

If found, offer to import them into state.

## Flags

- `--force` - Overwrite existing `.forge` directory
- `--no-templates` - Skip template creation

## Prerequisites

- Empty or fresh project directory (or use `--force` for existing projects)

## Next Steps

After init completes:
1. Review `.forge/config.yaml` and customize model tiers and quality thresholds
2. Use `/forge-ai:forge-plan` to begin Phase 1: Planning
