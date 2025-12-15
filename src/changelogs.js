const changelogs = [
  {
    name: "Amp's Blog",
    url: "https://ampcode.com/chronicle",
  },
  {
    name: "Beads",
    url: "https://github.com/steveyegge/beads/releases",
  },
  {
    name: "Claude Code",
    url: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  },
  {
    name: "Codex CLI",
    url: "https://github.com/openai/codex/releases",
  },
  {
    name: "Cursor",
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
    name: "Opencode",
    url: "https://github.com/sst/opencode/releases",
  },
  {
    name: "Pi",
    url: "https://github.com/badlogic/pi-mono/releases",
  },
  {
    name: "Toad",
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
