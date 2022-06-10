import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SessionFormElems } from "./SessionFormElems";
import { useApiCall } from "../../util/api-caller";
import toast from "react-hot-toast";
import { sessionControllerCreateWrap } from "../../util/api-call-wrappers";
import { GetProjectDto } from "../../api/model";
import { useLoadProject } from "../../util/load-entity-wrappers";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import { useParamOrEmpty } from "../../util/params";
import i18n from "../../i18n/i18n";
import { ScreenTitle } from "../common/ScreenTitle";

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
  const { register, handleSubmit, formState, control } =
    useForm<IFormSessionInput>();
  const id = useParamOrEmpty("id");
  const maybeProject = useLoadProject(id);
  if (maybeProject === undefined) {
    return <LoadingPlaceholder />;
  }
  const project: GetProjectDto = maybeProject;

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
    toast.success(i18n.t("session.created"));
    navigate(`/project/${project.id}`);
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  return (
    <>
      <ScreenTitle title={i18n.t("screen.session_add")} />
      <form className="m1" onSubmit={handleSubmit(createSession)}>
        <SessionFormElems
          formState={formState}
          register={register}
          control={control}
          sessionData={createInitialSession(project.hourlyRate)}
          buttonText={i18n.t("session.create")}
        />
      </form>
    </>
  );
};
