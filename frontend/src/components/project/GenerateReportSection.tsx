import { useEffect, useState } from "react";
import { StyledTextField } from "../common/StyledTextField";
import { Trans } from "react-i18next";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import toast from "react-hot-toast";
import i18n from "../../i18n/i18n";
import {
  dateFormatReportFileName,
  datePickerOptions,
} from "../../util/date-formatting";
import { useRecoilValue } from "recoil";
import { accessTokenAtom } from "../../state/atom";
import axios from "axios";
import fileDownload from "js-file-download";
import moment from "moment";

export interface GenerateReportSectionProps {
  projectId: string;
}

function getReportFileName(from: Date, to: Date) {
  const fromStr = moment(from).format(dateFormatReportFileName);
  const toStr = moment(to).format(dateFormatReportFileName);
  return `report_${fromStr}_${toStr}.pdf`;
}

export function GenerateReportSection({
  projectId,
}: GenerateReportSectionProps) {
  const token = useRecoilValue(accessTokenAtom);
  const [from, setFrom] = useState<Date>(new Date());
  const [to, setTo] = useState<Date>(new Date());
  useEffect(() => {
    const other = new Date(from);
    other.setMonth(from.getMonth() - 1);
    setFrom(other);
  }, []);

  function onGenerateClicked() {
    if (from > to) {
      toast.error(i18n.t("error.bad_date_range"));
      return;
    }
    const name = getReportFileName(from, to);
    generateReport(from, to, name);
  }

  function generateReport(from: Date, to: Date, name: string) {
    axios({
      url: `/reports/project/${projectId}?from=${from.toUTCString()}&to=${to.toUTCString()}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          fileDownload(response.data, name);
        } else {
          toast.error(i18n.t("error.unexpected"));
          console.error(response);
        }
      })
      .catch((e) => {
        toast.error(i18n.t("error.unexpected"));
        console.error(e);
      });
  }

  return (
    <div className="form">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="form--inner-container">
          <div className="form--adjacent-group">
            <div className="form--field">
              <DatePicker
                {...datePickerOptions}
                renderInput={StyledTextField}
                label={<Trans i18nKey="session.date_from" />}
                value={from}
                onChange={(e) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  setFrom(e!);
                }}
              />
            </div>
            <div className="form--field">
              <DatePicker
                {...datePickerOptions}
                renderInput={StyledTextField}
                label={<Trans i18nKey="session.date_to" />}
                value={to}
                onChange={(e) => {
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  setTo(e!);
                }}
              />
            </div>
          </div>
          <div className="btn-wrapper">
            <button
              className="btn btn--primary"
              type="button"
              onClick={onGenerateClicked}
            >
              <Trans i18nKey="operation.download" />
            </button>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
}
