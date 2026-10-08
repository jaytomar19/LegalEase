import { useStore, getProjectCounts, getTrackingBadgeCount } from "../state/store";
import { ProjectRow } from "../components/ProjectRow";
import { FilterBar } from "../components/FilterBar";
import { IssueTable } from "../components/IssueTable";
import { EmptyState } from "../components/EmptyState";
import { Screen7Tracking } from "./Screen7Tracking";
import { IconTicket, IconRadar } from "../components/icons";
import type { Flag } from "../types";

export function Screen1Home() {
  const { state, dispatch } = useStore();

  const keyword = state.filters.keyword.trim().toLowerCase();

  function matchesKeyword(f: Flag) {
    if (!keyword) return true;
    const haystack = [f.title, f.projectId, f.team, f.documentTitle, f.feature, f.category]
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  }

  function matchesShow(f: Flag) {
    if (state.filters.show === "all") return true;
    if (state.filters.show === "legal") return f.status !== "logged";
    if (state.filters.show === "non-legal") return f.status === "logged";
    return true;
  }

  const filtered = state.flags.filter((f) => matchesKeyword(f) && matchesShow(f));

  const liveFlags = filtered
    .filter((f) => f.status === "awaiting-review" || f.status === "comprehensive-review")
    .sort((a, b) => (a.urgency === b.urgency ? 0 : a.urgency === "urgent" ? -1 : 1));
  const resolvedFlags = filtered.filter((f) => f.status === "resolved");
  const loggedFlags = filtered.filter((f) => f.status === "logged");

  const allLiveFlags = state.flags.filter(
    (f) => f.status === "awaiting-review" || f.status === "comprehensive-review"
  );
  const urgentCount = allLiveFlags.filter((f) => f.urgency === "urgent").length;
  const laterCount = allLiveFlags.filter((f) => f.urgency === "later").length;
  const resolvedCount = state.flags.filter((f) => f.status === "resolved").length;
  const trackingCount = getTrackingBadgeCount(state);

  const groupBy = state.filters.groupBy;
  const isGrouped = groupBy === "department" || groupBy === "feature" || groupBy === "document";

  function groupKey(f: Flag) {
    if (groupBy === "department") return f.team;
    if (groupBy === "feature") return f.feature;
    if (groupBy === "document") return f.documentTitle;
    return "";
  }

  function groupedView() {
    const all = [...liveFlags, ...resolvedFlags, ...loggedFlags];
    const groups = new Map<string, Flag[]>();
    for (const f of all) {
      const key = groupKey(f);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(f);
    }
    if (groups.size === 0) return <EmptyState>No flags match</EmptyState>;
    return (
      <div>
        {[...groups.entries()].map(([key, items]) => (
          <div key={key} className="section-block">
            <div className="section-label">
              {key} ({items.length})
            </div>
            <IssueTable
              liveFlags={items.filter((f) => f.status === "awaiting-review" || f.status === "comprehensive-review")}
              resolvedFlags={items.filter((f) => f.status === "resolved")}
              loggedFlags={items.filter((f) => f.status === "logged")}
            />
          </div>
        ))}
      </div>
    );
  }

  const result = state.submissionResult;

  const projectsNeedingAttention = state.projects
    .map((p) => ({ project: p, counts: getProjectCounts(state, p.id) }))
    .filter((p) => p.counts.live > 0)
    .sort((a, b) => Number(b.counts.hasUrgentLive) - Number(a.counts.hasUrgentLive))
    .slice(0, 3);

  const recentChanges = state.notifications.filter((n) => n.kind === "resolved").slice(0, 3);

  function scrollToIssues() {
    document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="home-screen">
      {result && result.kind === "no-flag" && (
        <div className="banner grey">
          <span>
            <strong>Checked: no flag raised. Logged.</strong> This change does not appear to affect the approved
            legal conditions — logged for audit purposes only.
          </span>
          <button className="banner-dismiss" onClick={() => dispatch({ type: "DISMISS_SUBMISSION_RESULT" })}>
            ✕
          </button>
        </div>
      )}
      {result && result.kind === "no-approval" && (
        <div className="banner grey">
          <span>
            {state.projects.find((p) => p.id === result.projectId)?.name} has no approval on record, so there
            was nothing to compare against. Logged.
          </span>
          <button className="banner-dismiss" onClick={() => dispatch({ type: "DISMISS_SUBMISSION_RESULT" })}>
            ✕
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Good morning, magfi!</h1>
          <div className="page-subtitle">Here's what needs your attention today.</div>
        </div>
      </div>

      {/* KPI Tiles Row */}
      <div className="kpi-grid">
        <div className="kpi-card urgent" onClick={() => dispatch({ type: "SET_FILTERS", filters: { show: "legal" } })}>
          <div className="kpi-card-header">
            <span className="kpi-icon-wrap urgent">
              <IconTicket size={14} />
            </span>
            <span className="kpi-chevron">›</span>
          </div>
          <div className="kpi-value">{urgentCount}</div>
          <div className="kpi-label">Urgent</div>
          <div className="kpi-sub">Needs review now</div>
        </div>

        <div className="kpi-card later" onClick={() => dispatch({ type: "SET_FILTERS", filters: { show: "legal" } })}>
          <div className="kpi-card-header">
            <span className="kpi-icon-wrap later">
              <IconTicket size={14} />
            </span>
            <span className="kpi-chevron">›</span>
          </div>
          <div className="kpi-value">{laterCount}</div>
          <div className="kpi-label">Later</div>
          <div className="kpi-sub">Can wait a few days</div>
        </div>

        <div className="kpi-card resolved" onClick={() => dispatch({ type: "SET_FILTERS", filters: { show: "all" } })}>
          <div className="kpi-card-header">
            <span className="kpi-icon-wrap resolved">
              <IconTicket size={14} />
            </span>
            <span className="kpi-chevron">›</span>
          </div>
          <div className="kpi-value">{resolvedCount}</div>
          <div className="kpi-label">Resolved</div>
          <div className="kpi-sub">Sent back to teams</div>
        </div>

        <div
          className="kpi-card tracking"
          onClick={() => dispatch({ type: "SET_GROUP_BY", groupBy: "ai-tracking" })}
        >
          <div className="kpi-card-header">
            <span className="kpi-icon-wrap tracking">
              <IconRadar size={14} />
            </span>
            <span className="kpi-chevron">›</span>
          </div>
          <div className="kpi-value">{trackingCount}</div>
          <div className="kpi-label">Possible changes</div>
          <div className="kpi-sub">Spotted by AI tracking, not submitted</div>
        </div>
      </div>

      {/* Two Column Summary Blocks */}
      <div className="summary-blocks-grid">
        <div className="content-card">
          <div className="content-card-header">
            <div>
              <div className="content-card-title">Projects needing attention</div>
              <div className="content-card-sub">Prioritised using your approved baselines</div>
            </div>
            <button className="link-action-btn" onClick={scrollToIssues}>
              View all ›
            </button>
          </div>
          {projectsNeedingAttention.length === 0 ? (
            <EmptyState>No projects currently need attention</EmptyState>
          ) : (
            <div className="attention-rows">
              {projectsNeedingAttention.map(({ project, counts }) => (
                <div
                  key={project.id}
                  className="attention-row"
                  onClick={() =>
                    dispatch({
                      type: "NAVIGATE",
                      screen: { name: "project", projectId: project.id, projectTab: "ai-brief" },
                    })
                  }
                >
                  <span
                    className="project-badge-icon"
                    style={{
                      background: counts.hasUrgentLive ? "var(--urgent-fill)" : "var(--later-fill)",
                      color: counts.hasUrgentLive ? "var(--urgent-text)" : "var(--later-text)",
                    }}
                  >
                    {project.id}
                  </span>
                  <div className="attention-body">
                    <div className="attention-title">{project.name}</div>
                    <div className="attention-sub">
                      {counts.live} open item{counts.live === 1 ? "" : "s"} · Legal review status needs attention
                    </div>
                  </div>
                  <span className={`badge ${counts.hasUrgentLive ? "badge-urgent" : "badge-later"}`}>
                    {counts.hasUrgentLive ? "Urgent" : "Later"}
                  </span>
                  <span className="row-chevron">›</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-card">
          <div className="content-card-header">
            <div>
              <div className="content-card-title">Recent changes</div>
              <div className="content-card-sub">From monitored project sources</div>
            </div>
          </div>
          {recentChanges.length === 0 ? (
            <EmptyState>No resolved changes yet</EmptyState>
          ) : (
            <div className="recent-rows">
              {recentChanges.map((n) => (
                <div key={n.id} className="recent-row">
                  <span className="recent-icon">✦</span>
                  <div className="recent-body">
                    <div className="recent-title">{n.title}</div>
                    <div className="recent-sub">
                      Project {n.projectId} · {n.team}
                    </div>
                  </div>
                  <div className="recent-time">{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area: Sidebar Filter + Projects & Issues */}
      <div className="home-layout-split">
        <aside className="filters-sidebar">
          <div className="section-label">Filters</div>
          <FilterBar
            filters={state.filters}
            onChange={(patch) => dispatch({ type: "SET_FILTERS", filters: patch })}
            showAiTracking
            layout="sidebar"
          />
        </aside>

        <main className="main-tables-section">
          <div className="content-card section-block" id="projects-section">
            <div className="section-label" style={{ marginBottom: 12 }}>
              Projects
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Team</th>
                  <th>People</th>
                  <th>Status</th>
                  <th>Resolved</th>
                </tr>
              </thead>
              <tbody>
                {state.projects.map((p) => (
                  <ProjectRow
                    key={p.id}
                    project={p}
                    onClick={() =>
                      dispatch({
                        type: "NAVIGATE",
                        screen: { name: "project", projectId: p.id, projectTab: "ai-brief" },
                      })
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="content-card section-block">
            <div className="section-label" style={{ marginBottom: 12 }}>
              Needs your review
            </div>
            {groupBy === "ai-tracking" ? (
              <Screen7Tracking />
            ) : isGrouped ? (
              groupedView()
            ) : (
              <IssueTable liveFlags={liveFlags} resolvedFlags={resolvedFlags} loggedFlags={loggedFlags} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
