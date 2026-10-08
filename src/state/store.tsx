import { createContext, useContext, useReducer, type ReactNode } from "react";
import type {
  Project,
  ChangeDocument,
  Flag,
  Artefact,
  TrackingItem,
  Notification,
  Role,
  GroupBy,
  ShowFilter,
  ScreenState,
  SubmissionResult,
  Team,
} from "../types";
import {
  PROJECTS,
  INITIAL_DOCUMENTS,
  INITIAL_FLAGS,
  INITIAL_ARTEFACTS,
  INITIAL_TRACKING_ITEMS,
  INITIAL_NOTIFICATIONS,
} from "../data/seed";

export type AppState = {
  projects: Project[];
  documents: ChangeDocument[];
  flags: Flag[];
  artefacts: Artefact[];
  trackingItems: TrackingItem[];
  notifications: Notification[];
  role: Role;
  screen: ScreenState;
  history: ScreenState[];
  filters: { show: ShowFilter; groupBy: GroupBy; keyword: string };
  submissionResult: SubmissionResult;
  trackingBadgeBase: number;
  darkMode: boolean;
};

function createInitialState(): AppState {
  return {
    projects: PROJECTS.map((p) => ({ ...p, avatars: [...p.avatars] })),
    documents: INITIAL_DOCUMENTS.map((d) => ({ ...d })),
    flags: INITIAL_FLAGS.map((f) => ({ ...f })),
    artefacts: INITIAL_ARTEFACTS.map((a) => ({ ...a, reliedOn: [...a.reliedOn] })),
    trackingItems: INITIAL_TRACKING_ITEMS.map((t) => ({ ...t })),
    notifications: INITIAL_NOTIFICATIONS.map((n) => ({ ...n })),
    role: "magfi",
    screen: { name: "home" },
    history: [],
    filters: { show: "all", groupBy: null, keyword: "" },
    submissionResult: null,
    trackingBadgeBase: 3,
    darkMode: false,
  };
}

