import { GetProjectDto, GetSessionDto } from "../api/model";
import {
  useProjectControllerFindAllSessions,
  useProjectControllerFindOne,
} from "../api/projects/projects";
import { noProjectFoundText, sessionNotFoundText } from "../strings";
import { loadEntity, loadEntityById } from "./load-entity";
import { useSessionControllerFindOne } from "../api/sessions/sessions";
import { useMeControllerFindAll } from "../api/me/me";
import { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";

export function useLoadProjects(): [
  GetProjectDto[] | undefined,
  KeyedMutator<AxiosResponse>
] {
  const [result, mutate] = loadEntity(
    useMeControllerFindAll,
    noProjectFoundText
  );
  return [result, mutate];
}

export function useLoadProject(id: string): GetProjectDto | undefined {
  return loadEntityById(id, useProjectControllerFindOne, noProjectFoundText);
}

export function useLoadSession(id: string): GetSessionDto {
  return loadEntityById(id, useSessionControllerFindOne, sessionNotFoundText);
}

export function useLoadSessions(
  id: string
): [GetSessionDto[] | undefined, string] {
  const [data, mutate] = loadEntity((a) => {
    return useProjectControllerFindAllSessions(id, a);
  }, sessionNotFoundText);
  return [data, mutate];
}
