import { GetSessionDto } from "../../api/model";
import { Link } from "react-router-dom";
import { DeleteButton } from "../common/DeleteButton";

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
        <img
          className="icon icon--small"
          src={`/assets/edit-${session.isInvoiced ? "antracit" : "lime"}.svg`}
        />
      </Link>
      <DeleteButton onDelete={onDeleteClick} id={session.id} />
    </>
  );
}
