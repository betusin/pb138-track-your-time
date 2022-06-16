import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import i18n from "../../i18n/i18n";
import { CancelEditButton } from "../common/CancelEditButton";
import { ErrorFieldMessage } from "../common/ErrorFieldMessage";

export interface IFormEditProfileInput {
  email: string;
  name: string;
  surname: string;
  company: string;
  logo: string;
}

export interface IEditProfileProps {
  profile: IFormEditProfileInput;
  onSubmit: SubmitHandler<IFormEditProfileInput>;
  onCancelEdit: () => void;
}

export const EditProfileForm = ({
  profile,
  onSubmit,
  onCancelEdit,
}: IEditProfileProps) => {
  const { register, handleSubmit, formState, reset } =
    useForm<IFormEditProfileInput>({
      defaultValues: {
        email: profile.email,
        name: profile.name,
        surname: profile.surname,
        company: profile.company,
        logo: profile.logo,
      },
    });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--inner-container">
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.email" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.email && "text-field--error"
            }`}
            type="email"
            {...register("email", {
              required: {
                message: i18n.t("form.validation.profile.email"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="email" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.name" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.name && "text-field--error"
            }`}
            type="text"
            {...register("name", {
              required: {
                message: i18n.t("form.validation.profile.name"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="name" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.surname" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.surname && "text-field--error"
            }`}
            type="text"
            {...register("surname", {
              required: {
                message: i18n.t("form.validation.profile.surname"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="surname" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.company" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.company && "text-field--error"
            }`}
            type="text"
            {...register("company", {
              required: {
                message: i18n.t("form.validation.profile.company"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="company" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.company_logo" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.logo && "text-field--error"
            }`}
            type="text"
            {...register("logo")}
          />
        </div>

        <div className="btn-wrapper btn-wrapper--even">
          <CancelEditButton
            cancelEdit={handleSubmit(onCancelEdit)}
            reset={reset}
          />
          <button className="btn btn--primary m05" type="submit">
            <Trans i18nKey="profile.edit" />
          </button>
        </div>
      </div>
    </form>
  );
};
