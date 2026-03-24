---
name: forge-build-implement
description: Forge Feature Dev - Sub-phase 5: Build the feature
license: MIT
compatibility: opencode
---

# Forge AI: Phase 3 - Sub-phase 5: Implement

Invoke the `@forge-implement` subagent for Feature Dev sub-phase 5.

## Purpose

Build the feature following the validated approach.

## Implementation Order

1. Foundation (types, constants, utilities)
2. Core domain/business logic
3. Data layer (if applicable)
4. API layer (if applicable)
5. Integration points
6. Tests

## Quality Checks

After implementation:
- Run linting
- Run type checking
- Write tests

## Flags

- `--task {slug}` - Specific task to implement
- `--model {tier}` - Override model tier

## Next Steps

After implementation complete, proceed to `/forge-build-review`.
