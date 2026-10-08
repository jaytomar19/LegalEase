export type Team = "Engineering" | "Product management" | "Design";

export type Category =
  | "Vendor change"
  | "Data kept longer"
  | "Training"
  | "Default setting"
  | "Generated content"
  | "Data category"
  | "Jurisdiction"
  | "No legal category";

export type Urgency = "urgent" | "later";

export type FlagStatus =
  | "awaiting-review"
  | "resolved"
  | "comprehensive-review"
  | "logged";

export type Outcome = "approved" | "changes-required" | "comprehensive-review";

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  people: number;
  avatars: string[];
  defaultTeam: Team;
  feature: string;
  approvalExists: boolean;
};

export type ChangeDocument = {
  id: string;
  projectId: string;
  title: string;
  team: Team;
  feature: string;
  plannedDate: string;
  summary: string;
  fileName?: string;
  createdAt: string;
  statusLabel: string; // e.g. "Live · urgent", "Resolved", "Logged"
};

export type Flag = {
  id: string;
  title: string;
  projectId: string;
  team: Team;
  documentId: string;
  documentTitle: string;
  feature: string;
  category: Category;
  urgency: Urgency;
  status: FlagStatus;
  outcome?: Outcome;
  confidence?: number;
  date: string;
  isNew?: boolean;
  ticketId?: string;
  assignee?: "Senior Counsel" | "Privacy team";
  requiredChanges?: { id: string; text: string; checked: boolean }[];
  note?: string;
  audit?: AuditEntry[];
};

export type Artefact = {
  id: string;
  projectId: string;
  name: string;
  reliedOn: string[];
  linkedFlagCategory?: Category;
};

export type TrackingStatus = "not-submitted" | "waiting";

export type TrackingItem = {
  id: string;
  sourceType: "Slack" | "Jira";
  source: string;
  projectId: string;
  team: Team;
  date: string;
  snippet: string;
  possibleCategory: Category;
  confidence?: number;
  status: TrackingStatus;
  requestedDate?: string;
};

export type Ticket = {
  id: string;
  flagId: string;
};

export type NotificationKind = "urgent" | "later" | "resolved";

export type Notification = {
  id: string;
  kind: NotificationKind;
  category: string;
  projectId: string;
  title: string;
  team: Team;
  time: string;
  unread: boolean;
  flagId?: string;
};

export type AuditEntry = {
  time: string;
  action: string;
};

export type Role = "magfi" | Team;

export type GroupBy = "department" | "feature" | "document" | "ai-tracking" | null;
export type ShowFilter = "all" | "legal" | "non-legal";

export type DecisionChoice = "approved" | "comprehensive-review" | "changes-required" | null;

export type ScreenName =
  | "submit"
  | "submitting"
  | "home"
  | "project"
  | "flag"
  | "decision-sent"
  | "team-response"
  | "tickets"
  | "projects"
  | "settings";

export type ScreenState = {
  name: ScreenName;
  projectId?: string;
  flagId?: string;
  projectTab?: "legal-review" | "changes" | "documents" | "timeline" | "ai-brief" | "issues" | "artefacts";
  // Where to return to when the Flag Detail panel (screen "flag") is closed.
  // Defaults to Home when not set.
  returnTo?: { name: ScreenName; projectId?: string; projectTab?: "legal-review" | "changes" | "documents" | "timeline" | "ai-brief" | "issues" | "artefacts" };
};

export type SubmissionResult =
  | { kind: "vendor-flag"; projectId: string; feature: string; team: Team }
  | { kind: "no-flag"; projectId: string; feature: string; team: Team }
  | { kind: "no-approval"; projectId: string; feature: string; team: Team }
  | null;
