(function () {
  const timelineTitle = document.getElementById("timeline-title");
  const timelineContainer = document.getElementById("timeline");
  const detailTitle = document.getElementById("detail-title");
  const detailMeta = document.getElementById("detail-meta");
  const detailSummary = document.getElementById("detail-summary");
  const detailDetails = document.getElementById("detail-details");
  const detailSource = document.getElementById("detail-source");
  const switchButtons = Array.from(document.querySelectorAll(".switcher-btn"));

  let activeTimeline = "world";

  function toNumberYear(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  function heatStyle(heat) {
    const normalized = Math.max(0, Math.min(100, heat));
    const size = 8 + Math.round((normalized / 100) * 12);
    const alpha = 0.28 + normalized / 160;
    return { size, color: `rgba(47, 111, 237, ${Math.min(alpha, 0.92)})` };
  }

  function clearDetails() {
    detailTitle.textContent = "Select a node";
    detailMeta.textContent = "";
    detailSummary.textContent = "";
    detailDetails.textContent = "";
    detailSource.textContent = "";
  }

  function showDetails(node) {
    detailTitle.textContent = node.title;
    detailMeta.textContent = `${node.year} · ${node.type} · Heat ${node.heat}`;
    detailSummary.textContent = node.summary;
    detailDetails.textContent = node.details;
    detailSource.textContent = `Source: ${node.source}`;
  }

  function renderTimeline(timelineKey) {
    const nodes = (window.TIMELINE_DATA[timelineKey] || []).slice().sort((a, b) => toNumberYear(a.year) - toNumberYear(b.year));
    timelineContainer.innerHTML = "";
    clearDetails();

    for (const node of nodes) {
      const item = document.createElement("article");
      item.className = "node";
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.dataset.id = node.id;

      const style = heatStyle(node.heat);
      item.style.setProperty("--dot-size", `${style.size}px`);
      item.style.setProperty("--dot-color", style.color);
      item.style.setProperty("--heat-weight", String(node.heat));
      item.style.setProperty("--left-space", `${Math.max(22, style.size + 12)}px`);

      const title = document.createElement("h4");
      title.textContent = `${node.year} · ${node.title}`;

      const keywords = document.createElement("div");
      keywords.className = "node-keywords";
      keywords.textContent = node.keywords.join(" · ");

      const meta = document.createElement("div");
      meta.className = "node-meta";
      meta.textContent = `${node.type} · Heat ${node.heat}`;

      item.append(title, keywords, meta);
      item.addEventListener("click", function () {
        showDetails(node);
      });
      item.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showDetails(node);
        }
      });

      timelineContainer.appendChild(item);
    }
  }

  function applyActiveButton(timelineKey) {
    for (const btn of switchButtons) {
      const isActive = btn.dataset.timeline === timelineKey;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
  }

  function setTimeline(timelineKey) {
    activeTimeline = timelineKey;
    timelineTitle.textContent = timelineKey === "world" ? "World History Timeline" : "China History Timeline";
    applyActiveButton(timelineKey);
    renderTimeline(timelineKey);
  }

  for (const btn of switchButtons) {
    btn.addEventListener("click", function () {
      const next = btn.dataset.timeline === "china" ? "china" : "world";
      if (next !== activeTimeline) {
        setTimeline(next);
      }
    });
  }

  setTimeline("world");
})();
