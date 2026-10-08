type IconProps = { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconGrid({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <rect x="2" y="2" width="5" height="5" rx="1.2" />
      <rect x="9" y="2" width="5" height="5" rx="1.2" />
      <rect x="2" y="9" width="5" height="5" rx="1.2" />
      <rect x="9" y="9" width="5" height="5" rx="1.2" />
    </svg>
  );
}

export function IconLayers({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M8 2 L14 5.2 L8 8.4 L2 5.2 Z" />
      <path d="M2 8.4 L8 11.6 L14 8.4" />
      <path d="M2 11.6 L8 14.8 L14 11.6" />
    </svg>
  );
}

export function IconTicket({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M2 6.2 a1.4 1.4 0 0 0 0 2.6 V11 a1 1 0 0 0 1 1 h10 a1 1 0 0 0 1 -1 V8.8 a1.4 1.4 0 0 1 0 -2.6 V5 a1 1 0 0 0 -1 -1 H3 a1 1 0 0 0 -1 1 Z" />
      <line x1="6.3" y1="4" x2="6.3" y2="12" strokeDasharray="1.6 1.6" />
    </svg>
  );
}

export function IconRadar({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <circle cx="8" cy="8" r="6" />
      <circle cx="8" cy="8" r="2.4" />
      <line x1="8" y1="8" x2="12" y2="4.2" />
    </svg>
  );
}

export function IconBell({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M4 10.5 V7 a4 4 0 0 1 8 0 v3.5 l1 1.5 H3 Z" />
      <path d="M6.5 13.2 a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

export function IconRefresh({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M3 8 a5 5 0 0 1 8.5 -3.5 L13 6" />
      <path d="M13 6 V3 M13 6 H10" />
      <path d="M13 8 a5 5 0 0 1 -8.5 3.5 L3 10" />
      <path d="M3 10 V13 M3 10 H6" />
    </svg>
  );
}

export function IconGear({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <circle cx="8" cy="8" r="2.3" />
      <path d="M8 2.2 V3.6 M8 12.4 V13.8 M2.2 8 H3.6 M12.4 8 H13.8 M3.9 3.9 L4.9 4.9 M11.1 11.1 L12.1 12.1 M3.9 12.1 L4.9 11.1 M11.1 4.9 L12.1 3.9" />
    </svg>
  );
}

export function IconSwitch({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M2.5 5.5 H12 M9.5 3 L12 5.5 L9.5 8" />
      <path d="M13.5 10.5 H4 M6.5 8 L4 10.5 L6.5 13" />
    </svg>
  );
}

export function IconCheck({ size = 13 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...base}>
      <path d="M3 8.5 L6.2 11.5 L13 4.5" />
    </svg>
  );
}
