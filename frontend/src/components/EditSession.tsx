import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sessionData } from "../static/sessions";
import { IFormSessionInput } from "./CreateSession";
import { SessionFormElems } from "./SessionFormElems";

export const EditSession = () => {
  const navigate = useNavigate();
  const projectID = "randomID";

  const session = sessionData[0];

  const { register, handleSubmit, formState } = useForm<IFormSessionInput>();

  const onSubmit = (data: IFormSessionInput) => {
    console.log(data);
    window.alert("new session would be created with data: ");

    navigate("/project/" + projectID);
  };

  return (
    <>
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <SessionFormElems
          formState={formState}
          register={register}
          sessionData={session}
          buttonText="Edit session"
        />
      </form>
    </>
  );
};
