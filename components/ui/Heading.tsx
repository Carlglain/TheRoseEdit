type Level = 1 | 2 | 3 | 4;

interface HeadingProps {
  level?: Level;
  children: React.ReactNode;
  className?: string;
}

const SIZES: Record<Level, string> = {
  1: "text-4xl md:text-5xl lg:text-6xl",
  2: "text-3xl md:text-4xl",
  3: "text-xl md:text-2xl",
  4: "text-lg md:text-xl",
};

export function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const classes = `font-heading font-light leading-[1.1] tracking-tight text-ink ${SIZES[level]} ${className}`;

  switch (level) {
    case 1:
      return <h1 className={classes}>{children}</h1>;
    case 3:
      return <h3 className={classes}>{children}</h3>;
    case 4:
      return <h4 className={classes}>{children}</h4>;
    default:
      return <h2 className={classes}>{children}</h2>;
  }
}
