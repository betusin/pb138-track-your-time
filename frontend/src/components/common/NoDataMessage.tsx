import { Trans } from "react-i18next";
import { Typography } from "@mui/material";

export function NoDataMessage() {
  return (
    <Typography margin="auto">
      <Trans i18nKey="status.no_data" />
    </Typography>
  );
}
