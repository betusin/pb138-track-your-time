import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";

export interface IFormChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IChangePasswordProps {
  onSubmit: SubmitHandler<IFormChangePasswordInput>;
}

export const ChangePasswordForm = ({ onSubmit }: IChangePasswordProps) => {
  const { register, handleSubmit, formState } =
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
            {...register("oldPassword", { required: true })}
          />
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
            {...register("newPassword", { required: true })}
          />
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
            {...register("confirmNewPassword", { required: true })}
          />
        </div>

        <div className="btn-wrapper">
          <button className="auth-form--button btn btn--primary" type="submit">
            <Trans i18nKey="profile.change_password" />
          </button>
        </div>
      </div>
    </form>
  );
};
