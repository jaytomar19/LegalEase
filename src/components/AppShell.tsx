import type { ReactNode } from "react";
import { useStore } from "../state/store";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  const { state } = useStore();

  return (
    <div className={`app-outer ${state.darkMode ? "dark-mode" : ""}`}>
      <div className="prototype-top-bar">
        <div className="prototype-left">
          <span className="prototype-sparkle">✦</span>
          <span className="prototype-ai-text">AI</span>
        </div>
        <div className="prototype-center">
          <span>FlagWise web-app prototype</span>
          <span className="prototype-chevron">∨</span>
        </div>
        <div className="prototype-right">
          <button className="prototype-icon-btn">◯</button>
          <button className="prototype-icon-btn">?</button>
          <button className="prototype-share-btn">Share</button>
        </div>
      </div>
      <div className="app-workspace">
        <Sidebar />
        <div className="app-main-column">
          <TopBar />
          <div className="app-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
