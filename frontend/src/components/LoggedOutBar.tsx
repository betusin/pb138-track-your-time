import { Trans } from "react-i18next";
import { LanguageSwitcher } from "./lang/LanguageSwitcher";

export function LoggedOutBar() {
  return (
    <div className="logged-out-bar">
      <h1 className="logged-out-bar--title">
        <Trans i18nKey="app.name" />
      </h1>
      <LanguageSwitcher />
    </div>
  );
}
