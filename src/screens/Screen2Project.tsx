
import { useState } from "react";
import { useStore, getProjectCounts } from "../state/store";
import { FilterBar, type FilterValues } from "../components/FilterBar";
import { IssueTable } from "../components/IssueTable";
import { EmptyState } from "../components/EmptyState";
import type { Flag, ScreenState } from "../types";

const DEFAULT_PROJECT_FILTERS: FilterValues = { show: "all", groupBy: null, keyword: "" };

const WHERE_TO_START: Record<string, string> = {
  A: "Start with the current change document, then compare the vendor, training, and retention facts against the approval artefacts before deciding whether the change needs legal follow-up.",
  B: "Start with the onboarding copy document and check whether the wording change affects anything beyond copy review.",
  C: "Start with the EU rollout plan and compare the new launch region against the regions covered by the approval memo.",
  D: "Start with the summary quality plan and check whether using customer boards for training conflicts with the training-off approval.",
  E: "Start with the image feature launch plan and check whether switching the default on affects the approved default-setting conditions.",
};

const DOC_BULLETS: Record<string, string[]> = {
  A: [
    "Chatbot is moving to a cheaper AI model",
    "The provider is changing",
    "Customer chat messages will be sent to the new provider",
    "The screens are not changing",
  ],
  B: ["The welcome message wording is being updated", "No change to how the product works or what data is used"],
  C: ["The AI feature is launching in a new region next month", "No change to how the feature works"],
  D: ["Customer boards will be used to improve how well the AI summaries work", "No change to the screens"],
  E: ["The AI image feature is switching on by default for every plan from next month"],
};

const COMPARISON_A = [
  { fact: "Vendor", approved: "Provider A", inDoc: "Provider B (new)", status: "Changed" as const },
  { fact: "Training on data", approved: "off", inDoc: "not stated", status: "Missing" as const },
  { fact: "Data kept", approved: "briefly", inDoc: "not stated", status: "Missing" as const },
  { fact: "Customer notice", approved: "required before launch", inDoc: "not stated", status: "Missing" as const },
];

function docStatusBadge(label: string) {
  if (label.startsWith("Live · urgent")) return <span className="badge badge-urgent"><span className="badge-dot" />Needs review</span>;
  if (label.startsWith("Live")) return <span className="badge badge-later"><span className="badge-dot" />Needs review</span>;
  if (label === "Resolved") return <span className="badge badge-resolved"><span className="badge-dot" />Resolved</span>;
  return <span className="badge badge-logged"><span className="badge-dot" />Logged</span>;
}

function parseArtefact(name: string): { title: string; date?: string } {
  const [head, ...rest] = name.split(",").map((s) => s.trim());
  const suffix = rest.join(", ");
  const looksLikeDate = /^\d{1,2}\s+[A-Za-z]{3,}$/.test(suffix);
  return looksLikeDate ? { title: head, date: suffix } : { title: name };
}

function statusTagClass(status: string) {
  if (status === "Changed") return "tag-changed";
  if (status === "Missing" || status === "Not stated") return "tag-not-stated";
  return "tag-unchanged";
}

