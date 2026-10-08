import { useStore } from "../state/store";
import { IconTicket, IconLayers } from "../components/icons";

export function Screen1Home() {
  const { dispatch } = useStore();

  function goToTickets() {
    dispatch({ type: "NAVIGATE", screen: { name: "tickets" } });
  }

  function goToProjects() {
    dispatch({ type: "NAVIGATE", screen: { name: "projects" } });
  }

  return (
    <div className="home-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Good morning, magfi!</h1>
          <div className="page-subtitle">Here's what needs your attention today.</div>
        </div>
      </div>

      <div className="stat-tile-row">
        {/* Stat Tile 1: Pink */}
        <div className="stat-tile tile-pink" onClick={goToTickets}>
          <div className="stat-tile-top">
            <span className="stat-tile-icon-circle">
              <IconTicket size={16} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">6</div>
          <div className="stat-tile-label">Awaiting your review</div>
          <div className="stat-tile-sub">Changes and queries ready for counsel</div>
        </div>

        {/* Stat Tile 2: Yellow */}
        <div className="stat-tile tile-yellow" onClick={goToTickets}>
          <div className="stat-tile-top">
            <span className="stat-tile-icon-circle">ⓘ</span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">7</div>
          <div className="stat-tile-label">Information needed</div>
          <div className="stat-tile-sub">Waiting on project teams</div>
        </div>

        {/* Stat Tile 3: Blue */}
        <div className="stat-tile tile-blue" onClick={goToTickets}>
          <div className="stat-tile-top">
            <span className="stat-tile-icon-circle">
              <IconTicket size={16} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">4</div>
          <div className="stat-tile-label">Under review</div>
          <div className="stat-tile-sub">Active Legal work</div>
        </div>

        {/* Stat Tile 4: Lavender */}
        <div className="stat-tile tile-purple" onClick={goToProjects}>
          <div className="stat-tile-top">
            <span className="stat-tile-icon-circle">
              <IconLayers size={16} />
            </span>
            <span className="stat-tile-chevron">›</span>
          </div>
          <div className="stat-tile-value">2</div>
          <div className="stat-tile-label">New projects detected</div>
          <div className="stat-tile-sub">Found in connected PRD locations</div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="home-summary-row">
        {/* Left Card: Projects needing attention */}
        <div className="summary-block">
          <div className="summary-block-header">
            <div className="summary-block-title">Projects needing attention</div>
            <button className="link-btn-text" onClick={goToProjects}>
              View all ›
            </button>
          </div>
          <div className="page-subtitle-sm">Prioritised using your approved baselines</div>

          <div className="attention-list">
            <div className="attention-item" onClick={goToProjects}>
              <span className="project-circle-avatar avatar-c">C</span>
              <div className="attention-item-body">
                <div className="attention-item-title">Lumen Compose</div>
                <div className="attention-item-sub">2 open items · Legal review status needs attention</div>
              </div>
              <span className="badge badge-high-pill">High</span>
              <span className="item-chevron">›</span>
            </div>

            <div className="attention-item" onClick={goToProjects}>
              <span className="project-circle-avatar avatar-a">A</span>
              <div className="attention-item-body">
                <div className="attention-item-title">Lumen Assist</div>
                <div className="attention-item-sub">1 open item · Legal review status needs attention</div>
              </div>
              <span className="badge badge-medium-pill">Medium</span>
              <span className="item-chevron">›</span>
            </div>

            <div className="attention-item" onClick={goToProjects}>
              <span className="project-circle-avatar avatar-b">B</span>
              <div className="attention-item-body">
                <div className="attention-item-title">Lumen Brand</div>
                <div className="attention-item-sub">1 open item · Legal review status needs attention</div>
              </div>
              <span className="badge badge-medium-pill">Medium</span>
              <span className="item-chevron">›</span>
            </div>
          </div>
        </div>

        {/* Right Card: Recent changes */}
        <div className="summary-block">
          <div className="summary-block-header">
            <div className="summary-block-title">Recent changes</div>
          </div>
          <div className="page-subtitle-sm">From monitored project sources</div>

          <div className="recent-list">
            <div className="recent-item">
              <span className="recent-sparkle-icon icon-pink">✦</span>
              <div className="recent-item-body">
                <div className="recent-item-title">AI provider changed from Vendor A to Vendor B</div>
                <div className="recent-item-sub">Lumen Compose · Product</div>
              </div>
              <div className="recent-item-date">8 Oct</div>
            </div>

            <div className="recent-item">
              <span className="recent-sparkle-icon icon-yellow">✦</span>
              <div className="recent-item-body">
                <div className="recent-item-title">Retention increased from 20 to 25 days</div>
                <div className="recent-item-sub">Lumen Compose · Engineering</div>
              </div>
              <div className="recent-item-date">7 Oct</div>
            </div>

            <div className="recent-item">
              <span className="recent-sparkle-icon icon-blue">✦</span>
              <div className="recent-item-body">
                <div className="recent-item-title">New AI image feature enabled by default</div>
                <div className="recent-item-sub">Lumen Weave · Design</div>
              </div>
              <div className="recent-item-date">5 Oct</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
