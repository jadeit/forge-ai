---
name: forge-approach
description: Feature Dev sub-phase 4 - Design or validate implementation approach
mode: subagent
permission:
  skill:
    "forge-*": allow
    "documents-*": allow
    "*": deny
tools:
  read: true
  write: true
  edit: true
  glob: true
  grep: true
---

# Feature Dev: 4. Approach

Design (greenfield) or validate (brownfield) the implementation approach.

## Load Skills

Use these skills:
- `@forge-context-loader` - Load context for approach design
- `@forge-state-manager` - Update task status

## Operating Modes

### Brownfield Mode

**Goal:** Validate existing approach against current code

**Actions:**
1. Review the approach in task document
2. Check against current code - has anything changed?
3. Evaluate if approach still makes sense:
   - Dependencies updated?
   - Patterns changed?
   - Technical debt introduced?
4. Flag any deviations from the original design
5. Propose corrections if needed

**Validation Checklist:**
- [ ] Do the planned components still exist?
- [ ] Have dependencies changed?
- [ ] Are there new patterns to follow?
- [ ] Is the approach still optimal?

### Greenfield Mode

**Goal:** Design implementation approach from scratch

**Actions:**
1. Identify components needed
2. Define interfaces between components
3. Choose appropriate patterns (SOLID principles)
4. Plan file structure and module boundaries
5. Consider alternatives with pros/cons

## Approach Documentation

### Implementation Plan

```markdown
### Implementation Plan

1. **Foundation Layer**
   - Step 1: [What to do first]
   - Step 2: [What to do second]

2. **Core Implementation**
   - Step 3: [Main feature implementation]
   - Step 4: [Integration points]

3. **Polish**
   - Step 5: [Testing]
   - Step 6: [Documentation]
```

### Micro-decisions

Document significant decisions:

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | PostgreSQL | ACID compliance needed |
| API Style | REST | Simpler than GraphQL for this use case |
| State | Redux Toolkit | Already used in codebase |

### File Structure

```markdown
### File Structure
src/
├── features/
│   └── {feature-name}/
│       ├── components/      # UI components
│       ├── services/        # Business logic
│       ├── types/           # Type definitions
│       └── tests/           # Feature tests
```

## Design Principles

Apply these principles when designing:

1. **Single Responsibility** - Each module does one thing
2. **Open/Closed** - Open for extension, closed for modification
3. **Liskov Substitution** - Subtypes can replace base types
4. **Interface Segregation** - Small, focused interfaces
5. **Dependency Inversion** - Depend on abstractions

## SOLID Compliance Check

For each proposed component:

| Principle | Check | Violation? |
|-----------|-------|------------|
| SRP | Does it have one reason to change? | |
| OCP | Can we add features without modifying existing code? | |
| LSP | Can subclasses replace parent classes? | |
| ISP | Are interfaces small and focused? | |
| DIP | Do high-level modules depend on abstractions? | |

## Output

### Update Task Document

Add/enhance "Approach" section:

```markdown
## Approach

### Implementation Plan
1. [Step 1]
2. [Step 2]

### Micro-decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
|        |        |           |

### SOLID Compliance
- [How each principle is applied]

### Risks
- [Technical risks and mitigations]
```

### Update Frontmatter

```yaml
status: in-progress:approach
```

## Next Steps

Proceed to `@forge-implement` when:
- Approach is documented
- Steps are clear and sequential
- User confirms the approach

## Note

If approach changes significantly:
1. Update task document
2. Discuss with user
3. May need to re-clarify requirements
