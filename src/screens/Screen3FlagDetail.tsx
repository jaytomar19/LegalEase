import { useStore } from "../state/store";
import { TICKETS_DATA, type TicketDetailData } from "../data/tickets";

export function Screen3FlagDetail() {
  const { state, dispatch } = useStore();
  const rawFlagId = state.screen.flagId || "flag-1042";
  const numId = rawFlagId.replace("flag-", "");
  
  const ticket: TicketDetailData = TICKETS_DATA[numId] || TICKETS_DATA["1042"];

  function backToBoard() {
    dispatch({ type: "NAVIGATE", screen: { name: "tickets" } });
  }

  // Tag styling helper
  const urgencyClass =
    ticket.urgency === "High"
      ? "badge-high-pill"
      : ticket.urgency === "Medium"
      ? "badge-medium-pill"
      : "badge-low-pill";

  const statusClass =
    ticket.status === "Awaiting review"
      ? "tag-status-pink"
      : ticket.status === "Under review"
      ? "tag-status-blue"
      : ticket.status === "Needs information"
      ? "tag-status-yellow"
      : "tag-status-green";

  return (
    <div className="ticket-detail-page">
      {/* Top Header / Breadcrumb Row */}
      <div className="detail-top-nav">
        <button className="breadcrumb-back-btn" onClick={backToBoard}>
          ‹ Tickets
        </button>
        
        <div className="detail-meta-tags">
          <span className="detail-ticket-num">{ticket.ticketNumber}</span>
          <span className={`badge ${urgencyClass}`}>{ticket.urgency}</span>
          <span className={`detail-status-pill ${statusClass}`}>{ticket.status}</span>
        </div>

        <div className="detail-top-right">
          <button className="doc-ref-btn">📄 {ticket.docButton}</button>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="detail-header-block">
        <h1 className="detail-title">{ticket.title}</h1>
        <div className="detail-sub-line">
          {ticket.project} · {ticket.team} · {ticket.raisedBy} · Raised {ticket.raisedDate}
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="detail-main-grid">
        {/* LEFT COLUMN: Four Numbered Cards */}
        <div className="detail-left-col">
          {/* Card 01: What happened */}
          <div className="detail-card">
            <div className="detail-card-header">
              <span className="detail-card-title">What happened</span>
              <span className="detail-card-index">01</span>
            </div>
            <div className="before-after-grid">
              <div className="before-box">
                <div className="box-label">Legal approved</div>
                <div className="box-text">{ticket.beforeText}</div>
              </div>
              <div className="after-box">
                <div className="box-label">Now proposed</div>
                <div className="box-text">{ticket.afterText}</div>
              </div>
            </div>
            <div className="card-action-row">
              <button className="text-action-btn">View original text ›</button>
            </div>
          </div>

          {/* Card 02: Why was this flagged? */}
          <div className="detail-card">
            <div className="detail-card-header">
              <span className="detail-card-title">Why was this flagged?</span>
              <span className="detail-card-index">02</span>
            </div>
            <div className="why-flagged-notice">
              <span className="sparkle-icon">✦</span>
              <div className="notice-text">{ticket.whyFlagged}</div>
            </div>
          </div>

          {/* Card 03: Which approval does this affect? */}
          <div className="detail-card">
            <div className="detail-card-header">
              <span className="detail-card-title">Which approval does this affect?</span>
              <span className="detail-card-index">03</span>
            </div>
            <div className="approval-info-box">
              <div className="approval-ref">{ticket.approval}</div>
              <div className="approval-cond">Affected condition: {ticket.affectedCondition}</div>
            </div>
            <div className="card-action-row">
              <button className="text-action-btn">View approved baseline ›</button>
            </div>
          </div>

          {/* Card 04: Relevant sources */}
          <div className="detail-card">
            <div className="detail-card-header">
              <span className="detail-card-title">Relevant sources</span>
              <span className="detail-card-index">04</span>
            </div>
            <div className="sources-chips-list">
              {ticket.sources.map((src, i) => (
                <span key={i} className="source-chip">
                  📄 {src}
                </span>
              ))}
              {ticket.amberChip && (
                <span className="source-chip amber-warning-chip">
                  ⚠️ {ticket.amberChip}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Varies by status */}
        <div className="detail-right-col">
          {ticket.status === "Awaiting review" && (
            <>
              {/* Suggested next step card */}
              <div className="status-side-card suggestion-card">
                <div className="card-badge-label">Suggested next step</div>
                <div className="side-card-text">{ticket.nextStep}</div>
                {ticket.basedOn && (
                  <div className="based-on-text">Based on: {ticket.basedOn}</div>
                )}
                <div className="side-card-btn-row">
                  <button className="btn-primary-pill">Accept suggestion</button>
                  <button className="btn-ghost-link">Override</button>
                </div>
              </div>

              {/* Counsel actions card */}
              <div className="status-side-card counsel-actions-card">
                <div className="counsel-card-title">Counsel actions</div>
                <div className="counsel-actions-list">
                  <button className="counsel-action-btn">Request information</button>
                  <button className="counsel-action-btn">Re-review</button>
                  <button className="counsel-action-btn">Mark as no legal impact</button>
                  <button className="counsel-action-btn">Assign</button>
                  <button className="counsel-action-btn">Escalate to Senior Counsel</button>
                </div>
              </div>
            </>
          )}

          {ticket.status === "Under review" && (
            <>
              {/* Review in progress card */}
              <div className="status-side-card review-progress-card">
                <div className="card-badge-label">Review in progress</div>
                <div className="assigned-chip">Assigned to Magfi</div>
                <div className="side-card-text" style={{ marginTop: 10 }}>
                  {ticket.nextStep}
                </div>
                <div className="side-card-btn-row" style={{ marginTop: 14 }}>
                  <button className="btn-primary-pill">Mark review complete</button>
                  <button className="btn-ghost-link">Override</button>
                </div>
              </div>

              {/* Counsel actions card */}
              <div className="status-side-card counsel-actions-card">
                <div className="counsel-card-title">Counsel actions</div>
                <div className="counsel-actions-list">
                  <button className="counsel-action-btn">Request information</button>
                  <button className="counsel-action-btn">Assign</button>
                  <button className="counsel-action-btn">Escalate to Senior Counsel</button>
                </div>
              </div>
            </>
          )}

          {ticket.status === "Needs information" && (
            <>
              {/* Waiting for card (Yellow) */}
              <div className="status-side-card waiting-for-card">
                <div className="card-badge-label yellow-label">Waiting for</div>
                <div className="waiting-items-text">
                  {ticket.waitingFor ? ticket.waitingFor.join(" · ") : "Data fields · Data source · Retention period"}
                </div>
                <button className="remind-team-btn-side">Remind team</button>
                <div className="side-card-text" style={{ marginTop: 12 }}>
                  {ticket.nextStep}
                </div>
              </div>

              {/* Counsel actions card */}
              <div className="status-side-card counsel-actions-card">
                <div className="counsel-card-title">Counsel actions</div>
                <div className="counsel-actions-list">
                  <button className="counsel-action-btn">Remind team</button>
                  <button className="counsel-action-btn">Re-review</button>
                  <button className="counsel-action-btn">Assign</button>
                  <button className="counsel-action-btn">Escalate to Senior Counsel</button>
                </div>
              </div>
            </>
          )}

          {ticket.status === "Sent back to team" && (
            <>
              {/* Sent back to team card (Green) */}
              <div className="status-side-card sent-back-card">
                <div className="card-badge-label green-label">Sent back to {ticket.team}</div>
                <div className="sent-back-date">Sent back on {ticket.sentBackDate || "29 Sep 2026"}</div>
                <div className="outcome-chip-pill">Changes requested</div>
                <div className="feedback-quote-box">
                  "{ticket.feedbackText || "Please provide executed DPA before proceeding."}"
                </div>
                <div className="side-card-btn-row">
                  <button className="btn-primary-pill">View feedback</button>
                  <button className="btn-secondary-pill">Reopen ticket</button>
                </div>
              </div>

              {/* Counsel actions card */}
              <div className="status-side-card counsel-actions-card">
                <div className="counsel-card-title">Counsel actions</div>
                <div className="counsel-actions-list">
                  <button className="counsel-action-btn">Reopen ticket</button>
                  <button className="counsel-action-btn">Assign</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Footer Line */}
      <div className="detail-footer-line">
        AI prepares the context. Counsel makes the decision.
      </div>
    </div>
  );
}
