---
name: forge-implement
description: Feature Dev sub-phase 5 - Build the feature
mode: subagent
permission:
  skill:
    "forge-*": allow
    "documents-*": allow
    "code-*": allow
    "*": deny
tools:
  read: true
  write: true
  edit: true
  bash: true
  glob: true
  grep: true
  websearch: true
  webfetch: true
---

# Feature Dev: 5. Implement

Build the feature following the validated approach.

## Pre-flight Check

Verify you are working in the correct branch and worktree before writing any code:

```bash
git branch --show-current   # must match feature/{task-slug}
pwd                          # must be inside .worktrees/{task-slug}
```

If not, stop and alert the build agent to set up the worktree first.

## Load Skills

Use these skills:
- `@forge-context-loader` - Load context for implementation
- `@forge-quality-checker` - For quality gate checks

## Implementation Principles

### Core Principles

1. **Step by Step** - Implement incrementally, don't skip steps
2. **SOLID Principles** - Apply throughout
3. **DRY Code** - Don't repeat yourself
4. **Clear Naming** - Variables, functions, files should be self-explanatory
5. **Error Handling** - Appropriate for context

### Code Standards

- Linting must pass (run `npm run lint` or equivalent)
- Type checking must pass (run `npm run typecheck` or equivalent)
- Follow existing patterns in codebase
- Add inline comments for non-obvious logic

## Implementation Order

Follow the approach plan. Typical order:

### 1. Foundation
- Type definitions / interfaces
- Configuration / constants
- Base classes / utilities

### 2. Core Domain/Business Logic
- Domain models
- Business rules
- Validation

### 3. Data Layer (if applicable)
- Database schema changes
- Repository patterns
- Data access objects

### 4. API Layer (if applicable)
- Route handlers
- Request/response DTOs
- API documentation

### 5. Integration Points
- External service clients
- Event handlers
- Middleware

### 6. Tests
- Unit tests
- Integration tests

## Implementation Checklist

- [ ] Types/interfaces defined
- [ ] Core logic implemented
- [ ] Error handling added
- [ ] Input validation added
- [ ] Tests written
- [ ] Lint passes
- [ ] Type check passes

## File Naming Conventions

Detect language from project and follow appropriate conventions:

| Type | Python | TypeScript | Go |
|------|--------|------------|-----|
| Components/Modules | `snake_case.py` | `PascalCase.tsx` | `snake_case.go` |
| Utilities | `snake_case.py` | `camelCase.ts` | `snake_case.go` |
| Constants | `UPPER_SNAKE.py` | `UPPER_SNAKE.ts` | `UpperSnake.go` |
| Types | `snake_case.py` | `PascalCase.ts` | - |
| Tests | `test_*.py` | `*.test.ts` | `*_test.go` |

## Error Handling Pattern

Follow language-specific patterns:

### Python
```python
try:
    result = perform_operation()
    return result
except KnownError as e:
    raise UserFriendlyError('Message', cause=e)
except Exception:
    logger.error('Unexpected error', extra={'context': context})
    raise
```

### TypeScript
```typescript
try {
  const result = await performOperation();
  return result;
} catch (error) {
  if (error instanceof KnownError) {
    throw new UserFriendlyError('Message', { cause: error });
  }
  logger.error('Unexpected error', { error, context });
  throw error;
}
```

### Go
```go
result, err := performOperation()
if err != nil {
    if errors.Is(err, knownError) {
        return nil, fmt.Errorf("user friendly: %w", err)
    }
    logger.Error("Unexpected error", "context", context)
    return nil, err
}
return result, nil
```

## Output

### Update Task Document

Add "Implementation" section:

```markdown
## Implementation

### Changes Made
| File | Change | Lines |
|------|--------|-------|
| src/auth.ts | Created | +120 |
| src/auth.test.ts | Created | +85 |

### Implementation Notes
- [Any notes about the implementation]

### Decisions Made During Implementation
- [If different from approach, document why]
```

### Update Frontmatter

```yaml
status: in-progress:implement
```

### Track Progress

Keep track of what's been implemented vs what's left:
```markdown
### Progress
- [x] Types defined
- [x] Core logic
- [ ] API endpoints
- [ ] Tests
```

## Next Steps

Proceed to `@forge-review` when:
- Implementation is complete
- All approach steps followed
- Basic self-checks pass (lint, type check)

## Rework Handling

If `@forge-review` finds issues:
1. Fix the issues in this phase
2. Re-run quality checks
3. Proceed back to review

Use `@forge-quality-checker` to run automated checks.
