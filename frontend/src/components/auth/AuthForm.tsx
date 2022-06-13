import { SubmitHandler, useForm } from "react-hook-form";
import { Trans } from "react-i18next";
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
    <form className="m1" onSubmit={handleSubmit(onSubmit)}>
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
        {...register("email", { required: "Email required!" })}
      />
      <ErrorFieldMessage formState={formState} name="email" />
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
        {...register("password", { required: "Password required!" })}
      />
      <ErrorFieldMessage formState={formState} name="password" />

      <div className="btn-wrapper">
        <button className="auth-form--button btn btn--primary" type="submit">
          <Trans i18nKey="auth.login.log_in" />
        </button>
      </div>
    </form>
  );
};

export const RegisterForm = ({ onSubmit }: IRegisterProps) => {
  const { register, handleSubmit, formState } = useForm<IFormRegisterInput>();

  return (
    <form className="m1" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          <Trans i18nKey="auth.register.name" />
        </label>
      </div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="text"
        {...register("name", { required: "Name required!" })}
      />
      <ErrorFieldMessage formState={formState} name="name" />
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
        {...register("surname", { required: "Surname required!" })}
      />
      <ErrorFieldMessage formState={formState} name="surname" />
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
        {...register("email", { required: "Email required!" })}
      />
      <ErrorFieldMessage formState={formState} name="email" />
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
        {...register("password", { required: "Password required!" })}
      />
      <ErrorFieldMessage formState={formState} name="password" />
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
        {...register("company", { required: "Company required!" })}
      />
      <ErrorFieldMessage formState={formState} name="company" />
      <div>
        <label>
          <Trans i18nKey="auth.register.company_logo" />
        </label>
      </div>
      <input
        className={`text-field ${formState.errors.logo && "text-field--error"}`}
        type="text"
        {...register("logo")}
      />

      <div className="btn-wrapper">
        <button className="auth-form--button btn btn--primary" type="submit">
          <Trans i18nKey="auth.register.register" />
        </button>
      </div>
    </form>
  );
};
