import { GetSessionDto } from "../../api/model";
import { Link } from "react-router-dom";
import { DeleteButton } from "../common/DeleteButton";
import { styleLargeIcon } from "../../styles/theme";
import { Edit, Image } from "@mui/icons-material";

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
      <Link to={`/session/${session.id}/`} className="btn btn__icon">
        <Image style={styleLargeIcon} color="primary" />
      </Link>
      <Link to={`/session/${session.id}/edit`} className="btn btn__icon">
        <Edit
          style={styleLargeIcon}
          color={session.isInvoiced ? "disabled" : "primary"}
        />
      </Link>
      <DeleteButton onDelete={onDeleteClick} id={session.id} />
    </>
  );
}
