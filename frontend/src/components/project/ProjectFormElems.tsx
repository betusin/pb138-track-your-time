import { Checkbox } from "@mui/material";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { theme } from "../../styles/theme";
import { IFormProjectInput } from "./CreateProject";
import { ErrorFieldMessage } from "../common/ErrorFieldMessage";
import { Trans } from "react-i18next";
import i18n from "../../i18n/i18n";
import { CancelEditButton } from "../common/CancelEditButton";

export interface IProjectFormElemsProps {
  formState: FormState<IFormProjectInput>;
  register: UseFormRegister<IFormProjectInput>;
  control: Control<IFormProjectInput>;
  buttonText: string;
  cancelEdit: (() => void) | undefined;
}

export const ProjectFormElems = ({
  formState,
  register,
  control,
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
          {...register("name", {
            required: {
              message: i18n.t("form.validation.project.name"),
              value: true,
            },
          })}
        />
        <ErrorFieldMessage formState={formState} name="name" />
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
          className={`number-field ${
            formState.errors.hourlyRate && "number-field--error"
          }`}
          type="number"
          min={0}
          defaultValue={0}
          {...register("hourlyRate", {
            valueAsNumber: true,
            required: {
              message: i18n.t("form.validation.project.hourly_rate"),
              value: true,
            },
          })}
        />
        <ErrorFieldMessage formState={formState} name="hourlyRate" />
      </div>

      <div
        className={`btn-wrapper ${
          cancelEdit !== undefined && "btn-wrapper--even"
        }`}
      >
        {cancelEdit !== undefined && (
          <CancelEditButton cancelEdit={cancelEdit} />
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
