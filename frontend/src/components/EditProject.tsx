import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GetProjectDto, UpdateProjectDto } from "../api/model";
import {
  projectControllerFindOne,
  projectControllerUpdate,
} from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import { IFormProjectInput } from "./CreateProject";
import {
  failedValidationText,
  noProjectFoundText,
  unauthorizedText,
  unexpectedErrorText,
} from "./Messages";
import { ProjectFormElems } from "./ProjectFormElems";

function onProjectReceived(
  result: AxiosResponse<GetProjectDto>,
  setValue: UseFormSetValue<IFormProjectInput>
) {
  if (result.status == 200) {
    if (result.data.customer != null)
      setValue("customer", result.data.customer);
    setValue("hourlyRate", result.data.hourlyRate);
    setValue("isActive", result.data.isActive);
    setValue("name", result.data.name);
  } else if (result.status == 401) {
    toast.error(unauthorizedText);
  } else if (result.status == 404) {
    toast.error(noProjectFoundText);
  } else {
    toast.error(unexpectedErrorText);
  }
}

export const EditProject = () => {
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);
  const { register, handleSubmit, formState, setValue } =
    useForm<IFormProjectInput>();
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { id: projectIDParam } = useParams();
  const projectID = projectIDParam ?? "";

  useEffect(() => {
    projectControllerFindOne(projectID, header)
      .then((result) => onProjectReceived(result, setValue))
      .catch(() => toast.error(unexpectedErrorText));
  }, []);

  const onSubmit: SubmitHandler<IFormProjectInput> = async (
    data: IFormProjectInput
  ) => {
    const dataForUpdate: UpdateProjectDto = {
      name: data.name,
      hourlyRate: data.hourlyRate,
      customer: data.customer,
      isActive: data.isActive,
    };

    const result = await projectControllerUpdate(
      projectID,
      dataForUpdate,
      header
    );
    if (result.status == 200) {
      toast.success("Project was successfully updated.");
      navigate("/");
    } else if (result.status == 400) {
      toast.error(failedValidationText);
    } else if (result.status == 401) {
      toast.error(unauthorizedText);
    } else if (result.status == 404) {
      toast.error(noProjectFoundText);
    } else {
      toast.error(unexpectedErrorText);
    }
  };

  return (
    <>
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Edit project"
        />
      </form>
    </>
  );
};
