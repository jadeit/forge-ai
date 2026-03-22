---
description: Forge AI Phase 6 - Maintenance triage, routing, and audit
agent: forge-maintain
---

# Forge AI: Phase 6 - Maintenance

Invoke the `@forge-maintain` agent for maintenance operations.

## Important Note

**No new code is written in Phase 6.** Issues are routed to appropriate phases for resolution.

## Maintenance Operations

### 1. Triage

Take an incident, error, or observation and produce a structured defect report in `docs/defects/`.

**Input Sources:**
- Error logs
- APM alerts (Sentry, DataDog)
- User reports
- Test failures
- UAT findings

### 2. Route

Based on classification:

| Classification | Route To | Mode |
|----------------|----------|------|
| Design flaw | `/forge-2-design` | Brownfield |
| Implementation bug | `/forge-3-build` | Greenfield |
| Configuration issue | `/forge-5-deploy` | - |

### 3. Audit

Scan existing defect reports and summarise status:
- Open defects
- Routed defects
- Resolved defects

## Severity Levels

| Severity | Criteria | Response Time |
|----------|----------|---------------|
| Critical | System down, data loss | Immediate |
| High | Major feature broken | 24 hours |
| Medium | Feature broken, workaround | 1 week |
| Low | Minor issue | Next sprint |

## Defect Routing

When you encounter an issue:

1. Investigate and gather information
2. Create defect report with severity and classification
3. Propose routing based on classification
4. You confirm before routing

## Commands

- `/forge-maintain-audit` - Run defect audit
- `/forge-maintain-triage` - Triage new issue
- `/forge-maintain-route` - Route existing defect
