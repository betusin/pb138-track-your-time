import { Checkbox } from "@mui/material";
import { FormState, UseFormRegister } from "react-hook-form";
import { theme } from "../../styles/theme";
import { IFormProjectInput } from "./CreateProject";
import { Trans } from "react-i18next";

export interface IProjectFormElemsProps {
  formState: FormState<IFormProjectInput>;
  register: UseFormRegister<IFormProjectInput>;
  buttonText: string;
  cancelEdit: (() => void) | undefined;
}

export const ProjectFormElems = ({
  formState,
  register,
  buttonText,
  cancelEdit,
}: IProjectFormElemsProps) => {
  return (
    <div className="form--inner-container">
      <div className="form--field">
        <div>
          <label>
            <Trans i18nKey="project.name" />
          </label>
        </div>
        <input
          className={`text-field ${
            formState.errors.name && "text-field--error"
          }`}
          type="text"
          {...register("name", { required: true })}
        />
      </div>

      <div className="form--field">
        <div>
          <label>
            <Trans i18nKey="project.customer" />
          </label>
        </div>
        <input className={`text-field`} type="text" {...register("customer")} />
      </div>

      <div className="form--field">
        <label htmlFor="isActive">
          <Trans i18nKey="project.is_active" />
        </label>
        <div>
          <Checkbox
            id="isActive"
            {...register("isActive")}
            style={{ color: theme.palette.secondary.light }}
            defaultChecked={true}
          />
        </div>
      </div>

      <div className="form--field">
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
      </div>

      <div
        className={`btn-wrapper ${
          cancelEdit !== undefined && "btn-wrapper--even"
        }`}
      >
        {cancelEdit !== undefined && (
          <button className="btn--secondary btn m05" onClick={cancelEdit}>
            <Trans i18nKey="form.cancel_edit" />
          </button>
        )}
        <input
          className="btn btn--primary m05"
          type="submit"
          value={buttonText}
        />
      </div>
    </div>
  );
};
