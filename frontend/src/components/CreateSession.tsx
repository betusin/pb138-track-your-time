import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SessionFormElems } from "./SessionFormElems";
import { useApiCall } from "../util/api-caller";
import toast from "react-hot-toast";
import { failedValidationText, sessionCreatedText } from "./Messages";
import { sessionControllerCreateWrap } from "../util/api-call-wrappers";
import { GetProjectDto } from "../api/model";
import { useLoadProject } from "../util/load-entity-wrappers";
import { useParamOrEmpty } from "../util/params";

export interface IFormSessionInput {
  fromDate: Date;
  toDate: Date;
  isInvoiced: boolean;
  hourlyRate: number;
  note: string;
}

function createInitialSession(hourlyRate: number): IFormSessionInput {
  return {
    fromDate: new Date(),
    toDate: new Date(),
    isInvoiced: false,
    hourlyRate: hourlyRate,
    note: "",
  };
}

export const CreateSession = () => {
  const navigate = useNavigate();
  const doApiCall = useApiCall();
  const id = useParamOrEmpty("id");
  const data = useLoadProject(id);
  const { register, handleSubmit, formState, control } =
    useForm<IFormSessionInput>();

  if (!data) {
    return <></>;
  }
  const project: GetProjectDto = data;

  function createSession(data: IFormSessionInput) {
    const body = {
      fromDate: data.fromDate.toISOString(),
      toDate: data.toDate.toISOString(),
      hourlyRate: data.hourlyRate,
      note: data.note,
    };
    const call = sessionControllerCreateWrap(project.id);
    doApiCall(call, body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(sessionCreatedText);
    navigate(`/project/${project.id}`);
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(failedValidationText);
      return true;
    }
    return false;
  }

  return (
    <>
      <form className="m1" onSubmit={handleSubmit(createSession)}>
        <SessionFormElems
          formState={formState}
          register={register}
          control={control}
          sessionData={createInitialSession(project.hourlyRate)}
          buttonText="Create session"
        />
      </form>
    </>
  );
};
