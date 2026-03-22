---
description: Forge AI - Diagnose and recover from state inconsistencies
agent: forge-orchestrator
model: medium
---

# Forge Status - State Recovery

Diagnose and recover from Forge state inconsistencies.

## Usage

`/forge-status`

## What It Checks

### 1. Phase Consistency
- Verify `project_phase` matches phase_history
- Check for orphaned phase entries
- Validate phase transitions are logical

### 2. Feature State Integrity
- Validate all features have required fields
- Check current_sub_phase is valid (1_discover through 8_summarise)
- Verify task_document paths exist

### 3. Task Document References
- Verify all referenced task documents exist
- Check for broken references
- Validate frontmatter consistency

### 4. Rework Tracking
- Report rework loop counts
- Warn if approaching thresholds

### 5. Context Budget
- Report context usage
- Warn if approaching limits

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
  ⚠ WARN: docs/design/tasks/legacy-task.md references non-existent task

Context Budget: 45,000 / 150,000 chars (30%)
```

## Recovery Actions

| Issue | Recovery |
|-------|----------|
| Missing phase history | Rebuild from artifacts |
| Invalid sub-phase | Reset to valid state |
| Broken task ref | Remove orphaned reference |
| Corrupted state | Offer state reset |

## Interactive Flow

1. Run diagnostics
2. Present issues found
3. Offer recovery options:
   - `[F]ix` - Apply automatic fixes
   - `[M]anual` - Fix manually
   - `[I]gnore` - Continue anyway
4. Apply selected fix
5. Confirm recovery

## Automatic Fixes

These can be applied automatically:
- Remove orphaned feature references
- Reset invalid sub-phase values
- Add missing phase history entries
- Fix corrupted YAML (basic)

## Manual Fixes Required

These require user intervention:
- State file reset
- Phase transition correction
- Feature removal decisions
