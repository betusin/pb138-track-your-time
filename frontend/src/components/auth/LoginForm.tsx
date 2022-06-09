import { useForm } from "react-hook-form";

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
        <label>E-mail address</label>
      </div>
      <input
        className={`text-field ${
          formState.errors.email && "text-field--error"
        }`}
        type="text"
        {...register("email", { required: true })}
      />
      <div>
        <label>Password</label>
      </div>
      <input
        className={`text-field ${
          formState.errors.password && "text-field--error"
        }`}
        type="password"
        {...register("password", { required: true })}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value="Login" />
      </div>
    </form>
  );
};
