import { useState } from "react";

const TABS = ["Integrations", "Monitoring", "Notifications", "Account"] as const;
type Tab = (typeof TABS)[number];

const TOOLS = [
  { name: "Slack", sub: "Connected to Checkpoint workspace" },
  { name: "Jira", sub: "Connected to Checkpoint workspace" },
  { name: "Confluence", sub: "Connected to Checkpoint workspace" },
  { name: "Google Drive", sub: "Connected to Checkpoint workspace" },
  { name: "Contract repository", sub: "Connected to Checkpoint workspace" },
  { name: "Email", sub: "Connected to Checkpoint workspace" },
];

// Visual only — matches the IA2 spec's "Settings: does nothing" requirement.
// Toggles are local UI state with no real integration behind them.
export function ScreenSettings() {
  const [tab, setTab] = useState<Tab>("Integrations");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(TOOLS.map((t) => [t.name, true]))
  );

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <div className="page-subtitle">Manage connected tools, monitoring boundaries, and Legal notifications.</div>
        </div>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Integrations" ? (
        <div className="surface-card" style={{ padding: 22 }}>
          <div className="flex-row" style={{ justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Connected tools</div>
              <div className="page-subtitle">Checkpoint reads the places where project work and Legal queries already live.</div>
            </div>
            <button className="btn btn-secondary" disabled title="Not part of the IA2 prototype scope">
              + Add another tool
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex-row"
                style={{ justifyContent: "space-between", border: "1px solid var(--border)", borderRadius: "var(--control-radius)", padding: "12px 14px" }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{tool.name}</div>
                  <div className="cell-tertiary">{tool.sub}</div>
                </div>
                <button
                  onClick={() => setEnabled((prev) => ({ ...prev, [tool.name]: !prev[tool.name] }))}
                  style={{
                    width: 38,
                    height: 22,
                    borderRadius: 999,
                    border: "none",
                    background: enabled[tool.name] ? "var(--primary)" : "var(--border-strong)",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      left: enabled[tool.name] ? 18 : 2,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "white",
                      transition: "left 0.15s",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">This tab isn't part of the IA2 prototype scope.</div>
      )}
    </div>
  );
}
