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
  const [tab, setTab] = useState<Tab>("Monitoring");
  const [enabledTools, setEnabledTools] = useState<Record<string, boolean>>(
    Object.fromEntries(TOOLS.map((t) => [t.name, true]))
  );

  // Notification tab state
  const [notificationChoice, setNotificationChoice] = useState<"all" | "high" | "balanced">("balanced");
  const [digestEnabled, setDigestEnabled] = useState(true);

  // Trigger state
  const [triggers, setTriggers] = useState([
    "Vendor change",
    "Retention change",
    "New data category",
    "New jurisdiction",
    "Training use",
    "Third-party integration",
    "Default-on AI feature",
    "New customer data access",
  ]);

  return (
    <div className="settings-container">
      <div className="page-header" style={{ marginBottom: 12 }}>
        <div>
          <h1 className="page-title">Settings</h1>
          <div className="page-subtitle">Manage connected tools, monitoring boundaries, and Legal notifications.</div>
        </div>
      </div>

      {/* Tabs Header */}
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

      {/* TAB 1: INTEGRATIONS */}
      {tab === "Integrations" && (
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
                  className={`toggle-switch ${enabledTools[tool.name] ? "active" : ""}`}
                  onClick={() => setEnabledTools((prev) => ({ ...prev, [tool.name]: !prev[tool.name] }))}
                >
                  <span className="toggle-switch-handle" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MONITORING */}
      {tab === "Monitoring" && (
        <div className="monitoring-tab-wrap" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Top Section: Projects Monitored + Side Info Cards */}
          <div className="monitoring-top-grid" style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
            {/* Left Card: Projects Monitored */}
            <div className="project-white-card">
              <div className="card-top-row">
                <div>
                  <h2 className="card-heading-title" style={{ fontSize: 17, marginBottom: 2 }}>Projects monitored</h2>
                  <div className="card-heading-sub">All confirmed Legal projects</div>
                </div>
                <span className="pill-active-green" style={{ fontSize: 11.5, padding: "3px 10px" }}>
                  5 active
                </span>
              </div>

              <div className="monitoring-details-list">
                <div className="monitoring-detail-row">
                  <div className="monitoring-label">PRD location (existing)</div>
                  <div className="monitoring-val-bold">/Lumen/Product/PRDs in Confluence and Drive</div>
                  <div className="monitoring-desc">FlagWise reads these existing locations. Departments do not upload or submit anything.</div>
                </div>

                <div className="monitoring-detail-row">
                  <div className="monitoring-label">How new projects are detected</div>
                  <div className="monitoring-val-bold">From the existing PRD template and folder</div>
                  <div className="monitoring-desc">Fallback: a "PRD" label on the page. Legal can also add a project manually.</div>
                </div>

                <div className="monitoring-detail-row">
                  <div className="monitoring-label">Channels</div>
                  <div className="monitoring-val-bold">#product-compose, #engineering, #legal-questions</div>
                </div>

                <div className="monitoring-detail-row">
                  <div className="monitoring-label">Email</div>
                  <div className="monitoring-val-bold">legal@lumenlabs.example</div>
                </div>

                <div className="monitoring-detail-row" style={{ borderBottom: "none" }}>
                  <div className="monitoring-label">Documents</div>
                  <div className="monitoring-val-bold">PRDs, contracts, DPAs, security assessments, legal memos</div>
                </div>
              </div>
            </div>

            {/* Right Cards: Access & Privacy */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="project-white-card" style={{ padding: 18 }}>
                <div className="side-card-icon-box mb-10">📁</div>
                <h3 className="doc-section-title" style={{ fontSize: 14 }}>Access</h3>
                <div className="text-muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                  Legal team only. Departments raise queries through Slack, Jira or email.
                </div>
              </div>

              <div className="project-white-card" style={{ padding: 18 }}>
                <div className="side-card-icon-box mb-10">🔒</div>
                <h3 className="doc-section-title" style={{ fontSize: 14 }}>Privacy</h3>
                <div className="text-muted" style={{ fontSize: 12.5, lineHeight: 1.5 }}>
                  Opt-in only. Teams can see what is monitored. Only short snippets and source links are stored. Content is kept for 90 days.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Card: Active triggers */}
          <div className="project-white-card">
            <div className="card-top-row">
              <div>
                <h2 className="card-heading-title" style={{ fontSize: 17, marginBottom: 2 }}>Active triggers</h2>
                <div className="card-heading-sub">Changes FlagWise compares with approved Legal baselines.</div>
              </div>
              <button
                className="btn-view-memo-outline"
                onClick={() => {
                  const name = prompt("Enter new trigger name:");
                  if (name) setTriggers([...triggers, name]);
                }}
              >
                + Add trigger
              </button>
            </div>

            <div className="triggers-chips-row" style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "16px 0 20px 0" }}>
              {triggers.map((t) => (
                <span key={t} className="trigger-chip-pill">
                  ✓ {t}
                </span>
              ))}
            </div>

            <div className="sparkle-callout-box">
              <span className="callout-sparkle-icon">✨</span>
              <span>FlagWise can suggest new triggers based on previous Legal decisions, but Legal must approve them before they become active.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {tab === "Notifications" && (
        <div className="project-white-card">
          <h2 className="card-heading-title" style={{ fontSize: 18, marginBottom: 2 }}>Change notifications</h2>
          <div className="card-heading-sub mb-20">Choose which detected changes should alert you immediately.</div>

          <div className="radio-options-group" style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {/* Option 1 */}
            <div
              className={`radio-option-card ${notificationChoice === "all" ? "selected" : ""}`}
              onClick={() => setNotificationChoice("all")}
            >
              <div className={`radio-circle ${notificationChoice === "all" ? "selected" : ""}`} />
              <div>
                <div className="radio-option-title">All detected changes</div>
                <div className="radio-option-sub">Every change across monitored projects</div>
              </div>
            </div>

            {/* Option 2 */}
            <div
              className={`radio-option-card ${notificationChoice === "high" ? "selected" : ""}`}
              onClick={() => setNotificationChoice("high")}
            >
              <div className={`radio-circle ${notificationChoice === "high" ? "selected" : ""}`} />
              <div>
                <div className="radio-option-title">High-urgency changes only</div>
                <div className="radio-option-sub">Only time-sensitive Legal risks</div>
              </div>
            </div>

            {/* Option 3 */}
            <div
              className={`radio-option-card ${notificationChoice === "balanced" ? "selected" : ""}`}
              onClick={() => setNotificationChoice("balanced")}
            >
              <div className={`radio-circle ${notificationChoice === "balanced" ? "selected" : ""}`} />
              <div>
                <div className="radio-option-title">High + medium urgency</div>
                <div className="radio-option-sub">A balanced signal for your Legal queue</div>
              </div>
            </div>
          </div>

          {/* Daily Digest Switch */}
          <div className="digest-toggle-row">
            <span className="digest-text">Daily digest email · Slack · 8:30 AM</span>
            <button
              className={`toggle-switch ${digestEnabled ? "active" : ""}`}
              onClick={() => setDigestEnabled(!digestEnabled)}
            >
              <span className="toggle-switch-handle" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: ACCOUNT */}
      {tab === "Account" && (
        <div className="project-white-card">
          <h2 className="card-heading-title" style={{ fontSize: 18, marginBottom: 2 }}>Account</h2>
          <div className="card-heading-sub mb-20">Your FlagWise profile and workspace access.</div>

          <div className="account-profile-card">
            <div className="account-profile-left">
              <span className="user-avatar-circle-large">M</span>
              <div>
                <div className="account-user-name">magfi</div>
                <div className="account-user-role">Legal Counsel · Lumen Labs</div>
              </div>
            </div>
            <span className="pill-legal-team">Legal team</span>
          </div>
        </div>
      )}
    </div>
  );
}
