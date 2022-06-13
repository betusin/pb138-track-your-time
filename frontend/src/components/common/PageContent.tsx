import { ReactNode } from "react";
import { ScreenTitle } from "./ScreenTitle";

export interface PageProps {
  title: string;
  secondaryTitle?: string;
  children: ReactNode;
}

export function Page({ title, secondaryTitle, children }: PageProps) {
  return (
    <div className="page">
      <ScreenTitle title={title} secondaryTitle={secondaryTitle} />
      {children}
    </div>
  );
}
