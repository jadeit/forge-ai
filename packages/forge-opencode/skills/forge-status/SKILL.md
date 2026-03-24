---
name: forge-status
description: Forge AI - Diagnose and recover from state inconsistencies
license: MIT
compatibility: opencode
---

# Forge Status - State Recovery

Diagnose and recover from Forge state inconsistencies.

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
Active Features: 2
  - auth-system: 5_implement (loops: 1/3)
  - api-gateway: 3_clarify (loops: 0/3)

Issues Found: 1
  ⚠ WARN: docs/design/tasks/legacy-task.md references non-existent task
```

## Recovery Actions

| Issue | Recovery |
|-------|----------|
| Missing phase history | Rebuild from artifacts |
| Invalid sub-phase | Reset to valid state |
| Broken task ref | Remove orphaned reference |
| Corrupted state | Offer state reset |
