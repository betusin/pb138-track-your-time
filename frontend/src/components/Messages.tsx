import { ErrorOutline, CheckCircleOutlined } from "@mui/icons-material";

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

export const unauthorizedText = "Unauthorized operation!";

export const failedValidationText = "Field validation failed!";

export const unexpectedErrorText = "Unexpected error occurred!";

export const noProjectFoundText = "Project was not found!";

export const noProjectIdText = "No project id, cannot retrieve the data!";

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
