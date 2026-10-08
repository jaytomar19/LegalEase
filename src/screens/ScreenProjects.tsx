import { useState } from "react";
import { useStore, getProjectCounts } from "../state/store";

type StatusFilter = "all" | "live" | "clear";

function statusPill(hasUrgentLive: boolean, live: number) {
  if (live === 0) return { label: "On track", tone: "resolved" };
  if (hasUrgentLive) return { label: "Urgent review", tone: "urgent" };
  return { label: "Needs review", tone: "later" };
}

export function ScreenProjects() {
  const { state, dispatch } = useStore();
  const [keyword, setKeyword] = useState("");
  const [teamFilter, setTeamFilter] = useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const rows = state.projects
    .map((p) => ({ project: p, counts: getProjectCounts(state, p.id) }))
    .filter(({ project }) => project.name.toLowerCase().includes(keyword.trim().toLowerCase()))
    .filter(({ project }) => teamFilter === "all" || project.defaultTeam === teamFilter)
    .filter(({ counts }) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "live") return counts.live > 0;
      return counts.live === 0;
    });

  const teams = Array.from(new Set(state.projects.map((p) => p.defaultTeam)));

  function openProject(projectId: string) {
    dispatch({ type: "NAVIGATE", screen: { name: "project", projectId, projectTab: "ai-brief" } });
  }

  return (
    <div className="projects-screen">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <div className="page-subtitle">All projects with their current Legal review status.</div>
        </div>
      </div>

      <div className="filter-controls-row">
        <input
          className="input-search"
          placeholder="Search projects…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select className="select-dropdown" value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
          <option value="all">Department: All</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="select-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Legal status: All</option>
          <option value="live">Needs review</option>
          <option value="clear">On track</option>
        </select>
      </div>

      <div className="projects-grid-3">
        {rows.map(({ project, counts }) => {
          const pill = statusPill(counts.hasUrgentLive, counts.live);
          return (
            <div
              key={project.id}
              className="content-card project-card-item"
              onClick={() => openProject(project.id)}
            >
              <div className="project-card-top-row">
                <span className="project-id-badge">{project.id}</span>
                <span className={`badge badge-${pill.tone}`}>
                  <span className="badge-dot" />
                  {pill.label}
                </span>
              </div>
              <div className="project-name-heading">{project.name}</div>
              <div className="project-subtitle-text">{project.subtitle}</div>
              <hr className="card-hr" />
              <div className="project-meta-rows">
                <div className="meta-row">
                  <span className="meta-lbl">Team</span>
                  <span className="meta-val">{project.defaultTeam}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-lbl">Status</span>
                  <span className="meta-val">
                    {counts.live} open item{counts.live === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="project-card-action">
                <span className="open-project-btn">Open project ›</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
