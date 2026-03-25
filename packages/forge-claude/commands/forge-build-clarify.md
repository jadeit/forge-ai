---
description: "Forge Feature Dev - Sub-phase 3 Clarify: fill gaps and resolve ambiguities"
---

# Feature Dev: 3. Clarify

Fill in gaps and resolve ambiguities. Output updates the task document.

## Clarification Process

### 1. Review Findings

Review what was learned in:
- **Discover phase** - What we understood about the task
- **Explore phase** - What patterns and conventions exist

### 2. Identify Gaps

Look for:
- Unclear acceptance criteria
- Missing edge case handling
- Vague implementation details
- Unknown dependencies
- Conflicts between requirements
- Technical uncertainties

### 3. Form Questions

Create clear, specific questions for the user:

```
**Q1:** [Specific question]

**Context:** [Why this matters]
- [Detail 1]
- [Detail 2]

**Options:** [If multiple solutions exist]
1. Option A - [description]
2. Option B - [description]
```

### 4. Prioritise Questions

- **Must answer** - Blockers for implementation
- **Should answer** - Important for optimal solution
- **Could answer** - Nice to have clarification

## Common Clarification Topics

| Topic | Questions to Ask |
|-------|------------------|
| Input validation | What are the valid ranges? What happens with invalid input? |
| Error handling | Should errors be logged? Retried? How? |
| Edge cases | What happens at boundaries? Empty data? Concurrent access? |
| Performance | Any latency requirements? Rate limits? |
| Security | Authentication required? Authorization levels? |
| Data | What happens to existing data? Migrations needed? |
| Integration | How does this interact with external systems? |
| Rollback | How to undo if something goes wrong? |

## Output

Update the task document — add or update a "Clarification" section:

```markdown
## Clarification

### Questions Asked
| # | Question | Priority | Answer |
|---|----------|----------|--------|
| 1 |          | Must     |        |
| 2 |          | Should   |        |

### Decisions Made
| Decision | Choice | Rationale |
|----------|--------|----------|
|          |        |          |

### Remaining Ambiguities
- [Any items not yet clarified — note for later]
```

Refine acceptance criteria based on clarifications:
```yaml
acceptance_criteria:
  - "AC1: [Specific, testable criterion]"
  - "AC2: [Specific, testable criterion]"
```

Update task frontmatter:
```yaml
status: in-progress:clarify
```

## Next Steps

Proceed to `/forge-ai:forge-build-approach` when:
- All "Must" priority questions are answered
- Acceptance criteria are refined and clear
- Decisions are documented

If significant new information emerges that changes the task scope:
1. Discuss with the user
2. Update the task document summary
3. Consider returning to the discover phase
