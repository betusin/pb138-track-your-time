import { Edit, Key } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { styleLargeIcon } from "../../styles/theme";
import { DeleteButton } from "../common/DeleteButton";

export const ProfileActions = () => {
  const deleteProfile = () => {
    return;
  };

  return (
    <div className="profile__edit-buttons">
      <Link to="/me/edit" className="btn btn__icon">
        <Edit style={styleLargeIcon} color="primary" />
      </Link>
      <Link to="/me/password" className="btn btn__icon">
        <Key style={styleLargeIcon} color="primary" />
      </Link>
      <DeleteButton onDelete={deleteProfile} id="" />
    </div>
  );
};