type Action =
  | { type: "RESET" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_ROLE"; role: Role }
  | { type: "NAVIGATE"; screen: ScreenState }
  | { type: "GO_BACK" }
  | { type: "SET_FILTERS"; filters: Partial<AppState["filters"]> }
  | { type: "TOGGLE_GROUP_BY"; groupBy: GroupBy }
  | { type: "SET_GROUP_BY"; groupBy: GroupBy }
  | {
      type: "SUBMIT_CHANGE";
      payload: {
        projectId: string;
        team: Team;
        documentTitle: string;
        feature: string;
        plannedDate: string;
        summary: string;
        fileName: string;
      };
    }
  | { type: "ADD_PROJECT"; id: string; name: string; description: string }
  | { type: "MARK_ALL_READ" }
  | {
      type: "CONFIRM_DECISION";
      flagId: string;
      outcome: "approved" | "changes-required" | "comprehensive-review";
      note: string;
      assignee?: "Senior Counsel" | "Privacy team";
      requiredChanges?: string[];
    }
  | { type: "DISMISS_SUBMISSION_RESULT" }
  | { type: "ASK_TEAM_SUBMIT"; trackingId: string }
  | { type: "NOT_A_CHANGE"; trackingId: string };

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "RESET":
      return createInitialState();

    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "SET_ROLE":
      return { ...state, role: action.role };

    case "NAVIGATE": {
      const isSame =
        state.screen.name === action.screen.name &&
        state.screen.projectId === action.screen.projectId &&
        state.screen.flagId === action.screen.flagId;
      const newHistory = isSame ? state.history : [...state.history, state.screen];
      return { ...state, screen: action.screen, history: newHistory };
    }

    case "GO_BACK": {
      if (state.history.length === 0) return state;
      const prevScreen = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);
      return { ...state, screen: prevScreen, history: newHistory };
    }

    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.filters } };

    case "TOGGLE_GROUP_BY": {
      const next = state.filters.groupBy === action.groupBy ? null : action.groupBy;
      return { ...state, filters: { ...state.filters, groupBy: next } };
    }

    case "SET_GROUP_BY":
      return { ...state, filters: { ...state.filters, groupBy: action.groupBy } };

    case "ADD_PROJECT": {
      const id = action.id;
      const newProject: Project = {
        id,
        name: action.name,
        subtitle: action.description || action.name,
        people: 1,
        avatars: ["+1"],
        defaultTeam: "Engineering",
        feature: "",
        approvalExists: false,
      };
      return { ...state, projects: [...state.projects, newProject] };
    }

    case "SUBMIT_CHANGE": {
      const { projectId, team, documentTitle, feature, plannedDate, summary, fileName } =
        action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (!project) return state;

      const docId = `doc-submit-${Date.now()}`;
      const newDoc: ChangeDocument = {
        id: docId,
        projectId,
        title: documentTitle,
        team,
        feature,
        plannedDate,
        summary,
        fileName,
        createdAt: "today",
        statusLabel: "Logged",
      };

      // Project A: creates the vendor-change flag (primary demo path)
      if (projectId === "A") {
        const alreadyCreated = state.flags.some((f) => f.id === "flag-vendor-new");
        if (alreadyCreated) {
          return {
            ...state,
            submissionResult: { kind: "no-flag", projectId, feature, team },
          };
        }
        const newFlag: Flag = {
          id: "flag-vendor-new",
          title: "Chatbot moves to a different model vendor",
          projectId: "A",
          team: "Engineering",
          documentId: docId,
          documentTitle,
          feature: "Support chatbot",
          category: "Vendor change",
          urgency: "urgent",
          status: "awaiting-review",
          confidence: 87,
          date: "today",
          isNew: true,
          audit: [
            { time: nowTime(), action: "Engineering submitted the change document" },
            {
              time: nowTime(),
              action: "Agent read it and flagged a vendor change, 87% confidence",
            },
          ],
        };
        const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          kind: "urgent",
          category: "Vendor change",
          projectId: "A",
          title: newFlag.title,
          team: "Engineering",
          time: "today",
          unread: true,
          flagId: newFlag.id,
        };
        return {
          ...state,
          documents: [...state.documents, { ...newDoc, statusLabel: "Live · urgent" }],
          flags: [newFlag, ...state.flags],
          notifications: [newNotification, ...state.notifications],
          submissionResult: { kind: "vendor-flag", projectId, feature, team },
        };
      }

      // New project with no approval on record
      if (!project.approvalExists) {
        const alreadyLogged = state.documents.some(
          (d) => d.projectId === projectId && d.title === documentTitle
        );
        return {
          ...state,
          documents: alreadyLogged ? state.documents : [...state.documents, newDoc],
          submissionResult: { kind: "no-approval", projectId, feature, team },
        };
      }

      // Projects B-E sample documents: checked, no flag raised.
      // Resubmitting the same document title for the same project is just
      // re-checked, not logged again, to avoid piling up duplicate entries.
      const alreadyLogged = state.documents.some(
        (d) => d.projectId === projectId && d.title === documentTitle
      );
      return {
        ...state,
        documents: alreadyLogged ? state.documents : [...state.documents, newDoc],
        submissionResult: { kind: "no-flag", projectId, feature, team },
      };
    }

    case "MARK_ALL_READ": {
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, unread: false })),
      };
    }

    case "CONFIRM_DECISION":
      return confirmDecision(state, action);

    case "DISMISS_SUBMISSION_RESULT":
      return { ...state, submissionResult: null };

    case "ASK_TEAM_SUBMIT": {
      return {
        ...state,
        trackingItems: state.trackingItems.map((t) =>
          t.id === action.trackingId
            ? { ...t, status: "waiting", requestedDate: `Requested from ${t.team} · today` }
            : t
        ),
      };
    }

    case "NOT_A_CHANGE": {
      return {
        ...state,
        trackingItems: state.trackingItems.filter((t) => t.id !== action.trackingId),
      };
    }

    default:
      return state;
  }
}

