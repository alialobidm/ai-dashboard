const SECONDS = 1;
const MINUTES = 60 * SECONDS;
const HOURS = 60 * MINUTES;

const LABS = Object.freeze({
  Anthropic: "Anthropic",
  Cursor: "Cursor",
  Google: "Google",
  OpenAI: "OpenAI",
  xAI: "xAI",
});

const models = [
  {
    name: "GPT-5.2-Codex",
    lab: LABS.OpenAI,
    release: "2025-12-18",
    releaseUrl: "https://openai.com/index/introducing-gpt-5-2-codex/",
  },
  {
    name: "Gemini 3 Flash",
    lab: LABS.Google,
    release: "2025-12-17",
    releaseUrl: "https://blog.google/products/gemini/gemini-3-flash/",
  },
  {
    name: "GPT-5.2",
    lab: LABS.OpenAI,
    release: "2025-12-11",
    releaseUrl: "https://openai.com/index/introducing-gpt-5-2/",
  },
  {
    name: "Claude Opus 4.5",
    lab: LABS.Anthropic,
    release: "2025-11-24",
    releaseUrl: "https://www.anthropic.com/news/claude-opus-4-5",
    metr50: 4 * HOURS + 49 * MINUTES,
    metr80: 27 * MINUTES,
  },
  {
    name: "GPT-5.1-Codex-Max",
    lab: LABS.OpenAI,
    release: "2025-11-19",
    releaseUrl: "https://openai.com/index/gpt-5-1-codex-max/",
    metr50: 2 * HOURS + 53 * MINUTES,
    metr80: 32 * MINUTES,
  },
  {
    name: "Gemini 3",
    lab: LABS.Google,
    release: "2025-11-18",
    releaseUrl: "https://blog.google/products/gemini/gemini-3/",
  },
  {
    name: "Grok 4.1",
    lab: LABS.xAI,
    release: "2025-11-17",
    releaseUrl: "https://x.ai/news/grok-4-1",
  },
  {
    name: "GPT-5.1",
    lab: LABS.OpenAI,
    release: "2025-11-12",
    releaseUrl: "https://openai.com/index/gpt-5-1/",
  },
  {
    name: "Composer 1",
    lab: LABS.Cursor,
    release: "2025-10-29",
    releaseUrl: "https://cursor.com/blog/composer",
  },
  {
    name: "Claude Haiku 4.5",
    lab: LABS.OpenAI,
    release: "2025-10-15",
    releaseUrl: "https://www.anthropic.com/news/claude-haiku-4-5",
  },
  {
    name: "Sonnet 4.5",
    lab: LABS.Anthropic,
    release: "2025-09-29",
    releaseUrl: "https://www.anthropic.com/news/claude-sonnet-4-5",
  },
  {
    name: "GPT-5-Codex",
    lab: LABS.OpenAI,
    release: "2025-09-15",
    releaseUrl: "https://openai.com/index/introducing-upgrades-to-codex/",
  },
  {
    name: "Grok Code Fast 1",
    lab: LABS.xAI,
    release: "2025-08-28",
    releaseUrl: "https://x.ai/news/grok-code-fast-1",
  },
  {
    name: "Grok 2.5",
    lab: LABS.xAI,
    release: "2025-08-23",
    notes: "Open weights model",
  },
  {
    name: "GPT-5",
    lab: LABS.OpenAI,
    release: "2025-08-07",
    releaseUrl: "https://openai.com/gpt-5/",
    metr50: 2 * HOURS + 18 * MINUTES,
    metr80: 27 * MINUTES,
  },
  {
    name: "gpt-oss-120b",
    lab: LABS.OpenAI,
    release: "2025-08-05",
    notes: "Open-weight models",
  },
  {
    name: "Grok 4",
    lab: LABS.xAI,
    release: "2025-07-09",
    releaseUrl: "https://x.ai/news/grok-4",
    metr50: 1 * HOURS + 49 * MINUTES,
    metr80: 15 * MINUTES,
  },
  {
    name: "Claude 4",
    lab: LABS.Anthropic,
    release: "2025-05-22",
    releaseUrl: "https://www.anthropic.com/news/claude-4",
  },
  {
    name: "codex-1",
    lab: LABS.OpenAI,
    release: "2025-05-16",
    releaseUrl: "https://openai.com/index/introducing-codex/",
    notes: "Also released Codex Web and Codex CLI",
  },
  {
    name: "o3",
    lab: LABS.OpenAI,
    release: "2025-04-16",
    releaseUrl: "https://openai.com/index/introducing-o3-and-o4-mini/",
    metr50: 1 * HOURS + 34 * MINUTES,
    metr80: 21 * MINUTES,
    notes: "Also released o4 mini",
  },
  {
    name: "GPT-4.1",
    lab: LABS.OpenAI,
    release: "2025-04-14",
    releaseUrl: "https://openai.com/index/gpt-4-1/",
  },
  {
    name: "Gemini 2.5",
    lab: LABS.Google,
    release: "2025-03-25",
    releaseUrl:
      "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/",
  },
  {
    name: "GPT-4.5",
    lab: LABS.OpenAI,
    release: "2025-02-27",
    releaseUrl: "https://openai.com/index/introducing-gpt-4-5/",
  },
  {
    name: "Claude 3.7 Sonnet",
    lab: LABS.Anthropic,
    release: "2025-02-24",
    releaseUrl: "https://www.anthropic.com/news/claude-3-7-sonnet",
    metr50: 56 * MINUTES,
    metr80: 15 * MINUTES,
    notes: "Also released Claude Code",
  },
  {
    name: "Grok 3",
    lab: LABS.xAI,
    release: "2025-02-19",
    releaseUrl: "https://x.ai/news/grok-3",
  },
  {
    name: "Gemini 2.0",
    lab: LABS.Google,
    release: "2024-12-11",
    releaseUrl:
      "https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/",
  },
  {
    name: "o1",
    lab: LABS.OpenAI,
    release: "2024-12-05",
    releaseUrl: "https://openai.com/o1/",
    metr50: 41 * MINUTES,
    metr80: 6 * MINUTES,
  },
  {
    name: "o1 (preview)",
    lab: LABS.OpenAI,
    release: "2024-09-12",
    releaseUrl: "https://openai.com/o1/",
    metr50: 22 * MINUTES,
    metr80: 5 * MINUTES,
  },
  {
    name: "Grok 2",
    lab: LABS.xAI,
    release: "2024-08-13",
    releaseUrl: "https://x.ai/news/grok-2",
  },
  {
    name: "Claude 3.5 Sonnet",
    lab: LABS.Anthropic,
    release: "2024-06-21",
    releaseUrl: "https://www.anthropic.com/news/claude-3-5-sonnet",
    metr50: 30 * MINUTES,
    metr80: 5 * MINUTES,
  },
  {
    name: "GPT-4o",
    lab: LABS.OpenAI,
    release: "2024-05-13",
    releaseUrl: "https://openai.com/index/hello-gpt-4o/",
    metr50: 9 * MINUTES,
    metr80: 2 * MINUTES,
  },
  {
    name: "Grok 1.5",
    lab: LABS.xAI,
    release: "2024-03-29",
    releaseUrl: "https://x.ai/news/grok-1.5",
  },
  {
    name: "Claude 3",
    lab: LABS.Anthropic,
    release: "2024-03-04",
    releaseUrl: "https://www.anthropic.com/news/claude-3-family",
  },
  {
    name: "Gemini 1.5",
    lab: LABS.Google,
    release: "2024-02-15",
    releaseUrl:
      "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/",
  },

  {
    name: "Gemini 1.0",
    lab: LABS.Google,
    release: "2023-12-06",
    releaseUrl: "https://blog.google/technology/ai/google-gemini-ai/",
  },
  {
    name: "Grok 1",
    lab: LABS.xAI,
    release: "2023-11-04",
    releaseUrl: "https://x.ai/news/grok?utm_source=chatgpt.com",
  },
  {
    name: "Claude 2",
    lab: LABS.Anthropic,
    release: "2023-07-11",
    releaseUrl: "https://www.anthropic.com/news/claude-2",
  },
  {
    name: "Claude 1.3",
    lab: LABS.Anthropic,
    release: "2023-04-18",
  },
  {
    name: "Claude",
    lab: LABS.Anthropic,
    release: "2023-03-14",
    releaseUrl: "https://www.anthropic.com/news/introducing-claude",
  },
  {
    name: "GPT-4",
    lab: LABS.OpenAI,
    release: "2023-03-14",
    releaseUrl: "https://openai.com/index/gpt-4/",
    metr50: 5 * MINUTES,
    metr80: 1 * MINUTES,
  },
  {
    name: "GPT-3.5",
    lab: LABS.OpenAI,
    release: "2022-11-30",
    releaseUrl: "https://openai.com/blog/chatgpt",
    notes: "ChatGPT debut with GPT-3.5",
    metr50: 36 * SECONDS,
    metr80: 10 * SECONDS,
  },
  {
    name: "GPT-3",
    lab: LABS.OpenAI,
    release: "2020-03-25",
    releaseUrl: "https://openai.com/blog/gpt-3-apps/",
    notes: "API access launched June 11, 2020",
    metr50: 9 * SECONDS,
    metr80: 2 * SECONDS,
  },
  {
    name: "GPT-2 (full release)",
    lab: LABS.OpenAI,
    release: "2019-11-05",
    releaseUrl: "https://openai.com/blog/gpt-2-1-5b-release/",
  },
  {
    name: "GPT-2",
    lab: LABS.OpenAI,
    release: "2019-02-14",
    releaseUrl: "https://openai.com/index/better-language-models/",
    metr50: 2 * SECONDS,
    metr80: 0 * SECONDS,
  },
  {
    name: "GPT-1",
    lab: LABS.OpenAI,
    release: "2018-06-11",
    releaseUrl: "https://openai.com/index/language-unsupervised/",
  },
];

