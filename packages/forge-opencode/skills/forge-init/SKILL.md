---
name: forge-init
description: Forge AI - Initialize Forge in a new project
license: MIT
compatibility: opencode
---

# Forge Init - Bootstrap Command

Initialize Forge AI in a new project directory.

## What It Does

### 1. Create Directory Structure

Creates:
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

### 2. Initialize State

Sets `.forge/state.yaml`:
```yaml
project_phase: 0
phase_history: []
features: {}
context:
  last_updated: null
  current_task: null
  current_sub_phase: null
```

### 3. Copy Default Config

Creates `.forge/config.yaml` with defaults:
- Model tiers
- Phase mappings
- Quality thresholds
- Task categories
- Gate behavior

### 4. Copy Templates

Creates document templates in `.forge/templates/`:
- Planning templates (4 docs)
- Design templates (task template)
- Testing templates
- Defect templates

### 5. Scan Existing Artifacts

Detects existing project files:
- `docs/planning/*`
- `docs/design/*`
- Existing task documents

Offers to import into state.

## Flags

- `--force` - Overwrite existing .forge directory
- `--no-templates` - Don't copy templates

## Next Steps

After init:
1. Review `.forge/config.yaml` and customize
2. Use `/forge-plan` to begin Phase 1
