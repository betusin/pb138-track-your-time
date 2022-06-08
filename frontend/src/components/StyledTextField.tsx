import { TextField, TextFieldProps } from "@mui/material";
import { theme } from "../styles/theme";

export function StyledTextField(props: TextFieldProps) {
  const color = theme.palette.primary.light;
  return (
    <TextField
      {...props}
      sx={{
        svg: { color },
        input: { color },
        label: { color },
        "& .MuiInputLabel-root": { color: color },
        "& .MuiOutlinedInput-root": {
          "& > fieldset": { borderColor: color },
        },
        "& .MuiOutlinedInput-root:hover": {
          "& > fieldset": { borderColor: color },
        },
      }}
    />
  );
}
