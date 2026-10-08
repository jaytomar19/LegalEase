import { useStore } from "../state/store";

function outcomeLabel(outcome?: string) {
  if (outcome === "approved") return "Approved, go ahead";
  if (outcome === "changes-required") return "Changes required";
  return "Needs a comprehensive review";
}

export function Screen4DecisionSent() {
  const { state, dispatch } = useStore();
  const flagId = state.screen.flagId!;
  const flag = state.flags.find((f) => f.id === flagId);
  if (!flag) return null;

  let heading = "";
  if (flag.outcome === "approved") heading = "Sent back to Engineering: Approved, go ahead";
  else if (flag.outcome === "changes-required") heading = "Sent back to Engineering: Changes required";
  else if (flag.outcome === "comprehensive-review")
    heading = `Comprehensive review started · ${flag.ticketId} · assigned to ${flag.assignee}`;

  const nextStep =
    flag.outcome === "comprehensive-review"
      ? `${flag.assignee} will complete a full review before Engineering can go ahead.`
      : flag.outcome === "changes-required"
      ? "Engineering completes the required changes, then the change can go ahead."
      : "Engineering can proceed as submitted.";

  return (
    <div className="content-narrow">
      <div className="page-header">
        <div>
          <h1 className="page-title">{heading}</h1>
          <div className="page-subtitle">{flag.documentTitle}</div>
        </div>
      </div>

      <table className="table section-block">
        <tbody>
          <tr>
            <td className="cell-secondary" style={{ width: "30%" }}>
              Decision
            </td>
            <td className="cell-title">{outcomeLabel(flag.outcome)}</td>
          </tr>
          <tr>
            <td className="cell-secondary">Reviewer</td>
            <td>Magfi, Junior Counsel</td>
          </tr>
          {flag.outcome === "comprehensive-review" && (
            <tr>
              <td className="cell-secondary">Ticket</td>
              <td>
                {flag.ticketId} · assigned to {flag.assignee}
              </td>
            </tr>
          )}
          <tr>
            <td className="cell-secondary">Timestamp</td>
            <td>today</td>
          </tr>
          <tr>
            <td className="cell-secondary">Next step</td>
            <td>{nextStep}</td>
          </tr>
          {flag.note && (
            <tr>
              <td className="cell-secondary">Note</td>
              <td>{flag.note}</td>
            </tr>
          )}
        </tbody>
      </table>

      {flag.outcome === "changes-required" && flag.requiredChanges && flag.requiredChanges.length > 0 && (
        <div className="section-block">
          <div className="section-label">Required follow-up</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
            {flag.requiredChanges.map((c) => (
              <li key={c.id}>{c.text}</li>
            ))}
          </ul>
        </div>
      )}

      {flag.audit && (
        <div className="section-block">
          <div className="section-label">Audit trail</div>
          <div className="audit-timeline">
            {flag.audit.map((a, i) => (
              <div className="audit-item" key={i}>
                <div className="audit-rail">
                  <div className="audit-dot" />
                  {i < flag.audit!.length - 1 && <div className="audit-line" />}
                </div>
                <div className="audit-content">
                  <div className="audit-time">{a.time}</div>
                  <div>{a.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-row gap-10">
        <button
          className="btn btn-secondary"
          onClick={() =>
            dispatch({
              type: "NAVIGATE",
              screen: { name: "project", projectId: flag.projectId, projectTab: "issues" },
            })
          }
        >
          Back to Project {flag.projectId}
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch({ type: "SET_ROLE", role: flag.team });
            dispatch({ type: "NAVIGATE", screen: { name: "team-response", flagId: flag.id } });
          }}
        >
          See what Engineering sees
        </button>
      </div>
    </div>
  );
}
