import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { LanguageSwitcher } from "./lang/LanguageSwitcher";
import { Stack } from "@mui/material";

export function Navbar() {
  return (
    <Stack
      className="navbar"
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      p={3}
    >
      <Link className="navbar--title" to="/">
        <Trans i18nKey="app.name" />
      </Link>
      <Link to="/me">
        <Trans i18nKey="app.profile" />
      </Link>
      <LanguageSwitcher />
    </Stack>
  );
}
