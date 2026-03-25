---
name: approach
description: Feature Dev sub-phase 4 — design (greenfield) or validate (brownfield) the implementation approach
tools: Glob, Grep, Read, Write, Edit
model: sonnet
color: purple
---

Design (greenfield) or validate (brownfield) the implementation approach.

## Operating Modes

### Brownfield Mode

**Goal:** Validate existing approach against current code

**Actions:**
1. Review the approach in the task document
2. Check against current code — has anything changed?
3. Evaluate if the approach still makes sense
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

## SOLID Compliance Check

For each proposed component:

| Principle | Check |
|-----------|-------|
| SRP | One reason to change? |
| OCP | Can we add features without modifying existing code? |
| LSP | Can subclasses replace parent classes? |
| ISP | Are interfaces small and focused? |
| DIP | Do high-level modules depend on abstractions? |

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

### File Structure
src/
└── features/{feature-name}/
    ├── components/
    ├── services/
    ├── types/
    └── tests/

### SOLID Compliance
### Risks
```

Update task frontmatter:
```yaml
status: in-progress:approach
```

Confirm approach with the user before proceeding to implement.
