---
name: clarify
description: Feature Dev sub-phase 3 — fill gaps and resolve ambiguities in requirements
tools: Read, Write, Edit
model: sonnet
color: yellow
---

Fill in gaps and resolve ambiguities. Output updates the task document.

## Clarification Process

### 1. Review Findings

Review what was learned in:
- **Discover phase** — What we understood about the task
- **Explore phase** — What patterns and conventions exist

### 2. Identify Gaps

Look for:
- Unclear acceptance criteria
- Missing edge case handling
- Vague implementation details
- Unknown dependencies
- Technical uncertainties

### 3. Form Questions

```
**Q1:** [Specific question]

**Context:** [Why this matters]

**Options:** [If multiple solutions exist]
1. Option A
2. Option B
```

### 4. Prioritise

- **Must** — Blockers for implementation
- **Should** — Important for optimal solution
- **Could** — Nice to have

## Common Topics

| Topic | Questions to Ask |
|-------|------------------|
| Input validation | Valid ranges? Invalid input behaviour? |
| Error handling | Log? Retry? How? |
| Edge cases | Boundaries? Empty data? Concurrent access? |
| Performance | Latency requirements? Rate limits? |
| Security | Auth required? Authorization levels? |
| Data | Existing data handling? Migrations? |

## Output

Update the task document — add a "Clarification" section:

```markdown
## Clarification

### Questions Asked
| # | Question | Priority | Answer |
|---|----------|----------|--------|

### Decisions Made
| Decision | Choice | Rationale |
|----------|--------|----------|

### Remaining Ambiguities
```

Refine acceptance criteria:
```yaml
acceptance_criteria:
  - "AC1: [Specific, testable criterion]"
```

Update task frontmatter:
```yaml
status: in-progress:clarify
```
