const changelogs = [
  {
    name: "Amp Blog",
    url: "https://ampcode.com/chronicle",
  },
  {
    name: "Beads Releases",
    url: "https://github.com/steveyegge/beads/releases",
  },
  {
    name: "Claude Code Changelog",
    url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  },
  {
    name: "Codex CLI Commits",
    url: "https://github.com/openai/codex/commits/main",
  },
  {
    name: "Codex CLI Releases",
    url: "https://github.com/openai/codex/releases",
  },
  {
    name: "Cursor Blog",
    url: "https://cursor.com/blog",
  },
  {
    name: "Cursor Changelog",
    url: "https://cursor.com/changelog",
  },
  {
    name: "Dexter",
    url: "https://github.com/virattt/dexter",
  },
  {
    name: "Gemini CLI",
    url: "https://github.com/google-gemini/gemini-cli/releases",
  },
  {
    name: "Openclaw Releases",
    url: "https://github.com/openclaw/openclaw/releases",
  },
  {
    name: "Opencode Releases",
    url: "https://github.com/sst/opencode/releases",
  },
  {
    name: "Pi Releases",
    url: "https://github.com/badlogic/pi-mono/releases",
  },
  {
    name: "Toad Releases",
    url: "https://github.com/batrachianai/toad/releases",
  },
];

function renderChangelogsCard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }

  // Clear container
  container.innerHTML = "";

  // Create card
  const card = document.createElement("div");
  card.className = "card";

  // Add title
  const title = document.createElement("h2");
  title.textContent = "Changelogs I'm Tracking";
  card.appendChild(title);

  // Add changelog links in a single paragraph
  const p = document.createElement("p");
  changelogs.forEach((changelog, index) => {
    const a = document.createElement("a");
    a.href = changelog.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = changelog.name;
    p.appendChild(a);

    // Add comma separator between items
    if (index < changelogs.length - 1) {
      p.appendChild(document.createTextNode(", "));
    }
  });
  card.appendChild(p);

  container.appendChild(card);
}
