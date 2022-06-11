import { Checkbox } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Controller, useForm } from "react-hook-form";
import { IFormSessionInput } from "./CreateSession";
import { DateTimePicker } from "@mui/lab";
import { StyledTextField } from "../common/StyledTextField";
import { theme } from "../../styles/theme";
import { Trans } from "react-i18next";
import { GetSessionDto } from "../../api/model";
import { dateTimeFormat, dateTimeMask } from "../../util/date-formatting";

export interface SessionFormElemsProps {
  buttonText: string;
  prefill?: GetSessionDto;
  fallbackHourlyRate: number;
  onSubmit: (data: IFormSessionInput) => void;
}

function parseOrNull(date?: string): Date | undefined {
  if (!date) {
    return undefined;
  }
  return new Date(date);
}

const dateTimePickerOptions = {
  inputFormat: dateTimeFormat,
  mask: dateTimeMask,
  ampm: false,
};

export const SessionForm = ({
  buttonText,
  prefill,
  fallbackHourlyRate,
  onSubmit,
}: SessionFormElemsProps) => {
  const { register, handleSubmit, formState, control } =
    useForm<IFormSessionInput>({
      defaultValues: {
        fromDate: parseOrNull(prefill?.fromDate) ?? new Date(),
        toDate: parseOrNull(prefill?.toDate) ?? new Date(),
        isInvoiced: prefill?.isInvoiced ?? false,
        hourlyRate: prefill?.hourlyRate ?? fallbackHourlyRate,
        note: prefill?.note ?? "",
      },
    });
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--inner-container">
        <div className="form--adjacent-group">
          <div className="form--field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="fromDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    {...dateTimePickerOptions}
                    renderInput={StyledTextField}
                    label={<Trans i18nKey="session.date_from" />}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="form--field">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="toDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DateTimePicker
                    {...dateTimePickerOptions}
                    renderInput={StyledTextField}
                    label={<Trans i18nKey="session.date_to" />}
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="form--adjacent-group">
          <div className="form--field">
            <label htmlFor="isInvoiced">
              <Trans i18nKey="session.is_invoiced" />
            </label>
            <div>
              <Checkbox
                id="isInvoiced"
                {...register("isInvoiced")}
                style={{ color: theme.palette.secondary.light }}
              />
            </div>
          </div>

          <div className="form--field">
            <label>
              <Trans i18nKey="session.hourly_rate" />
            </label>
            <input
              className={`number-field`}
              type="number"
              min={0}
              {...register("hourlyRate", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="form--field">
          <div>
            <label>
              <Trans i18nKey="session.note" />
            </label>
          </div>
          <textarea
            className={`text-field form-textarea ${
              formState.errors.note && "text-field--error"
            }`}
            {...register("note")}
          />
        </div>

        <div className="btn-wrapper">
          <input
            className="btn btn--primary"
            type="submit"
            value={buttonText}
          />
        </div>
      </div>
    </form>
  );
};
