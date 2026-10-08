import { getTrackingBadgeCount, useStore } from "../state/store";
import { IconGrid, IconLayers, IconTicket, IconRadar } from "./icons";

export function Sidebar() {
  const { state, dispatch } = useStore();
  const screenName = state.screen.name;
  const trackingBadge = getTrackingBadgeCount(state);

  const effectiveName = screenName === "flag" ? state.screen.returnTo?.name ?? "home" : screenName;

  const isHome = effectiveName === "home";
  const isProjects = effectiveName === "projects" || effectiveName === "project" || effectiveName === "decision-sent";
  const isTickets = effectiveName === "tickets";
  const isTracking = state.filters.groupBy === "ai-tracking";

  const awaitingCount = state.flags.filter((f) => f.status === "awaiting-review").length;
  const activeProject = state.screen.projectId
    ? state.projects.find((p) => p.id === state.screen.projectId)
    : state.projects[0];

  function goHome() {
    dispatch({ type: "SET_GROUP_BY", groupBy: null });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  function goTracking() {
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
    dispatch({ type: "SET_GROUP_BY", groupBy: "ai-tracking" });
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-section-label">WORKSPACE</div>
      
      <nav className="sidebar-nav">
        <button className={`sidebar-link ${isHome && !isTracking ? "active" : ""}`} onClick={goHome}>
          <span className="sidebar-link-icon"><IconGrid size={15} /></span>
          Overview
        </button>
        <button
          className={`sidebar-link ${isProjects ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "projects" } })}
        >
          <span className="sidebar-link-icon"><IconLayers size={15} /></span>
          Projects
        </button>
        <button
          className={`sidebar-link ${isTickets ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "tickets" } })}
        >
          <span className="sidebar-link-icon"><IconTicket size={15} /></span>
          Tickets
          {awaitingCount > 0 && <span className="count">{awaitingCount}</span>}
        </button>
        <button
          className={`sidebar-link ${isTracking ? "active" : ""}`}
          onClick={goTracking}
        >
          <span className="sidebar-link-icon"><IconRadar size={15} /></span>
          AI Tracking
          {trackingBadge > 0 && <span className="count">{trackingBadge}</span>}
        </button>
      </nav>

      <hr className="sidebar-divider" />

      {activeProject && (
        <div className="sidebar-project-block">
          <div className="sidebar-section-label">CURRENT PROJECT</div>
          <div
            className="sidebar-project-card"
            onClick={() =>
              dispatch({
                type: "NAVIGATE",
                screen: { name: "project", projectId: activeProject.id, projectTab: "ai-brief" },
              })
            }
          >
            <div className="sidebar-project-badge">{activeProject.id}</div>
            <div className="sidebar-project-info">
              <div className="sidebar-project-name">{activeProject.name}</div>
              <div className="sidebar-project-sub">{activeProject.defaultTeam}</div>
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-spacer" />

      <div className="sidebar-status-card">
        <div className="sidebar-status-header">
          <span className="sidebar-status-dot" />
          <span className="sidebar-status-title">AI monitoring ON</span>
        </div>
        <div className="sidebar-status-sub">
          {trackingBadge > 0
            ? `${trackingBadge} possible change${trackingBadge === 1 ? "" : "s"} spotted`
            : "Monitoring approved project sources"}
        </div>
      </div>

      <div className="sidebar-footer-row">
        <button className="reset-demo-btn" onClick={() => dispatch({ type: "RESET" })}>
          ↻ Reset demo
        </button>
      </div>
    </aside>
  );
}
