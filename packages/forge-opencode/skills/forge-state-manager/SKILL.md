---
name: forge-state-manager
description: Manage Forge state transitions, phase tracking, feature status, and git hooks
license: MIT
compatibility: opencode
metadata:
  audience: forge-users
  workflow: phase-execution
---

# Forge State Manager

Manage Forge state transitions, phase tracking, feature status, and git commit hooks.

## State File Location

`.forge/state.yaml`

## State Structure

```yaml
project_phase: 1
phase_history:
  - phase: 1
    status: complete
    started: 2026-03-20T10:00:00Z
    completed: 2026-03-22T14:00:00Z

features:
  auth-system:
    phase: 3
    mode: brownfield
    started: 2026-03-22T14:00:00Z
    current_sub_phase: 5_implement
    rework_tracking:
      implement_loops: 0
      approach_loops: 0
      history: []
    commits: []
```

## Operations

### 1. Read Current State

Read `.forge/state.yaml` to understand:
- Current project phase
- Phase history and completion status
- Active features and their sub-phase

### 2. Update Phase Status

When completing a phase:
```yaml
phase_history:
  - phase: 1
    status: complete
    started: 2026-03-20T10:00:00Z
    completed: 2026-03-22T14:00:00Z
  - phase: 2
    status: in-progress
    started: 2026-03-22T14:00:00Z
```

### 3. Update Feature Status

When working on a feature:
```yaml
features:
  feature-slug:
    phase: 3
    mode: brownfield
    started: 2026-03-22T14:00:00Z
    current_sub_phase: 5_implement
    task_document: docs/design/tasks/feature-slug.md
```

### 4. Update Task Status

In task document frontmatter:
```yaml
status: in-progress:approach  # When in approach phase
status: complete              # When done
```

## Phase Transition Process

### Before Transition

1. **Check artifact completeness** for current phase:
   - Phase 1: project-scope.md, user-stories.md, implementation-plan.md, technology-and-architecture.md
   - Phase 2: design-decisions.md, task-list.md, all task documents with required frontmatter
   - Phase 3: Task implementation complete, review passes, validation passes
   - Phase 4: UAT results documented, user sign-off obtained
   - Phase 5: Deployment verified
   - Phase 6: Monitoring active

2. **Propose transition** to user:
   ```
   Phase 1 complete — all required artifacts found:
   - ✓ docs/planning/project-scope.md
   - ✓ docs/planning/user-stories.md
   - ✓ docs/planning/implementation-plan.md
   - ✓ docs/planning/technology-and-architecture.md
   
   Confirm transition to Phase 2: Design?
   ```

3. **Wait for confirmation** before updating state

### After Confirmation

Update `.forge/state.yaml` with new phase and history entry

## Prerequisite Checking

### Check Function

```
function check_prerequisites(current_phase: int, target_phase: int) -> tuple[bool, list[str]]:
    missing = []
    if target_phase > 1 and current_phase < 1:
        missing.append("Phase 1 (Planning) must be complete")
    if target_phase > 2 and current_phase < 2:
        missing.append("Phase 2 (Design) must be complete")
    # ... etc
    return (len(missing) == 0, missing)
```

### Gate Behaviour

From `.forge/config.yaml`:
```yaml
gates:
  warn_on_prerequisite_failure: true
  allow_override: true
```

If prerequisites not met:
1. **Warn** the user about missing prerequisites
2. **List** what's missing
3. **Allow override** if user confirms to proceed anyway

## Feature Dev Sub-Phase Tracking

Track progress through Feature Dev sub-phases in state:
```yaml
features:
  feature-slug:
    current_sub_phase: 5_implement
    sub_phase_history:
      - sub_phase: 1_discover
        status: complete
        completed: 2026-03-22T14:30:00Z
      - sub_phase: 2_explore
        status: complete
        completed: 2026-03-22T15:00:00Z
      - sub_phase: 3_clarify
        status: complete
        completed: 2026-03-22T15:30:00Z
      - sub_phase: 4_approach
        status: complete
        completed: 2026-03-22T16:00:00Z
```

## Rework Loop Detection

Track iterations when rework occurs.

### Tracking

Increment counters when rework happens:

| Action | Counter to Increment |
|--------|---------------------|
| Review → Implement (minor fixes) | `implement_loops` |
| Review → Approach (fundamental issues) | `approach_loops` |

### State Update

```yaml
features:
  feature-slug:
    rework_tracking:
      implement_loops: 1
      approach_loops: 0
      history:
        - action: rework_implement
          timestamp: 2026-03-22T16:00:00Z
          reason: "Type check failures"
```

### Thresholds

Default thresholds (from `.forge/config.yaml`):
```yaml
rework:
  max_implement_loops: 3
  max_approach_loops: 2
```

### Warning Format

When threshold exceeded:
```
⚠️  Rework Alert: auth-system
- Implement loops: 3/3 (MAX)
- Approach loops: 1/2

Consider:
1. Pausing implementation
2. Re-evaluating approach
3. Requesting human review
```

### Reset on Success

Reset counters when sub-phase completes successfully:
```yaml
rework_tracking:
  implement_loops: 0
  approach_loops: 0
```

## Rework State Management

### Minor Issues (Loop to Implement)
- Stay in current feature
- Track iteration count in `rework_tracking.implement_loops`
- Don't create new sub-phase entries

### Approach Issues (Loop to Approach)
- Move current_sub_phase back to "4_approach"
- Track in `rework_tracking.approach_loops`
- Note what changed in approach
