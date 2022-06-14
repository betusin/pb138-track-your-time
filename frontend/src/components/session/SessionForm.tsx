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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import i18n from "i18next";
import { CancelEditButton } from "../common/CancelEditButton";

const schema = yup.object().shape({
  fromDate: yup
    .date()
    .required()
    .when("toDate", {
      is: () => true,
      then: yup.date().test((schema, caw) => {
        // eslint-disable-next-line
        const from = schema!;
        const to = caw.parent.toDate;
        return from < to;
      }),
    }),
  toDate: yup.date().required(),
  isInvoiced: yup.boolean().required(),
  hourlyRate: yup.number().required().min(0),
  note: yup.string().optional(),
});

export interface SessionFormElemsProps {
  buttonText: string;
  prefill?: GetSessionDto;
  fallbackHourlyRate: number;
  onSubmit: (data: IFormSessionInput) => void;
  cancelEdit: (() => void) | undefined;
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
  cancelEdit,
}: SessionFormElemsProps) => {
  const { register, handleSubmit, formState, control, reset } =
    useForm<IFormSessionInput>({
      defaultValues: {
        fromDate: parseOrNull(prefill?.fromDate) ?? new Date(),
        toDate: parseOrNull(prefill?.toDate) ?? new Date(),
        isInvoiced: prefill?.isInvoiced ?? false,
        hourlyRate: prefill?.hourlyRate ?? fallbackHourlyRate,
        note: prefill?.note ?? "",
      },
      resolver: yupResolver(schema),
    });
  function onFormStateChanged() {
    for (const errorsKey in formState.errors) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const error = formState.errors[errorsKey];
      if (error.ref["name"] == "fromDate") {
        toast.error(i18n.t("error.bad_date_range"));
      }
    }
  }
  useEffect(onFormStateChanged, [formState]);
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

        <div
          className={`btn-wrapper ${
            cancelEdit !== undefined && "btn-wrapper--even"
          }`}
        >
          {cancelEdit !== undefined && (
            <CancelEditButton
              cancelEdit={handleSubmit(cancelEdit)}
              reset={reset}
            />
          )}
          <input
            className="btn btn--primary m05"
            type="submit"
            value={buttonText}
          />
        </div>
      </div>
    </form>
  );
};
