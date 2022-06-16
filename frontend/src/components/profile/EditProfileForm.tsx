import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";

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

export const EditProfileForm = ({ profile, onSubmit }: IEditProfileProps) => {
  const { register, handleSubmit, formState } = useForm<IFormEditProfileInput>({
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
            {...register("email", { required: true })}
          />
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
            {...register("name", { required: true })}
          />
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
            {...register("surname", { required: true })}
          />
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
            {...register("company", { required: true })}
          />
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

        <div className="btn-wrapper">
          <button className="auth-form--button btn btn--primary" type="submit">
            <Trans i18nKey="profile.edit" />
          </button>
        </div>
      </div>
    </form>
  );
};
