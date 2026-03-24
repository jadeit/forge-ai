---
name: forge-test
description: Forge AI Phase 4 - Functional testing and UAT
license: MIT
compatibility: opencode
---

# Forge AI: Phase 4 - Testing

Invoke the `@forge-test` agent to begin User Acceptance Testing.

## What Happens

1. User stories and acceptance criteria are loaded
2. UAT checklist is presented
3. For each item, you confirm: passed / failed / skipped
4. Failed items → defect reports created in `docs/defects/`
5. Results → `docs/testing/uat-results.md`
6. State updated after your sign-off

## UAT Gate Process

1. Present checklist of user stories with acceptance criteria
2. You verify each by running the project locally
3. For each item: PASSED / FAILED / SKIPPED
4. Failed items produce defect reports
5. Skipped items logged with reason
6. Phase 5 proceeds only after your sign-off

## Requirements

User acceptance testing MUST be done by:
- Running the project locally
- Validating each user story against implementation
- NOT just running automated tests

## Defect Handling

For failed items:
1. Create defect report in `docs/defects/`
2. Document reproduction steps
3. Classify: design or implementation
4. Route to appropriate phase

## Next Steps

After Phase 4 complete, use `/forge-deploy` for Phase 5: Deployment.
