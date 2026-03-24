---
name: forge-deploy
description: Forge AI Phase 5 - Deployment
license: MIT
compatibility: opencode
---

# Forge AI: Phase 5 - Deployment

Invoke the `@forge-deploy` agent to execute deployment.

## What Happens

1. Deployment documentation is loaded from `docs/deployment/`
2. Infrastructure task documents reviewed
3. Deployment steps executed
4. Verification of deployment success
5. Post-deployment monitoring confirmed
6. State updated

## Pre-Deployment Checklist

- [ ] All tests pass in staging
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Secrets configured
- [ ] Monitoring/alerting configured
- [ ] Rollback plan documented

## Deployment Targets

- Development: `npm run dev`
- Staging: `npm run deploy:staging`
- Production: `npm run deploy:production`

## Verification

After deployment:
- Health endpoint check
- Version verification
- Critical feature smoke test

## Rollback

If deployment fails:
1. Identify issue
2. Execute rollback procedure
3. Verify recovery

## Next Steps

After Phase 5 complete, use `/forge-maintain` for Phase 6: Maintenance.
