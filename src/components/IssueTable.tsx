import type { Flag, ScreenState } from "../types";
import { useStore } from "../state/store";
import { CategoryTag, UrgencyTag } from "./Tags";
import { EmptyState } from "./EmptyState";

function outcomeLabel(outcome?: string) {
  if (outcome === "approved") return "Approved, go ahead";
  if (outcome === "changes-required") return "Changes required";
  return "";
}

export function IssueTable({
  liveFlags,
  resolvedFlags,
  loggedFlags,
  returnTo,
}: {
  liveFlags: Flag[];
  resolvedFlags: Flag[];
  loggedFlags: Flag[];
  /** Where to return to when a flag opened from this list is closed. Defaults to Home. */
  returnTo?: ScreenState;
}) {
  const { dispatch } = useStore();
  const noResults = liveFlags.length + resolvedFlags.length + loggedFlags.length === 0;

  function openFlag(f: Flag) {
    if (f.id === "flag-vendor-new" && f.status === "awaiting-review") {
      dispatch({
        type: "NAVIGATE",
        screen: { name: "flag", flagId: f.id, returnTo: returnTo ?? { name: "home" } },
      });
    }
  }

  if (noResults) {
    return <EmptyState>No flags match</EmptyState>;
  }

  return (
    <div>
      {liveFlags.length > 0 && (
        <div className="section-block">
          <div className="section-label">Live ({liveFlags.length})</div>
          <table className="table">
            <thead>
              <tr>
                <th>Change</th>
                <th>Project</th>
                <th>Category</th>
                <th>Urgency</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {liveFlags.map((f) => {
                const reviewable = f.id === "flag-vendor-new" && f.status === "awaiting-review";
                return (
                  <tr
                    key={f.id}
                    className={`row-${f.urgency} ${reviewable ? "clickable" : ""}`}
                    onClick={() => openFlag(f)}
                  >
                    <td>
                      <div className="cell-title">
                        {f.title}
                        {f.isNew && (
                          <span className="badge badge-neutral" style={{ marginLeft: 8 }}>
                            New
                          </span>
                        )}
                      </div>
                      <div className="cell-tertiary">
                        {f.team} · {f.documentTitle} · {f.feature}
                      </div>
                    </td>
                    <td className="cell-secondary">Project {f.projectId}</td>
                    <td>
                      <CategoryTag category={f.category} />
                    </td>
                    <td>
                      <UrgencyTag urgency={f.urgency} />
                    </td>
                    <td className="cell-secondary">
                      {f.status === "comprehensive-review" ? (
                        <>
                          {f.ticketId} · Comprehensive review
                        </>
                      ) : reviewable ? (
                        <span className="link-btn">Review</span>
                      ) : (
                        "Needs review"
                      )}
                    </td>
                    <td className="cell-tertiary">{f.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {resolvedFlags.length > 0 && (
        <div className="section-block">
          <div className="section-label">Resolved ({resolvedFlags.length})</div>
          <table className="table">
            <thead>
              <tr>
                <th>Change</th>
                <th>Project</th>
                <th>Category</th>
                <th>Outcome</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {resolvedFlags.map((f) => (
                <tr key={f.id} className="row-resolved">
                  <td>
                    <div className="cell-title">{f.title}</div>
                    <div className="cell-tertiary">
                      {f.team} · {f.documentTitle}
                    </div>
                  </td>
                  <td className="cell-secondary">Project {f.projectId}</td>
                  <td>
                    <CategoryTag category={f.category} />
                  </td>
                  <td className="cell-secondary">
                    Sent back to {f.team} · {outcomeLabel(f.outcome)}
                  </td>
                  <td className="cell-tertiary">{f.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loggedFlags.length > 0 && (
        <div className="section-block">
          <div className="section-label">Logged, no flag ({loggedFlags.length})</div>
          <table className="table">
            <thead>
              <tr>
                <th>Change</th>
                <th>Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loggedFlags.map((f) => (
                <tr key={f.id} className="row-logged">
                  <td>
                    <div className="cell-title text-secondary">{f.title}</div>
                    <div className="cell-tertiary">
                      {f.team} · {f.documentTitle}
                    </div>
                  </td>
                  <td className="cell-secondary">Project {f.projectId}</td>
                  <td className="cell-tertiary">Logged, no flag raised · Non-legal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
