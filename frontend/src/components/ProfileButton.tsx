import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Trans } from "react-i18next";

export function ProfileButton() {
  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/me") || (
        <Button
          className="navbar--item"
          component={Link}
          to="/me"
          variant="outlined"
        >
          <Trans i18nKey="app.profile" />
        </Button>
      )}
    </>
  );
}
