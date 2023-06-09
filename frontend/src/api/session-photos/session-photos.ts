/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * TrackYourTime
 * OpenAPI spec version: 1.0.0
 */
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useSwr, { SWRConfiguration, Key } from "swr";
import type {
  SessionControllerCreateSessionBody,
  GetSessionPhotoDto,
  UpdateSessionPhotoDto,
} from ".././model";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * @summary Creates a new session photo for the provided project
 */
export const sessionControllerCreateSession = (
  sessionId: string,
  sessionControllerCreateSessionBody: SessionControllerCreateSessionBody,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  if (sessionControllerCreateSessionBody.file !== undefined) {
    formData.append("file", sessionControllerCreateSessionBody.file);
  }

  return axios.post(`/sessions/${sessionId}/photos`, formData, options);
};

/**
 * @summary Retrieves a session photo
 */
export const sessionPhotoControllerFindOne = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<GetSessionPhotoDto>> => {
  return axios.get(`/session_photos/${id}`, options);
};

export const getSessionPhotoControllerFindOneKey = (id: string) => [
  `/session_photos/${id}`,
];

export type SessionPhotoControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof sessionPhotoControllerFindOne>>
>;
export type SessionPhotoControllerFindOneQueryError = AxiosError<void>;

export const useSessionPhotoControllerFindOne = <TError = AxiosError<void>>(
  id: string,
  options?: {
    swr?: SWRConfiguration<
      Awaited<ReturnType<typeof sessionPhotoControllerFindOne>>,
      TError
    > & { swrKey: Key };
    axios?: AxiosRequestConfig;
  }
) => {
  const { swr: swrOptions, axios: axiosOptions } = options ?? {};

  const isEnable = !!id;
  const swrKey =
    swrOptions?.swrKey ??
    (() => (isEnable ? getSessionPhotoControllerFindOneKey(id) : null));
  const swrFn = () => sessionPhotoControllerFindOne(id, axiosOptions);

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

/**
 * @summary Updates a session photo
 */
export const sessionPhotoControllerUpdate = (
  id: string,
  updateSessionPhotoDto: UpdateSessionPhotoDto,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<UpdateSessionPhotoDto>> => {
  return axios.patch(`/session_photos/${id}`, updateSessionPhotoDto, options);
};

/**
 * @summary Deletes a session photo
 */
export const sessionPhotoControllerRemove = (
  id: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse<void>> => {
  return axios.delete(`/session_photos/${id}`, options);
};
