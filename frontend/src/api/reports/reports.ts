/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * TrackYourTime
 * OpenAPI spec version: 1.0.0
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useSwr, { SWRConfiguration, Key } from "swr";
import type {
  StreamableFile,
  ReportControllerGenerateReportParams,
} from ".././model";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary Generates a report from the project
 */
export const reportControllerGenerateReport = (
  id: string,
  params?: ReportControllerGenerateReportParams,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<StreamableFile>> => {
  return axios.get(`/reports/project/${id}`, {
    params,
    ...options,
  });
};

export const getReportControllerGenerateReportKey = (
  id: string,
  params?: ReportControllerGenerateReportParams
) => [`/reports/project/${id}`, ...(params ? [params] : [])];

export type ReportControllerGenerateReportQueryResult = NonNullable<
  Awaited<ReturnType<typeof reportControllerGenerateReport>>
>;
export type ReportControllerGenerateReportQueryError = AxiosError<void>;

export const useReportControllerGenerateReport = <TError = AxiosError<void>>(
  id: string,
  params?: ReportControllerGenerateReportParams,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof reportControllerGenerateReport>>,
      TError
    > & { swrKey: Key };
    axios?: AxiosRequestConfig;
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnable = !!id;
  const swrKey =
    swrOptions?.swrKey ??
    (() =>
      isEnable ? getReportControllerGenerateReportKey(id, params) : null);
  const swrFn = () => reportControllerGenerateReport(id, params, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(
    swrKey,
    swrFn,
    swrOptions
  );

  return {
    swrKey,
    ...query,
  };
};
