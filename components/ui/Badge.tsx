type BadgeVariant = "default" | "gold" | "emerald" | "gold-dark";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-line text-muted",
  gold: "bg-gold/10 text-gold",
  emerald: "bg-emerald/10 text-emerald",
  "gold-dark": "bg-gold/20 text-gold",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
