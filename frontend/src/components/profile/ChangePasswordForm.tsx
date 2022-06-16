import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import i18n from "../../i18n/i18n";
import { CancelEditButton } from "../common/CancelEditButton";
import { ErrorFieldMessage } from "../common/ErrorFieldMessage";

export interface IFormChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IChangePasswordProps {
  onSubmit: SubmitHandler<IFormChangePasswordInput>;
  onCancelEdit: () => void;
}

export const ChangePasswordForm = ({
  onSubmit,
  onCancelEdit,
}: IChangePasswordProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<IFormChangePasswordInput>();
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--inner-container">
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="profile.old_password" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.oldPassword && "text-field--error"
            }`}
            type="password"
            {...register("oldPassword", {
              required: {
                message: i18n.t("form.validation.password.old_password"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="oldPassword" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="profile.new_password" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.newPassword && "text-field--error"
            }`}
            type="password"
            {...register("newPassword", {
              required: {
                message: i18n.t("form.validation.password.new_password"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="newPassword" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="profile.confirm_new_password" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.confirmNewPassword && "text-field--error"
            }`}
            type="password"
            {...register("confirmNewPassword", {
              required: {
                message: i18n.t(
                  "form.validation.password.confirm_new_password"
                ),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="confirmNewPassword" />
        </div>

        <div className="btn-wrapper btn-wrapper--even">
          <CancelEditButton
            cancelEdit={handleSubmit(onCancelEdit)}
            reset={reset}
          />
          <button className="btn btn--primary m05" type="submit">
            <Trans i18nKey="profile.change_password" />
          </button>
        </div>
      </div>
    </form>
  );
};
