import { SubmitHandler, useForm } from "react-hook-form";

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

interface IAuthFormProps {
  onSubmit: SubmitHandler<IFormLoginInput | IFormRegisterInput>;
}

export const LoginForm = ({ onSubmit }: IAuthFormProps) => {
  const { register, handleSubmit, formState } = useForm<IFormLoginInput>();

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

export const RegisterForm = ({ onSubmit }: IAuthFormProps) => {
  const { register, handleSubmit, formState } = useForm<IFormRegisterInput>();

  return (
    <form className="m1" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
      </div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="text"
        {...register("name", { required: true })}
      />
      <div>
        <label>Surname</label>
      </div>
      <input
        className={`text-field ${
          formState.errors.surname && "text-field--error"
        }`}
        type="text"
        {...register("surname", { required: true })}
      />
      <div>
        <label>E-mail address</label>
      </div>
      <input
        className={`text-field ${
          formState.errors.email && "text-field--error"
        }`}
        type="email"
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
      <div>
        <label>Company</label>
      </div>
      <input
        className={`text-field ${
          formState.errors.company && "text-field--error"
        }`}
        type="text"
        {...register("company", { required: true })}
      />
      <div>
        <label>Logo of company (URL source)</label>
      </div>
      <input
        className={`text-field ${formState.errors.logo && "text-field--error"}`}
        type="text"
        {...register("logo")}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value="Register" />
      </div>
    </form>
  );
};
