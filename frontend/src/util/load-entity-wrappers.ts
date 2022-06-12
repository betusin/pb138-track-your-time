import {
  GetProjectDto,
  GetSessionDto,
  GetSessionWithPhotosDto,
  GetUserDto,
} from "../api/model";
import {
  useProjectControllerFindAllSessions,
  useProjectControllerFindOne,
} from "../api/projects/projects";
import { loadEntity, loadEntityById } from "./load-entity";
import { useSessionControllerFindOne } from "../api/sessions/sessions";
import { useMeControllerFindAll, useMeControllerProfile } from "../api/me/me";
import { KeyedMutator } from "swr";
import { AxiosResponse } from "axios";
import i18n from "../i18n/i18n";

export function useLoadProjects(): [
  GetProjectDto[] | undefined,
  KeyedMutator<AxiosResponse>
] {
  const [result, mutate] = loadEntity(
    useMeControllerFindAll,
    i18n.t("project.not_found")
  );
  return [result, mutate];
}

export function useLoadProject(id: string): GetProjectDto | undefined {
  return loadEntityById(
    id,
    useProjectControllerFindOne,
    i18n.t("project.not_found")
  );
}

export function useLoadSession(id: string): GetSessionWithPhotosDto {
  return loadEntityById(
    id,
    useSessionControllerFindOne,
    i18n.t("session.not_found")
  );
}

export function useLoadSessions(
  id: string
): [GetSessionDto[] | undefined, string] {
  const [data, mutate] = loadEntity((a) => {
    return useProjectControllerFindAllSessions(id, a);
  }, i18n.t("session.not_found"));
  return [data, mutate];
}

export function useLoadProfile(): [
  GetUserDto | undefined,
  KeyedMutator<AxiosResponse>
] {
  const [result, mutate] = loadEntity(
    useMeControllerProfile,
    i18n.t("profile.not_found")
  );
  return [result, mutate];
}
