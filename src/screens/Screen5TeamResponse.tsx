import { useState } from "react";
import { useStore } from "../state/store";

export function Screen5TeamResponse() {
  const { state, dispatch } = useStore();
  const flagId = state.screen.flagId!;
  const flag = state.flags.find((f) => f.id === flagId);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  if (!flag) return null;

  function backToMagfi() {
    dispatch({ type: "SET_ROLE", role: "magfi" });
    dispatch({ type: "NAVIGATE", screen: { name: "home" } });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div className="team-topbar">
        <div className="text-secondary" style={{ fontSize: 13 }}>
          Viewing as <strong style={{ color: "var(--text)" }}>{flag.team}</strong>
        </div>
        <button className="link-btn" onClick={backToMagfi}>
          Switch to Magfi's view
        </button>
      </div>

      <div className="content-narrow" style={{ padding: "32px 0 0 32px", maxWidth: 560 }}>
        <div className="page-header">
          <div>
            <h1 className="page-title">Legal's response</h1>
            <div className="page-subtitle">
              {flag.documentTitle} · Project {flag.projectId} · {flag.feature} · {flag.team}
            </div>
          </div>
        </div>

        <table className="table section-block">
          <tbody>
            <tr>
              <td className="cell-secondary" style={{ width: "32%" }}>
                Legal decision
              </td>
              <td className="cell-title">
                {flag.outcome === "approved"
                  ? "Approved, go ahead"
                  : flag.outcome === "changes-required"
                  ? "Changes required"
                  : "Needs a comprehensive review"}
              </td>
            </tr>
            <tr>
              <td className="cell-secondary">Status</td>
              <td>
                {flag.outcome === "approved" && (
                  <span className="badge badge-resolved">
                    <span className="badge-dot" />
                    Cleared to proceed
                  </span>
                )}
                {flag.outcome === "comprehensive-review" && (
                  <span className="badge badge-urgent">
                    <span className="badge-dot" />
                    Do not proceed
                  </span>
                )}
                {flag.outcome === "changes-required" && (
                  <span className="badge badge-later">
                    <span className="badge-dot" />
                    Pending changes
                  </span>
                )}
              </td>
            </tr>
            {flag.outcome === "comprehensive-review" && (
              <tr>
                <td className="cell-secondary">Reason</td>
                <td>
                  {flag.ticketId} · with {flag.assignee}
                </td>
              </tr>
            )}
            <tr>
              <td className="cell-secondary">Note</td>
              <td>{flag.note}</td>
            </tr>
          </tbody>
        </table>

        {flag.outcome === "approved" && (
          <div className="banner green section-block">
            <span>Approved. You can go ahead.</span>
          </div>
        )}

        {flag.outcome === "comprehensive-review" && (
          <div className="banner red section-block">
            <span>Needs a comprehensive review. Do not go ahead until Legal confirms.</span>
          </div>
        )}

        {flag.outcome === "changes-required" && (
          <>
            <div className="banner yellow section-block">
              <span>Changes required before you go ahead.</span>
            </div>
            <div className="section-block">
              <div className="section-label">Required follow-up</div>
              {flag.requiredChanges?.map((c) => (
                <div className="checklist-item" key={c.id}>
                  <input
                    type="checkbox"
                    checked={!!checked[c.id]}
                    onChange={() => setChecked((prev) => ({ ...prev, [c.id]: !prev[c.id] }))}
                  />
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-secondary section-block">Resubmit with changes</button>
          </>
        )}

        <div>
          <button className="btn btn-primary" onClick={backToMagfi}>
            Back to Magfi's view
          </button>
        </div>
      </div>
    </div>
  );
}
