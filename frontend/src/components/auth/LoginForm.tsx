import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { register, handleSubmit, formState } = useForm<LoginFormData>();

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
        type="text"
        {...register("email", { required: true })}
      />
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
        {...register("password", { required: true })}
      />

      <div className="btn-wrapper">
        <button className="btn btn--primary" type="submit">
          <Trans i18nKey="auth.login.log_in" />
        </button>
      </div>
    </form>
  );
};
