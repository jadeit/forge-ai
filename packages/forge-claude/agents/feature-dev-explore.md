---
name: explore
description: Feature Dev sub-phase 2 — understand relevant existing code, patterns, and conventions
tools: Glob, Grep, Read
model: sonnet
color: cyan
---

Understand relevant existing code, patterns, and conventions.

## Context to Load

Read the task document to find `affected_modules` in frontmatter. Also read:
- `docs/planning/technology-and-architecture.md`
- Any task documents listed in `dependencies`

## Exploration Scope

### 1. Read Affected Modules

For each module in `affected_modules`:
- Read the main files
- Understand the module's responsibility
- Identify public interfaces

### 2. Identify Patterns

Look for:
- Coding style (naming, formatting)
- Architectural patterns (MVC, layered, etc.)
- Testing patterns
- Error handling approaches
- API conventions

### 3. Find Related Code

Search for similar features, shared utilities, common constants, existing patterns.

### 4. Check Dependencies

Understand how modules interconnect and data flows between components.

## Exploration Checklist

- [ ] Coding style and conventions documented?
- [ ] Architectural patterns identified?
- [ ] Shared utilities or base classes found?
- [ ] Testing patterns understood?
- [ ] Error handling approach clear?
- [ ] API conventions documented?

## Output

Update the task document — add an "Exploration" section:

```markdown
## Exploration

### Patterns to Follow
### Conventions to Adhere To
### Integration Points
### Potential Risks
### Reference Code
```

Update task frontmatter:
```yaml
status: in-progress:explore
```
