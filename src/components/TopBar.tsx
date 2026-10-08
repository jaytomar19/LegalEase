import { useState } from "react";
import { NotificationBell } from "./NotificationBell";
import { useStore } from "../state/store";

export function TopBar() {
  const [search, setSearch] = useState("");
  const { state, dispatch } = useStore();

  return (
    <div className="main-topbar">
      <div className="main-topbar-left">
        <div className="topbar-nav-controls">
          <button
            className="topbar-nav-btn"
            disabled={state.history.length === 0}
            title="Go back to previous page"
            onClick={() => dispatch({ type: "GO_BACK" })}
          >
            ← Back
          </button>
          <button
            className="topbar-nav-btn"
            disabled={state.forwardHistory.length === 0}
            title="Go forward to next page"
            onClick={() => dispatch({ type: "GO_FORWARD" })}
          >
            Forward →
          </button>
          <button
            className="topbar-nav-btn icon-refresh"
            title="Refresh page"
            onClick={() => window.location.reload()}
          >
            ↻
          </button>
        </div>
        
        <div className="main-topbar-search">
          <span className="search-icon">🔍</span>
          <input
            className="main-topbar-search-input"
            placeholder="Search tickets, projects, documents, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="main-topbar-right">
        <button className="topbar-lang-btn">
          🌐 FN ∨
        </button>
        <button
          className="icon-btn-ghost"
          title="Toggle dark mode / night mode"
          onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
        >
          {state.darkMode ? "☀️" : "🌙"}
        </button>
        <NotificationBell />
        <span className="user-chip-avatar topbar-user-avatar">
          M
        </span>
      </div>
    </div>
  );
}
