/* ---------------- ICONOS ---------------- */
export default function Icon({ name, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", className: "icon" };

  switch (name) {
    case "home":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "card":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "plus":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "check":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "doctor":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M12 7v8M8 11h8" />
        </svg>
      );
    case "lab":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 2v6l-5 9a4 4 0 0 0 3.5 6h7A4 4 0 0 0 19 17l-5-9V2" />
          <path d="M8 8h8" />
        </svg>
      );
    case "phone":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5.11 3h3a2 2 0 0 1 2 1.72c.12.9.32 1.76.57 2.6a2 2 0 0 1-.45 2.11L9 10.1a16 16 0 0 0 4.9 4.9l.67-1.23a2 2 0 0 1 2.11-.45c.84.25 1.7.45 2.6.57A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    default:
      return null;
  }
}