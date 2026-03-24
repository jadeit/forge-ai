---
name: forge-build-explore
description: Forge Feature Dev - Sub-phase 2: Explore relevant existing code
license: MIT
compatibility: opencode
---

# Forge AI: Phase 3 - Sub-phase 2: Explore

Invoke the `@forge-explore` subagent for Feature Dev sub-phase 2.

## Purpose

Understand relevant existing code, patterns, and conventions.

## Explore Activities

- Read affected modules from task frontmatter
- Identify coding style and patterns
- Find related code and shared utilities
- Understand dependencies and integration points

## Context

Load from task document:
- `affected_modules` - directories to explore
- `dependencies` - related task documents

## Next Steps

After explore complete, proceed to `/forge-build-clarify`.
