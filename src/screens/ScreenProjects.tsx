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
      id: "A1",
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
      id: "A2",
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
      id: "W",
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
      id: "I",
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

  const filteredProjects = projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
          <option value="all">Department</option>
          <option value="product">Product</option>
          <option value="design">Design</option>
          <option value="engineering">Engineering</option>
        </select>
        <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Legal status</option>
          <option value="at-risk">At risk</option>
          <option value="on-track">On track</option>
        </select>
        <select className="filter-select" value={lastRev} onChange={(e) => setLastRev(e.target.value)}>
          <option value="all">Last reviewed</option>
        </select>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="project-card"
            onClick={() =>
              dispatch({
                type: "NAVIGATE",
                screen: { name: "project", projectId: p.id, projectTab: "ai-brief" },
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
    </div>
  );
}
