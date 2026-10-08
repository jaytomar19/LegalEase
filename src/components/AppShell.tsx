import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-outer">
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
