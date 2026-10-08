import { useState } from "react";
import { NotificationBell } from "./NotificationBell";

// The search input, language selector and theme toggle are visual-only —
// matching the reference's top bar — and are not wired to real search,
// localization or theming behavior, which are outside the IA2 prototype scope.
export function TopBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="main-topbar">
      <div className="main-topbar-search">
        <span className="text-tertiary">⌕</span>
        <input
          className="main-topbar-search-input"
          placeholder="Search tickets, projects, documents, people…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="main-topbar-right">
        <button className="link-btn" style={{ fontSize: 13 }} title="Language (not part of IA2 scope)">
          EN ⌄
        </button>
        <button className="icon-btn-ghost" title="Theme (not part of IA2 scope)">
          ☾
        </button>
        <NotificationBell />
        <span className="user-chip-avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
          MG
        </span>
      </div>
    </div>
  );
}
