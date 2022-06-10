import { SWRResponse } from "swr";
import { AxiosError, AxiosResponse } from "axios";
import { SwrCallOptions, useApiSwrCall } from "./api-caller";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export function loadEntityById<
  T extends SWRResponse<AxiosResponse, AxiosError<void>>
>(
  id: string,
  apiCall: (id: string, options: SwrCallOptions) => T,
  onNotFound: string
) {
  const navigate = useNavigate();
  const { data } = useApiSwrCall((o) => {
    return apiCall(id, o);
  });
  useEffect(() => {
    if (data?.status == 404) {
      toast.error(onNotFound);
      navigate("/");
    }
  }, [data]);
  return data?.data;
}

export function loadEntity<
  T extends SWRResponse<AxiosResponse, AxiosError<void>>
>(apiCall: (options: SwrCallOptions) => T, onNotFound: string) {
  const navigate = useNavigate();
  const { data, mutate } = useApiSwrCall((o) => {
    return apiCall(o);
  });
  useEffect(() => {
    if (data?.status == 404) {
      toast.error(onNotFound);
      navigate("/");
    }
  }, [data]);
  return [data?.data, mutate];
}
