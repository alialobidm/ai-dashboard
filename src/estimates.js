const targets = [
  60,
  2 * 60,
  4 * 60,
  8 * 60,
  5 * 8 * 60,
  22 * 8 * 60,
  12 * 22 * 8 * 60,
  10 * 12 * 22 * 8 * 60,
  80 * 1000 * 60, // 37.8788 years
];

const targetNames = [
  "1 hour",
  "2 hours",
  "Half workday",
  "1 workday",
  "1 workweek",
  "1 workmonth",
  "1 workyear",
  "1 workdecade",
  "1 career",
];

function estimateDateForTarget(t0_min, baseDateStr, target_min) {
  const t0 = t0_min;
  if (target_min <= t0) return new Date(baseDateStr);
  const ratio = target_min / t0;
  const monthsNeeded = 7 * Math.log2(ratio);
  const base = new Date(baseDateStr);
  const result = new Date(base);
  result.setMonth(result.getMonth() + Math.floor(monthsNeeded));
  const frac = monthsNeeded - Math.floor(monthsNeeded);
  result.setDate(result.getDate() + Math.round(frac * 30));
  return result;
}

function niceDiffFromNow(date) {
  const now = new Date();
  if (date <= now) return "already surpassed";

  let start = new Date(now);
  let years = 0;
  let months = 0;

  while (true) {
    const next = new Date(start);
    next.setFullYear(next.getFullYear() + 1);
    if (next <= date) {
      start = next;
      years++;
    } else {
      break;
    }
  }

  while (true) {
    const next = new Date(start);
    next.setMonth(next.getMonth() + 1);
    if (next <= date) {
      start = next;
      months++;
    } else {
      break;
    }
  }

  const diffMs = date - start;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let parts = [];
  if (years > 0) parts.push(years + (years === 1 ? " year" : " years"));
  if (months > 0) parts.push(months + (months === 1 ? " month" : " months"));
  if (days > 0) parts.push(days + (days === 1 ? " day" : " days"));

  return parts.join(", ");
}

function formatMETRTimeWithDays(seconds) {
  if (seconds == null) return null;

  const workweekSeconds = 5 * 8 * 3600; // 5 days * 8 hours
  const workdaySeconds = 8 * 3600; // 8 hours
  
  const workweeks = Math.floor(seconds / workweekSeconds);
  const remainingAfterWeeks = seconds % workweekSeconds;
  const workdays = Math.floor(remainingAfterWeeks / workdaySeconds);
  const hours = Math.floor((remainingAfterWeeks % workdaySeconds) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let parts = [];
  if (workweeks > 0) parts.push(`${workweeks}ww`);
  if (workdays > 0) parts.push(`${workdays}wd`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);

  if (parts.length > 0) {
    return parts.join(" ");
  }

  // Fall back to regular formatMETRTime for < 1 minute
  return formatMETRTime(seconds);
}

function getNextXQuarters(numFutureQuarters) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-11

  // Determine current quarter (0-3)
  const currentQuarter = Math.floor(currentMonth / 3);

  let quarters = [];
  let year = currentYear;
  let quarter = currentQuarter + 1;
  if (quarter > 3) {
    quarter = 0;
    year++;
  }

  // Add next numFutureQuarters quarters (excluding current quarter)
  for (let i = 0; i < numFutureQuarters; i++) {
    const quarterNum = quarter + 1; // Q1, Q2, Q3, Q4
    const name = `${year} Q${quarterNum}`;

    // Calculate start and end dates for the quarter
    const startMonth = quarter * 3;
    const startDate = new Date(year, startMonth, 1);

    // End date is the last day of the quarter
    const endMonth = quarter * 3 + 2;
    const endDate = new Date(year, endMonth + 1, 0); // Day 0 of next month = last day of this month

    // Format dates as YYYY-MM-DD in local timezone (not UTC)
    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    quarters.push({
      name,
      startDate: formatLocalDate(startDate),
      endDate: formatLocalDate(endDate),
    });

    // Move to next quarter
    quarter++;
    if (quarter > 3) {
      quarter = 0;
      year++;
    }
  }

  return quarters;
}

