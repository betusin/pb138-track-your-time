import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IFormSessionInput } from "./CreateSession";
import { SessionFormElems } from "./SessionFormElems";
import { useLoadSession } from "../../util/load-entity-wrappers";
import { GetSessionDto } from "../../api/model";
import { sessionControllerUpdateWrap } from "../../util/api-call-wrappers";
import toast from "react-hot-toast";
import { useApiCall } from "../../util/api-caller";
import { useSWRConfig } from "swr";
import { getSessionControllerFindOneKey } from "../../api/sessions/sessions";
import { useParamOrEmpty } from "../../util/params";
import { LoadingPlaceholder } from "../common/LoadingPlaceholder";
import i18n from "../../i18n/i18n";

export const EditSession = () => {
  const navigate = useNavigate();
  const apiCall = useApiCall();
  const { mutate } = useSWRConfig();

  const id = useParamOrEmpty("id");
  const maybeSession = useLoadSession(id);

  const { register, handleSubmit, formState, control } =
    useForm<IFormSessionInput>();

  if (maybeSession === undefined) {
    return <LoadingPlaceholder />;
  }
  const session: GetSessionDto = maybeSession;

  function updateSession(data: IFormSessionInput) {
    const body = {
      fromDate: data.fromDate.toISOString(),
      toDate: data.toDate.toISOString(),
      hourlyRate: data.hourlyRate,
      note: data.note,
    };
    const call = sessionControllerUpdateWrap(id);
    apiCall(call, body, onSuccess, onError);
  }

  function onSuccess() {
    toast.success(i18n.t("session.updated"));
    mutate(getSessionControllerFindOneKey(id)).catch(() =>
      toast.error(i18n.t("error.refresh_failed"))
    );
    navigate(`/project/${session.projectId}`);
  }

  function onError(code: number) {
    if (code == 400) {
      toast.error(i18n.t("error.validation_failed"));
      return true;
    }
    return false;
  }

  const prefill: IFormSessionInput = {
    fromDate: new Date(session.fromDate),
    toDate: new Date(session.toDate),
    isInvoiced: session.isInvoiced,
    hourlyRate: session.hourlyRate ?? 0,
    note: session.note ?? "",
  };
  return (
    <>
      <form className="m1" onSubmit={handleSubmit(updateSession)}>
        <SessionFormElems
          formState={formState}
          register={register}
          sessionData={prefill}
          control={control}
          buttonText="Edit session"
        />
      </form>
    </>
  );
};
