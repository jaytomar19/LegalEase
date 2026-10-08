import { useEffect, useRef, useState } from "react";
import { getBellCount, useStore } from "../state/store";
import { CategoryTag } from "./Tags";

export function NotificationBell() {
  const { state, dispatch } = useStore();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bellCount = getBellCount(state);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const sorted = [...state.notifications].sort((a, b) => {
    const order = { urgent: 0, later: 1, resolved: 2 };
    return order[a.kind] - order[b.kind];
  });

  function openNotification(n: (typeof state.notifications)[number]) {
    setOpen(false);
    // Opening a flag from here should return to wherever the bell was opened from.
    const currentScreen = state.screen;
    if (n.flagId) {
      const flag = state.flags.find((f) => f.id === n.flagId);
      if (flag?.category === "Vendor change" && flag.id === "flag-vendor-new") {
        dispatch({
          type: "NAVIGATE",
          screen: { name: "flag", flagId: flag.id, returnTo: currentScreen },
        });
        return;
      }
    }
    dispatch({
      type: "NAVIGATE",
      screen: { name: "project", projectId: n.projectId, projectTab: "ai-brief" },
    });
  }

  return (
    <div className="bell-wrap" ref={wrapRef}>
      <button className="bell-btn" onClick={() => setOpen((o) => !o)}>
        ◔
        {bellCount > 0 && <span className="bell-count">{bellCount}</span>}
      </button>
      {open && (
        <div className="notif-dropdown">
          <div className="notif-header">
            <span>Notifications</span>
            <button className="link-btn" onClick={() => dispatch({ type: "MARK_ALL_READ" })}>
              Mark all as read
            </button>
          </div>
          {sorted.map((n) => (
            <div key={n.id} className="notif-row" onClick={() => openNotification(n)}>
              <div
                className={`badge-dot`}
                style={{
                  marginTop: 5,
                  background:
                    n.kind === "urgent" ? "var(--urgent)" : n.kind === "later" ? "var(--later)" : "var(--resolved)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 4 }}>
                  <CategoryTag category={n.category} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</div>
                <div className="text-tertiary" style={{ fontSize: 12, marginTop: 2 }}>
                  Project {n.projectId} · {n.team} · {n.time}
                </div>
              </div>
              {n.unread && <div className="notif-dot" />}
            </div>
          ))}
          <div className="notif-footer">
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                setOpen(false);
                dispatch({ type: "NAVIGATE", screen: { name: "tickets" } });
              }}
            >
              View all tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
