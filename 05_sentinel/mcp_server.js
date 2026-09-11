import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialisation du Serveur
const server = new Server(
  { name: "sentinel-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 2. Déclaration des Outils (Ce que Copilot peut voir)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "fetch_github_issues",
        description: "Récupère les 5 dernières issues d'un dépôt GitHub.",
        inputSchema: {
          type: "object",
          properties: {
            owner: { type: "string", description: "Le propriétaire du dépôt GitHub" },
            repo: { type: "string", description: "Le nom du dépôt GitHub" }
          },
          required: ["owner", "repo"]
        }
      },
    ]
  };
});

// 3. Exécution de la logique (Ce que Copilot peut faire)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "fetch_github_issues") {
    const { owner, repo } = request.params.arguments ?? {};

    if (!owner || !repo) {
      return {
        content: [{ type: "text", text: "Les paramètres owner et repo sont obligatoires." }],
        isError: true,
      };
    }

    if (!process.env.GITHUB_TOKEN) {
      return {
        content: [{ type: "text", text: "La variable d'environnement GITHUB_TOKEN est absente." }],
        isError: true,
      };
    }

    try {
      const url = new URL(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`
      );
      url.search = new URLSearchParams({
        per_page: "5",
        state: "all",
        sort: "created",
        direction: "desc"
      });

      const response = await fetch(url, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2026-03-10"
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub a répondu avec le statut ${response.status}.`);
      }

      const issues = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify(issues.slice(0, 5), null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Erreur lors de la récupération des issues GitHub: ${error.message}` }],
        isError: true,
      };
    }
  }

  throw new Error("Outil inconnu");
});

// 5. Démarrage du serveur sur stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server démarré et en écoute sur stdio");
}

main().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});
