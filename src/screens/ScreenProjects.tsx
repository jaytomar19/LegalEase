import { useState, type FormEvent } from "react";
import { useStore } from "../state/store";

export function ScreenProjects() {
  const { state, dispatch } = useStore();
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [lastRev, setLastRev] = useState("all");

  // Modal State for "Add project manually"
  const [showAddModal, setShowAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [owner, setOwner] = useState("");
  const [prdLink, setPrdLink] = useState("");

  const projects = state.projects.map((p) => ({
    id: p.id,
    initial: p.name.trim().charAt(0).toUpperCase() || "P",
    name: p.name,
    description: p.subtitle || `${p.name} project`,
    owner: p.owner || `${p.defaultTeam} team`,
    lastReview: p.lastReview || "10 Sep 2026",
    openItems: p.openItems || "No open items",
    statusText: p.statusText || "On track",
    statusType: p.statusType || "on-track",
    avatarClass: p.avatarClass || "avatar-c",
  }));

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

  function handleAddProjectSubmit(e: FormEvent) {
    e.preventDefault();
    const nameTrim = projectName.trim();
    if (!nameTrim) return;

    const id = `prj-${Date.now()}`;
    dispatch({
      type: "ADD_PROJECT",
      id,
      name: nameTrim,
      owner: owner.trim() || "Magfi · Legal",
      prdLink: prdLink.trim() || "",
    });

    // Reset and close modal
    setProjectName("");
    setOwner("");
    setPrdLink("");
    setShowAddModal(false);
  }

  return (
    <div className="projects-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <div className="page-subtitle">All projects with their current Legal review status.</div>
        </div>
        <button className="btn-add-project" onClick={() => setShowAddModal(true)}>
          + Add project manually
        </button>
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

      {/* Add Project Manually Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-container add-project-modal" onClick={(e) => e.stopPropagation()}>
            <div className="add-project-modal-header">
              <div>
                <span className="add-project-brand-tag">FLAGWISE</span>
                <h2 className="add-project-modal-title">Add project manually</h2>
                <div className="add-project-modal-sub">
                  Add an existing Legal project and the source FlagWise should monitor.
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProjectSubmit}>
              <div className="form-field-group">
                <label className="form-field-label">Project name</label>
                <input
                  type="text"
                  className="add-project-input"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">Owner</label>
                <input
                  type="text"
                  className="add-project-input"
                  placeholder="Name and department"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                />
              </div>

              <div className="form-field-group">
                <label className="form-field-label">PRD link</label>
                <input
                  type="text"
                  className="add-project-input"
                  placeholder="https://..."
                  value={prdLink}
                  onChange={(e) => setPrdLink(e.target.value)}
                />
              </div>

              <div className="add-project-actions">
                <button type="button" className="btn-cancel-modal" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-modal">
                  Add project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
