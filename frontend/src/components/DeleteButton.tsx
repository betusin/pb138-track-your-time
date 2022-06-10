import { Delete } from "@mui/icons-material";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { styleLargeIcon } from "../styles/theme";

interface IDeleteButtonProps {
  setWantToRemove: Dispatch<SetStateAction<boolean>>;
  wantToRemove: boolean;
}

export const DeleteButton = ({
  setWantToRemove,
  wantToRemove,
}: IDeleteButtonProps) => {
  return (
    <button
      onClick={() => {
        toast("Click one more time to really remove.");
        setTimeout(() => {
          setWantToRemove(false);
        }, 4000);
        setWantToRemove(!wantToRemove);
      }}
      className="btn-delete-project"
      title="Delete the project"
    >
      <Delete style={styleLargeIcon} color="primary" />
    </button>
  );
};
