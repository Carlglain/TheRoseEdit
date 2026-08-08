import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "ghost-dark" | "promo";
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
  "inline-flex items-center justify-center font-bold tracking-wide uppercase transition-[transform,opacity] duration-200 ease-out hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hotpink focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0";

const VARIANTS: Record<Variant, string> = {
  primary:
    "gradient-pink-blue text-ink border-0 shadow-md",
  promo:
    "gradient-pink-blue text-ink border-0 shadow-lg rounded-full",
  secondary:
    "bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white",
  ghost:
    "bg-transparent text-ink border border-line hover:border-ink",
  gold:
    "bg-gold text-ink hover:bg-gold/90 border border-gold/80",
  "ghost-dark":
    "bg-transparent text-white hover:bg-white/10 border-2 border-white/40",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-xs rounded-brand",
  md: "px-6 py-3 text-sm rounded-brand",
  lg: "px-10 py-4 text-base rounded-brand",
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
