---
name: forge-explore
description: Feature Dev sub-phase 2 - Understand relevant existing code
mode: subagent
permission:
  skill:
    "forge-*": allow
    "documents-*": allow
    "*": deny
tools:
  read: true
  glob: true
  grep: true
model: medium
---

# Feature Dev: 2. Explore

Understand relevant existing code, patterns, and conventions.

## Load Skills

Use these skills for context loading:
- `@forge-context-loader` - Load minimum context for this phase

## Context for Explore

Load these based on task document frontmatter:

1. **affected_modules** from task document:
```yaml
affected_modules:
  - src/auth/
  - src/middleware/
```

2. **Dependencies** - Read related task documents if any

3. **Technology & Architecture** - Understand the system design

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
- Similar features that might serve as reference
- Shared utilities or base classes
- Common constants or types
- Existing patterns for this type of feature

### 4. Check Dependencies

Understand:
- How modules interconnect
- Data flow between components
- External dependencies

## Exploration Checklist

- [ ] Coding style and conventions used?
- [ ] Patterns evident in existing code?
- [ ] Shared utilities or base classes?
- [ ] Testing patterns used?
- [ ] Error handling approach?
- [ ] API conventions?
- [ ] Data models and schemas?
- [ ] Authentication/authorization patterns?

## Output

### Document Exploration Findings

In task document, add/update "Exploration" section:

```markdown
## Exploration

### Patterns to Follow
- [Coding conventions]
- [Architectural patterns]

### Conventions to Adhere To
- [Naming conventions]
- [File organization]

### Integration Points
- [Where this feature connects to existing code]

### Potential Risks
- [Technical concerns or risks identified]

### Reference Code
- [Links to similar existing implementations]
```

### Update Frontmatter

```yaml
status: in-progress:explore
```

## Next Steps

Proceed to `@forge-clarify` when:
- Exploration is complete
- Patterns and conventions are documented
- Risks and concerns are identified

Use `@forge-context-loader` to ensure minimum context is maintained.
