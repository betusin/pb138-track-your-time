import { useState } from "react";
import toast from "react-hot-toast";
import { Delete, DeleteForever } from "@mui/icons-material";
import { styleLargeIcon } from "../../styles/theme";
import i18n from "i18next";

export interface DeleteDoubleClickButtonProps {
  onDelete: (id: string) => void;
  id: string;
  border?: boolean;
}

export function DeleteButton({
  onDelete,
  id,
  border,
}: DeleteDoubleClickButtonProps) {
  const [wantToRemove, setWantToRemove] = useState(false);

  function onPressed() {
    if (wantToRemove) {
      onDelete(id);
      setWantToRemove(false);
    } else {
      toast(i18n.t("confirm.delete"));
      setTimeout(() => {
        setWantToRemove(false);
      }, 4000);
      setWantToRemove(!wantToRemove);
    }
  }

  const title = wantToRemove
    ? i18n.t("operation.delete_confirm")
    : i18n.t("operation.delete");
  return (
    <button
      onClick={() => onPressed()}
      className={"btn btn__icon" + (border ? " btn__border" : "")}
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
