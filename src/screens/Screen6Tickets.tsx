import { useState } from "react";
import { useStore } from "../state/store";
import { CategoryTag, UrgencyTag } from "../components/Tags";
import { EmptyState } from "../components/EmptyState";
import type { Team } from "../types";

const TEAM_FILTERS: ("All" | Team)[] = ["All", "Engineering", "Product management", "Design"];

export function Screen6Tickets() {
  const { state, dispatch } = useStore();
  const [teamFilter, setTeamFilter] = useState<"All" | Team>("All");

  const flags = state.flags.filter((f) => teamFilter === "All" || f.team === teamFilter);

  const awaiting = flags
    .filter((f) => f.status === "awaiting-review")
    .sort((a, b) => (a.urgency === b.urgency ? 0 : a.urgency === "urgent" ? -1 : 1));
  const underReview = flags.filter((f) => f.status === "comprehensive-review");
  const sentBack = flags.filter((f) => f.status === "resolved");

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tickets</h1>
          <div className="page-subtitle">All legal review items across teams</div>
        </div>
      </div>

      <div className="segmented" style={{ marginBottom: 20 }}>
        {TEAM_FILTERS.map((t) => (
          <button key={t} className={teamFilter === t ? "active" : ""} onClick={() => setTeamFilter(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className="section-block">
        <div className="section-label">Awaiting your review ({awaiting.length})</div>
        {awaiting.length === 0 ? (
          <EmptyState>Nothing awaiting review</EmptyState>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Project</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {awaiting.map((f) => {
                const reviewable = f.id === "flag-vendor-new";
                return (
                  <tr
                    key={f.id}
                    className={`row-${f.urgency} ${reviewable ? "clickable" : ""}`}
                    onClick={() =>
                      reviewable &&
                      dispatch({
                        type: "NAVIGATE",
                        screen: { name: "flag", flagId: f.id, returnTo: { name: "tickets" } },
                      })
                    }
                  >
                    <td>
                      <div className="cell-title">{f.title}</div>
                      <div className="cell-tertiary">{f.documentTitle}</div>
                    </td>
                    <td className="cell-secondary">Project {f.projectId}</td>
                    <td>
                      <CategoryTag category={f.category} />
                    </td>
                    <td>
                      <UrgencyTag urgency={f.urgency} />
                    </td>
                    <td className="cell-secondary">{f.team}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="section-block">
        <div className="section-label">Under comprehensive review ({underReview.length})</div>
        {underReview.length === 0 ? (
          <EmptyState>Nothing under review</EmptyState>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Project</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {underReview.map((f) => (
                <tr key={f.id} className="row-urgent">
                  <td className="cell-title">{f.ticketId}</td>
                  <td className="cell-secondary">Project {f.projectId}</td>
                  <td className="cell-secondary">{f.title}</td>
                  <td>
                    <span className="badge badge-urgent">
                      <span className="badge-dot" />
                      Comprehensive review
                    </span>
                  </td>
                  <td className="cell-secondary">{f.assignee}</td>
                  <td className="cell-tertiary">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="section-block">
        <div className="section-label">Sent back to team ({sentBack.length})</div>
        {sentBack.length === 0 ? (
          <EmptyState>Nothing sent back yet</EmptyState>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th>Project</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Owner</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {sentBack.map((f) => (
                <tr key={f.id} className="row-resolved">
                  <td className="cell-title">{f.title}</td>
                  <td className="cell-secondary">Project {f.projectId}</td>
                  <td className="cell-secondary">
                    <CategoryTag category={f.category} />
                  </td>
                  <td className="cell-secondary">
                    Sent back · {f.outcome === "approved" ? "Approved, go ahead" : "Changes required"}
                  </td>
                  <td className="cell-secondary">{f.team}</td>
                  <td className="cell-tertiary">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
