import { useState } from "react";

const TABS = ["Integrations", "Monitoring", "Notifications", "Account"] as const;
type Tab = (typeof TABS)[number];

const TOOLS = [
  { name: "Slack", sub: "Connected to Lumen Labs", iconBg: "#EFE6FD", iconColor: "#6B52B6", icon: "💬" },
  { name: "Jira", sub: "Connected to Lumen Labs", iconBg: "#E1F0FA", iconColor: "#2584C6", icon: "🎫" },
  { name: "Confluence", sub: "Connected to Lumen Labs", iconBg: "#FEF3C7", iconColor: "#D97706", icon: "📄" },
  { name: "Google Drive", sub: "Connected to Lumen Labs", iconBg: "#D1FADF", iconColor: "#059669", icon: "📁" },
  { name: "Contract repository", sub: "Connected to Lumen Labs", iconBg: "#E1F0FA", iconColor: "#2584C6", icon: "📄" },
  { name: "Email", sub: "Connected to Lumen Labs", iconBg: "#FEF3C7", iconColor: "#D97706", icon: "🔗" },
];

export function ScreenSettings() {
  const [tab, setTab] = useState<Tab>("Integrations");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(TOOLS.map((t) => [t.name, true]))
  );

  return (
    <div className="settings-container">
      <div className="page-header" style={{ marginBottom: 12 }}>
        <div>
          <h1 className="page-title">Settings</h1>
          <div className="page-subtitle">Manage connected tools, monitoring boundaries, and Legal notifications.</div>
        </div>
      </div>

      <div className="settings-tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`settings-tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Integrations" ? (
        <div className="connected-tools-card">
          <div className="connected-tools-header">
            <div>
              <div className="connected-tools-title">Connected tools</div>
              <div className="connected-tools-sub">
                FlagWise reads the places where project work and Legal queries already live.
              </div>
            </div>
            <button className="btn-add-tool">+ Add another tool</button>
          </div>

          <div className="tools-grid">
            {TOOLS.map((tool) => (
              <div key={tool.name} className="tool-card">
                <div className="tool-card-info">
                  <span className="tool-card-icon" style={{ background: tool.iconBg, color: tool.iconColor }}>
                    {tool.icon}
                  </span>
                  <div>
                    <div className="tool-card-name">{tool.name}</div>
                    <div className="tool-card-sub">{tool.sub}</div>
                  </div>
                </div>

                <button
                  className={`toggle-switch ${enabled[tool.name] ? "active" : ""}`}
                  onClick={() => setEnabled((prev) => ({ ...prev, [tool.name]: !prev[tool.name] }))}
                >
                  <span className="toggle-switch-handle" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-tab-content">
          <div className="page-subtitle">Settings for {tab} will appear here.</div>
        </div>
      )}
    </div>
  );
}
