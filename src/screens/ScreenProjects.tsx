import { useState } from "react";
import { useStore } from "../state/store";

export function ScreenProjects() {
  const { dispatch } = useStore();
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [lastRev, setLastRev] = useState("all");

  const projects = [
    {
      id: "C",
      initial: "A",
      name: "AI Prototyping",
      description: "AI prototyping and code generation.",
      owner: "Sarah Chen · Product",
      lastReview: "24 Sep 2026",
      openItems: "2 open items",
      statusText: "At risk",
      statusType: "at-risk",
      avatarClass: "avatar-c",
    },
    {
      id: "A",
      initial: "A",
      name: "AI Assistant",
      description: "AI features across products.",
      owner: "Daniel Park · Design",
      lastReview: "12 Aug 2026",
      openItems: "1 open item",
      statusText: "Under re-review",
      statusType: "re-review",
      avatarClass: "avatar-a",
    },
    {
      id: "S",
      initial: "W",
      name: "Website Publishing",
      description: "Website publishing.",
      owner: "Priya Shah · Product",
      lastReview: "15 Aug 2026",
      openItems: "No open items",
      statusText: "On track",
      statusType: "on-track",
      avatarClass: "avatar-s",
    },
    {
      id: "B",
      initial: "B",
      name: "Brand Assets",
      description: "Brand asset generation.",
      owner: "Alex Kim · Marketing",
      lastReview: "10 Sep 2026",
      openItems: "1 open item",
      statusText: "Needs attention",
      statusType: "needs-attention",
      avatarClass: "avatar-b",
    },
    {
      id: "W",
      initial: "I",
      name: "Image and Video",
      description: "Image and video generation.",
      owner: "Jordan Lee · Engineering",
      lastReview: "18 Sep 2026",
      openItems: "1 open item",
      statusText: "Needs attention",
      statusType: "needs-attention",
      avatarClass: "avatar-w",
    },
  ];

  const filteredProjects = projects
    .filter((p) => {
      // Search
      if (
        search &&
        !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.description.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      // Department
      if (dept !== "all") {
        const ownerLower = p.owner.toLowerCase();
        if (!ownerLower.includes(dept.toLowerCase())) return false;
      }
      // Legal status
      if (status !== "all" && p.statusType !== status) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (lastRev === "recent") {
        return new Date(b.lastReview).getTime() - new Date(a.lastReview).getTime();
      }
      if (lastRev === "oldest") {
        return new Date(a.lastReview).getTime() - new Date(b.lastReview).getTime();
      }
      if (lastRev === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (lastRev === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  function resetFilters() {
    setSearch("");
    setDept("all");
    setStatus("all");
    setLastRev("all");
  }

  return (
    <div className="projects-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <div className="page-subtitle">All projects with their current Legal review status.</div>
        </div>
        <button className="btn-add-project">+ Add project manually</button>
      </div>

      <div className="filter-controls-row">
        <div className="search-input-wrap">
          <span className="search-input-icon">🔍</span>
          <input
            className="filter-search-input"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="all">Department (All)</option>
          <option value="product">Product</option>
          <option value="design">Design</option>
          <option value="engineering">Engineering</option>
          <option value="marketing">Marketing</option>
        </select>
        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Legal status (All)</option>
          <option value="at-risk">At risk</option>
          <option value="re-review">Under re-review</option>
          <option value="on-track">On track</option>
          <option value="needs-attention">Needs attention</option>
        </select>
        <select className="filter-select" value={lastRev} onChange={(e) => setLastRev(e.target.value)}>
          <option value="all">Sort by (Default)</option>
          <option value="recent">Last reviewed: Recent first</option>
          <option value="oldest">Last reviewed: Oldest first</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

        {(search || dept !== "all" || status !== "all" || lastRev !== "all") && (
          <button className="btn-ghost-link" style={{ marginLeft: 8 }} onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state-card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No matching projects</div>
          <div className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>
            No projects matched your active search or filter criteria.
          </div>
          <button className="btn-primary-pill" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="project-card"
              onClick={() =>
                dispatch({
                  type: "NAVIGATE",
                  screen: { name: "project", projectId: p.id, projectTab: "legal-review" },
                })
              }
            >
              <div className="project-card-header">
                <span className={`project-circle-avatar ${p.avatarClass}`}>{p.initial}</span>
                <span className={`project-status-pill pill-${p.statusType}`}>
                  {p.statusType === "at-risk" && "⏱ "}
                  {p.statusType === "re-review" && "⏱ "}
                  {p.statusType === "on-track" && "✓ "}
                  {p.statusType === "needs-attention" && "ⓘ "}
                  {p.statusText}
                </span>
              </div>

              <div className="project-card-title">{p.name}</div>
              <div className="project-card-desc">{p.description}</div>

              <div className="project-card-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Owner</span>
                  <span className="meta-value">{p.owner}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last Legal review</span>
                  <span className="meta-value">{p.lastReview}</span>
                </div>
              </div>

              <div className="project-card-footer">
                <span className="open-items-text">{p.openItems}</span>
                <span className="open-project-link">Open project ›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
