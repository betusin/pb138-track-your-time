import { useState } from "react";
import toast from "react-hot-toast";
import { Delete, DeleteForever } from "@mui/icons-material";
import { styleLargeIcon } from "../../styles/theme";

export interface DeleteDoubleClickButtonProps {
  onDelete: (id: string) => void;
  id: string;
}

export function DeleteButton({ onDelete, id }: DeleteDoubleClickButtonProps) {
  const [wantToRemove, setWantToRemove] = useState(false);

  function onPressed() {
    if (wantToRemove) {
      onDelete(id);
    } else {
      toast("Click one more time to really remove.");
      setTimeout(() => {
        setWantToRemove(false);
      }, 4000);
      setWantToRemove(!wantToRemove);
    }
  }

  const title = wantToRemove
    ? "Yes, I want to delete the project"
    : "Delete the project";
  return (
    <button
      onClick={() => onPressed()}
      className="btn-delete-project"
      title={title}
    >
      {wantToRemove ? (
        <DeleteForever style={styleLargeIcon} color="primary" />
      ) : (
        <Delete style={styleLargeIcon} color="primary" />
      )}
    </button>
  );
}