function getMetrProjectionForDate(baseDate, metrValue) {
  if (!metrValue) return null;

  // Find the best model to base projections on
  const modelsWithMetr50 = models.filter((m) => m.metr50 != null);
  const modelsWithMetr80 = models.filter((m) => m.metr80 != null);

  const maxModel50 =
    modelsWithMetr50.length > 0
      ? modelsWithMetr50.reduce((max, m) => (m.metr50 > max.metr50 ? m : max))
      : null;

  const maxModel80 =
    modelsWithMetr80.length > 0
      ? modelsWithMetr80.reduce((max, m) => (m.metr80 > max.metr80 ? m : max))
      : null;

  // Use the projection date relative to the METR baseline
  const projectionDate = new Date(baseDate);
  const projectedMinutes =
    metrValue === "metr50" ? maxModel50?.metr50 / 60 : maxModel80?.metr80 / 60;

  return projectionDate;
}

function renderQuarterlyProjections() {
  const numFutureQuarters = 7;
  const quarters = getNextXQuarters(numFutureQuarters); // Next numFutureQuarters (excluding current)

  // Find models with maximum metr50 and metr80
  const modelsWithMetr50 = models.filter((m) => m.metr50 != null);
  const modelsWithMetr80 = models.filter((m) => m.metr80 != null);

  const maxModel50 =
    modelsWithMetr50.length > 0
      ? modelsWithMetr50.reduce((max, m) => (m.metr50 > max.metr50 ? m : max))
      : null;

  const maxModel80 =
    modelsWithMetr80.length > 0
      ? modelsWithMetr80.reduce((max, m) => (m.metr80 > max.metr80 ? m : max))
      : null;

  // Find the METR Projections card
  const proj50Table = document.getElementById("proj50");
  if (!proj50Table) {
    console.warn("Could not find proj50 table");
    return;
  }
  const card = proj50Table.closest(".card");
  if (!card) {
    console.warn("Could not find METR Projections card");
    return;
  }

  // Create section for quarterly projections within the card
  const section = document.createElement("div");

  const heading = document.createElement("h2");
  heading.textContent = "Quarterly METR Projections";
  section.appendChild(heading);

  const paragraph = document.createElement("p");
  paragraph.textContent = `Next ${numFutureQuarters} quarters`;
  section.appendChild(paragraph);

  const table = document.createElement("table");
  table.id = "quarterlyProjections";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Quarter", "Start Date", "METR 50", "METR 80", "How long until"].forEach(
    (header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    },
  );
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  section.appendChild(table);

  // Find the "Length of human tasks" h2 and insert before it
  const h2Elements = card.querySelectorAll("h2");
  let lengthOfTasksH2 = null;
  for (let h2 of h2Elements) {
    if (h2.textContent.includes("Length of human tasks")) {
      lengthOfTasksH2 = h2;
      break;
    }
  }

  if (lengthOfTasksH2) {
    card.insertBefore(section, lengthOfTasksH2);
  } else {
    card.appendChild(section);
  }

  quarters.forEach((q) => {
    const row = document.createElement("tr");

    // Calculate projections for the start of the quarter using doubling every 7 months
    let metr50Projection = "—";
    let metr80Projection = "—";

    const quarterStart = new Date(q.startDate);

    if (maxModel50) {
      const baseDate = new Date(maxModel50.release);
      const monthsDiff =
        (quarterStart.getFullYear() - baseDate.getFullYear()) * 12 +
        (quarterStart.getMonth() - baseDate.getMonth());

      // Calculate value with doubling every 7 months: value = base * 2^(months/7)
      const projectedValue = maxModel50.metr50 * Math.pow(2, monthsDiff / 7);
      metr50Projection = formatMETRTimeWithDays(projectedValue);
    }

    if (maxModel80) {
      const baseDate = new Date(maxModel80.release);
      const monthsDiff =
        (quarterStart.getFullYear() - baseDate.getFullYear()) * 12 +
        (quarterStart.getMonth() - baseDate.getMonth());

      // Calculate value with doubling every 7 months: value = base * 2^(months/7)
      const projectedValue = maxModel80.metr80 * Math.pow(2, monthsDiff / 7);
      metr80Projection = formatMETRTimeWithDays(projectedValue);
    }

    const howLongUntil = niceDiffFromNow(quarterStart);

    row.innerHTML = `
      <td data-label="Quarter">${q.name}</td>
      <td data-label="Start Date">${q.startDate}</td>
      <td data-label="METR 50">${metr50Projection}</td>
      <td data-label="METR 80">${metr80Projection}</td>
      <td data-label="How long until">${howLongUntil}</td>
    `;

    tbody.appendChild(row);
  });
}

