---
description: "Forge Feature Dev - Sub-phase 4 Approach: design or validate implementation approach"
---

# Feature Dev: 4. Approach

Design (greenfield) or validate (brownfield) the implementation approach.

## Operating Modes

### Brownfield Mode

**Goal:** Validate existing approach against current code

**Actions:**
1. Review the approach in the task document
2. Check against current code — has anything changed?
3. Evaluate if the approach still makes sense:
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

Add to the task document:

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

Document significant decisions:

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | PostgreSQL | ACID compliance needed |
| API Style | REST | Simpler for this use case |

Document proposed file structure:

```
src/
├── features/
│   └── {feature-name}/
│       ├── components/
│       ├── services/
│       ├── types/
│       └── tests/
```

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

Update the "Approach" section in the task document:

```markdown
## Approach

### Implementation Plan
1. [Step 1]
2. [Step 2]

### Micro-decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
|          |        |           |

### SOLID Compliance
- [How each principle is applied]

### Risks
- [Technical risks and mitigations]
```

Update task frontmatter:
```yaml
status: in-progress:approach
```

## Next Steps

Proceed to `/forge-ai:forge-build-implement` when:
- Approach is documented
- Steps are clear and sequential
- User has confirmed the approach

If the approach changes significantly, discuss with the user and update the task document before proceeding.
