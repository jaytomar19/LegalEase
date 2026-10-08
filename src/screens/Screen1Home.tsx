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

  // Needs-review counts must reflect true status, not the active search/show filters.
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

  // Projects with at least one live issue, most urgent first — a quick-glance summary.
  const projectsNeedingAttention = state.projects
    .map((p) => ({ project: p, counts: getProjectCounts(state, p.id) }))
    .filter((p) => p.counts.live > 0)
    .sort((a, b) => Number(b.counts.hasUrgentLive) - Number(a.counts.hasUrgentLive))
    .slice(0, 3);

  // Most recently resolved flags — a quick-glance activity feed.
  const recentChanges = state.notifications.filter((n) => n.kind === "resolved").slice(0, 3);

  function scrollToIssues() {
    document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
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

      <div className="page-header">
        <div>
          <h1 className="page-title">Good morning, magfi!</h1>
          <div className="page-subtitle">Here's what needs your attention today.</div>
        </div>
      </div>

      <div className="stat-tile-row">
        <div className="stat-tile urgent">
          <div className="stat-tile-top">
            <span className="stat-tile-icon">
              <IconTicket size={14} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">{urgentCount}</div>
          <div className="stat-tile-label">Urgent</div>
          <div className="stat-tile-sub">Needs review now</div>
        </div>
        <div className="stat-tile later">
          <div className="stat-tile-top">
            <span className="stat-tile-icon">
              <IconTicket size={14} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">{laterCount}</div>
          <div className="stat-tile-label">Later</div>
          <div className="stat-tile-sub">Can wait a few days</div>
        </div>
        <div className="stat-tile resolved">
          <div className="stat-tile-top">
            <span className="stat-tile-icon">
              <IconTicket size={14} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">{resolvedCount}</div>
          <div className="stat-tile-label">Resolved</div>
          <div className="stat-tile-sub">Sent back to teams</div>
        </div>
        <div
          className="stat-tile tracking"
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "SET_GROUP_BY", groupBy: "ai-tracking" })}
        >
          <div className="stat-tile-top">
            <span className="stat-tile-icon">
              <IconRadar size={14} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">{trackingCount}</div>
          <div className="stat-tile-label">Possible changes</div>
          <div className="stat-tile-sub">Spotted by AI tracking, not submitted</div>
        </div>
      </div>

      <div className="home-summary-row">
        <div className="summary-block">
          <div className="summary-block-header">
            <div className="summary-block-title">Projects needing attention</div>
            <button className="link-btn" onClick={scrollToIssues}>
              View all ›
            </button>
          </div>
          <div className="page-subtitle" style={{ marginBottom: 4 }}>
            Prioritised using your approved baselines
          </div>
          {projectsNeedingAttention.length === 0 ? (
            <EmptyState>No projects currently need attention</EmptyState>
          ) : (
            projectsNeedingAttention.map(({ project, counts }) => (
              <div key={project.id} className="attention-row">
                <span
                  className="attention-row-icon"
                  style={{ background: counts.hasUrgentLive ? "var(--urgent)" : "var(--later)" }}
                >
                  {project.id}
                </span>
                <div className="attention-row-body">
                  <div className="attention-row-title">{project.name}</div>
                  <div className="attention-row-sub">
                    {counts.live} open item{counts.live === 1 ? "" : "s"} · Legal review status needs attention
                  </div>
                </div>
                <span className={`badge ${counts.hasUrgentLive ? "badge-urgent" : "badge-later"}`}>
                  {counts.hasUrgentLive ? "High" : "Medium"}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="summary-block">
          <div className="summary-block-header">
            <div className="summary-block-title">Recent changes</div>
          </div>
          <div className="page-subtitle" style={{ marginBottom: 4 }}>
            From monitored project sources
          </div>
          {recentChanges.length === 0 ? (
            <EmptyState>No resolved changes yet</EmptyState>
          ) : (
            recentChanges.map((n) => (
              <div key={n.id} className="recent-row">
                <span className="recent-row-icon">✦</span>
                <div className="recent-row-body">
                  <div className="recent-row-title">{n.title}</div>
                  <div className="recent-row-sub">
                    Project {n.projectId} · {n.team}
                  </div>
                </div>
                <div className="cell-tertiary">{n.time}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="home-layout">
        <div>
          <div className="section-label">Filters</div>
          <FilterBar
            filters={state.filters}
            onChange={(patch) => dispatch({ type: "SET_FILTERS", filters: patch })}
            showAiTracking
            layout="sidebar"
          />
        </div>

        <div>
          <div className="section-block" id="projects-section">
            <div className="section-label">Projects</div>
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

          <div className="section-block">
            <div className="section-label">Needs your review</div>
            {groupBy === "ai-tracking" ? (
              <Screen7Tracking />
            ) : isGrouped ? (
              groupedView()
            ) : (
              <IssueTable liveFlags={liveFlags} resolvedFlags={resolvedFlags} loggedFlags={loggedFlags} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
