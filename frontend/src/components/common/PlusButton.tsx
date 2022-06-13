import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export interface PlusButtonProps {
  to: string;
  title: string;
  size: "small" | "large";
}

export function PlusButton({ to, title, size }: PlusButtonProps) {
  return (
    <Link
      to={to}
      className={`btn btn-add-circle btn-add-circle--${size}`}
      title={title}
    >
      <AddIcon fontSize={size} />
    </Link>
  );
}
