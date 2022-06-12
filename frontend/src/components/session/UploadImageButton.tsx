import { Button } from "@mui/material";
import toast from "react-hot-toast";
import i18n from "../../i18n/i18n";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import { Trans } from "react-i18next";

export interface UploadImageButtonProps {
  url: string;
  onSuccess: () => void;
}

export function UploadImageButton({ url, onSuccess }: UploadImageButtonProps) {
  const token = useRecoilValue(accessTokenAtom);
  const headers = {
    Authorization: "Bearer " + token,
  };

  function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    fetch(url, {
      method: "POST",
      body: formData,
      headers: headers,
    })
      .then((result) => {
        if (result.ok) {
          toast.success(i18n.t("session.updated"));
          onSuccess();
        } else {
          onError(result.status);
        }
      })
      .catch((error) => {
        console.warn(error);
        toast.error(i18n.t("error.unexpected"));
      });
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  return (
    <div>
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          <Trans i18nKey="operation.upload" />
        </Button>
      </label>
      <input
        id="contained-button-file"
        style={{ display: "none" }}
        type="file"
        accept="image/jpeg, image/png"
        onChange={(event) => {
          const fileOrUndefined = event?.target?.files?.[0];
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          uploadImage(fileOrUndefined!);
        }}
      />
    </div>
  );
}
