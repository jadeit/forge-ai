---
description: Forge AI - Diagnose and recover from state inconsistencies
---

# Forge Status - State Recovery

Diagnose and recover from Forge state inconsistencies.

## What to Check

### 1. Phase Consistency

Read `.forge/state.yaml` and verify:
- `project_phase` matches `phase_history`
- Phase transitions are logical (1 → 2 → 3 → ...)
- No orphaned phase entries

### 2. Feature State Integrity

For each feature in `features`:
- Required fields are present
- `current_sub_phase` is valid (1_discover through 8_summarise)
- `task_document` path exists on disk

### 3. Task Document References

For each referenced task document:
- File exists at the referenced path
- Frontmatter is valid YAML
- Required frontmatter fields are present

### 4. Rework Tracking

- Report rework loop counts
- Warn if approaching configured thresholds

### 5. Context Budget

- Report total document sizes for `docs/`
- Warn if approaching context limits

## Diagnostic Output Format

```
Forge Status Report
====================

Phase: 3 (Development)
Phase History:
  - Phase 1: complete ✓
  - Phase 2: complete ✓
  - Phase 3: in-progress (started: 2026-03-22)

Active Features: 2
  - auth-system: 5_implement (loops: 1/3)
  - api-gateway: 3_clarify (loops: 0/3)

Issues Found: 1
  ⚠ WARN: docs/design/tasks/legacy-task.md references non-existent file

Context Budget: 45,000 / 150,000 chars (30%)
```

## Recovery Actions

| Issue | Recovery |
|-------|----------|
| Missing phase history | Rebuild from existing artifacts |
| Invalid sub-phase | Reset to nearest valid state |
| Broken task reference | Remove orphaned reference |
| Corrupted YAML | Offer state reset |

## Interactive Flow

1. Run diagnostics
2. Present issues found
3. Offer recovery options for each issue:
   - **Fix** — Apply automatic fix
   - **Manual** — Guide user to fix manually
   - **Ignore** — Continue anyway
4. Apply selected fixes
5. Confirm recovery

## Automatic Fixes

These can be applied automatically:
- Remove orphaned feature references
- Reset invalid sub-phase values
- Add missing phase history entries
- Fix basic YAML formatting issues

## Manual Fixes Required

These require user intervention:
- Full state file reset
- Phase transition correction
- Feature removal decisions
