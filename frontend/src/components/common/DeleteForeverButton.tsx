import { DeleteForever } from "@mui/icons-material";
import { styleLargeIcon } from "../../styles/theme";

export interface IDeleteForeverButtonProps {
  onDelete: Function;
  id: string;
}

export const DeleteForeverButton = ({
  onDelete,
  id,
}: IDeleteForeverButtonProps) => {
  return (
    <button
      onClick={() => onDelete(id)}
      className="btn-delete-project"
      title="Yes, I want to delete the project"
    >
      <DeleteForever style={styleLargeIcon} color="primary" />
    </button>
  );
};
