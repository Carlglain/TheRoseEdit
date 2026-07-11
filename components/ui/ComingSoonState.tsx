import { Heading } from "./Heading";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

interface ComingSoonStateProps {
  title: string;
  description: string;
  source: string;
}

export function ComingSoonState({ title, description, source }: ComingSoonStateProps) {
  return (
    <div className="rounded-brand border border-line bg-white p-10 text-center sm:p-12">
      <Heading level={3}>{title}</Heading>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      <div className="mx-auto mt-8 max-w-sm">
        <NewsletterForm theme="light" source={source} />
      </div>
      <p className="mt-3 text-xs text-muted">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
