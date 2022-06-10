import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { LanguageSwitcher } from "./lang/LanguageSwitcher";

export const Navbar = () => {
  return (
    <div>
      <h1>
        <Trans i18nKey="app.name" />
      </h1>
      <Link to="/">
        <Trans i18nKey="app.home" />
      </Link>
      <LanguageSwitcher />
    </div>
  );
};
