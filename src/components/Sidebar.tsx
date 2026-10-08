import { getBellCount, getTrackingBadgeCount, useStore } from "../state/store";
import { IconGrid, IconLayers, IconTicket, IconRadar, IconGear, IconRefresh } from "./icons";

export function Sidebar() {
  const { state, dispatch } = useStore();
  const screenName = state.screen.name;
  const needsReview = getBellCount(state);
  const trackingBadge = getTrackingBadgeCount(state);

  const effectiveName = screenName === "flag" ? state.screen.returnTo?.name ?? "home" : screenName;

  const isOverview = effectiveName === "home" && state.filters.groupBy !== "ai-tracking";
  const isTickets = effectiveName === "tickets";
  const isTracking = effectiveName === "home" && state.filters.groupBy === "ai-tracking";
  const isProject = effectiveName === "project" || effectiveName === "decision-sent";

  function goHome() {
    dispatch({ type: "SET_GROUP_BY", groupBy: null });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  function goProjects() {
    dispatch({ type: "SET_GROUP_BY", groupBy: null });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
    setTimeout(() => document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" }), 30);
  }

  function goTracking() {
    dispatch({ type: "SET_GROUP_BY", groupBy: "ai-tracking" });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-brand">
        <span className="app-header-brand-mark">L</span>
        LegalEase
      </div>

      <div className="app-sidebar-section-label">Menu</div>
      <div className="app-sidebar-nav">
        <button className={`app-sidebar-nav-item ${isOverview ? "active" : ""}`} onClick={goHome}>
          <IconGrid />
          Overview
          {needsReview > 0 && <span className="nav-count">{needsReview}</span>}
        </button>
        <button className={`app-sidebar-nav-item ${isProject ? "active" : ""}`} onClick={goProjects}>
          <IconLayers />
          Projects
        </button>
        <button
          className={`app-sidebar-nav-item ${isTickets ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "tickets" } })}
        >
          <IconTicket />
          Tickets
        </button>
        <button className={`app-sidebar-nav-item ${isTracking ? "active" : ""}`} onClick={goTracking}>
          <IconRadar />
          AI Tracking
          {trackingBadge > 0 && <span className="nav-count">{trackingBadge}</span>}
        </button>
      </div>

      <div className="app-sidebar-spacer" />

      <div className="app-sidebar-divider" />

      <div className="app-sidebar-nav">
        <button className="app-sidebar-nav-item">
          <IconGear />
          Settings
        </button>
        <button className="app-sidebar-nav-item" onClick={() => dispatch({ type: "RESET" })}>
          <IconRefresh />
          Reset demo
        </button>
      </div>

      <div className="app-sidebar-divider" />

      <div className="app-sidebar-status-card">
        <div>
          <span className="app-sidebar-status-dot" />
          <span className="app-sidebar-status-title">AI monitoring ON</span>
        </div>
        <div className="app-sidebar-status-sub">
          {trackingBadge > 0
            ? `${trackingBadge} possible change${trackingBadge === 1 ? "" : "s"} spotted, not yet submitted`
            : "Watching approved project sources"}
        </div>
      </div>

      <div className="user-chip" style={{ width: "100%" }}>
        <span className="user-chip-avatar">MG</span>
        <span className="user-chip-text">
          <span className="user-chip-name">Magfi</span>
          <span className="user-chip-role">Junior Counsel</span>
        </span>
      </div>
    </div>
  );
}
