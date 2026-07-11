import { Heading } from "./Heading";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <div className="max-w-xl">
      <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-gold">
        {eyebrow}
      </span>
      <Heading level={1}>{title}</Heading>
      <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
      {children}
    </div>
  );
}
