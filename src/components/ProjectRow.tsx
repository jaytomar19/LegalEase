import type { Project } from "../types";
import { getProjectCounts, useStore } from "../state/store";

export function ProjectRow({ project, onClick }: { project: Project; onClick: () => void }) {
  const { state } = useStore();
  const { live, resolved, hasUrgentLive } = getProjectCounts(state, project.id);

  return (
    <tr className="clickable" onClick={onClick}>
      <td>
        <div className="cell-title">{project.name}</div>
        <div className="cell-tertiary">{project.subtitle}</div>
      </td>
      <td className="cell-secondary">{project.defaultTeam}</td>
      <td className="cell-secondary">
        {project.avatars.join(" ")} · {project.people}
      </td>
      <td>
        {!project.approvalExists ? (
          <span className="text-tertiary">No approval on record</span>
        ) : live > 0 ? (
          <span className={hasUrgentLive ? "badge badge-urgent" : "badge badge-later"}>
            <span className="badge-dot" />
            {live} live
          </span>
        ) : (
          <span className="badge badge-resolved">
            <span className="badge-dot" />
            All clear
          </span>
        )}
      </td>
      <td className="cell-secondary">{resolved > 0 ? `${resolved} resolved` : "—"}</td>
    </tr>
  );
}
