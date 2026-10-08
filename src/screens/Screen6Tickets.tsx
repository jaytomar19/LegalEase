import { useState } from "react";
import { useStore } from "../state/store";

export function Screen6Tickets() {
  const { dispatch } = useStore();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  function openFlag(flagId: string) {
    dispatch({
      type: "NAVIGATE",
      screen: { name: "flag", flagId, returnTo: { name: "tickets" } },
    });
  }

  return (
    <div className="tickets-container">
      <div className="page-header" style={{ marginBottom: 14 }}>
        <div>
          <h1 className="page-title">Tickets</h1>
          <div className="page-subtitle">Legal queries and AI detected changes requiring attention.</div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-controls-row" style={{ marginBottom: 20 }}>
        <div className="search-input-wrap">
          <span className="search-input-icon">🔍</span>
          <input
            className="filter-search-input"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="all">Project</option>
          <option value="lumen-compose">Lumen Compose</option>
          <option value="lumen-assist">Lumen Assist</option>
          <option value="lumen-sites">Lumen Sites</option>
        </select>
        <select className="filter-select" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
          <option value="all">Urgency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Status</option>
          <option value="awaiting">Awaiting review</option>
          <option value="under-review">Under review</option>
        </select>
      </div>

      {/* 4 Column Kanban Grid (2 Cards per column) */}
      <div className="kanban-grid">
        {/* Column 1: Awaiting your review (2) */}
        <div className="kanban-column">
          <div className="kanban-col-header">
            <span className="kanban-col-icon icon-pink-box">📥</span>
            <div>
              <div className="kanban-col-title">
                Awaiting your review <span className="kanban-col-count">2</span>
              </div>
              <div className="kanban-col-sub">Ready for Legal consideration</div>
            </div>
          </div>

          <div className="kanban-cards-list">
            {/* Card #1042 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1042")}>
              <div className="kanban-card-top">
                <span className="badge badge-high-pill">High</span>
                <span className="kanban-ticket-id">#1042</span>
              </div>
              <div className="kanban-card-title">AI provider changed from Vendor A to Vendor B</div>
              <div className="kanban-card-sub">Lumen Compose · Product</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Vendor</span>
                <span className="tag-pill">Contract</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-sc">SC</span>
                <span className="author-name">Sarah Chen · 8 Oct, 10:42 AM</span>
              </div>
              <div className="kanban-card-affects">Affects: AI model/provider</div>
            </div>

            {/* Card #1043 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1043")}>
              <div className="kanban-card-top">
                <span className="badge badge-medium-pill">Medium</span>
                <span className="kanban-ticket-id">#1043</span>
              </div>
              <div className="kanban-card-title">Feature rollout in EU region</div>
              <div className="kanban-card-sub">Lumen Sites · Product</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Privacy</span>
                <span className="tag-pill">Data use</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-ps">PS</span>
                <span className="author-name">Priya Shah · 7 Oct</span>
              </div>
              <div className="kanban-card-affects">Affects: Jurisdiction condition</div>
            </div>
          </div>
        </div>

        {/* Column 2: Under review (2) */}
        <div className="kanban-column">
          <div className="kanban-col-header">
            <span className="kanban-col-icon icon-blue-box">⏱</span>
            <div>
              <div className="kanban-col-title">
                Under review <span className="kanban-col-count">2</span>
              </div>
              <div className="kanban-col-sub">Counsel is reviewing</div>
            </div>
          </div>

          <div className="kanban-cards-list">
            {/* Card #1054 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1054")}>
              <div className="kanban-card-top">
                <span className="badge badge-medium-pill">Medium</span>
                <span className="kanban-ticket-id">#1054</span>
              </div>
              <div className="kanban-card-title">Default-on AI image feature</div>
              <div className="kanban-card-sub">Lumen Weave · Design</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Default setting</span>
                <span className="tag-pill">Consumer</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-jl">JL</span>
                <span className="author-name">Jordan Lee · 5 Oct</span>
              </div>
              <div className="kanban-card-affects">Affects: Consumer disclosure</div>
            </div>

            {/* Card #1055 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1055")}>
              <div className="kanban-card-top">
                <span className="badge badge-low-pill">Low</span>
                <span className="kanban-ticket-id">#1055</span>
              </div>
              <div className="kanban-card-title">New third-party Slack export</div>
              <div className="kanban-card-sub">Lumen Sites · Product</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Privacy</span>
                <span className="tag-pill">Data use</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-mr">MR</span>
                <span className="author-name">Maya Rao · 3 Oct</span>
              </div>
              <div className="kanban-card-affects">Affects: Third-party integration</div>
            </div>
          </div>
        </div>

        {/* Column 3: Needs information (2) */}
        <div className="kanban-column">
          <div className="kanban-col-header">
            <span className="kanban-col-icon icon-yellow-box">ⓘ</span>
            <div>
              <div className="kanban-col-title">
                Needs information <span className="kanban-col-count">2</span>
              </div>
              <div className="kanban-col-sub">Waiting for project context</div>
            </div>
          </div>

          <div className="kanban-cards-list">
            {/* Card #1066 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1066")}>
              <div className="kanban-card-top">
                <span className="badge badge-medium-pill">Medium</span>
                <span className="kanban-ticket-id">#1066</span>
              </div>
              <div className="kanban-card-title">Clarification on purchase-history input</div>
              <div className="kanban-card-sub">Lumen Assist · Product</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Data category</span>
                <span className="tag-pill">Privacy</span>
              </div>

              {/* Special Highlight callout */}
              <div className="kanban-waiting-box">
                <div className="waiting-title">Waiting for:</div>
                <div className="waiting-items">Data fields · Data source · Retention period</div>
                <button className="remind-team-btn" onClick={(e) => e.stopPropagation()}>
                  Remind team
                </button>
              </div>

              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-dp">DP</span>
                <span className="author-name">Daniel Park · 6 Oct</span>
              </div>
              <div className="kanban-card-affects">Affects: Data categories</div>
            </div>

            {/* Card #1067 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1067")}>
              <div className="kanban-card-top">
                <span className="badge badge-low-pill">Low</span>
                <span className="kanban-ticket-id">#1067</span>
              </div>
              <div className="kanban-card-title">AI request logs kept for longer</div>
              <div className="kanban-card-sub">Lumen Assist · Engineering</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Privacy</span>
                <span className="tag-pill">Data use</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-dp">DP</span>
                <span className="author-name">Daniel Park · 6 Oct</span>
              </div>
              <div className="kanban-card-affects">Affects: Data use</div>
            </div>
          </div>
        </div>

        {/* Column 4: Sent back to team (2) */}
        <div className="kanban-column">
          <div className="kanban-col-header">
            <span className="kanban-col-icon icon-green-box">›</span>
            <div>
              <div className="kanban-col-title">
                Sent back to team <span className="kanban-col-count">2</span>
              </div>
              <div className="kanban-col-sub">Changes requested</div>
            </div>
          </div>

          <div className="kanban-cards-list">
            {/* Card #1078 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1078")}>
              <div className="kanban-card-top">
                <span className="badge badge-low-pill">Low</span>
                <span className="kanban-ticket-id">#1078</span>
              </div>
              <div className="kanban-card-title">New AI provider for image captions</div>
              <div className="kanban-card-sub">Lumen Weave · Design</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Vendor</span>
                <span className="tag-pill">Contract</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-jl">JL</span>
                <span className="author-name">Jordan Lee · 29 Sep</span>
              </div>
              <div className="kanban-card-affects">Affects: Approved provider</div>
            </div>

            {/* Card #1079 */}
            <div className="kanban-card" onClick={() => openFlag("flag-1079")}>
              <div className="kanban-card-top">
                <span className="badge badge-medium-pill">Medium</span>
                <span className="kanban-ticket-id">#1079</span>
              </div>
              <div className="kanban-card-title">Updated launch copy needs disclosure</div>
              <div className="kanban-card-sub">Lumen Brand · Marketing</div>
              <div className="kanban-card-tags">
                <span className="tag-pill">Privacy</span>
                <span className="tag-pill">Data use</span>
              </div>
              <hr className="kanban-card-divider" />
              <div className="kanban-card-author">
                <span className="author-avatar avatar-ak">AK</span>
                <span className="author-name">Alex Kim · 27 Sep</span>
              </div>
              <div className="kanban-card-affects">Affects: Consumer disclosure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
