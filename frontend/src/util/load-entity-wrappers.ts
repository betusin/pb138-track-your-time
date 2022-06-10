import { GetProjectDto, GetSessionDto } from "../api/model";
import { useProjectControllerFindOne } from "../api/projects/projects";
import {
  noProjectFoundText,
  sessionNotFoundText,
} from "../components/Messages";
import { loadEntityById } from "./load-entity";
import { useSessionControllerFindOne } from "../api/sessions/sessions";

export function useLoadProject(id: string): GetProjectDto | undefined {
  return loadEntityById(id, useProjectControllerFindOne, noProjectFoundText);
}

export function useLoadSession(id: string): GetSessionDto {
  return loadEntityById(id, useSessionControllerFindOne, sessionNotFoundText);
}
