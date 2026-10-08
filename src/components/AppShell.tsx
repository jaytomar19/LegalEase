import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="outer-canvas">
      <div className="app-container">
        <TopBar />
        <div className="app-body">
          <Sidebar />
          <main className="main-content-area">{children}</main>
        </div>
      </div>
    </div>
  );
}
