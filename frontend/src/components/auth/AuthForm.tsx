import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import i18n from "../../i18n/i18n";
import { ErrorFieldMessage } from "../common/ErrorFieldMessage";

export interface IFormLoginInput {
  email: string;
  password: string;
}

export interface IFormRegisterInput extends IFormLoginInput {
  name: string;
  surname: string;
  company: string;
  logo: string;
}

export interface ILoginFormProps {
  onSubmit: SubmitHandler<IFormLoginInput>;
}

export interface IRegisterProps {
  onSubmit: SubmitHandler<IFormRegisterInput>;
}

export const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const { register, handleSubmit, formState } = useForm<IFormLoginInput>();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--inner-container">
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.email_address" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.email && "text-field--error"
            }`}
            type="email"
            {...register("email", {
              required: {
                message: i18n.t("form.validation.auth.email"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="email" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.password" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.password && "text-field--error"
            }`}
            type="password"
            {...register("password", {
              required: {
                message: i18n.t("form.validation.auth.password"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="password" />
        </div>

        <div className="btn-wrapper">
          <button className="auth-form--button btn btn--primary" type="submit">
            <Trans i18nKey="auth.login.log_in" />
          </button>
        </div>
      </div>
    </form>
  );
};

export const RegisterForm = ({ onSubmit }: IRegisterProps) => {
  const { register, handleSubmit, formState } = useForm<IFormRegisterInput>();

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--inner-container">
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
                message: i18n.t("form.validation.auth.name"),
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
                message: i18n.t("form.validation.auth.surname"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="surname" />
        </div>
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
                message: i18n.t("form.validation.auth.email"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="email" />
        </div>
        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="auth.register.password" />
            </label>
          </div>
          <input
            className={`text-field ${
              formState.errors.password && "text-field--error"
            }`}
            type="password"
            {...register("password", {
              required: {
                message: i18n.t("form.validation.auth.password"),
                value: true,
              },
            })}
          />
          <ErrorFieldMessage formState={formState} name="password" />
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
                message: i18n.t("form.validation.auth.company"),
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

        <div className="btn-wrapper">
          <button className="auth-form--button btn btn--primary" type="submit">
            <Trans i18nKey="auth.register.register" />
          </button>
        </div>
      </div>
    </form>
  );
};
