import { ApiCall } from "./api-caller";
import { projectControllerRemove } from "../api/projects/projects";

export function projectControllerRemoveWrap(
  projectID: string
): ApiCall<void, void> {
  return (body, cfg) => {
    return projectControllerRemove(projectID, cfg);
  };
}
