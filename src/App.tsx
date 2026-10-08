import type { ReactNode } from "react";
import type { ScreenState } from "./types";
import { useStore } from "./state/store";
import { AppShell } from "./components/AppShell";
import { Screen0Submit } from "./screens/Screen0Submit";
import { Screen1Home } from "./screens/Screen1Home";
import { Screen2Project } from "./screens/Screen2Project";
import { Screen3FlagDetail } from "./screens/Screen3FlagDetail";
import { Screen4DecisionSent } from "./screens/Screen4DecisionSent";
import { Screen5TeamResponse } from "./screens/Screen5TeamResponse";
import { Screen6Tickets } from "./screens/Screen6Tickets";

function SubmittingTransition() {
  const { state } = useStore();
  const result = state.submissionResult;
  const project = result ? state.projects.find((p) => p.id === result.projectId) : undefined;
  return (
    <div className="full-screen-center">
      <div className="confirmation-state">
        <div className="confirmation-icon">✓</div>
        <h1 className="page-title" style={{ marginBottom: 8 }}>
          Submitted
        </h1>
        <div className="text-secondary" style={{ fontSize: 13 }}>
          {project?.name} · {result?.feature} · {result?.team}. Legal's agent is checking it. Switching to
          Magfi's view.
        </div>
      </div>
    </div>
  );
}

function renderMagfiScreen(screen: ScreenState): ReactNode {
  switch (screen.name) {
    case "project":
      return <Screen2Project key={screen.projectId} screen={screen} />;
    case "tickets":
      return <Screen6Tickets />;
    case "decision-sent":
      return <Screen4DecisionSent />;
    case "home":
    default:
      return <Screen1Home />;
  }
}

export default function App() {
  const { state } = useStore();
  const screen = state.screen.name;

  if (screen === "submit") return <Screen0Submit />;
  if (screen === "submitting") return <SubmittingTransition />;
  if (screen === "team-response") return <Screen5TeamResponse />;

  // While the Flag Detail panel is open, the background behind it is whatever
  // screen the panel was opened from (its "returnTo"), not always Home.
  const backgroundScreen: ScreenState =
    screen === "flag" ? state.screen.returnTo ?? { name: "home" } : state.screen;

  return (
    <>
      <AppShell>{renderMagfiScreen(backgroundScreen)}</AppShell>
      {screen === "flag" && <Screen3FlagDetail />}
    </>
  );
}
