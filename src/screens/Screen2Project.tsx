import { useState } from "react";
import { useStore } from "../state/store";
import type { ScreenState } from "../types";
import { DocumentModal, type DocumentModalData } from "../components/DocumentModal";

export function Screen2Project({ screen }: { screen: Pick<ScreenState, "projectId" | "projectTab"> }) {
  const { state, dispatch } = useStore();
  const projectId = screen.projectId ?? "C";
  const project = state.projects.find((p) => p.id === projectId) ?? state.projects[0];
  const [activeDoc, setActiveDoc] = useState<DocumentModalData | null>(null);

  // Tab state: default to legal-review
  const tab = screen.projectTab ?? "legal-review";

  function setTab(t: "legal-review" | "changes" | "documents" | "timeline") {
    dispatch({ type: "NAVIGATE", screen: { ...state.screen, projectTab: t } });
  }

  // Clean Project Titles
  let projectName = project.name;
  if (projectId === "C" || project.name === "AI Prototyping" || project.name === "Lumen Compose") projectName = "AI Prototyping";
  else if (projectId === "A" || project.name === "AI Assistant" || project.name === "Lumen Assist") projectName = "AI Assistant";
  else if (projectId === "S" || project.name === "Website Publishing" || project.name === "Lumen Sites") projectName = "Website Publishing";
  else if (projectId === "B" || project.name === "Brand Assets" || project.name === "Lumen Brand") projectName = "Brand Assets";
  else if (projectId === "W" || project.name === "Image and Video" || project.name === "Lumen Weave") projectName = "Image and Video";

  const projectInitial = projectName.charAt(0) || "A";
  const projectDesc = project.subtitle || "AI prototyping and code generation.";

  function openDocument(title: string, date?: string, status?: string) {
    setActiveDoc({
      title,
      date: date || "2026",
      status: status || "Approved Baseline",
      type: "Legal Document",
      summary: `Official project document (${title}) setting baseline conditions and legal requirements for ${projectName}.`,
      sections: [
        {
          title: "1. Executive Summary & Purpose",
          content: `This document records the reviewed legal parameters, approved boundaries, and vendor arrangements for ${projectName}.`,
        },
        {
          title: "2. Approved Technical Specifications",
          content: "Vendor provider set to Vendor A. All model invocations pass through enterprise encryption with strict non-training clauses.",
        },
        {
          title: "3. Compliance & Data Governance",
          content: "Data retention is enforced at 30 days maximum. Jurisdiction is strictly limited to authorized US & EU data centers.",
        },
      ],
    });
  }

  return (
    <div className="project-detail-screen">
      {/* Modal for viewing documents */}
      <DocumentModal doc={activeDoc} onClose={() => setActiveDoc(null)} />

      {/* Breadcrumb */}
      <div className="project-breadcrumb-row">
        <button
          className="btn-breadcrumb"
          onClick={() => dispatch({ type: "NAVIGATE", screen: { name: "projects" } })}
        >
          Projects &lt;
        </button>
      </div>

      {/* Main Project Card Header */}
      <div className="project-detail-header-card">
        <div className="project-header-left">
          <span className="project-detail-avatar">
            {projectInitial}
          </span>
          <div className="project-detail-titles">
            <h1 className="project-detail-name">{projectName}</h1>
            <div className="project-detail-desc">{projectDesc}</div>
            <div className="project-detail-owner">Owner Sarah Chen · Product</div>
          </div>
        </div>

        <div className="project-header-right">
          <span className="project-status-pill pill-at-risk">
            ⏱ At risk, 2 open items
          </span>
        </div>
      </div>

      {/* Sub-nav Tabs */}
      <div className="project-nav-tabs">
        <button
          className={`project-nav-tab ${tab === "legal-review" || tab === "ai-brief" ? "active" : ""}`}
          onClick={() => setTab("legal-review")}
        >
          Legal Review
        </button>
        <button
          className={`project-nav-tab ${tab === "changes" ? "active" : ""}`}
          onClick={() => setTab("changes")}
        >
          Changes
        </button>
        <button
          className={`project-nav-tab ${tab === "documents" ? "active" : ""}`}
          onClick={() => setTab("documents")}
        >
          Documents
        </button>
        <button
          className={`project-nav-tab ${tab === "timeline" ? "active" : ""}`}
          onClick={() => setTab("timeline")}
        >
          Timeline
        </button>
      </div>

      {/* TAB 1: Legal Review */}
      {(tab === "legal-review" || tab === "ai-brief") && (
        <div className="tab-content-legal-review">
          {/* Notice / Callout */}
          <div className="pink-callout-banner">
            <div className="callout-icon">ⓘ</div>
            <div className="callout-text">
              <strong className="callout-heading">
                Potential re-review trigger: AI provider changed since approval
              </strong>
              <div className="callout-sub">
                Review the detected change and its relationship to the approved baseline.
              </div>
            </div>
          </div>

          {/* Approved Baseline Card */}
          <div className="project-white-card mb-20">
            <div className="card-top-row">
              <div>
                <div className="card-overline-text">APPROVED BASELINE</div>
                <h2 className="card-heading-title">Legal's reviewed position</h2>
                <div className="card-heading-sub">
                  What Legal previously reviewed and approved, including the facts, assumptions and conditions supporting the decision.
                </div>
              </div>
              <button className="btn-view-memo-outline" onClick={() => openDocument("Legal review memo", "24 Sep 2026", "Approved Baseline")}>
                📄 View Legal memo
              </button>
            </div>

            <div className="green-baseline-status-bar">
              <span className="pill-approved-baseline">
                ✓ Approved: Baseline v1, 24 Sep 2026
              </span>
              <a href="#" className="baseline-history-link" onClick={(e) => { e.preventDefault(); openDocument("Baseline History v1", "24 Sep 2026"); }}>
                Baseline history &gt;
              </a>
            </div>

            {/* Subsection: Key facts as approved */}
            <div className="card-section-block">
              <div className="section-block-label">Key facts as approved</div>
              <table className="facts-data-table">
                <tbody>
                  <tr>
                    <td className="fact-col-label">AI model/provider</td>
                    <td className="fact-col-val">Vendor A</td>
                    <td className="fact-col-source">
                      <a href="#" onClick={(e) => { e.preventDefault(); openDocument("Vendor A DPA", "18 Sep 2026"); }}>📄 Source</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="fact-col-label">Data types</td>
                    <td className="fact-col-val">User prompts, designs, files, metadata</td>
                    <td className="fact-col-source">
                      <a href="#" onClick={(e) => { e.preventDefault(); openDocument("PRD v3.1 Data Specification", "15 Sep 2026"); }}>📄 Source</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subsection: Key conditions as approved */}
            <div className="card-section-block">
              <table className="conditions-data-table">
                <tbody>
                  <tr>
                    <td className="condition-check-text">✓ No customer data used for model training.</td>
                    <td className="condition-dept-col">Product</td>
                    <td className="condition-status-col"><span className="pill-active-green">Active</span></td>
                  </tr>
                  <tr>
                    <td className="condition-check-text">✓ Retention must remain at 30 days or less.</td>
                    <td className="condition-dept-col">Engineering</td>
                    <td className="condition-status-col"><span className="pill-active-green">Active</span></td>
                  </tr>
                  <tr>
                    <td className="condition-check-text">✓ Jurisdiction limited to approved regions.</td>
                    <td className="condition-dept-col">Legal</td>
                    <td className="condition-status-col"><span className="pill-active-green">Active</span></td>
                  </tr>
                  <tr>
                    <td className="condition-check-text">ⓘ Update privacy notice for new data category.</td>
                    <td className="condition-dept-col">Product</td>
                    <td className="condition-status-col"><span className="pill-pending-yellow">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Subsection: Sources */}
            <div className="card-section-block">
              <div className="section-block-label" style={{ marginBottom: 8 }}>Sources</div>
              <div className="sources-chips-row">
                <span className="source-chip-btn" style={{ cursor: "pointer" }} onClick={() => openDocument("Legal review memo", "24 Sep 2026")}>📄 Legal review memo · 24 Sep 2026</span>
                <span className="source-chip-btn" style={{ cursor: "pointer" }} onClick={() => openDocument("PRD v3.1", "15 Sep 2026")}>📄 PRD v3.1</span>
                <span className="source-chip-btn" style={{ cursor: "pointer" }} onClick={() => openDocument("Vendor A DPA", "18 Sep 2026")}>📄 Vendor A DPA</span>
                <span className="source-chip-btn" style={{ cursor: "pointer" }} onClick={() => openDocument("Security assessment", "20 Sep 2026")}>📄 Security assessment</span>
                <span className="source-chip-btn" style={{ cursor: "pointer" }} onClick={() => openDocument("Privacy assessment", "22 Sep 2026")}>📄 Privacy assessment</span>
              </div>
            </div>
          </div>

          {/* Open Issues Card */}
          <div className="project-white-card">
            <div className="open-issues-card-header">
              <h2 className="card-heading-title" style={{ marginBottom: 0 }}>Open issues</h2>
              <span className="items-count-text">2 items</span>
            </div>

            <div className="open-issues-list">
              <div className="issue-row-card">
                <div>
                  <span className="pill-risk-high">High</span>
                  <div className="issue-row-title">AI provider changed from Vendor A to Vendor B</div>
                  <div className="issue-row-meta">Affects AI model/provider</div>
                </div>
                <button
                  className="link-open-ticket-btn"
                  onClick={() =>
                    dispatch({
                      type: "NAVIGATE",
                      screen: { name: "flag", flagId: "flag-1042", returnTo: { name: "project", projectId, projectTab: "legal-review" } },
                    })
                  }
                >
                  Open ticket &gt;
                </button>
              </div>

              <div className="issue-row-card">
                <div>
                  <span className="pill-risk-medium">Medium</span>
                  <div className="issue-row-title">Retention Increased from 20 to 25 days</div>
                  <div className="issue-row-meta">Affects retention condition</div>
                </div>
                <button
                  className="link-open-ticket-btn"
                  onClick={() =>
                    dispatch({
                      type: "NAVIGATE",
                      screen: { name: "flag", flagId: "flag-1042", returnTo: { name: "project", projectId, projectTab: "legal-review" } },
                    })
                  }
                >
                  Open ticket &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Changes */}
      {tab === "changes" && (
        <div className="project-white-card">
          <h2 className="card-heading-title">Changes</h2>
          <div className="card-heading-sub mb-20">
            Everything that changed in this project, who changed it, when, where it came from, and how it relates to the approved Legal baseline.
          </div>

          <div className="changes-timeline-list">
            {/* Item 1 */}
            <div className="timeline-row-item">
              <div className="timeline-icon-col">
                <span className="icon-sparkle">✦</span>
              </div>
              <div className="timeline-content-col">
                <div className="timeline-item-meta">8 Oct, 10:42 AM · Product</div>
                <div className="timeline-item-title">AI provider changed from Vendor A to Vendor B.</div>
                <div className="timeline-item-sub">Source: PRD v4.2 · Affects: AI model/provider</div>
                <button
                  className="link-ticket-inline"
                  onClick={() =>
                    dispatch({
                      type: "NAVIGATE",
                      screen: { name: "flag", flagId: "flag-1042", returnTo: { name: "project", projectId, projectTab: "changes" } },
                    })
                  }
                >
                  Open #1042 &gt;
                </button>
              </div>
              <div className="timeline-tag-col">
                <span className="tag-re-review-trigger">Potential re-review trigger</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="timeline-row-item">
              <div className="timeline-icon-col">
                <span className="icon-sparkle">✦</span>
              </div>
              <div className="timeline-content-col">
                <div className="timeline-item-meta">7 Oct, 3:21 PM · Engineering</div>
                <div className="timeline-item-title">Retention increased from 20 to 25 days.</div>
                <div className="timeline-item-sub">Source: Jira config change · Affects: retention condition</div>
              </div>
              <div className="timeline-tag-col">
                <span className="tag-low-risk-gray">Low-risk, awaiting your confirmation</span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="timeline-row-item">
              <div className="timeline-icon-col">
                <span className="icon-sparkle">✦</span>
              </div>
              <div className="timeline-content-col">
                <div className="timeline-item-meta">5 Oct, 11:05 AM · Product</div>
                <div className="timeline-item-title">New Slack export integration added.</div>
                <div className="timeline-item-sub">Source: PRD v4.1</div>
              </div>
              <div className="timeline-tag-col">
                <span className="tag-info-needed-yellow">Information needed</span>
              </div>
            </div>

            {/* Item 4 */}
            <div className="timeline-row-item">
              <div className="timeline-icon-col">
                <span className="icon-check-green">✓</span>
              </div>
              <div className="timeline-content-col">
                <div className="timeline-item-meta">24 Sep · Legal</div>
                <div className="timeline-item-title">Baseline v1 approved.</div>
                <div className="timeline-item-sub">Source: Legal memo</div>
              </div>
              <div className="timeline-tag-col">
                <span className="tag-approved-green">Approved baseline</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Documents */}
      {tab === "documents" && (
        <div className="project-white-card">
          <h2 className="card-heading-title">Documents</h2>
          <div className="card-heading-sub mb-20">
            Documents connected to this project and used to prepare Legal context.
          </div>

          <div className="documents-row-list">
            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("PRD v4.2 - Updated 8 Oct", "8 Oct 2026", "Updated PRD")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">PRD v4.2 - Updated 8 Oct</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>

            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("Legal review memo · 24 Sep 2026", "24 Sep 2026", "Legal Memo")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">Legal review memo · 24 Sep 2026</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>

            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("Vendor A DPA · 18 Sep 2026", "18 Sep 2026", "Approved DPA")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">Vendor A DPA · 18 Sep 2026</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>

            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("Security assessment · 20 Sep 2026", "20 Sep 2026", "Security Review")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">Security assessment · 20 Sep 2026</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Timeline */}
      {tab === "timeline" && (
        <div className="project-white-card">
          <h2 className="card-heading-title">Project timeline</h2>
          <div className="card-heading-sub mb-20">
            Decisions, actions, and important project events.
          </div>

          <div className="documents-row-list">
            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("Baseline v1 approved · 24 Sep 2026", "24 Sep 2026", "Approved")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">Baseline v1 approved · 24 Sep 2026</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>

            <div className="doc-list-item" style={{ cursor: "pointer" }} onClick={() => openDocument("Project monitoring started · 20 Sep 2026", "20 Sep 2026", "Active Monitoring")}>
              <div className="doc-item-main">
                <span className="doc-file-icon">📄</span>
                <span className="doc-title-text">Project monitoring started · 20 Sep 2026</span>
              </div>
              <span className="doc-chevron-icon">&gt;</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
