import { ReactNode } from "react";
import { SectionTitle } from "./SectionTitle";

export interface PageSectionProps {
  title: string;
  controls?: ReactNode;
  children: ReactNode;
}

export function PageSection({ title, controls, children }: PageSectionProps) {
  return (
    <div className="page--section">
      <SectionTitle title={title}>{controls && controls}</SectionTitle>
      <div className="page--section-content">{children}</div>
    </div>
  );
}
