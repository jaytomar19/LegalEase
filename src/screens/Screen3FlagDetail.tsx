import { useState } from "react";
import { useStore } from "../state/store";
import type { DecisionChoice } from "../types";
import { UrgencyTag, CategoryTag } from "../components/Tags";

const REQUIRED_CHANGES_DEFAULT = [
  "Get written confirmation that Provider B will not train on customer data.",
  "Get written confirmation that Provider B keeps data only briefly.",
  "Notify customers of the new provider at least 15 days before go-live.",
];

const STILL_NEEDED = [
  "Provider B terms",
  "Storage/retention details",
  "Training policy",
  "Customer notice timing",
];

export function Screen3FlagDetail() {
  const { state, dispatch } = useStore();
  const flagId = state.screen.flagId!;
  const flag = state.flags.find((f) => f.id === flagId);

  const [choice, setChoice] = useState<DecisionChoice>(null);
  const [assignee, setAssignee] = useState<"Senior Counsel" | "Privacy team">("Senior Counsel");
  const [approvedNote] = useState("Approved as submitted. You can go ahead as planned.");
  const [reviewNote, setReviewNote] = useState("This change needs a full review before it can go ahead.");
  const [changesNote, setChangesNote] = useState("You can go ahead once these changes are done.");
  const [requiredChanges, setRequiredChanges] = useState(
    REQUIRED_CHANGES_DEFAULT.map((text, i) => ({ id: `rc-${i}`, text, checked: true }))
  );
  const [newChangeText, setNewChangeText] = useState("");
  // Guards against a duplicate dispatch from a rapid repeat click on a decision button.
  const [submitting, setSubmitting] = useState(false);

  function close() {
    dispatch({ type: "NAVIGATE", screen: state.screen.returnTo ?? { name: "home" } });
  }

  if (!flag) return null;

  const currentFlagId = flag.id;

  function confirm(outcome: "approved" | "changes-required" | "comprehensive-review") {
    if (submitting) return;
    setSubmitting(true);
    const note = outcome === "approved" ? approvedNote : outcome === "comprehensive-review" ? reviewNote : changesNote;
    dispatch({
      type: "CONFIRM_DECISION",
      flagId: currentFlagId,
      outcome,
      note,
      assignee: outcome === "comprehensive-review" ? assignee : undefined,
      requiredChanges:
        outcome === "changes-required" ? requiredChanges.filter((c) => c.checked).map((c) => c.text) : undefined,
    });
    dispatch({ type: "NAVIGATE", screen: { name: "decision-sent", flagId: currentFlagId } });
  }

  return (
    <div className="panel-overlay" onClick={close}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <div className="flex-row gap-8">
            <UrgencyTag urgency={flag.urgency} />
            <CategoryTag category={flag.category} />
            <span className="text-tertiary" style={{ fontSize: 12 }}>
              {flag.confidence}% confidence
            </span>
          </div>
          <button className="panel-close" onClick={close}>
            ✕
          </button>
        </div>

        <div className="panel-body">
          <div className="section-label" style={{ marginBottom: 2 }}>
            {flag.category}
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 4px" }}>{flag.title}</h2>
          <div className="text-secondary" style={{ fontSize: 13, marginBottom: 18 }}>
            {flag.documentTitle} · {flag.team} · today
          </div>

          <div className="block-grid-2 section-block">
            <div className="panel-surface panel-surface-pad">
              <div className="section-label">What changed?</div>
              <div className="flex-row gap-10" style={{ alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Provider A</span>
                <span className="text-tertiary">→</span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Provider B</span>
              </div>
              <div className="highlight" style={{ marginTop: 8, display: "inline-block" }}>
                new vendor
              </div>
            </div>
            <div className="panel-surface panel-surface-pad">
              <div className="section-label">Why it matters</div>
              <div style={{ fontSize: 13 }}>
                A new vendor can start a notice period to customers, and its data terms may differ from what was
                approved.
              </div>
            </div>
          </div>

          <div className="panel-surface panel-surface-pad section-block">
            <div className="section-label">Compared with what Legal approved</div>
            <div className="compare-cols">
              <div className="compare-col">
                <div className="compare-col-label">Legal approved</div>
                <div className="fact-row">
                  <span>Vendor</span>
                  <strong>Provider A</strong>
                </div>
                <div className="fact-row">
                  <span>Training on data</span>
                  <strong>off</strong>
                </div>
                <div className="fact-row">
                  <span>Data kept</span>
                  <strong>briefly</strong>
                </div>
                <div className="fact-row">
                  <span>Customer notice</span>
                  <strong>required before launch</strong>
                </div>
              </div>
              <div className="compare-col">
                <div className="compare-col-label">Now proposed</div>
                <div className="fact-row">
                  <span>Vendor</span>
                  <strong>Provider B (new)</strong>
                </div>
                <div className="fact-row">
                  <span>Training on data</span>
                  <strong>not stated</strong>
                </div>
                <div className="fact-row">
                  <span>Data kept</span>
                  <strong>not stated</strong>
                </div>
                <div className="fact-row">
                  <span>Customer notice</span>
                  <strong>not stated</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel-surface panel-surface-pad section-block">
            <div className="section-label">Still needed</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
              {STILL_NEEDED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel-surface panel-surface-pad section-block" style={{ fontSize: 13 }}>
            <div className="section-label">Evidence / artefact</div>
            Check this artefact: <strong>Vendor DPA, clause 4.2</strong>
          </div>

          <div className="notice notice-review section-block">
            <span className="notice-icon">🔒</span>
            <div>This needs your review. The agent can't act on it automatically.</div>
          </div>

          {flag.status === "awaiting-review" && (
            <div className="panel-surface panel-surface-pad section-block">
              <div className="section-label">Legal decision</div>
              <div className="decision-options">
                <button
                  className={`decision-option ${choice === "approved" ? "selected" : ""}`}
                  onClick={() => setChoice("approved")}
                >
                  <span className="radio-dot" />
                  Approved, go ahead
                </button>
                <button
                  className={`decision-option ${choice === "comprehensive-review" ? "selected" : ""}`}
                  onClick={() => setChoice("comprehensive-review")}
                >
                  <span className="radio-dot" />
                  Needs a comprehensive review
                </button>
                <button
                  className={`decision-option ${choice === "changes-required" ? "selected" : ""}`}
                  onClick={() => setChoice("changes-required")}
                >
                  <span className="radio-dot" />
                  Changes required
                  <span className="badge badge-neutral" style={{ marginLeft: "auto" }}>
                    Suggested
                  </span>
                </button>
              </div>

              {choice === "approved" && (
                <div className="panel-surface panel-surface-pad" style={{ marginTop: 12 }}>
                  <div className="field">
                    <label className="field-label">Send to</label>
                    <div style={{ fontSize: 13 }}>{flag.team}</div>
                  </div>
                  <div className="field">
                    <label className="field-label">Note</label>
                    <textarea className="textarea" rows={2} readOnly value={approvedNote} />
                  </div>
                  <button className="btn btn-primary" disabled={submitting} onClick={() => confirm("approved")}>
                    Send to {flag.team}
                  </button>
                </div>
              )}

              {choice === "comprehensive-review" && (
                <div className="panel-surface panel-surface-pad" style={{ marginTop: 12 }}>
                  <div className="field">
                    <label className="field-label">Assign to</label>
                    <select
                      className="select"
                      value={assignee}
                      onChange={(e) => setAssignee(e.target.value as "Senior Counsel" | "Privacy team")}
                    >
                      <option>Senior Counsel</option>
                      <option>Privacy team</option>
                    </select>
                  </div>
                  <div className="field">
                    <label className="field-label">Note</label>
                    <textarea
                      className="textarea"
                      rows={2}
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={submitting}
                    onClick={() => confirm("comprehensive-review")}
                  >
                    Start comprehensive review
                  </button>
                </div>
              )}

              {choice === "changes-required" && (
                <div className="panel-surface panel-surface-pad" style={{ marginTop: 12 }}>
                  <div className="field-label" style={{ marginBottom: 10 }}>
                    Required legal changes (suggested by the agent, edit as needed)
                  </div>
                  {requiredChanges.map((c) => (
                    <div className="checklist-item" key={c.id}>
                      <input
                        type="checkbox"
                        checked={c.checked}
                        onChange={() =>
                          setRequiredChanges((prev) =>
                            prev.map((p) => (p.id === c.id ? { ...p, checked: !p.checked } : p))
                          )
                        }
                      />
                      <input
                        className="input"
                        value={c.text}
                        onChange={(e) =>
                          setRequiredChanges((prev) =>
                            prev.map((p) => (p.id === c.id ? { ...p, text: e.target.value } : p))
                          )
                        }
                      />
                    </div>
                  ))}
                  <div className="flex-row gap-8" style={{ marginBottom: 14 }}>
                    <input
                      className="input"
                      placeholder="Add another change"
                      value={newChangeText}
                      onChange={(e) => setNewChangeText(e.target.value)}
                    />
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        if (!newChangeText.trim()) return;
                        setRequiredChanges((prev) => [
                          ...prev,
                          { id: `rc-${Date.now()}`, text: newChangeText.trim(), checked: true },
                        ]);
                        setNewChangeText("");
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="field">
                    <label className="field-label">Note</label>
                    <textarea
                      className="textarea"
                      rows={2}
                      value={changesNote}
                      onChange={(e) => setChangesNote(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn btn-primary"
                    disabled={submitting}
                    onClick={() => confirm("changes-required")}
                  >
                    Send to {flag.team}
                  </button>
                </div>
              )}
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
        </div>
      </div>
    </div>
  );
}
