import { getTrackingBadgeCount, useStore } from "../state/store";
import type { GroupBy, ShowFilter } from "../types";

export type FilterValues = { show: ShowFilter; groupBy: GroupBy; keyword: string };

export function FilterBar({
  filters,
  onChange,
  showAiTracking = false,
  layout = "row",
}: {
  filters: FilterValues;
  onChange: (patch: Partial<FilterValues>) => void;
  showAiTracking?: boolean;
  /** "row": compact inline controls (default, used on Project Issues). "sidebar": stacked vertical block (Home). */
  layout?: "row" | "sidebar";
}) {
  const { state } = useStore();
  const trackingBadge = getTrackingBadgeCount(state);

  function setGroupBy(g: GroupBy) {
    onChange({ groupBy: filters.groupBy === g ? null : g });
  }

  function setShow(s: ShowFilter) {
    onChange({ show: s });
  }

  const groupByControl = (
    <div className={layout === "sidebar" ? "segmented segmented-block" : "segmented"}>
      <button className={filters.groupBy === "department" ? "active" : ""} onClick={() => setGroupBy("department")}>
        Department
      </button>
      <button className={filters.groupBy === "feature" ? "active" : ""} onClick={() => setGroupBy("feature")}>
        Feature
      </button>
      <button className={filters.groupBy === "document" ? "active" : ""} onClick={() => setGroupBy("document")}>
        Document
      </button>
      {showAiTracking && (
        <button
          className={filters.groupBy === "ai-tracking" ? "active" : ""}
          onClick={() => setGroupBy("ai-tracking")}
        >
          AI tracking
          {trackingBadge > 0 && (
            <span className="count-pill" style={{ marginLeft: 5 }}>
              {trackingBadge}
            </span>
          )}
        </button>
      )}
    </div>
  );

  const showControl = (
    <div className={layout === "sidebar" ? "segmented segmented-block" : "segmented"}>
      <button className={filters.show === "all" ? "active" : ""} onClick={() => setShow("all")}>
        All
      </button>
      <button className={filters.show === "legal" ? "active" : ""} onClick={() => setShow("legal")}>
        Legal
      </button>
      <button className={filters.show === "non-legal" ? "active" : ""} onClick={() => setShow("non-legal")}>
        Non-legal
      </button>
    </div>
  );

  const searchControl = (
    <input
      className="input"
      style={layout === "sidebar" ? undefined : { width: 200 }}
      placeholder="Search keywords…"
      value={filters.keyword}
      onChange={(e) => onChange({ keyword: e.target.value })}
    />
  );

  if (layout === "sidebar") {
    return (
      <div className="filter-sidebar-block">
        <div className="field">
          <label className="field-label">Search</label>
          {searchControl}
        </div>
        <div className="field">
          <label className="field-label">Group by</label>
          {groupByControl}
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-label">Show</label>
          {showControl}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-row gap-10" style={{ marginBottom: 16, flexWrap: "wrap", rowGap: 10 }}>
      {groupByControl}
      {showControl}
      {searchControl}
    </div>
  );
}
