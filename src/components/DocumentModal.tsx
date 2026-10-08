import { type ReactNode } from "react";

export type DocumentModalData = {
  title: string;
  date?: string;
  type?: string;
  status?: string;
  summary?: string;
  sections?: { title: string; content: string | ReactNode }[];
  fileUrl?: string;
};

export function DocumentModal({
  doc,
  onClose,
}: {
  doc: DocumentModalData | null;
  onClose: () => void;
}) {
  if (!doc) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container doc-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="doc-modal-title-wrap">
            <span className="doc-modal-icon">📄</span>
            <div>
              <h2 className="modal-title">{doc.title}</h2>
              <div className="modal-sub">
                {doc.date && <span>Last modified: {doc.date}</span>}
                {doc.type && <span> · {doc.type}</span>}
                {doc.status && <span className="doc-status-chip"> · {doc.status}</span>}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {doc.summary && (
            <div className="doc-summary-box mb-20">
              <strong style={{ display: "block", marginBottom: 4, color: "var(--text-main)" }}>
                Executive Summary
              </strong>
              <div>{doc.summary}</div>
            </div>
          )}

          <div className="doc-sections-list">
            {(doc.sections || [
              {
                title: "1. Overview & Purpose",
                content:
                  "This document outlines the technical architecture, data flow safeguards, vendor agreements, and operational policies governing the project.",
              },
              {
                title: "2. Data Privacy & Handling",
                content:
                  "All user prompts, uploaded files, and contextual metadata are encrypted in transit and at rest. No customer data is utilized for third-party model training.",
              },
              {
                title: "3. Retention & Access Controls",
                content:
                  "Data retention is hard-capped at 30 days unless explicitly extended under legal hold or security audit requirements.",
              },
            ]).map((sec, idx) => (
              <div key={idx} className="doc-section-card">
                <h3 className="doc-section-title">{sec.title}</h3>
                <div className="doc-section-content">{sec.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-modal-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-modal-primary" onClick={() => alert(`Downloading ${doc.title}...`)}>
            📥 Download Document
          </button>
        </div>
      </div>
    </div>
  );
}
