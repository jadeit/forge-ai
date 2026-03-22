---
description: Forge Feature Dev - Sub-phase 1 Discover
agent: forge-build
model: medium
---

# Forge AI: Phase 3 - Sub-phase 1: Discover

Invoke the `@forge-discover` subagent for Feature Dev sub-phase 1.

## Purpose

Understand what needs to be built by orienting within existing context.

## Discover Activities

- Read existing task document (brownfield) or create new one (greenfield)
- Understand the problem, scope, and approach
- Identify what needs clarification

## Operating Modes

**Brownfield:** Task document exists with implementation detail
**Greenfield:** No task document or stub only

## Mode Detection

1. Check for task document in `docs/design/tasks/{task-slug}.md`
2. Propose mode with reasoning
3. Wait for confirmation before proceeding

## Next Steps

After discover complete, proceed to:
- `/forge-3-build-2-explore`
