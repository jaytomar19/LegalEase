import { useState } from "react";
import { useStore } from "../state/store";
import { EmptyState } from "../components/EmptyState";
import { IconTicket } from "../components/icons";
import type { Flag, Team } from "../types";

const TEAM_FILTERS: ("All" | Team)[] = ["All", "Engineering", "Product management", "Design"];

function outcomeLabel(outcome?: string) {
  if (outcome === "approved") return "Approved, go ahead";
  if (outcome === "changes-required") return "Changes required";
  return "";
}

export function Screen6Tickets() {
  const { state, dispatch } = useStore();
  const [teamFilter, setTeamFilter] = useState<"All" | Team>("All");

  const flags = state.flags.filter((f) => teamFilter === "All" || f.team === teamFilter);

  const awaiting = flags
    .filter((f) => f.status === "awaiting-review")
    .sort((a, b) => (a.urgency === b.urgency ? 0 : a.urgency === "urgent" ? -1 : 1));
  const underReview = flags.filter((f) => f.status === "comprehensive-review");
  const sentBack = flags.filter((f) => f.status === "resolved");

  function openFlag(f: Flag) {
    if (f.id === "flag-vendor-new") {
      dispatch({ type: "NAVIGATE", screen: { name: "flag", flagId: f.id, returnTo: { name: "tickets" } } });
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tickets</h1>
          <div className="page-subtitle">Legal queries and AI-detected changes requiring attention.</div>
        </div>
      </div>

      <div className="segmented" style={{ marginBottom: 20 }}>
        {TEAM_FILTERS.map((t) => (
          <button key={t} className={teamFilter === t ? "active" : ""} onClick={() => setTeamFilter(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="stat-tile-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div>
          <div className="ticket-col-header">
            <span className="ticket-col-icon urgent">
              <IconTicket size={14} />
            </span>
            <div>
              <div className="ticket-col-title">Awaiting your review ({awaiting.length})</div>
              <div className="ticket-col-sub">Ready for Legal consideration</div>
            </div>
          </div>
          {awaiting.length === 0 ? (
            <EmptyState>Nothing awaiting review</EmptyState>
          ) : (
            awaiting.map((f) => {
              const reviewable = f.id === "flag-vendor-new";
              return (
                <div
                  key={f.id}
                  className="ticket-card"
                  style={{ cursor: reviewable ? "pointer" : "default" }}
                  onClick={() => openFlag(f)}
                >
                  <div className="ticket-card-top">
                    <span className={`badge ${f.urgency === "urgent" ? "badge-urgent" : "badge-later"}`}>
                      {f.urgency === "urgent" ? "High" : "Medium"}
                    </span>
                    {reviewable && <span className="text-tertiary" style={{ fontSize: 11 }}>Review ›</span>}
                  </div>
                  <div className="ticket-card-title">{f.title}</div>
                  <div className="ticket-card-sub">
                    Project {f.projectId} · {f.team}
                  </div>
                  <div className="ticket-card-tags">
                    <span className="badge badge-neutral">{f.category}</span>
                  </div>
                  <hr className="ticket-card-divider" />
                  <div className="ticket-card-footer">
                    <span className="cell-tertiary">{f.documentTitle}</span>
                    <span className="cell-tertiary">{f.date}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div>
          <div className="ticket-col-header">
            <span className="ticket-col-icon later">
              <IconTicket size={14} />
            </span>
            <div>
              <div className="ticket-col-title">Under comprehensive review ({underReview.length})</div>
              <div className="ticket-col-sub">Counsel is reviewing</div>
            </div>
          </div>
          {underReview.length === 0 ? (
            <EmptyState>Nothing under review</EmptyState>
          ) : (
            underReview.map((f) => (
              <div key={f.id} className="ticket-card">
                <div className="ticket-card-top">
                  <span className="badge badge-neutral">{f.ticketId}</span>
                </div>
                <div className="ticket-card-title">{f.title}</div>
                <div className="ticket-card-sub">
                  Project {f.projectId} · {f.team}
                </div>
                <div className="ticket-card-tags">
                  <span className="badge badge-neutral">{f.category}</span>
                </div>
                <hr className="ticket-card-divider" />
                <div className="ticket-card-footer">
                  <span className="cell-tertiary">Assigned to {f.assignee}</span>
                  <span className="cell-tertiary">{f.date}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          <div className="ticket-col-header">
            <span className="ticket-col-icon resolved">
              <IconTicket size={14} />
            </span>
            <div>
              <div className="ticket-col-title">Sent back to team ({sentBack.length})</div>
              <div className="ticket-col-sub">Changes requested or cleared</div>
            </div>
          </div>
          {sentBack.length === 0 ? (
            <EmptyState>Nothing sent back yet</EmptyState>
          ) : (
            sentBack.map((f) => (
              <div key={f.id} className="ticket-card">
                <div className="ticket-card-top">
                  <span className="badge badge-resolved">{outcomeLabel(f.outcome)}</span>
                </div>
                <div className="ticket-card-title">{f.title}</div>
                <div className="ticket-card-sub">
                  Project {f.projectId} · {f.team}
                </div>
                <div className="ticket-card-tags">
                  <span className="badge badge-neutral">{f.category}</span>
                </div>
                <hr className="ticket-card-divider" />
                <div className="ticket-card-footer">
                  <span className="cell-tertiary">Sent back to {f.team}</span>
                  <span className="cell-tertiary">{f.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