function formatMETRTime(seconds) {
  if (seconds == null) return null;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${secs}s`;
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  if (d >= now) return "today";

  let start = new Date(d);
  let years = 0;
  let months = 0;

  while (true) {
    const next = new Date(start);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= now) {
      start = next;
      years++;
    } else {
      break;
    }
  }

  while (true) {
    const next = new Date(start);
    next.setMonth(next.getMonth() + 1);
    if (next <= now) {
      start = next;
      months++;
    } else {
      break;
    }
  }

  const diffMs = now - start;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let parts = [];
  if (years > 0) parts.push(years + (years === 1 ? " year" : " years"));
  if (months > 0) parts.push(months + (months === 1 ? " month" : " months"));
  if (days > 0) parts.push(days + (days === 1 ? " day" : " days"));

  return parts.join(", ");
}

function estimate80(m50) {
  const factor = 6;
  const val = m50 / factor;
  return Math.round(val) + " min (estimated)";
}

function renderModelsTable(containerId) {
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
  title.textContent = "Released Models";
  card.appendChild(title);

  // Create filter container
  const filterContainer = document.createElement("div");
  filterContainer.className = "filter-container";

  const filterLabel = document.createElement("label");
  filterLabel.textContent = "Filter by lab: ";
  filterContainer.appendChild(filterLabel);

  const filterSelect = document.createElement("select");
  filterSelect.id = "labFilter";

  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All labs";
  filterSelect.appendChild(allOption);

  const labs = [...new Set(models.map((m) => m.lab))].sort();
  labs.forEach((lab) => {
    const option = document.createElement("option");
    option.value = lab;
    option.textContent = lab;
    filterSelect.appendChild(option);
  });

  filterContainer.appendChild(filterSelect);

  const metrButton = document.createElement("button");
  metrButton.id = "metrFilterBtn";
  metrButton.textContent = "With METR values only";
  metrButton.className = "filter-button active";
  filterContainer.appendChild(metrButton);

  // Create pagination controls container
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "paginationControls";
  paginationContainer.className = "pagination-controls";
  filterContainer.appendChild(paginationContainer);

  card.appendChild(filterContainer);

  // Create table
  const table = document.createElement("table");
  table.id = "modelsTable";

  // Create table head
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = [
    "Model",
    "Lab",
    "Launch",
    "Blog post",
    "METR 50%",
    "METR 80%",
    "How long ago?",
  ];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  tbody.id = "modelsTableBody";
  table.appendChild(tbody);

  // Pagination state
  let labFilter = "";
  let metrFilterActive = true;
  let currentPage = 1;
  let showAll = false;
  const itemsPerPage = 10;

  // Function to render pagination controls
  function renderPagination(filtered) {
    const paginationContainer = document.getElementById("paginationControls");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    // "All" button
    const allBtn = document.createElement("button");
    allBtn.textContent = "All";
    allBtn.className = "pagination-btn" + (showAll ? " active" : "");
    allBtn.addEventListener("click", () => {
      showAll = true;
      renderRows();
    });
    paginationContainer.appendChild(allBtn);

    if (totalPages <= 1) return;

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className =
        "pagination-btn" + (i === currentPage && !showAll ? " active" : "");
      btn.addEventListener("click", () => {
        showAll = false;
        currentPage = i;
        renderRows();
      });
      paginationContainer.appendChild(btn);
    }
  }

  // Function to render filtered rows
  function renderRows() {
    tbody.innerHTML = "";
    let filtered = models;

    // Apply lab filter
    if (labFilter) {
      filtered = filtered.filter((m) => m.lab === labFilter);
    }

    // Apply METR filter
    if (metrFilterActive) {
      filtered = filtered.filter((m) => m.metr50 != null && m.metr80 != null);
    }

    // If less than itemsPerPage items, show all by default
    if (filtered.length <= itemsPerPage) {
      showAll = true;
    }

    // Determine which items to display
    let pageItems;
    if (showAll) {
      pageItems = filtered;
    } else {
      // Reset to page 1 if filters changed
      const totalPages = Math.ceil(filtered.length / itemsPerPage);
      if (currentPage > totalPages) {
        currentPage = 1;
      }

      // Get items for current page
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      pageItems = filtered.slice(start, end);
    }

    pageItems.forEach((m) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="Model">
          <strong>${m.name}</strong>
          ${m.notes ? `<div class="muted small">${m.notes}</div>` : ""}
        </td>
        <td data-label="Lab">${m.lab}</td>
        <td data-label="Launch">${m.release}</td>
        <td data-label="Blog post">
          ${m.releaseUrl ? `<a href="${m.releaseUrl}" target="_blank">Link</a>` : "—"}
        </td>
        <td data-label="METR 50%">${m.metr50 != null ? formatMETRTime(m.metr50) : "—"}</td>
        <td data-label="METR 80%">
          ${m.metr80 != null ? formatMETRTime(m.metr80) : m.metr50 != null ? estimate80(m.metr50) : "—"}
        </td>
        <td data-label="How long ago?">${timeAgo(m.release)}</td>
      `;
      tbody.appendChild(tr);
    });

    renderPagination(filtered);
  }

  card.appendChild(table);

  container.appendChild(card);

  // Initial render
  renderRows();

  // Add change event listener for lab filter
  filterSelect.addEventListener("change", (e) => {
    labFilter = e.target.value;
    currentPage = 1;
    showAll = false;
    renderRows();
  });

  // Add click event listener for METR filter button
  metrButton.addEventListener("click", () => {
    metrFilterActive = !metrFilterActive;
    metrButton.classList.toggle("active");
    currentPage = 1;
    showAll = false;
    renderRows();
  });
}
