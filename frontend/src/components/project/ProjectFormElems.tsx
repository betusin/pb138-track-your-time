import { Checkbox } from "@mui/material";
import { FormState, UseFormRegister } from "react-hook-form";
import { theme } from "../../styles/theme";
import { IFormProjectInput } from "./CreateProject";
import { ErrorFieldMessage } from '../common/ErrorFieldMessage';
import { Trans } from 'react-i18next';

export interface IProjectFormElemsProps {
  formState: FormState<IFormProjectInput>;
  register: UseFormRegister<IFormProjectInput>;
  buttonText: string;
}

export const ProjectFormElems = ({
  formState,
  register,
  buttonText,
}: IProjectFormElemsProps) => {
  return (
    <div>
      <div>
        <label>
          <Trans i18nKey="project.name" />
        </label>
      </div>
      <input
        className={`text-field ${formState.errors.name && "text-field--error"}`}
        type="text"
        {...register("name", { required: "Enter a project name" })}
      />
      <ErrorFieldMessage formState={formState} name="name" />

      <div>
        <label>
          <Trans i18nKey="project.customer" />
        </label>
      </div>
      <input className={`text-field`} type="text" {...register("customer")} />

      <div>
        <Checkbox
          id="isActive"
          {...register("isActive")}
          style={{ color: theme.palette.secondary.light }}
          defaultChecked={true}
        />
        <label htmlFor="isActive">
          <Trans i18nKey="project.is_active" />
        </label>
      </div>

      <div>
        <label>
          <Trans i18nKey="project.hourly_rate" />
        </label>
      </div>
      <input
        className={`number-field`}
        type="number"
        min={0}
        {...register("hourlyRate", { valueAsNumber: true })}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value={buttonText} />
      </div>
    </div>
  );
};
