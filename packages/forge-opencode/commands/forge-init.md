---
description: Forge AI - Initialize Forge in a new project
agent: forge-orchestrator
---

# Forge Init - Bootstrap Command

Initialize Forge AI in a new project directory.

## Usage

`/forge-init`

## What It Does

### 1. Create Directory Structure

Creates:
```
.forge/
├── config.yaml
├── state.yaml
├── adapters/opencode/
│   ├── agents/
│   ├── commands/
│   └── skills/
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

### 5. Create Symlinks

Links `.opencode/` to `.forge/adapters/opencode/`:
```bash
ln -s .forge/adapters/opencode/skills .opencode/skills
ln -s .forge/adapters/opencode/commands .opencode/commands
ln -s .forge/adapters/opencode/agents .opencode/agents
```

### 6. Scan Existing Artifacts

Detects existing project files:
- `docs/planning/*`
- `docs/design/*`
- Existing task documents

Offers to import into state.

## Flags

- `--force` - Overwrite existing .forge directory
- `--no-links` - Don't create .opencode symlinks
- `--no-templates` - Don't copy templates

## Prerequisites

- Empty or fresh project directory
- No existing .forge directory (unless --force)

## Next Steps

After init:
1. Review `.forge/config.yaml` and customize
2. Use `/forge-1-plan` to begin Phase 1

## Notes

If running in existing project:
1. Scan for existing artifacts
2. Offer to import them
3. Update state accordingly
