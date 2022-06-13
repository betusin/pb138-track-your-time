import { Checkbox } from "@mui/material";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { theme } from "../../styles/theme";
import { IFormProjectInput } from "./CreateProject";
import { Trans } from "react-i18next";

export interface IProjectFormElemsProps {
  formState: FormState<IFormProjectInput>;
  register: UseFormRegister<IFormProjectInput>;
  control: Control<IFormProjectInput>;
  buttonText: string;
}

export const ProjectFormElems = ({
  formState,
  register,
  control,
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
        {...register("name", { required: true })}
      />

      <div>
        <label>
          <Trans i18nKey="project.customer" />
        </label>
      </div>
      <input className={`text-field`} type="text" {...register("customer")} />

      <div>
        <Controller
          name="isActive"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              id="isActive"
              checked={value === undefined ? true : value}
              style={{ color: theme.palette.secondary.light }}
              onChange={onChange}
            />
          )}
        ></Controller>
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
