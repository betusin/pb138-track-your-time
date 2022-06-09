/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * TrackYourTime
 * OpenAPI spec version: 1.0.0
 */
import axios,{
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import useSwr,{
  SWRConfiguration,
  Key
} from 'swr'
import type {
  CreateSessionDto,
  GetSessionDto,
  UpdateSessionDto,
  SessionControllerCreateSessionBody
} from '.././model'


  type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;


  /**
 * @summary Creates a new session for the provided project
 */
export const projectControllerCreateSession = (
    projectId: string,
    createSessionDto: CreateSessionDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/projects/${projectId}/sessions`,
      createSessionDto,options
    );
  }


/**
 * @summary Returns all sessions of a project
 */
export const projectControllerFindAllSessions = (
    projectId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetSessionDto[]>> => {
    return axios.get(
      `/projects/${projectId}/sessions`,options
    );
  }


export const getProjectControllerFindAllSessionsKey = (projectId: string,) => [`/projects/${projectId}/sessions`];

    
export type ProjectControllerFindAllSessionsQueryResult = NonNullable<Awaited<ReturnType<typeof projectControllerFindAllSessions>>>
export type ProjectControllerFindAllSessionsQueryError = AxiosError<void>

export const useProjectControllerFindAllSessions = <TError = AxiosError<void>>(
 projectId: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof projectControllerFindAllSessions>>, TError> & {swrKey: Key}, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnable = !!(projectId)
  const swrKey = swrOptions?.swrKey ?? (() => isEnable ? getProjectControllerFindAllSessionsKey(projectId) : null);
  const swrFn = () => projectControllerFindAllSessions(projectId, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Retrieves a session
 */
export const sessionControllerFindOne = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<GetSessionDto>> => {
    return axios.get(
      `/sessions/${id}`,options
    );
  }


export const getSessionControllerFindOneKey = (id: string,) => [`/sessions/${id}`];

    
export type SessionControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof sessionControllerFindOne>>>
export type SessionControllerFindOneQueryError = AxiosError<void>

export const useSessionControllerFindOne = <TError = AxiosError<void>>(
 id: string, options?: { swr?:SWRConfiguration<Awaited<ReturnType<typeof sessionControllerFindOne>>, TError> & {swrKey: Key}, axios?: AxiosRequestConfig }

  ) => {

  const {swr: swrOptions, axios: axiosOptions} = options ?? {}

  const isEnable = !!(id)
  const swrKey = swrOptions?.swrKey ?? (() => isEnable ? getSessionControllerFindOneKey(id) : null);
  const swrFn = () => sessionControllerFindOne(id, axiosOptions);

  const query = useSwr<Awaited<ReturnType<typeof swrFn>>, TError>(swrKey, swrFn, swrOptions)

  return {
    swrKey,
    ...query
  }
}

/**
 * @summary Updates a session
 */
export const sessionControllerUpdate = (
    id: string,
    updateSessionDto: UpdateSessionDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<UpdateSessionDto>> => {
    return axios.patch(
      `/sessions/${id}`,
      updateSessionDto,options
    );
  }


/**
 * @summary Deletes a session
 */
export const sessionControllerRemove = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/sessions/${id}`,options
    );
  }


/**
 * @summary Creates a new session photo for the provided project
 */
export const sessionControllerCreateSession = (
    sessionId: string,
    sessionControllerCreateSessionBody: SessionControllerCreateSessionBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {const formData = new FormData();
if(sessionControllerCreateSessionBody.file !== undefined) {
 formData.append('file', sessionControllerCreateSessionBody.file)
 }

    return axios.post(
      `/sessions/${sessionId}/photos`,
      formData,options
    );
  }


