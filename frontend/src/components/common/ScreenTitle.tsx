import { Stack, Typography } from "@mui/material";

export interface ScreenTitleProps {
  title: string;
  secondaryTitle?: string;
}

export function ScreenTitle({ title, secondaryTitle }: ScreenTitleProps) {
  return (
    <Stack
      className="screen-title"
      direction="row"
      flexWrap="wrap"
      justifyContent="space-between"
      alignItems="center"
      px={0.5}
    >
      <Typography variant="h6" p={2} px={3}>
        {title}
      </Typography>
      {secondaryTitle && (
        <Typography variant="body2" p={2} px={3}>
          {secondaryTitle}
        </Typography>
      )}
    </Stack>
  );
}
