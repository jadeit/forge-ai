---
name: forge-context-loader
description: Load minimum necessary context for Forge operations based on current phase
license: MIT
compatibility: opencode
metadata:
  audience: forge-users
  workflow: phase-execution
---

# Forge Context Loader

Load the **minimum context needed** for the current Forge operation, not everything the project has ever produced.

## Context Loading Rules

| Phase | Load These |
|-------|-----------|
| `forge 1:plan` | User input, existing README or project brief |
| `forge 2:design` | All Phase 1 outputs. Existing codebase structure if applicable |
| `forge 3:build` | Specific task doc, technology & architecture doc, relevant source files |
| `forge 4:test` | User stories, task docs for implemented features, test results |
| `forge 5:deploy` | Technology & architecture doc, infrastructure-related task docs |
| `forge 6:maintain` | Specific error/incident context, relevant source files, defect history |

## Context by Sub-Phase

| Sub-Phase | Additional Context |
|-----------|-------------------|
| `3:build 1:discover` | Task document, state file |
| `3:build 2:explore` | Affected modules from task, existing codebase |
| `3:build 3:clarify` | Discovery findings, exploration notes |
| `3:build 4:approach` | Task document, design decisions |
| `3:build 5:implement` | Task document, approach plan |
| `3:build 6:review` | Implementation, test files, lint config |
| `3:build 7:validate` | Task document, test files, coverage reports |
| `3:build 8:summarise` | All phase artifacts |

## Usage

### Loading Context for Phase 1
```
Read: README.md, PROJECT_SCOPE.md (if exists)
```

### Loading Context for Phase 2
```
Read: docs/planning/project-scope.md
Read: docs/planning/user-stories.md
Read: docs/planning/implementation-plan.md
Read: docs/planning/technology-and-architecture.md
Glob: src/**/* (codebase structure)
```

### Loading Context for Feature Dev
```
Read: .forge/state.yaml
Read: docs/planning/technology-and-architecture.md
Read: docs/design/tasks/{task-slug}.md
Glob: {affected_modules} (from task frontmatter)
```

## Context Budget

Read `.forge/config.yaml` for context_budget settings:
```yaml
context_budget:
  warning_threshold: 150000  # Warn if exceeded
  max_threshold: 180000       # Hard limit
```

### If Context Exceeds Threshold

1. **Warn the user** about the exceeded context budget
2. **Suggest trimming strategies:**
   - Focus on most recent changes
   - Remove boilerplate and generated files
   - Exclude node_modules, vendor, etc.
3. **Prioritise:**
   - Task document over other documents
   - Core business logic over infrastructure
   - Tests for the specific feature over full test suite

## Implementation

Use Glob and Grep to identify relevant files:

```bash
# Get affected modules from task frontmatter
# Glob those directories
# Grep for key patterns if needed
```

## Principles

1. **Minimum Viable Context** - Only load what is necessary
2. **Lazy Loading** - Load files when needed, not upfront
3. **Incremental** - Context grows as you progress through sub-phases
4. **Clean State** - Reset context when starting new phases/tasks
