import { SubmitHandler, useForm } from "react-hook-form";

export interface IFormAuthInput {
  email: string;
  password: string;
}

interface IAuthFormProps {
  buttonText: string;
  onSubmit: SubmitHandler<IFormAuthInput>;
}

export const AuthForm = ({ buttonText, onSubmit }: IAuthFormProps) => {
  const { register, handleSubmit, formState } = useForm<IFormAuthInput>();

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
        <input className="btn btn--primary" type="submit" value={buttonText} />
      </div>
    </form>
  );
};
