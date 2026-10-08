import { useState } from "react";
import { useStore, getProjectCounts } from "../state/store";

type StatusFilter = "all" | "live" | "clear";

function statusPill(hasUrgentLive: boolean, live: number) {
  if (live === 0) return { label: "On track", tone: "resolved" };
  if (hasUrgentLive) return { label: "At risk", tone: "urgent" };
  return { label: "Needs attention", tone: "later" };
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
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <div className="page-subtitle">All projects with their current Legal review status.</div>
        </div>
        <button className="btn btn-secondary" disabled title="Not part of the IA2 prototype scope">
          + Add project manually
        </button>
      </div>

      <div className="flex-row gap-10" style={{ marginBottom: 20, flexWrap: "wrap", rowGap: 10 }}>
        <input
          className="input"
          style={{ width: 220 }}
          placeholder="Search projects…"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select className="select" style={{ width: 160 }} value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>
          <option value="all">Department: All</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="select"
          style={{ width: 170 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        >
          <option value="all">Legal status: All</option>
          <option value="live">Needs attention</option>
          <option value="clear">On track</option>
        </select>
      </div>

      <div className="stat-tile-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {rows.map(({ project, counts }) => {
          const pill = statusPill(counts.hasUrgentLive, counts.live);
          return (
            <div
              key={project.id}
              className="surface-card"
              style={{ padding: 20, cursor: "pointer" }}
              onClick={() => openProject(project.id)}
            >
              <div className="flex-row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
                <span
                  className="attention-row-icon"
                  style={{
                    background: counts.hasUrgentLive ? "var(--urgent)" : counts.live > 0 ? "var(--later)" : "var(--resolved)",
                  }}
                >
                  {project.id}
                </span>
                <span className={`badge badge-${pill.tone}`}>
                  <span className="badge-dot" />
                  {pill.label}
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{project.name}</div>
              <div className="page-subtitle" style={{ marginBottom: 14 }}>
                {project.subtitle}
              </div>
              <div className="divider" style={{ margin: "0 0 10px" }} />
              <div className="summary-list">
                <div className="summary-list-row">
                  <span>Owner</span>
                  <span>{project.defaultTeam}</span>
                </div>
                <div className="summary-list-row">
                  <span>{counts.live} open item{counts.live === 1 ? "" : "s"}</span>
                  <span className="link-btn">Open project ›</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
