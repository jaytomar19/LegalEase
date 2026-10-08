import type { Urgency } from "../types";

export function UrgencyTag({ urgency }: { urgency: Urgency }) {
  return (
    <span className={`badge badge-${urgency}`}>
      <span className="badge-dot" />
      {urgency}
    </span>
  );
}

export function ResolvedTag() {
  return (
    <span className="badge badge-resolved">
      <span className="badge-dot" />
      resolved
    </span>
  );
}

export function LoggedTag() {
  return (
    <span className="badge badge-logged">
      <span className="badge-dot" />
      logged
    </span>
  );
}

export function CategoryTag({ category }: { category: string }) {
  return <span className="badge badge-neutral">{category}</span>;
}
