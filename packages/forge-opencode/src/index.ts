import type { Plugin, ToolContext } from "@opencode-ai/plugin";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const FORGE_OVERVIEW = `# Forge AI - Structured AI-Augmented Coding

Forge AI is a structured methodology for AI-augmented coding built on 6 project phases.

## Phase Commands

| Command | Description |
|---------|-------------|
| /forge-1-plan | Phase 1: Planning |
| /forge-2-design | Phase 2: Design |
| /forge-3-build | Phase 3: Development |
| /forge-4-test | Phase 4: Testing |
| /forge-5-deploy | Phase 5: Deployment |
| /forge-6-maintain | Phase 6: Maintenance |

## Feature Dev Sub-Commands (Phase 3)

| Command | Description |
|---------|-------------|
| /forge-3-build-1-discover | Understand what needs to be built |
| /forge-3-build-2-explore | Explore relevant existing code |
| /forge-3-build-3-clarify | Resolve ambiguities |
| /forge-3-build-4-approach | Design/validate approach |
| /forge-3-build-5-implement | Build the feature |
| /forge-3-build-6-review | Quality review |
| /forge-3-build-7-validate | Test validation |
| /forge-3-build-8-summarise | Document accomplishments |

## Utility Commands

| Command | Description |
|---------|-------------|
| /forge-init | Initialize Forge in a new project |
| /forge-status | Diagnose and recover from state inconsistencies |

To use a command, invoke the corresponding tool below (e.g., \`forge_plan\`).
`;

function getPackageDir(): string {
  return join(import.meta.dirname || "", "..");
}

function readCommandFile(filename: string): string | null {
  const packageDir = getPackageDir();
  const filePath = join(packageDir, "commands", filename);
  if (existsSync(filePath)) {
    return readFileSync(filePath, "utf-8");
  }
  return null;
}

function readAgentFile(agentName: string): string | null {
  const packageDir = getPackageDir();
  const filePath = join(packageDir, "agents", `${agentName}.md`);
  if (existsSync(filePath)) {
    return readFileSync(filePath, "utf-8");
  }
  return null;
}

function stripFrontmatter(content: string): string {
  if (content.startsWith("---")) {
    const endIndex = content.indexOf("---", 3);
    if (endIndex !== -1) {
      return content.slice(endIndex + 3).trim();
    }
  }
  return content;
}

export const ForgeAI: Plugin = async ({ client }) => {
  const injectForgeOverview = async (sessionId: string) => {
    try {
      await client.session.prompt({
        path: { id: sessionId },
        body: { parts: [{ type: "text", text: FORGE_OVERVIEW }] },
      } as any);
    } catch {
    }
  };

  const forgeTool = (name: string, commandFile: string, agentFile: string) => ({
    description: `Invoke Forge ${name} - Use this to start or continue Phase ${name}`,
    args: {},
    async execute(_args: Record<string, unknown>, context: ToolContext) {
      const commandContent = readCommandFile(commandFile);
      const agentContent = readAgentFile(agentFile);

      const content = [
        commandContent ? `## Command\n\n${stripFrontmatter(commandContent)}` : "",
        agentContent ? `## Agent Instructions\n\n${stripFrontmatter(agentContent)}` : "",
      ].filter(Boolean).join("\n\n");

      return content || `Forge ${name} activated. No content found.`;
    },
  });

  const forgeSubTool = (name: string, commandFile: string, description: string) => ({
    description,
    args: {},
    async execute() {
      const commandContent = readCommandFile(commandFile);
      if (commandContent) {
        return stripFrontmatter(commandContent);
      }
      return `Forge ${name} activated. No content found.`;
    },
  });

  return {
    event: async ({ event }) => {
      if (event.type === "session.created") {
        await injectForgeOverview((event as any).properties.info.id);
      } else if (event.type === "session.compacted") {
        await injectForgeOverview((event as any).properties.sessionID);
      }
    },
    tool: {
      forge_plan: forgeTool("Plan", "forge-1-plan.md", "plan-agent.md"),
      forge_design: forgeTool("Design", "forge-2-design.md", "design-agent.md"),
      forge_build: forgeTool("Build", "forge-3-build.md", "build-agent.md"),
      forge_test: forgeTool("Test", "forge-4-test.md", "test-agent.md"),
      forge_deploy: forgeTool("Deploy", "forge-5-deploy.md", "deploy-agent.md"),
      forge_maintain: forgeTool("Maintain", "forge-6-maintain.md", "maintain-agent.md"),
      forge_init: {
        description: "Initialize Forge in current project - Creates .forge directory and state file",
        args: {},
        async execute(_args: Record<string, unknown>, context: ToolContext) {
          const { worktree, directory } = context;
          const targetDir = worktree || directory;
          const forgeDir = join(targetDir, ".forge");
          const stateFile = join(forgeDir, "state.yaml");

          const initContent = `# Forge State
phase: planning
phaseStatus: not_started
features: []
lastUpdated: ${new Date().toISOString()}
`;

          try {
            await Bun.$`mkdir -p ${forgeDir}`.quiet();
            await Bun.$`cat > ${stateFile} ${initContent}`.quiet();
          } catch {
            return "Failed to initialize Forge. Ensure you have write permissions.";
          }

          return `Forge initialized at ${targetDir}`;
        },
      },
      forge_status: {
        description: "Show current Forge status - phase, features, and progress",
        args: {},
        async execute(_args: Record<string, unknown>, context: ToolContext) {
          const { worktree, directory } = context;
          const targetDir = worktree || directory;
          const stateFile = join(targetDir, ".forge", "state.yaml");

          if (!existsSync(stateFile)) {
            return "Forge not initialized. Run /forge-init or use forge_init tool first.";
          }

          try {
            const content = readFileSync(stateFile, "utf-8");
            return `## Forge Status\n\n${content}`;
          } catch {
            return "Failed to read Forge state.";
          }
        },
      },
      forge_3_build_1_discover: forgeSubTool("Build-1-Discover", "forge-3-build-1-discover.md", "Phase 3 Step 1: Understand what needs to be built"),
      forge_3_build_2_explore: forgeSubTool("Build-2-Explore", "forge-3-build-2-explore.md", "Phase 3 Step 2: Explore relevant existing code"),
      forge_3_build_3_clarify: forgeSubTool("Build-3-Clarify", "forge-3-build-3-clarify.md", "Phase 3 Step 3: Resolve ambiguities"),
      forge_3_build_4_approach: forgeSubTool("Build-4-Approach", "forge-3-build-4-approach.md", "Phase 3 Step 4: Design/validate approach"),
      forge_3_build_5_implement: forgeSubTool("Build-5-Implement", "forge-3-build-5-implement.md", "Phase 3 Step 5: Build the feature"),
      forge_3_build_6_review: forgeSubTool("Build-6-Review", "forge-3-build-6-review.md", "Phase 3 Step 6: Quality review"),
      forge_3_build_7_validate: forgeSubTool("Build-7-Validate", "forge-3-build-7-validate.md", "Phase 3 Step 7: Test validation"),
      forge_3_build_8_summarise: forgeSubTool("Build-8-Summarise", "forge-3-build-8-summarise.md", "Phase 3 Step 8: Document accomplishments"),
    },
  };
};

export default ForgeAI;
