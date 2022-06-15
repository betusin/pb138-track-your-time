import { Edit, Key } from "@mui/icons-material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authControllerLogout } from "../../api/authentication/authentication";
import { meControllerRemove } from "../../api/users/users";
import i18n from "../../i18n/i18n";
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
  };

  const onDeleteSuccess = () => {
    doApiCall(
      authControllerLogout,
      { withCredentials: true },
      onLougoutSuccess
    );
  };

  const onDeleteFailure = (code: number) => {
    if (code === 401) {
      toast.error(i18n.t("error.unauthorized"));
      return true;
    }
    return false;
  };

  const onLougoutSuccess = () => {
    setToken("");
    toast.success(i18n.t("profile.deleted"));
    navigate("/login");
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
