import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { LanguageSwitcher } from "./lang/LanguageSwitcher";
import { Stack } from "@mui/material";
import { ProfileButton } from "./ProfileButton";

export function Navbar() {
  return (
    <div className="navbar">
      <Link className="navbar--title" to="/">
        <Trans i18nKey="app.name" />
      </Link>
      <Stack direction="row" alignItems="center" spacing="1rem">
        <ProfileButton />
        <LanguageSwitcher />
      </Stack>
    </div>
  );
}
