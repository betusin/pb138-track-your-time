
import { ErrorMessage } from "@hookform/error-message";
import { FormState } from "react-hook-form";
import { IFormLoginInput, IFormRegisterInput } from "../auth/AuthForm";
import { IFormProjectInput } from '../project/CreateProject';

interface IErrorFieldMessageProps<T> {
  name: string;
  formState: FormState<T>;
}

export function ErrorFieldMessage({
  name,
  formState,
}: IErrorFieldMessageProps<
  IFormProjectInput | IFormLoginInput | IFormRegisterInput
>) {
  return (
    <div className="text-error">
      <ErrorMessage errors={formState.errors} name={name} />
    </div>
  );
}
