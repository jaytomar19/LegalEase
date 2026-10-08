import { useStore } from "../state/store";
import { NotificationBell } from "./NotificationBell";

export function TopBar() {
  const { state, dispatch } = useStore();
  const screenName = state.screen.name;

  const isHome = screenName === "home" && state.filters.groupBy !== "ai-tracking";
  const isProjects = screenName === "projects" || screenName === "project";
  const isTickets = screenName === "tickets";
  const isTracking = state.filters.groupBy === "ai-tracking";

  function navHome() {
    dispatch({ type: "SET_GROUP_BY", groupBy: null });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  function navProjects() {
    dispatch({ type: "NAVIGATE", screen: { name: "projects" } });
  }

  function navTickets() {
    dispatch({ type: "NAVIGATE", screen: { name: "tickets" } });
  }

  function navTracking() {
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
    dispatch({ type: "SET_GROUP_BY", groupBy: "ai-tracking" });
  }

  return (
    <header className="main-header">
      <div className="header-brand" onClick={navHome}>
        <span className="brand-mark">C</span>
        <span className="brand-title">CHECKPOINT</span>
      </div>

      <nav className="header-nav">
        <button className={`header-nav-btn ${isHome ? "active" : ""}`} onClick={navHome}>
          Overview
        </button>
        <button className={`header-nav-btn ${isProjects ? "active" : ""}`} onClick={navProjects}>
          Projects
        </button>
        <button className={`header-nav-btn ${isTickets ? "active" : ""}`} onClick={navTickets}>
          Tickets
        </button>
        <button className={`header-nav-btn ${isTracking ? "active" : ""}`} onClick={navTracking}>
          AI Tracking
        </button>
      </nav>

      <div className="header-right">
        <NotificationBell />

        <div className="header-role-badge">
          <span className="role-dot" />
          <span>Viewing as Magfi, Junior Counsel</span>
          <button
            className="role-switch-link"
            onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "submit" } })}
          >
            Switch to team view
          </button>
        </div>

        <div className="user-avatar-chip" title="Magfi, Junior Counsel">
          MG
        </div>
      </div>
    </header>
  );
}
