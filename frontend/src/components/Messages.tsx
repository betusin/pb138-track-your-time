import { ErrorOutline, CheckCircleOutlined } from "@mui/icons-material";
import { IFormProjectInput } from "./CreateProject";
import { ErrorMessage } from "@hookform/error-message";
import { FormState } from "react-hook-form";
import { IFormLoginInput, IFormRegisterInput } from "./auth/AuthForm";

interface IMessagesProps {
  text: string;
}

export const MessageFailBlock = ({ text }: IMessagesProps) => {
  return (
    <div className="m1">
      <div className="flex-center">
        <div className="flex-center message message--error">
          <ErrorOutline color="error" />
          &nbsp;{text}
        </div>
      </div>
    </div>
  );
};

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

export const unauthorizedText = "Unauthorized operation!";

export const failedValidationText = "Field validation failed!";

export const unexpectedErrorText = "Unexpected error occurred!";

export const noProjectFoundText = "Project was not found!";

export const noProjectIdText = "No project id, cannot retrieve the data!";

export const dataRefreshFailedText = "Failed to refresh data!";

export const projectDeletedText = "Project deleted successfully.";

export const MessageSuccessBlock = ({ text }: IMessagesProps) => {
  return (
    <div className="m1">
      <div className="flex-center">
        <div className="flex-center message message--success">
          <CheckCircleOutlined color="success" />
          &nbsp;{text}
        </div>
      </div>
    </div>
  );
};
