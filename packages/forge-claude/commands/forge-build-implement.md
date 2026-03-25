---
description: "Forge Feature Dev - Sub-phase 5 Implement: build the feature"
argument-hint: "--task <task-slug>"
---

# Feature Dev: 5. Implement

Build the feature following the validated approach.

## Implementation Principles

1. **Step by Step** - Implement incrementally, don't skip steps
2. **SOLID Principles** - Apply throughout
3. **DRY Code** - Don't repeat yourself
4. **Clear Naming** - Variables, functions, files should be self-explanatory
5. **Error Handling** - Appropriate for context

## Code Standards

- Linting must pass (run `npm run lint` or equivalent)
- Type checking must pass (run `npm run typecheck` or equivalent)
- Follow existing patterns in the codebase
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

### 4. API Layer (if applicable)
- Route handlers
- Request/response DTOs

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

## Error Handling Patterns

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

Update the task document — add an "Implementation" section:

```markdown
## Implementation

### Changes Made
| File | Change | Lines |
|------|--------|-------|
| src/auth.ts | Created | +120 |
| src/auth.test.ts | Created | +85 |

### Implementation Notes
- [Any notes about the implementation]

### Progress
- [x] Types defined
- [x] Core logic
- [ ] API endpoints
- [ ] Tests
```

Update task frontmatter:
```yaml
status: in-progress:implement
```

## Next Steps

Proceed to `/forge-ai:forge-build-review` when:
- Implementation is complete
- All approach steps are followed
- Basic self-checks pass (lint, type check)

If review finds issues, return to this phase to fix them before re-running review.
