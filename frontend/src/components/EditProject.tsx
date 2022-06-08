import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { UpdateProjectDto } from '../api/model';
import { projectControllerFindOne, projectControllerUpdate } from '../api/projects/projects';
import { accessTokenAtom } from '../state/atom';
import { IFormProjectInput } from "./CreateProject";
import { failedValidationText, MessageFailBlock, MessageSuccessBlock, unauthorizedText } from './Messages';
import { ProjectFormElems } from "./ProjectFormElems";

export const EditProject = () => {
  const [updated, setUpdated] = useState(false);
  const [resetedForm, setResetedForm] = useState(false);
  const navigate = useNavigate();
  const token = useRecoilValue(accessTokenAtom);
  const { register, handleSubmit, formState, reset } = useForm<IFormProjectInput>();
  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  };
  const [errorMessage, setErrorMessage] = useState<string>();
  const { id: projectID } = useParams();

  useEffect(() => {
    async function getProject() {
      if (projectID == null) {
        setErrorMessage("No project id, cannot retrieve the data!");
        return;
      }

      const result = await projectControllerFindOne(projectID, header);
      if (result.status == 200) {
        if (!resetedForm) {
          reset(result.data);
          setResetedForm(true);
        }
      } else if (result.status == 401) {
        setErrorMessage(unauthorizedText);
      } else if (result.status == 404) {
        setErrorMessage("Project was not found!")
      }
    }
    getProject();
  }, [])

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
    }

    const result = await projectControllerUpdate(projectID, dataForUpdate, header);
    if (result.status == 200) {
      setUpdated(true);
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    } else if (result.status == 404) {
      setErrorMessage("Project was not found!")
    }
  };

  return (
    <>
      { errorMessage ? <MessageFailBlock text={errorMessage} />
      : updated ?
        <MessageSuccessBlock text="Project was successfully edited." />
        :
        <form className="m1" onSubmit={handleSubmit(onSubmit)}>
          <ProjectFormElems
            formState={formState}
            register={register}
            buttonText="Edit project"
          />
        </form>
      }
  </>
  );
};
