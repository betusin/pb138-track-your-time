import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  MessageFailBlock,
  MessageSuccessBlock,
  unauthorizedText,
} from "./Messages";
import { Navbar } from "./Navbar";
import { ProjectFormElems } from "./ProjectFormElems";

export const EditProject = () => {
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);
  const { register, handleSubmit, formState, setValue } =
    useForm<IFormProjectInput>();
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const [errorMessage, setErrorMessage] = useState<string>();

  const { id: projectID } = useParams();

  useEffect(() => {
    async function getProject() {
      if (!projectID) {
        setErrorMessage("No project id, cannot retrieve the data!");
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
        setErrorMessage(unauthorizedText);
      } else if (result.status == 404) {
        setErrorMessage("Project was not found!");
      }
    }
    getProject();
  }, []);

  const onSubmit: SubmitHandler<IFormProjectInput> = async (
    data: IFormProjectInput
  ) => {
    if (projectID == null) {
      setErrorMessage("No project id, cannot retrieve the data!");
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
      setUpdated(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    } else if (result.status == 404) {
      setErrorMessage("Project was not found!");
    }
  };

  return (
    <div className="App">
      <Navbar />
      {errorMessage && <MessageFailBlock text={errorMessage} />}
      {updated ? (
        <MessageSuccessBlock text="Project was successfully edited." />
      ) : (
        <form className="m1" onSubmit={handleSubmit(onSubmit)}>
          <ProjectFormElems
            formState={formState}
            register={register}
            buttonText="Edit project"
          />
        </form>
      )}
    </div>
  );
};
