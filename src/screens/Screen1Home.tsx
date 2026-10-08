import { useStore } from "../state/store";
import { ProjectRow } from "../components/ProjectRow";
import { FilterBar } from "../components/FilterBar";
import { IssueTable } from "../components/IssueTable";
import { EmptyState } from "../components/EmptyState";
import { Screen7Tracking } from "./Screen7Tracking";
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
          <h1 className="page-title">Overview</h1>
          <div className="page-subtitle">What needs Legal's attention</div>
        </div>
      </div>

      <div className="stat-tile-row">
        <div className="stat-tile urgent">
          <div className="stat-tile-label">Urgent</div>
          <div className="stat-tile-value">{urgentCount}</div>
          <div className="stat-tile-sub">Needs review now</div>
        </div>
        <div className="stat-tile later">
          <div className="stat-tile-label">Later</div>
          <div className="stat-tile-value">{laterCount}</div>
          <div className="stat-tile-sub">Can wait a few days</div>
        </div>
        <div className="stat-tile resolved">
          <div className="stat-tile-label">Resolved</div>
          <div className="stat-tile-value">{resolvedCount}</div>
          <div className="stat-tile-sub">Sent back to teams</div>
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
