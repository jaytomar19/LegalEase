import { useState } from "react";
import { useStore } from "../state/store";
import type { Team } from "../types";
import { SAMPLE_DOCUMENTS } from "../data/seed";
import { IconCheck } from "../components/icons";

const TEAMS: Team[] = ["Engineering", "Product management", "Design"];

const MONITORED_CATEGORIES: { label: string; tone: string }[] = [
  { label: "Vendor change", tone: "c-blue" },
  { label: "Training", tone: "c-lavender" },
  { label: "Data kept longer", tone: "c-pink" },
  { label: "Data category", tone: "c-peach" },
  { label: "Jurisdiction", tone: "c-yellow" },
  { label: "Default setting", tone: "c-green" },
  { label: "Generated content", tone: "c-blue" },
];

export function Screen0Submit() {
  const { state, dispatch } = useStore();
  const [projectId, setProjectId] = useState("A");
  const [team, setTeam] = useState<Team>("Engineering");
  const [feature, setFeature] = useState("Support chatbot");
  const [plannedDate, setPlannedDate] = useState("12 Oct 2026");
  const [documentTitle, setDocumentTitle] = useState("Chatbot cost reduction v2");
  const [summary, setSummary] = useState(SAMPLE_DOCUMENTS.A.summary);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");

  const project = state.projects.find((p) => p.id === projectId);
  const isOriginalProject = (id: string) => state.projects.slice(0, 5).some((p) => p.id === id);

  function selectProject(id: string) {
    setProjectId(id);
    const p = state.projects.find((pr) => pr.id === id);
    if (!p) return;
    setTeam(p.defaultTeam);
    if (isOriginalProject(id)) {
      const sample = SAMPLE_DOCUMENTS[id];
      setDocumentTitle(sample.title);
      setSummary(sample.summary);
      setFeature(p.feature);
    } else {
      setDocumentTitle("");
      setSummary("");
      setFeature("");
    }
    setFileName(null);
  }

  function addDocument() {
    const base = documentTitle.replace(/\s+/g, "-") || "document";
    setFileName(`${base}.pdf · 142 KB`);
  }

  function handleAddProject() {
    const name = newProjectName.trim();
    if (!name) return;
    const id = `new-${Date.now()}`;
    dispatch({ type: "ADD_PROJECT", id, name, description: newProjectDesc.trim() });
    setShowAddProject(false);
    setProjectId(id);
    setTeam("Engineering");
    setDocumentTitle("");
    setSummary("");
    setFeature("");
    setFileName(null);
    setNewProjectName("");
    setNewProjectDesc("");
  }

  function handleCancel() {
    selectProject("A");
  }

  function handleSubmit() {
    dispatch({
      type: "SUBMIT_CHANGE",
      payload: { projectId, team, documentTitle, feature, plannedDate, summary, fileName: fileName ?? "" },
    });
    dispatch({ type: "NAVIGATE", screen: { name: "submitting" } });
    setTimeout(() => {
      dispatch({ type: "SET_ROLE", role: "magfi" });
      dispatch({ type: "NAVIGATE", screen: { name: "home" } });
    }, 1500);
  }

  const canSubmit = !!fileName;

  return (
    <div className="app-outer">
      <div className="app-workspace">
        <div className="app-header">
          <div className="app-header-brand">
            <span className="app-header-brand-mark">C</span>
            Checkpoint
          </div>
          <div className="flex-row gap-12">
            <button
              className="link-btn"
              onClick={() => {
                dispatch({ type: "SET_ROLE", role: "magfi" });
                dispatch({ type: "NAVIGATE", screen: { name: "home" } });
              }}
            >
              Switch to Magfi's view
            </button>
            <div className="user-chip" style={{ cursor: "default" }}>
              <span className="user-chip-avatar" style={{ background: "linear-gradient(135deg,#caa06a,#a56233)" }}>
                {team.slice(0, 2).toUpperCase()}
              </span>
              <span className="user-chip-text">
                <span className="user-chip-name">{team}</span>
                <span className="user-chip-role">Team view</span>
              </span>
            </div>
          </div>
        </div>

        <div className="app-content">
          <div style={{ maxWidth: 980, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <h1 className="page-title" style={{ fontSize: 30 }}>
                Submit a change
              </h1>
              <div className="page-subtitle" style={{ fontSize: 14, marginTop: 4 }}>
                Tell Legal what is changing before it goes live.
              </div>
            </div>

            <div className="submit-layout" style={{ gridTemplateColumns: "1fr 320px", gap: 24 }}>
              {/* LEFT: Change card */}
              <div className="surface-card" style={{ padding: 26 }}>
                <div className="card-label" style={{ marginBottom: 18 }}>
                  Change
                </div>

                <div className="field">
                  <label className="field-label">Project</label>
                  <select className="select" style={{ fontSize: 15, padding: "9px 12px" }} value={projectId} onChange={(e) => selectProject(e.target.value)}>
                    {state.projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {!showAddProject ? (
                    <button className="link-btn" style={{ marginTop: 7 }} onClick={() => setShowAddProject(true)}>
                      + Add a new project
                    </button>
                  ) : (
                    <div className="surface-card" style={{ marginTop: 10, padding: 14, background: "var(--bg)" }}>
                      <div className="field">
                        <input className="input" placeholder="Project name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
                      </div>
                      <div className="field" style={{ marginBottom: 10 }}>
                        <input className="input" placeholder="One-line description" value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)} />
                      </div>
                      <div className="flex-row gap-8">
                        <button className="btn btn-secondary btn-sm" onClick={() => setShowAddProject(false)}>
                          Cancel
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={handleAddProject}>
                          Add project
                        </button>
                      </div>
                      <div className="field-hint">Any team can add a project. Legal is told when one is added.</div>
                    </div>
                  )}
                </div>

                <div className="field">
                  <label className="field-label">Change name</label>
                  <input
                    className="input"
                    style={{ fontSize: 17, fontWeight: 500, padding: "9px 12px" }}
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="field-label">Your team</label>
                  <div className="team-selector">
                    {TEAMS.map((t) => (
                      <button key={t} className={`btn btn-sm ${team === t ? "btn-primary" : "btn-secondary"}`} onClick={() => setTeam(t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="two-col">
                  <div className="field">
                    <label className="field-label">Feature</label>
                    {isOriginalProject(projectId) ? (
                      <select className="select" value={feature} onChange={(e) => setFeature(e.target.value)}>
                        <option value={feature}>{feature}</option>
                      </select>
                    ) : (
                      <input className="input" placeholder="Feature" value={feature} onChange={(e) => setFeature(e.target.value)} />
                    )}
                  </div>
                  <div className="field">
                    <label className="field-label">Planned for</label>
                    <input className="input" value={plannedDate} onChange={(e) => setPlannedDate(e.target.value)} />
                  </div>
                </div>

                <div className="field">
                  <label className="field-label">Summary</label>
                  <textarea
                    className="textarea"
                    style={{ background: "var(--bg)", border: "1px solid transparent" }}
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                  <div className="field-hint">A few sentences, in your own words</div>
                </div>

                <div className="field" style={{ marginBottom: 4 }}>
                  <label className="field-label">Document</label>
                  {!fileName ? (
                    <div className="upload-row" style={{ borderRadius: "var(--control-radius)" }}>
                      <span style={{ flex: 1 }}>PDF, Word or text file</span>
                      <button className="btn btn-secondary btn-sm" onClick={addDocument}>
                        + Attach document
                      </button>
                    </div>
                  ) : (
                    <div className="doc-chip">
                      <span>{fileName}</span>
                      <button style={{ background: "none", border: "none", color: "var(--text-tertiary)" }} onClick={() => setFileName(null)}>
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Checkpoint contextual panel */}
              <div>
                <div className="surface-card-tint" style={{ padding: 20, marginBottom: 16 }}>
                  <div className="card-label on-tint" style={{ marginBottom: 10 }}>
                    Checkpoint
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
                    This change will be checked against the legal approval already recorded for this project.
                  </div>

                  <div className="field-label" style={{ marginBottom: 2 }}>
                    Project
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{project?.name}</div>

                  <div className="field-label" style={{ marginBottom: 4 }}>
                    Approval
                  </div>
                  {project?.approvalExists ? (
                    <div className="flex-row gap-6" style={{ fontSize: 13, color: "var(--accent-green-text)", fontWeight: 500 }}>
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "var(--accent-green-bg)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconCheck size={10} />
                      </span>
                      Approval on file
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>No approval on record</div>
                  )}
                </div>

                <div className="surface-card" style={{ padding: 20, marginBottom: 16 }}>
                  <div className="card-label" style={{ marginBottom: 10 }}>
                    Categories monitored
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {MONITORED_CATEGORIES.map((c) => (
                      <span key={c.label} className={`pastel-chip ${c.tone}`}>
                        {c.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="surface-card" style={{ padding: 18 }}>
                  <div className="card-label" style={{ marginBottom: 8 }}>
                    Adding under
                  </div>
                  {fileName ? (
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--text)" }}>{documentTitle}</strong>
                      <br />
                      {project?.name} · {feature}
                      <br />
                      {team}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, color: "var(--text-tertiary)" }}>No document added yet</div>
                  )}
                </div>
              </div>
            </div>

            <div className="field-hint" style={{ margin: "18px 0 14px" }}>
              Every change is checked automatically. You'll only hear from Legal if something needs a look.
            </div>

            <div className="flex-row gap-10">
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button className="btn btn-primary" disabled={!canSubmit} onClick={handleSubmit}>
                Submit for legal check →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
