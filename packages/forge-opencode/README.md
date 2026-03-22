# @jadeit/forge-ai

Forge AI - Structured AI-augmented coding methodology for OpenCode

## Installation

```bash
# Add to your project
npm install @jadeit/forge-ai
```

Or add to your `opencode.json`:

```json
{
  "plugin": ["@jadeit/forge-ai"]
}
```

## Features

- **Phase 1 (Planning)**: Project scoping, user stories, technology decisions
- **Phase 2 (Design)**: System design, task decomposition, architectural decisions
- **Phase 3 (Development)**: Feature implementation via 8-step feature dev lifecycle
- **Phase 4 (Testing)**: UAT facilitation and defect management
- **Phase 5 (Deployment)**: Deployment runbooks and execution
- **Phase 6 (Maintenance)**: Triage, routing, and audit

## Commands

| Command | Description |
|---------|-------------|
| `/forge-1-plan` | Phase 1: Planning |
| `/forge-2-design` | Phase 2: Design |
| `/forge-3-build` | Phase 3: Development |
| `/forge-4-test` | Phase 4: Testing |
| `/forge-5-deploy` | Phase 5: Deployment |
| `/forge-6-maintain` | Phase 6: Maintenance |
| `/forge-init` | Initialize Forge in a new project |
| `/forge-status` | Check current project state |

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Publish
# Push a commit with conventional commit format, then merge release PR
```

## License

MIT
