import { Edit, Key } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { meControllerRemove } from "../../api/users/users";
import { accessTokenAtom } from "../../state/atom";
import { styleLargeIcon } from "../../styles/theme";
import { useApiCall } from "../../util/api-caller";
import { DeleteButton } from "../common/DeleteButton";

export const ProfileActions = () => {
  const doApiCall = useApiCall();
  const navigate = useNavigate();
  const setToken = useSetRecoilState(accessTokenAtom);

  const deleteProfile = () => {
    doApiCall(
      meControllerRemove,
      { withCredentials: true },
      onDeleteSuccess,
      onDeleteFailure
    );
    return;
  };

  const onDeleteSuccess = () => {
    setToken("");
    navigate("/login");
  };

  const onDeleteFailure = (code: number) => {
    return true;
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