export function Screen2Project({ screen }: { screen: Pick<ScreenState, "projectId" | "projectTab"> }) {
  const { state, dispatch } = useStore();
  const projectId = screen.projectId!;
  const project = state.projects.find((p) => p.id === projectId)!;
  const tab = screen.projectTab ?? "ai-brief";
  const { live, resolved } = getProjectCounts(state, projectId);

  const projectDocs = state.documents
    .filter((d) => d.projectId === projectId)
    .sort((a, b) => (a.createdAt === "today" ? -1 : b.createdAt === "today" ? 1 : 0));

  const defaultDocId = projectDocs.find((d) => d.statusLabel.startsWith("Live"))?.id ?? projectDocs[0]?.id;
  const [selectedDocId, setSelectedDocId] = useState(defaultDocId);
  const selectedDoc = projectDocs.find((d) => d.id === selectedDocId) ?? projectDocs[0];

  function setTab(t: "ai-brief" | "issues" | "artefacts") {
    dispatch({ type: "NAVIGATE", screen: { ...state.screen, projectTab: t } });
  }

  const vendorFlag = state.flags.find((f) => f.id === "flag-vendor-new");
  const vendorFlagAwaiting = vendorFlag?.status === "awaiting-review";

  const projectArtefacts = state.artefacts.filter((a) => a.projectId === projectId);

  // Project Issues filters are local and scoped to this project instance — they never
  // read from or write to Home's global filters, and reset fresh whenever a different
  // project is opened (Screen2Project is remounted via a projectId-based key in App.tsx).
  const [projectFilters, setProjectFilters] = useState<FilterValues>(DEFAULT_PROJECT_FILTERS);

  const keyword = projectFilters.keyword.trim().toLowerCase();
  function matchesKeyword(f: Flag) {
    if (!keyword) return true;
    const haystack = [f.title, f.projectId, f.team, f.documentTitle, f.feature, f.category].join(" ").toLowerCase();
    return haystack.includes(keyword);
  }
  function matchesShow(f: Flag) {
    if (projectFilters.show === "all") return true;
    if (projectFilters.show === "legal") return f.status !== "logged";
    return f.status === "logged";
  }
  const projectFlags = state.flags.filter((f) => f.projectId === projectId && matchesKeyword(f) && matchesShow(f));
  const liveFlags = projectFlags
    .filter((f) => f.status === "awaiting-review" || f.status === "comprehensive-review")
    .sort((a, b) => (a.urgency === b.urgency ? 0 : a.urgency === "urgent" ? -1 : 1));
  const resolvedFlags = projectFlags.filter((f) => f.status === "resolved");
  const loggedFlags = projectFlags.filter((f) => f.status === "logged");

  const groupBy = projectFilters.groupBy;
  const isGrouped = groupBy === "department" || groupBy === "feature" || groupBy === "document";

  function groupKey(f: Flag) {
    if (groupBy === "department") return f.team;
    if (groupBy === "feature") return f.feature;
    if (groupBy === "document") return f.documentTitle;
    return "";
  }

  function groupedIssuesView() {
    const all = [...liveFlags, ...resolvedFlags, ...loggedFlags];
    const groups = new Map<string, Flag[]>();
    for (const f of all) {
      const key = groupKey(f);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(f);
    }
    if (groups.size === 0) return <EmptyState>No flags match</EmptyState>;
    return (
      <div>
        {[...groups.entries()].map(([key, items]) => (
          <div key={key} className="section-block">
            <div className="section-label">
              {key} ({items.length})
            </div>
            <IssueTable
              liveFlags={items.filter((f) => f.status === "awaiting-review" || f.status === "comprehensive-review")}
              resolvedFlags={items.filter((f) => f.status === "resolved")}
              loggedFlags={items.filter((f) => f.status === "logged")}
              returnTo={{ name: "project", projectId, projectTab: "issues" }}
            />
          </div>
        ))}
      </div>
    );
  }

  const comparison = projectId === "A" ? COMPARISON_A : null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{project.name}</h1>
          <div className="page-header-meta">
            <span>{project.defaultTeam}</span>
            <span>·</span>
            <span>{project.feature}</span>
            <span>·</span>
            <span className="badge badge-neutral">Active</span>
            <span>·</span>
            <span>{live} live</span>
            <span>·</span>
            <span>{resolved} resolved</span>
            <span>·</span>
            <span>{projectArtefacts.length} artefacts</span>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${tab === "ai-brief" ? "active" : ""}`} onClick={() => setTab("ai-brief")}>
          ✦ AI brief
        </button>
        <button className={`tab ${tab === "issues" ? "active" : ""}`} onClick={() => setTab("issues")}>
          Issues
        </button>
        <button className={`tab ${tab === "artefacts" ? "active" : ""}`} onClick={() => setTab("artefacts")}>
          Artefacts
        </button>
      </div>

      {tab === "ai-brief" && (
        <div>
          <div className="notice section-block">
            <span className="notice-icon">i</span>
            <div>
              <strong style={{ fontWeight: 600 }}>Where to start</strong>
              <div style={{ marginTop: 3 }}>{WHERE_TO_START[projectId] ?? "Review the submitted document against the approval artefacts."}</div>
            </div>
          </div>

          {projectDocs.length > 0 ? (
            <>
              <div className="flex-row gap-10" style={{ marginBottom: 4, justifyContent: "space-between" }}>
                <div className="flex-row gap-10">
                  <select
                    className="select"
                    style={{ maxWidth: 280 }}
                    value={selectedDocId}
                    onChange={(e) => setSelectedDocId(e.target.value)}
                  >
                    {projectDocs.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title}
                      </option>
                    ))}
                  </select>
                  {selectedDoc && docStatusBadge(selectedDoc.statusLabel)}
                </div>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12 }}>
                  View full document
                </a>
              </div>

              <div className="ai-disclaimer">
                AI-generated from the submitted document. Check it against the original. It does not recommend a
                decision.
              </div>

              <div className="section-block">
                <div className="section-label">What the document says</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7 }}>
                  {(DOC_BULLETS[projectId] ?? [selectedDoc?.summary ?? ""]).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              {comparison && (
                <div className="section-block">
                  <div className="section-label">Compared with what Legal approved</div>
                  <table className="compare-table">
                    <thead>
                      <tr>
                        <th>Fact</th>
                        <th>Approved</th>
                        <th>In this document</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.map((row) => (
                        <tr key={row.fact}>
                          <td className="fact-name">{row.fact}</td>
                          <td className="cell-secondary">{row.approved}</td>
                          <td className="cell-secondary">{row.inDoc}</td>
                          <td>
                            <span className={statusTagClass(row.status)}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <EmptyState>No documents submitted yet for this project.</EmptyState>
          )}
        </div>
      )}

      {tab === "issues" && (
        <div>
          <FilterBar
            filters={projectFilters}
            onChange={(patch) => setProjectFilters((prev) => ({ ...prev, ...patch }))}
          />
          {isGrouped ? (
            groupedIssuesView()
          ) : (
            <IssueTable
              liveFlags={liveFlags}
              resolvedFlags={resolvedFlags}
              loggedFlags={loggedFlags}
              returnTo={{ name: "project", projectId, projectTab: "issues" }}
            />
          )}
        </div>
      )}

      {tab === "artefacts" && (
        <div>
          <div className="section-label">Legal reference library</div>
          {projectArtefacts.length === 0 ? (
            <EmptyState>No artefacts recorded for this project.</EmptyState>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Artefact</th>
                  <th>Date</th>
                  <th>Relevance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {projectArtefacts.map((a) => {
                  const { title, date } = parseArtefact(a.name);
                  return (
                    <tr key={a.id}>
                      <td className="cell-title">{title}</td>
                      <td className="cell-tertiary">{date ?? "—"}</td>
                      <td className="cell-secondary">Relied on: {a.reliedOn.join(", ")}</td>
                      <td>
                        {a.linkedFlagCategory === "Vendor change" && vendorFlagAwaiting && (
                          <span className="badge badge-urgent">
                            <span className="badge-dot" />1 flag affects this
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
