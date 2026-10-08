import { useStore } from "../state/store";
import { NotificationBell } from "./NotificationBell";

function contextTitle(state: ReturnType<typeof useStore>["state"]): string {
  const screen = state.screen;
  const effective = screen.name === "flag" ? screen.returnTo ?? { name: "home" as const } : screen;

  if (effective.name === "tickets") return "Tickets";
  if (effective.name === "decision-sent") {
    const flag = state.flags.find((f) => f.id === screen.flagId);
    const project = flag ? state.projects.find((p) => p.id === flag.projectId) : undefined;
    return project?.name ?? "Decision sent";
  }
  if (effective.name === "project") {
    const project = state.projects.find((p) => p.id === effective.projectId);
    return project?.name ?? "Project";
  }
  if (state.filters.groupBy === "ai-tracking") return "AI Tracking";
  return "Overview";
}

export function TopBar() {
  const store = useStore();
  const { state } = store;

  return (
    <div className="main-topbar">
      <div className="main-topbar-context">{contextTitle(state)}</div>
      <NotificationBell />
    </div>
  );
}
