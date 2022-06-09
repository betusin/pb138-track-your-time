import { Checkbox } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
} from "react-hook-form";
import { IFormSessionInput } from "./CreateSession";
import { DateTimePicker } from "@mui/lab";
import { StyledTextField } from "../common/StyledTextField";
import { theme } from "../../styles/theme";
import { Trans } from "react-i18next";

export interface SessionFormElemsProps {
  formState: FormState<IFormSessionInput>;
  register: UseFormRegister<IFormSessionInput>;
  buttonText: string;
  sessionData: IFormSessionInput;
  control: Control<IFormSessionInput>;
}

export const SessionFormElems = ({
  formState,
  register,
  buttonText,
  sessionData,
  control,
}: SessionFormElemsProps) => {
  return (
    <div>
      <div className="form-dates">
        <div className="form-dates__picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="fromDate"
              control={control}
              defaultValue={new Date()}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  renderInput={StyledTextField}
                  label={<Trans i18nKey="session.date_from" />}
                  value={value}
                  onChange={(value) => {
                    onChange(value);
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="form-dates__picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="toDate"
              control={control}
              defaultValue={new Date()}
              render={({ field: { onChange, value } }) => (
                <DateTimePicker
                  renderInput={StyledTextField}
                  label={<Trans i18nKey="session.date_to" />}
                  value={value}
                  onChange={(value) => {
                    onChange(value);
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>

      <Checkbox
        id="isInvoiced"
        {...register("isInvoiced")}
        style={{ color: theme.palette.secondary.light }}
        defaultChecked={sessionData.isInvoiced}
      />
      <label htmlFor="isInvoiced">
        <Trans i18nKey="session.is_invoiced" />
      </label>

      <div>
        <label>
          <Trans i18nKey="session.hourly_rate" />
        </label>
      </div>
      <input
        className={`number-field`}
        type="number"
        step={10}
        min={0}
        defaultValue={sessionData.hourlyRate}
        {...register("hourlyRate", { valueAsNumber: true })}
      />

      <div>
        <label>
          <Trans i18nKey="session.note" />
        </label>
      </div>
      <textarea
        className={`text-field ${formState.errors.note && "text-field--error"}`}
        defaultValue={sessionData.note}
        {...register("note")}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value={buttonText} />
      </div>
    </div>
  );
};
