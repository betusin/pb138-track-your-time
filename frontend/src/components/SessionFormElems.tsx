import { Checkbox, FormControlLabel } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useState } from "react";
import { FormState, UseFormRegister } from "react-hook-form";
import { IFormSessionInput } from "./CreateSession";
import { DateTimePicker } from "@mui/lab";
import { StyledTextField } from "./StyledTextField";
import { theme } from "../styles/theme";

export interface ISessiontFormElemsProps {
  formState: FormState<IFormSessionInput>;
  register: UseFormRegister<IFormSessionInput>;
  buttonText: string;
  sessionData: IFormSessionInput;
}

export const SessionFormElems = ({
  formState,
  register,
  buttonText,
  sessionData,
}: ISessiontFormElemsProps) => {
  const [fromDate, setFromDate] = useState(sessionData.fromDate);
  const [toDate, setToDate] = useState(sessionData.toDate);

  return (
    <div>
      <div className="form-dates">
        <div className="form-dates__picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={StyledTextField}
              label="DateTimePicker"
              value={fromDate}
              onChange={(newValue) => {
                if (newValue != null) {
                  setFromDate(newValue);
                }
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="form-dates__picker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={StyledTextField}
              label="DateTimePicker"
              value={toDate}
              onChange={(newValue) => {
                if (newValue != null) {
                  setToDate(newValue);
                }
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      <FormControlLabel
        control={
          <Checkbox
            {...register("isInvoiced")}
            style={{ color: theme.palette.primary.light }}
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
        defaultValue={sessionData.hourly_rate}
        {...register("hourly_rate", { valueAsNumber: true })}
      />

      <div>
        <label>Note</label>
      </div>
      <textarea
        className={`text-field ${formState.errors.note && "text-field--error"}`}
        value={sessionData.note}
        {...register("note")}
      />

      <div className="btn-wrapper">
        <input className="btn btn--primary" type="submit" value={buttonText} />
      </div>
    </div>
  );
};
