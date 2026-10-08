import { useState } from "react";
import { useStore } from "../state/store";
import { EmptyState } from "../components/EmptyState";

export function Screen7Tracking() {
  const { state, dispatch } = useStore();
  const [justRequested, setJustRequested] = useState<string | null>(null);

  const notSubmitted = state.trackingItems.filter((t) => t.status === "not-submitted");
  const waiting = state.trackingItems.filter((t) => t.status === "waiting");

  function askTeam(trackingId: string, team: string) {
    dispatch({ type: "ASK_TEAM_SUBMIT", trackingId });
    setJustRequested(`Request sent to ${team}. It becomes a flag once they submit a document.`);
    setTimeout(() => setJustRequested(null), 3000);
  }

  return (
    <div>
      {justRequested && <div className="banner grey">{justRequested}</div>}

      <div className="notice section-block">
        <span className="notice-icon">◉</span>
        <div>
          <strong style={{ fontWeight: 600 }}>These are AI observations, not legal flags.</strong> AI tracking is
          on and read-only. Watching Slack #onboarding-flow, #summaries-dev, #image-style and Jira projects A to
          E. Never watched: direct messages and HR channels. Only the triggering snippet is kept. An item here
          never becomes a legal review item on its own — it only becomes one if the team formally submits a
          change document for LegalEase to check.
        </div>
      </div>

      <div className="section-block">
        <div className="section-label">Possible change · not submitted as a document ({notSubmitted.length})</div>

        {notSubmitted.length === 0 ? (
          <EmptyState>No tracking items</EmptyState>
        ) : (
          notSubmitted.map((t) => (
            <div key={t.id} className="panel-surface panel-surface-pad section-block" style={{ marginBottom: 10 }}>
              <div className="flex-row" style={{ justifyContent: "space-between" }}>
                <div className="cell-title">
                  {t.sourceType === "Slack" ? "#" : "◆"} {t.source}
                </div>
                <div className="flex-row gap-6">
                  <span className="badge badge-neutral">Possible change</span>
                  <span className="badge badge-neutral">Not submitted</span>
                </div>
              </div>
              <div className="cell-tertiary" style={{ margin: "4px 0 8px" }}>
                Project {t.projectId} · {t.team} · {t.date}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  borderLeft: "2px solid var(--border)",
                  paddingLeft: 10,
                  marginBottom: 10,
                }}
              >
                "{t.snippet}"
              </div>
              <div className="flex-row gap-8" style={{ marginBottom: 10 }}>
                <span className="badge badge-neutral">Possible: {t.possibleCategory}</span>
                <span className="text-tertiary" style={{ fontSize: 12 }}>
                  {t.confidence}% confidence
                </span>
              </div>
              <div className="flex-row gap-8">
                <button className="btn btn-secondary btn-sm" onClick={() => askTeam(t.id, t.team)}>
                  Ask team to submit a document
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => dispatch({ type: "NOT_A_CHANGE", trackingId: t.id })}
                >
                  Not a change
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="section-block">
        <div className="section-label">Waiting for team ({waiting.length})</div>
        {waiting.length === 0 ? (
          <EmptyState>Nothing waiting</EmptyState>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Project</th>
                <th>Possible</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {waiting.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="cell-title">{t.source}</div>
                    <div className="cell-tertiary">"{t.snippet}"</div>
                  </td>
                  <td className="cell-secondary">
                    Project {t.projectId} · {t.team}
                  </td>
                  <td>
                    <span className="badge badge-neutral">{t.possibleCategory}</span>
                  </td>
                  <td className="cell-secondary">{t.requestedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
