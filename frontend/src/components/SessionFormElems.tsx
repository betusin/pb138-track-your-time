import { Checkbox, FormControlLabel } from "@mui/material";
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
import { StyledTextField } from "./StyledTextField";
import { theme } from "../styles/theme";

export interface ISessiontFormElemsProps {
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
}: ISessiontFormElemsProps) => {
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
                  label="DateTimePicker"
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
                  label="DateTimePicker"
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

      <FormControlLabel
        control={
          <Checkbox
            {...register("isInvoiced")}
            style={{ color: theme.palette.secondary.light }}
            defaultChecked={sessionData.isInvoiced}
          />
        }
        label="is invoiced"
      />

      <div>
        <label>Hourly rate</label>
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
        <label>Note</label>
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
