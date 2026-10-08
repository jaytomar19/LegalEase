import { getTrackingBadgeCount, useStore } from "../state/store";
import { IconGrid, IconLayers, IconTicket, IconGear } from "./icons";

export function Sidebar() {
  const { state, dispatch } = useStore();
  const screenName = state.screen.name;
  const trackingBadge = getTrackingBadgeCount(state);

  const effectiveName = screenName === "flag" ? state.screen.returnTo?.name ?? "home" : screenName;

  const isHome = effectiveName === "home";
  const isProjects = effectiveName === "projects" || effectiveName === "project" || effectiveName === "decision-sent";
  const isTickets = effectiveName === "tickets";
  const isSettings = effectiveName === "settings";

  const awaitingCount = state.flags.filter((f) => f.status === "awaiting-review").length;

  function goHome() {
    dispatch({ type: "SET_GROUP_BY", groupBy: null });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-brand">
        <span className="app-header-brand-mark">L</span>
        LegalEase
      </div>

      <div className="app-sidebar-nav">
        <button className={`app-sidebar-nav-item ${isHome ? "active" : ""}`} onClick={goHome}>
          <IconGrid />
          Home
        </button>
        <button
          className={`app-sidebar-nav-item ${isProjects ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "projects" } })}
        >
          <IconLayers />
          Projects
        </button>
        <button
          className={`app-sidebar-nav-item ${isTickets ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "tickets" } })}
        >
          <IconTicket />
          Tickets
          {awaitingCount > 0 && <span className="nav-count" style={{ background: "var(--border-strong)", color: "var(--text-secondary)" }}>{awaitingCount}</span>}
        </button>
        <button
          className={`app-sidebar-nav-item ${isSettings ? "active" : ""}`}
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "settings" } })}
        >
          <IconGear />
          Settings
        </button>
      </div>

      <div className="app-sidebar-spacer" />

      <div className="app-sidebar-status-card">
        <div>
          <span className="app-sidebar-status-dot" />
          <span className="app-sidebar-status-title">AI monitoring ON</span>
        </div>
        <div className="app-sidebar-status-sub">
          {trackingBadge > 0
            ? `${trackingBadge} possible change${trackingBadge === 1 ? "" : "s"} spotted, not yet submitted`
            : "Monitoring approved project sources"}
        </div>
      </div>

      <div className="user-chip" style={{ width: "100%", justifyContent: "space-between" }}>
        <div className="flex-row gap-8">
          <span className="user-chip-avatar">MG</span>
          <span className="user-chip-text">
            <span className="user-chip-name">magfi</span>
            <span className="user-chip-role">Legal Counsel</span>
          </span>
        </div>
      </div>
      <button className="link-btn" style={{ fontSize: 11, padding: "6px 8px" }} onClick={() => dispatch({ type: "RESET" })}>
        Reset demo
      </button>
    </div>
  );
}
