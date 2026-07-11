import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "ghost-dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

const BASE =
  "inline-flex items-center justify-center font-semibold tracking-wide rounded-brand transition-[transform,opacity,background-color,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  primary:
    "gradient-emerald text-white border-0 shadow-sm shadow-emerald/20 hover:opacity-95",
  secondary:
    "bg-transparent text-emerald hover:bg-emerald hover:text-white border border-emerald",
  ghost:
    "bg-transparent text-ink hover:text-emerald border border-line hover:border-emerald/40",
  gold:
    "bg-gold text-ink hover:bg-gold/90 border border-gold/80",
  "ghost-dark":
    "bg-transparent text-white hover:bg-white/10 border border-white/25 hover:border-white/45",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
