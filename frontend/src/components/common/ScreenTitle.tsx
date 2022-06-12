import { ReactElement } from "react";

export interface ScreenTitleProps {
  title: string;
  secondaryTitle?: string;
  children?: ReactElement;
}

export function ScreenTitle({
  title,
  secondaryTitle,
  children,
}: ScreenTitleProps) {
  return (
    <>
      <div className="page--title-container page--title-container__main">
        <h1 className="page--title-main">{title}</h1>
        {secondaryTitle && (
          <h2 className="page--title-main">{secondaryTitle}</h2>
        )}
        {children && children}
      </div>
    </>
  );
}
