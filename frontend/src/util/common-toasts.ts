import toast from "react-hot-toast";
import i18n from "../i18n/i18n";

export function unauthorizedErrorToast() {
  toast.error(i18n.t("error.unauthorized"), { id: "unauthorized" });
}

export function unexpectedErrorToast() {
  toast.error(i18n.t("error.unexpected"), { id: "unexpected" });
}

export function refreshFailedErrorToast() {
  toast.error(i18n.t("error.refresh_failed"), { id: "refresh-failed" });
}
