---
description: "Forge Feature Dev - Sub-phase 2 Explore: understand relevant existing code"
---

# Feature Dev: 2. Explore

Understand relevant existing code, patterns, and conventions.

## Context to Load

Read the task document to find `affected_modules` in frontmatter:

```yaml
affected_modules:
  - src/auth/
  - src/middleware/
```

Also read:
- `docs/planning/technology-and-architecture.md` - System design context
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

Search for:
- Similar features that could serve as reference
- Shared utilities or base classes
- Common constants or types
- Existing patterns for this type of feature

### 4. Check Dependencies

Understand:
- How modules interconnect
- Data flow between components
- External dependencies

## Exploration Checklist

- [ ] Coding style and conventions documented?
- [ ] Architectural patterns identified?
- [ ] Shared utilities or base classes found?
- [ ] Testing patterns understood?
- [ ] Error handling approach clear?
- [ ] API conventions documented?
- [ ] Data models and schemas reviewed?
- [ ] Authentication/authorization patterns noted?

## Output

Update the task document — add or update an "Exploration" section:

```markdown
## Exploration

### Patterns to Follow
- [Coding conventions]
- [Architectural patterns]

### Conventions to Adhere To
- [Naming conventions]
- [File organisation]

### Integration Points
- [Where this feature connects to existing code]

### Potential Risks
- [Technical concerns or risks identified]

### Reference Code
- [Links to similar existing implementations]
```

Update task frontmatter:
```yaml
status: in-progress:explore
```

## Next Steps

Proceed to `/forge-ai:forge-build-clarify` when:
- Exploration is complete
- Patterns and conventions are documented
- Risks and concerns are identified
