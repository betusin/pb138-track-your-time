import { ApiCall } from "./api-caller";
import {
  projectControllerRemove,
  projectControllerUpdate,
} from "../api/projects/projects";
import {
  CreateSessionDto,
  UpdateProjectDto,
  UpdateSessionDto,
} from "../api/model";
import {
  projectControllerCreateSession,
  sessionControllerRemove,
  sessionControllerUpdate,
} from "../api/sessions/sessions";
import { sessionPhotoControllerRemove } from "../api/session-photos/session-photos";

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

export function sessionControllerRemoveWrap(
  projectID: string
): ApiCall<void, void> {
  return (body, cfg) => {
    return sessionControllerRemove(projectID, cfg);
  };
}

export function sessionControllerCreateWrap(
  projectID: string
): ApiCall<CreateSessionDto, void> {
  return (body, cfg) => {
    return projectControllerCreateSession(projectID, body, cfg);
  };
}

export function sessionControllerUpdateWrap(
  sessionID: string
): ApiCall<UpdateSessionDto, UpdateSessionDto> {
  return (body, cfg) => {
    return sessionControllerUpdate(sessionID, body, cfg);
  };
}

export function sessionPhotoControllerRemoveWrap(
  sessionPhotoID: string
): ApiCall<void, void> {
  return (body, cfg) => {
    return sessionPhotoControllerRemove(sessionPhotoID, cfg);
  };
}
