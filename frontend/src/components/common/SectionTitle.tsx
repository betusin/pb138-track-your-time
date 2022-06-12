import { ReactNode } from "react";

export interface SectionTitleProps {
  title: string;
  children?: ReactNode;
}

export function SectionTitle({ title, children }: SectionTitleProps) {
  return (
    <div className="page--title-container page--title-container__section">
      <h6 className="page--title-section">{title}</h6>
      {children && children}
    </div>
  );
}
