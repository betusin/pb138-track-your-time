import { GetSessionWithPhotosDto } from "../../api/model";
import "react-image-gallery/styles/css/image-gallery.css";
import { useWindowSize } from "../../util/window-size-hook";
import { NoDataMessage } from "../common/NoDataMessage";
import toast from "react-hot-toast";
import { DesktopImageGallery } from "../common/DesktopImageGallery";
import { MobileImageList } from "../common/MobileImageList";
import { sessionPhotoControllerRemoveWrap } from "../../util/api-call-wrappers";
import i18n from "../../i18n/i18n";
import { refreshFailedErrorToast } from "../../util/common-toasts";
import { useApiCall } from "../../util/api-caller";
import { useSWRConfig } from "swr";
import { getSessionControllerFindOneKey } from "../../api/sessions/sessions";

export interface SessionPhotoSectionProps {
  session: GetSessionWithPhotosDto;
}

const galleryBreakpoint = 600;

export function SessionPhotoSection({ session }: SessionPhotoSectionProps) {
  const doApiCall = useApiCall();
  const { mutate } = useSWRConfig();
  const { width } = useWindowSize();

  function deletePhoto(id: string) {
    const call = sessionPhotoControllerRemoveWrap(id);
    doApiCall(call, undefined, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("session.photo.deleted"));
    mutate(getSessionControllerFindOneKey(session.id)).catch(
      refreshFailedErrorToast
    );
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    } else if (code == 404) {
      toast.error(i18n.t("session.photo.not_found"));
      return true;
    }
    return false;
  }

  return (
    <div>
      {session.photos.length > 0 ? (
        (width ?? 1024) > galleryBreakpoint ? (
          <DesktopImageGallery photos={session.photos} onDelete={deletePhoto} />
        ) : (
          <MobileImageList photos={session.photos} onDelete={deletePhoto} />
        )
      ) : (
        <NoDataMessage />
      )}
    </div>
  );
}
