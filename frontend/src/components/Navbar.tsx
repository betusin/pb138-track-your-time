import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { LanguageSwitcher } from "./lang/LanguageSwitcher";
import { Stack, Typography } from "@mui/material";

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
      <Typography variant="h4">
        <Link to="/">
          <Trans i18nKey="app.name" />
        </Link>
      </Typography>
      <LanguageSwitcher />
    </Stack>
  );
}
