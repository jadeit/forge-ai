---
description: "Forge Feature Dev - Sub-phase 1 Discover: understand what needs to be built"
argument-hint: "--task <task-slug>"
---

# Feature Dev: 1. Discover

Understand what needs to be built by orienting within existing context.

## Context to Load

Read these files:
1. `.forge/state.yaml` - Current state
2. `.forge/config.yaml` - Model tiers and quality settings
3. `docs/design/tasks/{task-slug}.md` - Task document (if it exists)
4. `docs/planning/technology-and-architecture.md` - Technology context

## Operating Modes

### Brownfield Mode

**Condition:** Task document exists in `docs/design/tasks/` with implementation detail

**Actions:**
1. Read the task document thoroughly
2. Understand the problem, scope, and existing approach
3. Identify what still needs clarification
4. Review acceptance criteria

### Greenfield Mode

**Condition:** No task document, or only a stub

**Actions:**
1. Interview the user to understand feature requirements
2. Ask clarifying questions about:
   - What the feature should do
   - Who the users/stakeholders are
   - What existing systems this integrates with
   - Success criteria and known constraints
3. Create a new task document
4. Define acceptance criteria with user input

## Mode Detection

1. Check if task document exists: `docs/design/tasks/{task-slug}.md`
2. Evaluate completeness — does it have implementation detail?
3. Propose mode to user with reasoning
4. Wait for confirmation before proceeding

## Discovery Checklist

- [ ] What is the feature supposed to do?
- [ ] Who are the users/stakeholders?
- [ ] What existing systems does this integrate with?
- [ ] What are the success criteria?
- [ ] Are there known constraints or non-goals?
- [ ] What does "done" look like?

## Output

Update (or create) the task document at `docs/design/tasks/{task-slug}.md`:

**Frontmatter:**
```yaml
status: in-progress:discover
mode: brownfield  # or greenfield
```

**Add a Discovery section:**
```markdown
## Discovery

### What We Learned
- [Learnings from understanding the task]

### Questions for Clarification
- [Questions to take to user]

### Assumptions
- [Assumptions we're making]
```

Update `.forge/state.yaml`:
```yaml
context:
  current_task: {task-slug}
  current_sub_phase: 1_discover
```

## Next Steps

Proceed to `/forge-ai:forge-build-explore` when:
- Task document is complete with discovery findings
- Mode is confirmed (brownfield/greenfield)
- Initial questions are documented
