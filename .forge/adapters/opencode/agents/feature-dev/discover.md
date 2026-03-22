---
name: forge-discover
description: Feature Dev sub-phase 1 - Understand what needs to be built
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
model: medium
---

# Feature Dev: 1. Discover

Understand what needs to be built by orienting within existing context.

## Load Skills

Use these skills for context loading and state management:
- `@forge-context-loader` - Load minimum context for this phase
- `@forge-state-manager` - Update task status

## Context for Discover

Load these files:
1. `.forge/state.yaml` - Current state
2. `.forge/config.yaml` - Model tiers, quality settings
3. `docs/design/tasks/{task-slug}.md` - Task document (if brownfield)
4. `docs/planning/technology-and-architecture.md` - Tech context

## Operating Modes

### Brownfield Mode

**Condition:** Task document exists in `docs/design/tasks/` with implementation detail

**Actions:**
1. Read the task document thoroughly
2. Understand the problem, scope, and existing approach
3. Identify what needs clarification
4. Review acceptance criteria

### Greenfield Mode

**Condition:** No task document or stub only

**Actions:**
1. Interview user to understand feature requirements
2. Ask clarifying questions about:
   - What the feature should do
   - Who the users/stakeholders are
   - What existing systems this integrates with
   - Success criteria
   - Known constraints
3. Create new task document following the template
4. Define acceptance criteria with user input

## Discovery Checklist

For each task, understand:
- [ ] What is the feature supposed to do?
- [ ] Who are the users/stakeholders?
- [ ] What existing systems does this integrate with?
- [ ] What are the success criteria?
- [ ] Are there any known constraints or non-goals?
- [ ] What does "done" look like?

## Mode Detection

1. Check if task document exists: `docs/design/tasks/{task-slug}.md`
2. Evaluate completeness - does it have implementation detail?
3. Propose mode to user with reasoning
4. Wait for confirmation before proceeding

## Output

### Update Task Document

Update frontmatter:
```yaml
status: in-progress:discover
mode: brownfield  # or greenfield
```

### Document Discovery Findings

In task document body, add a "Discovery" section:
```markdown
## Discovery

### What We Learned
- [Learnings from understanding the task]

### Questions for Clarification
- [Questions to ask user]

### Assumptions
- [Assumptions we're making]
```

## Next Steps

Proceed to `@forge-explore` when:
- Task document is complete with discovery findings
- Mode is confirmed (brownfield/greenfield)
- Initial questions are documented

Use `@forge-state-manager` to update the state file.