function confirmDecision(
  state: AppState,
  action: {
    type: "CONFIRM_DECISION";
    flagId: string;
    outcome: "approved" | "changes-required" | "comprehensive-review";
    note: string;
    assignee?: "Senior Counsel" | "Privacy team";
    requiredChanges?: string[];
  }
): AppState {
  const { flagId, outcome, note, assignee, requiredChanges } = action;
  const flag = state.flags.find((f) => f.id === flagId);
  if (!flag) return state;

  // A flag can only be decided once. A second CONFIRM_DECISION on the same flag
  // (e.g. a duplicate dispatch) is a no-op rather than duplicating the audit
  // trail, the resolved notification, or the ticket.
  if (flag.status !== "awaiting-review") return state;

  const decisionTime = nowTime();
  const auditBase = flag.audit ?? [];
  const auditOpened = [...auditBase, { time: decisionTime, action: "Magfi opened the flag" }];

  let updatedFlag: Flag;
  let newNotification: Notification | null = null;

  if (outcome === "comprehensive-review") {
    updatedFlag = {
      ...flag,
      status: "comprehensive-review",
      outcome: "comprehensive-review",
      ticketId: "LEGAL-212",
      assignee,
      note,
      isNew: false,
      audit: [
        ...auditOpened,
        { time: decisionTime, action: `Magfi decided: comprehensive review` },
        { time: decisionTime, action: `Ticket LEGAL-212 created for ${assignee}` },
      ],
    };
  } else {
    updatedFlag = {
      ...flag,
      status: "resolved",
      outcome,
      note,
      isNew: false,
      requiredChanges: requiredChanges?.map((text, i) => ({
        id: `rc-${i}`,
        text,
        checked: true,
      })),
      audit: [
        ...auditOpened,
        {
          time: decisionTime,
          action: `Magfi decided: ${outcome === "approved" ? "Approved, go ahead" : "Changes required"}`,
        },
        { time: decisionTime, action: "Sent back to Engineering" },
      ],
    };
    const outcomeLabel = outcome === "approved" ? "Approved, go ahead" : "Changes required";
    newNotification = {
      id: `notif-resolved-${Date.now()}`,
      kind: "resolved",
      category: flag.category,
      projectId: flag.projectId,
      title: `${flag.documentTitle} sent back to ${flag.team} · ${outcomeLabel}`,
      team: flag.team,
      time: "today",
      unread: false,
      flagId: flag.id,
    };
  }

  const notifications = state.notifications
    .map((n) => (n.flagId === flagId ? { ...n, unread: false } : n))
    .concat(newNotification ? [newNotification] : []);

  return {
    ...state,
    flags: state.flags.map((f) => (f.id === flagId ? updatedFlag : f)),
    notifications,
  };
}

const StoreContext = createContext<
  { state: AppState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

// ---- Derived selectors ----

export function getBellCount(state: AppState): number {
  return state.notifications.filter((n) => n.unread && n.kind !== "resolved").length;
}

export function getProjectCounts(state: AppState, projectId: string) {
  const projectFlags = state.flags.filter((f) => f.projectId === projectId);
  const live = projectFlags.filter(
    (f) => f.status === "awaiting-review" || f.status === "comprehensive-review"
  ).length;
  const resolved = projectFlags.filter((f) => f.status === "resolved").length;
  const hasUrgentLive = projectFlags.some(
    (f) =>
      (f.status === "awaiting-review" || f.status === "comprehensive-review") &&
      f.urgency === "urgent"
  );
  return { live, resolved, hasUrgentLive };
}

export function getTrackingBadgeCount(state: AppState): number {
  return state.trackingItems.filter((t) => t.status === "not-submitted").length;
}
