import { Trans } from "react-i18next";

interface ICancelEditButtonProps {
  cancelEdit: () => void;
}

export const CancelEditButton = ({ cancelEdit }: ICancelEditButtonProps) => {
  return (
    <button className="btn--secondary btn m05" onClick={cancelEdit}>
      <Trans i18nKey="form.cancel_edit" />
    </button>
  );
};
