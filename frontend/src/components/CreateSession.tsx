import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { TextField } from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from 'recoil';
import { CreateSessionDto } from '../api/model';
import { projectControllerCreateSession } from '../api/sessions/sessions';
import { accessTokenAtom } from '../state/atom';
import { useEffect, useState } from 'react';
import { failedValidationText, MessageFailBlock, MessageSuccessBlock, unauthorizedText } from './Messages';
import { format } from 'date-fns';
import { projectControllerFindOne } from '../api/projects/projects';

export const CreateSession = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
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
  const { register, handleSubmit, formState, setValue } = useForm<CreateSessionDto>();

  useEffect(() => {
    async function getProjectHourlyRate() {
      if (projectId != null) {
        const result = await projectControllerFindOne(projectId, header);
        if (result.status == 200) {
          setValue('hourlyRate', result.data.hourlyRate);
        } else if (result.status == 401) {
          setErrorMessage(unauthorizedText);
        } else if (result.status == 404) {
          setErrorMessage("Project was not found!");
        }
      }
    }
    getProjectHourlyRate();
  }, []);

  const onSubmit = async (data: CreateSessionDto) => {
    data.toDate = format(toDate, "yyyy-MM-dd'T'HH:mm:ss.SS'Z'");
    data.fromDate = format(fromDate, "yyyy-MM-dd'T'HH:mm:ss.SS'Z'");
    const result = await projectControllerCreateSession(projectId!, data, header);
    if (result.status == 201) {
      setSuccessMessage("Session was created successfully.");
      setTimeout(() => {
        navigate("/project/" + projectId);
      }, 1500)
    } else if (result.status == 400) {
      setErrorMessage(failedValidationText);
    } else if (result.status == 401) {
      setErrorMessage(unauthorizedText);
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

        <div>
          <label>Hourly rate</label>
        </div>
        <input
          className={`number-field`}
          type="number"
          step={10}
          min={0}
          defaultValue={0}
          {...register("hourlyRate", { valueAsNumber: true })}
        />

        <div>
          <label>Note</label>
        </div>
        <textarea
          className={`text-field ${formState.errors.note && "text-field--error"}`}
          {...register("note")}
        />

        <div className="btn-wrapper">
          <input className="btn btn--primary" type="submit" value="Create session" />
        </div>
      </form>
    </>
  );
};
