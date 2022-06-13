import { Box } from "@mui/material";
import { Trans } from "react-i18next";

export function LoadingPlaceholder() {
  return (
    <Box p={2}>
      <Trans i18nKey="status.loading" />
    </Box>
  );
}