function renderEstimates() {
  // Find models with maximum metr50 and metr80
  const modelsWithMetr50 = models.filter((m) => m.metr50 != null);
  const modelsWithMetr80 = models.filter((m) => m.metr80 != null);

  const maxModel50 =
    modelsWithMetr50.length > 0
      ? modelsWithMetr50.reduce((max, m) => (m.metr50 > max.metr50 ? m : max))
      : null;

  const maxModel80 =
    modelsWithMetr80.length > 0
      ? modelsWithMetr80.reduce((max, m) => (m.metr80 > max.metr80 ? m : max))
      : null;

  const h3Elements = document.querySelectorAll(".card h3");
  h3Elements.forEach((h3) => {
    if (h3.textContent === "With 50% success rate" && maxModel50) {
      const p = document.createElement("p");
      p.textContent = `Based on SOTA of ${formatMETRTime(maxModel50.metr50)} with ${maxModel50.name} on ${maxModel50.release}`;
      h3.parentNode.insertBefore(p, h3.nextSibling);
    } else if (h3.textContent === "With 80% success rate" && maxModel80) {
      const p = document.createElement("p");
      p.textContent = `Based on SOTA of ${formatMETRTime(maxModel80.metr80)} with ${maxModel80.name} on ${maxModel80.release}`;
      h3.parentNode.insertBefore(p, h3.nextSibling);
    }
  });

  const tbody50 = document.querySelector("#proj50 tbody");
  const tbody80 = document.querySelector("#proj80 tbody");

  targets.forEach((t, idx) => {
    const targetSeconds = t * 60; // Convert target from minutes to seconds

    // Check if target 50 is already surpassed
    const achieved50 = models.filter(
      (m) => m.metr50 != null && m.metr50 >= targetSeconds,
    );
    const earliestModel50 =
      achieved50.length > 0
        ? achieved50.reduce((earliest, m) =>
            new Date(m.release) < new Date(earliest.release) ? m : earliest,
          )
        : null;

    let eta50, howLong50;
    if (earliestModel50) {
      eta50 = `${earliestModel50.release} (${earliestModel50.name})`;
      howLong50 = "already surpassed";
    } else if (maxModel50) {
      const date50 = estimateDateForTarget(
        maxModel50.metr50 / 60,
        maxModel50.release,
        t,
      );
      eta50 = date50.toISOString().slice(0, 10);
      howLong50 = niceDiffFromNow(date50);
    } else {
      eta50 = "—";
      howLong50 = "—";
    }

    const tr50 = document.createElement("tr");
    tr50.innerHTML = `
       <td data-label="Milestone">${targetNames[idx]} (${Math.round(t / 60)}h)</td>
       <td data-label="ETA">${eta50}</td>
       <td data-label="How long till">${howLong50}</td>
     `;
    tbody50.appendChild(tr50);

    // Check if target 80 is already surpassed
    const achieved80 = models.filter(
      (m) => m.metr80 != null && m.metr80 >= targetSeconds,
    );
    const earliestModel80 =
      achieved80.length > 0
        ? achieved80.reduce((earliest, m) =>
            new Date(m.release) < new Date(earliest.release) ? m : earliest,
          )
        : null;

    let eta80, howLong80;
    if (earliestModel80) {
      eta80 = `${earliestModel80.release} (${earliestModel80.name})`;
      howLong80 = "already surpassed";
    } else if (maxModel80) {
      const date80 = estimateDateForTarget(
        maxModel80.metr80 / 60,
        maxModel80.release,
        t,
      );
      eta80 = date80.toISOString().slice(0, 10);
      howLong80 = niceDiffFromNow(date80);
    } else {
      eta80 = "—";
      howLong80 = "—";
    }

    const tr80 = document.createElement("tr");
    tr80.innerHTML = `
       <td data-label="Milestone">${targetNames[idx]} (${Math.round(t / 60)}h)</td>
       <td data-label="ETA">${eta80}</td>
       <td data-label="How long till">${howLong80}</td>
     `;
    tbody80.appendChild(tr80);
  });
}
