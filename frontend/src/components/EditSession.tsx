import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { GetSessionDto, UpdateSessionDto } from '../api/model';
import { sessionControllerFindOne, sessionControllerUpdate } from '../api/sessions/sessions';
import { accessTokenAtom } from '../state/atom';
import { failedValidationText, MessageFailBlock, MessageSuccessBlock, unauthorizedText } from './Messages';

export const EditSession = () => {
  const navigate = useNavigate();
  const { projectId, sessionId } = useParams();
  const [session, setSession] = useState<GetSessionDto>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [toDate, setToDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(new Date());
  const token = useRecoilValue(accessTokenAtom);
  const header = {
    headers: {
      Authorization: 'Bearer ' + token,
    }
  };
  const { register, handleSubmit, formState } = useForm<UpdateSessionDto>();

  useEffect(() => {
    async function getSession() {
      const result = await sessionControllerFindOne(sessionId!, header);
      if (result.status == 200) {
        setSession(result.data);
        setFromDate(new Date(result.data.fromDate));
        setToDate(new Date(result.data.toDate));
      } else if (result.status == 401) {
        setErrorMessage(unauthorizedText);
      } else if (result.status == 404) {
        setErrorMessage('Session was not found');
      }
    }
    getSession();
  }, []);

  const onSubmit = async (data: UpdateSessionDto) => {
    data.toDate = format(toDate, "yyyy-MM-dd'T'HH:mm:ss.SS'Z'");
    data.fromDate = format(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SS'Z'");
    const result = await sessionControllerUpdate(sessionId!, data, header);
    if (result.status == 200) {
      setSuccessMessage("Session was updated successfully.");
      setTimeout(() => {
        navigate("/project/" + projectId);
      }, 1500)
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
    } else if (result.status == 404) {
      setErrorMessage('Session was not found');
    }
  };

  return (
    <>
      { errorMessage && <MessageFailBlock text={errorMessage} /> }
      { successMessage && <MessageSuccessBlock text={successMessage} /> }
      <form className="m1" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-dates">
          <div className="form-dates__picker">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={fromDate}
                {...register("fromDate")}
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
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={toDate}
                {...register("toDate")}
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
              defaultChecked={session?.isInvoiced}
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
          defaultValue={session?.hourlyRate ? session?.hourlyRate : 0}
          {...register("hourlyRate", { valueAsNumber: true })}
        />

        <div>
          <label>Note</label>
        </div>
        <textarea
          className={`text-field ${formState.errors.note && "text-field--error"}`}
          defaultValue={session?.note}
          {...register("note")}
        />

        <div className="btn-wrapper">
          <input className="btn btn--primary" type="submit" value="Update session" />
        </div>
      </form>
    </>
  );
};
