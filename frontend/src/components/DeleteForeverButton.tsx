import { DeleteForever } from "@mui/icons-material";

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
      <DeleteForever color="primary" />
    </button>
  );
};
