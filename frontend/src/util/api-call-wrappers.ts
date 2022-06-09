import { ApiCall } from "./api-caller";
import {
  projectControllerRemove,
  projectControllerUpdate,
} from "../api/projects/projects";
import { UpdateProjectDto } from "../api/model";

export function projectControllerRemoveWrap(
  projectID: string
): ApiCall<void, void> {
  return (body, cfg) => {
    return projectControllerRemove(projectID, cfg);
  };
}

export function projectControllerUpdateWrap(
  projectID: string
): ApiCall<UpdateProjectDto, void> {
  return (body, cfg) => {
    return projectControllerUpdate(projectID, body, cfg);
  };
}
