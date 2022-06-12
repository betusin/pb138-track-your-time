import { GetSessionDto } from "../../api/model";
import { Link } from "react-router-dom";
import { DeleteButton } from "../common/DeleteButton";
import { Edit } from "@mui/icons-material";
import { styleLargeIcon } from "../../styles/theme";

export interface EditCellContentsProps {
  session: GetSessionDto;
  onDeleteClick: (id: string) => void;
}

export function EditCellContents({
  session,
  onDeleteClick,
}: EditCellContentsProps) {
  return (
    <>
      <Link to={`/session/${session.id}/edit`}>
        <Edit
          style={styleLargeIcon}
          color={session.isInvoiced ? "disabled" : "primary"}
        />
      </Link>
      <DeleteButton onDelete={onDeleteClick} id={session.id} />
    </>
  );
}
