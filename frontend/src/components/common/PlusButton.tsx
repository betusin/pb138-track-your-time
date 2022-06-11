import { Link } from "react-router-dom";

export interface PlusButtonProps {
  to: string;
  title: string;
}

export function PlusButton({ to, title }: PlusButtonProps) {
  return (
    <Link
      to={to}
      className="btn btn-add-circle btn-add-circle--small"
      title={title}
    >
      +
    </Link>
  );
}
