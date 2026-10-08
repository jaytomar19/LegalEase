import { useState } from "react";
import { useStore } from "../state/store";

type TicketItem = {
  flagId: string;
  ticketId: string;
  title: string;
  projectName: string;
  department: string;
  urgency: "High" | "Medium" | "Low";
  status: "awaiting" | "under-review" | "needs-info" | "sent-back";
  tags: string[];
  author: string;
  avatarClass: string;
  avatarInitials: string;
  dateStr: string;
  timestamp: number;
  affects: string;
  waitingFor?: string;
};

const ALL_TICKETS: TicketItem[] = [
  {
    flagId: "flag-1042",
    ticketId: "#1042",
    title: "AI provider changed from Vendor A to Vendor B",
    projectName: "AI Prototyping",
    department: "Product",
    urgency: "High",
    status: "awaiting",
    tags: ["Vendor", "Contract"],
    author: "Sarah Chen · 8 Oct, 10:42 AM",
    avatarClass: "avatar-sc",
    avatarInitials: "SC",
    dateStr: "8 Oct 2026",
    timestamp: 1791400000000,
    affects: "Affects: AI model/provider",
  },
  {
    flagId: "flag-1043",
    ticketId: "#1043",
    title: "Feature rollout in EU region",
    projectName: "Website Publishing",
    department: "Product",
    urgency: "Medium",
    status: "awaiting",
    tags: ["Privacy", "Data use"],
    author: "Priya Shah · 7 Oct",
    avatarClass: "avatar-ps",
    avatarInitials: "PS",
    dateStr: "7 Oct 2026",
    timestamp: 1791300000000,
    affects: "Affects: Jurisdiction condition",
  },
  {
    flagId: "flag-1054",
    ticketId: "#1054",
    title: "Default-on AI image feature",
    projectName: "Image and Video",
    department: "Design",
    urgency: "Medium",
    status: "under-review",
    tags: ["Default setting", "Consumer"],
    author: "Jordan Lee · 5 Oct",
    avatarClass: "avatar-jl",
    avatarInitials: "JL",
    dateStr: "5 Oct 2026",
    timestamp: 1791100000000,
    affects: "Affects: Consumer disclosure",
  },
  {
    flagId: "flag-1055",
    ticketId: "#1055",
    title: "New third-party Slack export",
    projectName: "Website Publishing",
    department: "Product",
    urgency: "Low",
    status: "under-review",
    tags: ["Privacy", "Data use"],
    author: "Maya Rao · 3 Oct",
    avatarClass: "avatar-mr",
    avatarInitials: "MR",
    dateStr: "3 Oct 2026",
    timestamp: 1790900000000,
    affects: "Affects: Third-party integration",
  },
  {
    flagId: "flag-1066",
    ticketId: "#1066",
    title: "Clarification on purchase-history input",
    projectName: "AI Assistant",
    department: "Product",
    urgency: "Medium",
    status: "needs-info",
    tags: ["Data category", "Privacy"],
    author: "Daniel Park · 6 Oct",
    avatarClass: "avatar-dp",
    avatarInitials: "DP",
    dateStr: "6 Oct 2026",
    timestamp: 1791200000000,
    affects: "Affects: Data categories",
    waitingFor: "Data fields · Data source · Retention period",
  },
  {
    flagId: "flag-1067",
    ticketId: "#1067",
    title: "AI request logs kept for longer",
    projectName: "AI Assistant",
    department: "Engineering",
    urgency: "Low",
    status: "needs-info",
    tags: ["Privacy", "Data use"],
    author: "Daniel Park · 6 Oct",
    avatarClass: "avatar-dp",
    avatarInitials: "DP",
    dateStr: "6 Oct 2026",
    timestamp: 1791200000001,
    affects: "Affects: Data use",
  },
  {
    flagId: "flag-1078",
    ticketId: "#1078",
    title: "New AI provider for image captions",
    projectName: "Image and Video",
    department: "Design",
    urgency: "Low",
    status: "sent-back",
    tags: ["Vendor", "Contract"],
    author: "Jordan Lee · 29 Sep",
    avatarClass: "avatar-jl",
    avatarInitials: "JL",
    dateStr: "29 Sep 2026",
    timestamp: 1790500000000,
    affects: "Affects: Approved provider",
  },
  {
    flagId: "flag-1079",
    ticketId: "#1079",
    title: "Updated launch copy needs disclosure",
    projectName: "Brand Assets",
    department: "Marketing",
    urgency: "Medium",
    status: "sent-back",
    tags: ["Privacy", "Data use"],
    author: "Alex Kim · 27 Sep",
    avatarClass: "avatar-ak",
    avatarInitials: "AK",
    dateStr: "27 Sep 2026",
    timestamp: 1790300000000,
    affects: "Affects: Consumer disclosure",
  },
];

