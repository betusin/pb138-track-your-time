export interface ScreenTitleProps {
  title: string;
  secondaryTitle?: string;
}

export function ScreenTitle({ title, secondaryTitle }: ScreenTitleProps) {
  return (
    <>
      <div className="page--title-container page--title-container__main">
        <h1 className="page--title-main">{title}</h1>
        {secondaryTitle && (
          <h2 className="page--title-main">{secondaryTitle}</h2>
        )}
      </div>
    </>
  );
}
