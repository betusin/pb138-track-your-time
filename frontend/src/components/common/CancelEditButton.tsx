import { Trans } from "react-i18next";

interface ICancelEditButtonProps {
  cancelEdit: () => void;
  reset: () => void;
}

export const CancelEditButton = ({
  cancelEdit,
  reset,
}: ICancelEditButtonProps) => {
  return (
    <button
      className="btn--secondary btn m05"
      onClick={() => {
        reset();
        cancelEdit();
      }}
    >
      <Trans i18nKey="form.cancel_edit" />
    </button>
  );
};