export function Screen6Tickets() {
  const { dispatch } = useStore();
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  function openFlag(flagId: string) {
    dispatch({
      type: "NAVIGATE",
      screen: { name: "flag", flagId, returnTo: { name: "tickets" } },
    });
  }

  function resetFilters() {
    setSearch("");
    setProjectFilter("all");
    setUrgencyFilter("all");
    setStatusFilter("all");
    setSortBy("default");
  }

  const isFiltered = search || projectFilter !== "all" || urgencyFilter !== "all" || statusFilter !== "all" || sortBy !== "default";

  // Filter & Sort
  const filteredTickets = ALL_TICKETS.filter((t) => {
    // Search
    if (search) {
      const q = search.toLowerCase();
      const haystack = [t.title, t.ticketId, t.projectName, t.department, t.author, t.affects, ...t.tags].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    // Project
    if (projectFilter !== "all" && t.projectName !== projectFilter) {
      return false;
    }
    // Urgency
    if (urgencyFilter !== "all" && t.urgency.toLowerCase() !== urgencyFilter) {
      return false;
    }
    // Status Column
    if (statusFilter !== "all" && t.status !== statusFilter) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "recent") return b.timestamp - a.timestamp;
    if (sortBy === "oldest") return a.timestamp - b.timestamp;
    if (sortBy === "urgency") {
      const rank = { High: 3, Medium: 2, Low: 1 };
      return rank[b.urgency] - rank[a.urgency];
    }
    if (sortBy === "ticket-id") {
      return b.ticketId.localeCompare(a.ticketId);
    }
    return 0;
  });

  const getColTickets = (st: TicketItem["status"]) => filteredTickets.filter((t) => t.status === st);

  const awaitingTickets = getColTickets("awaiting");
  const underReviewTickets = getColTickets("under-review");
  const needsInfoTickets = getColTickets("needs-info");
  const sentBackTickets = getColTickets("sent-back");

  return (
    <div className="tickets-container">
      <div className="page-header" style={{ marginBottom: 14 }}>
        <div>
          <h1 className="page-title">Tickets</h1>
          <div className="page-subtitle">Legal queries and AI detected changes requiring attention.</div>
        </div>
      </div>

      {/* Filter & Sort Controls Row */}
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
        
        {/* Clean Project Dropdown */}
        <select className="filter-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
          <option value="all">Project (All)</option>
          <option value="AI Prototyping">AI Prototyping</option>
          <option value="AI Assistant">AI Assistant</option>
          <option value="Website Publishing">Website Publishing</option>
          <option value="Brand Assets">Brand Assets</option>
          <option value="Image and Video">Image and Video</option>
        </select>

        {/* Urgency Dropdown */}
        <select className="filter-select" value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)}>
          <option value="all">Urgency (All)</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* Status Dropdown */}
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Status (All)</option>
          <option value="awaiting">Awaiting review</option>
          <option value="under-review">Under review</option>
          <option value="needs-info">Needs information</option>
          <option value="sent-back">Sent back to team</option>
        </select>

        {/* Sort Dropdown */}
        <select className="filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Sort by (Default)</option>
          <option value="recent">Recent first</option>
          <option value="oldest">Oldest first</option>
          <option value="urgency">Urgency: High to Low</option>
          <option value="ticket-id">Ticket # ID</option>
        </select>

        {isFiltered && (
          <button className="btn-ghost-link" style={{ marginLeft: 6 }} onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>

      {filteredTickets.length === 0 ? (
        <div className="empty-state-card" style={{ padding: 40, textAlign: "center", background: "var(--card-bg)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-color)" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>No matching tickets</div>
          <div className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>
            No tickets matched your search or active filter options.
          </div>
          <button className="btn-primary-pill" onClick={resetFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        /* 4 Column Kanban Grid */
        <div className="kanban-grid">
          {/* Column 1: Awaiting your review */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <span className="kanban-col-icon icon-pink-box">📥</span>
              <div>
                <div className="kanban-col-title">
                  Awaiting your review <span className="kanban-col-count">{awaitingTickets.length}</span>
                </div>
                <div className="kanban-col-sub">Ready for Legal consideration</div>
              </div>
            </div>

            <div className="kanban-cards-list">
              {awaitingTickets.length === 0 ? (
                <div className="text-muted" style={{ fontSize: 12, padding: "12px 0", textAlign: "center" }}>No tickets</div>
              ) : (
                awaitingTickets.map((t) => (
                  <div key={t.flagId} className="kanban-card" onClick={() => openFlag(t.flagId)}>
                    <div className="kanban-card-top">
                      <span className={`badge badge-${t.urgency.toLowerCase()}-pill`}>{t.urgency}</span>
                      <span className="kanban-ticket-id">{t.ticketId}</span>
                    </div>
                    <div className="kanban-card-title">{t.title}</div>
                    <div className="kanban-card-sub">{t.projectName} · {t.department}</div>
                    <div className="kanban-card-tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                    <hr className="kanban-card-divider" />
                    <div className="kanban-card-author">
                      <span className={`author-avatar ${t.avatarClass}`}>{t.avatarInitials}</span>
                      <span className="author-name">{t.author}</span>
                    </div>
                    <div className="kanban-card-affects">{t.affects}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 2: Under review */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <span className="kanban-col-icon icon-blue-box">⏱</span>
              <div>
                <div className="kanban-col-title">
                  Under review <span className="kanban-col-count">{underReviewTickets.length}</span>
                </div>
                <div className="kanban-col-sub">Counsel is reviewing</div>
              </div>
            </div>

            <div className="kanban-cards-list">
              {underReviewTickets.length === 0 ? (
                <div className="text-muted" style={{ fontSize: 12, padding: "12px 0", textAlign: "center" }}>No tickets</div>
              ) : (
                underReviewTickets.map((t) => (
                  <div key={t.flagId} className="kanban-card" onClick={() => openFlag(t.flagId)}>
                    <div className="kanban-card-top">
                      <span className={`badge badge-${t.urgency.toLowerCase()}-pill`}>{t.urgency}</span>
                      <span className="kanban-ticket-id">{t.ticketId}</span>
                    </div>
                    <div className="kanban-card-title">{t.title}</div>
                    <div className="kanban-card-sub">{t.projectName} · {t.department}</div>
                    <div className="kanban-card-tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                    <hr className="kanban-card-divider" />
                    <div className="kanban-card-author">
                      <span className={`author-avatar ${t.avatarClass}`}>{t.avatarInitials}</span>
                      <span className="author-name">{t.author}</span>
                    </div>
                    <div className="kanban-card-affects">{t.affects}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 3: Needs information */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <span className="kanban-col-icon icon-yellow-box">ⓘ</span>
              <div>
                <div className="kanban-col-title">
                  Needs information <span className="kanban-col-count">{needsInfoTickets.length}</span>
                </div>
                <div className="kanban-col-sub">Waiting for project context</div>
              </div>
            </div>

            <div className="kanban-cards-list">
              {needsInfoTickets.length === 0 ? (
                <div className="text-muted" style={{ fontSize: 12, padding: "12px 0", textAlign: "center" }}>No tickets</div>
              ) : (
                needsInfoTickets.map((t) => (
                  <div key={t.flagId} className="kanban-card" onClick={() => openFlag(t.flagId)}>
                    <div className="kanban-card-top">
                      <span className={`badge badge-${t.urgency.toLowerCase()}-pill`}>{t.urgency}</span>
                      <span className="kanban-ticket-id">{t.ticketId}</span>
                    </div>
                    <div className="kanban-card-title">{t.title}</div>
                    <div className="kanban-card-sub">{t.projectName} · {t.department}</div>
                    <div className="kanban-card-tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>

                    {t.waitingFor && (
                      <div className="kanban-waiting-box">
                        <div className="waiting-title">Waiting for:</div>
                        <div className="waiting-items">{t.waitingFor}</div>
                        <button className="remind-team-btn" onClick={(e) => e.stopPropagation()}>
                          Remind team
                        </button>
                      </div>
                    )}

                    <hr className="kanban-card-divider" />
                    <div className="kanban-card-author">
                      <span className={`author-avatar ${t.avatarClass}`}>{t.avatarInitials}</span>
                      <span className="author-name">{t.author}</span>
                    </div>
                    <div className="kanban-card-affects">{t.affects}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 4: Sent back to team */}
          <div className="kanban-column">
            <div className="kanban-col-header">
              <span className="kanban-col-icon icon-green-box">›</span>
              <div>
                <div className="kanban-col-title">
                  Sent back to team <span className="kanban-col-count">{sentBackTickets.length}</span>
                </div>
                <div className="kanban-col-sub">Changes requested</div>
              </div>
            </div>

            <div className="kanban-cards-list">
              {sentBackTickets.length === 0 ? (
                <div className="text-muted" style={{ fontSize: 12, padding: "12px 0", textAlign: "center" }}>No tickets</div>
              ) : (
                sentBackTickets.map((t) => (
                  <div key={t.flagId} className="kanban-card" onClick={() => openFlag(t.flagId)}>
                    <div className="kanban-card-top">
                      <span className={`badge badge-${t.urgency.toLowerCase()}-pill`}>{t.urgency}</span>
                      <span className="kanban-ticket-id">{t.ticketId}</span>
                    </div>
                    <div className="kanban-card-title">{t.title}</div>
                    <div className="kanban-card-sub">{t.projectName} · {t.department}</div>
                    <div className="kanban-card-tags">
                      {t.tags.map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>
                    <hr className="kanban-card-divider" />
                    <div className="kanban-card-author">
                      <span className={`author-avatar ${t.avatarClass}`}>{t.avatarInitials}</span>
                      <span className="author-name">{t.author}</span>
                    </div>
                    <div className="kanban-card-affects">{t.affects}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
