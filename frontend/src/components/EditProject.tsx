import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UpdateProjectDto } from "../api/model";
import {
  projectControllerFindOne,
  projectControllerUpdate,
} from "../api/projects/projects";
import { accessTokenAtom } from "../state/atom";
import { IFormProjectInput } from "./CreateProject";
import {
  failedValidationText,
  noProjectFoundText,
  noProjectIdText,
  unauthorizedText,
  unexpectedErrorText,
} from "./Messages";
import { Navbar } from "./Navbar";
import { ProjectFormElems } from "./ProjectFormElems";

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

  const { id: projectID } = useParams();

  useEffect(() => {
    async function getProject() {
      if (!projectID) {
        toast.error(noProjectIdText);
        return;
      }
      const result = await projectControllerFindOne(projectID, header);
      if (result.status == 200) {
        console.log(result.data);
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
    getProject();
  }, []);

  const onSubmit: SubmitHandler<IFormProjectInput> = async (
    data: IFormProjectInput
  ) => {
    if (projectID == null) {
      toast.error(noProjectIdText);
      return;
    }

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
    <div className="App">
      <Navbar />
      <Toaster />
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <ProjectFormElems
          formState={formState}
          register={register}
          buttonText="Edit project"
        />
      </form>
    </div>
  );
};
