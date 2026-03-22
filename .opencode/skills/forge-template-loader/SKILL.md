---
name: forge-template-loader
description: Load and apply Forge document templates for all phases and artifacts
license: MIT
compatibility: opencode
metadata:
  audience: forge-users
  workflow: document-creation
---

# Forge Template Loader

Load and apply Forge document templates for all phases and artifacts.

## Template Locations

```
.forge/templates/
├── planning/
│   ├── project-scope.md
│   ├── user-stories.md
│   ├── implementation-plan.md
│   └── technology-and-architecture.md
├── design/
│   ├── design-decisions.md
│   ├── task-list.md
│   └── tasks/
│       └── TASK_TEMPLATE.md
├── testing/
│   └── uat-results.md
└── defects/
    └── DEFECT_TEMPLATE.md
```

## Usage by Phase

### Phase 1: Planning Templates

Load from `.forge/templates/planning/`:

| Document | Template | Output Location |
|----------|----------|-----------------|
| Project Scope | `project-scope.md` | `docs/planning/project-scope.md` |
| User Stories | `user-stories.md` | `docs/planning/user-stories.md` |
| Implementation Plan | `implementation-plan.md` | `docs/planning/implementation-plan.md` |
| Technology & Architecture | `technology-and-architecture.md` | `docs/planning/technology-and-architecture.md` |

### Phase 2: Design Templates

Load from `.forge/templates/design/`:

| Document | Template | Output Location |
|----------|----------|-----------------|
| Design Decisions | `design-decisions.md` | `docs/design/design-decisions.md` |
| Task List | `task-list.md` | `docs/design/task-list.md` |
| Individual Task | `tasks/TASK_TEMPLATE.md` | `docs/design/tasks/{task-slug}.md` |

### Phase 4: Testing Templates

| Document | Template | Output Location |
|----------|----------|-----------------|
| UAT Results | `testing/uat-results.md` | `docs/testing/uat-results.md` |

### Defect Templates

| Document | Template | Output Location |
|----------|----------|-----------------|
| Defect Report | `defects/DEFECT_TEMPLATE.md` | `docs/defects/{defect-slug}.md` |

## Template Variables

When applying templates, replace these placeholders:

| Variable | Description | Example |
|----------|-------------|---------|
| `[Task Title]` | Title of the task | "Implement user authentication" |
| `[Task Slug]` | URL-safe identifier | "implement-user-auth" |
| `[YYYY-MM-DD]` | Date placeholder | "2026-03-22" |
| `[timestamp]` | ISO 8601 timestamp | "2026-03-22T10:00:00Z" |
| `[Persona]` | User persona name | "End User" |
| `[Goal]` | User goal | "reset my password" |
| `[Benefit]` | User benefit | " regain access to my account" |

## Required Frontmatter Fields

### Task Document

```yaml
---
title: [Task Title]
status: not-started
mode: greenfield | brownfield
complexity: small | medium | large
categories:
  - backend
affected_modules: []
dependencies: []
---
```

### Defect Document

```yaml
---
title: [Defect Title]
severity: critical | high | medium | low
classification: design | implementation
status: open
source:
  type: sentry | logs | test | uat | user-report
  url: null
  discovered: [timestamp]
affected_features: []
routed_to: null
---
```

## Template Application Process

### Creating a New Document

1. **Read the template** from `.forge/templates/`
2. **Replace placeholders** with actual values
3. **Set initial status** in frontmatter (e.g., `status: in-progress`)
4. **Set dates** to current timestamp
5. **Write to destination** in `docs/`

### Example: Creating a Task Document

```
Input: TASK_TEMPLATE.md
Variables:
  title = "Implement user authentication"
  slug = "implement-user-auth"
  complexity = "medium"
  categories = ["backend", "database"]

Output: docs/design/tasks/implement-user-auth.md
```

## Template Validation

After creating a document, validate:

1. **Frontmatter present** - Document starts with `---`
2. **Required fields** - All required fields populated
3. **Valid enums** - Status, mode, complexity use valid values
4. **File path** - Correct location and naming

## Modifying Templates

Templates can be customized per project:

1. Copy from `.forge/templates/` to project root
2. Modify as needed
3. Use project-local template instead of global

Or extend `.forge/config.yaml`:
```yaml
templates:
  custom_path: .forge/templates-custom/
```
