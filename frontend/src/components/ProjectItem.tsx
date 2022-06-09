import { Link } from "react-router-dom";
import { useState } from "react";
import { GetProjectDto } from "../api/model";
import { DeleteForever, Delete, Edit } from "@mui/icons-material";

export interface IProjectItemProps {
  project: GetProjectDto;
  onDelete: Function;
}

export const ProjectItem = ({ project, onDelete }: IProjectItemProps) => {
  const [wantToRemove, setWantToRemove] = useState(false);
  const { customer, hourlyRate, id, isActive, name } = { ...project };

  return (
    <div
      className={`project-item ${
        !isActive && "project-item--not-active"
      } p1 m1`}
    >
      <Link
        to={`/project/${id}`}
        className={`project-item__info ${
          !isActive && "project-item__info--not-active"
        }`}
      >
        <div className="info__name">
          <strong>{name}</strong>
        </div>
        <div className="info__customer">{customer}</div>
        <div className="info__hourly-rate">{hourlyRate}$/hour</div>
      </Link>
      <div className="project-item__settings-wrapper flex-center">
        <div className="project-settings flex-center">
          <Link to={`/project/edit/${id}`}>
            <Edit color="primary" />
          </Link>
          {wantToRemove ? (
            <button
              onClick={() => onDelete(id)}
              className="btn-delete-project"
              title="Yes, I want to delete the project"
            >
              <DeleteForever color="primary" />
            </button>
          ) : (
            <button
              onClick={() => {
                setWantToRemove(!wantToRemove);
              }}
              className="btn-delete-project"
              title="Delete the project"
            >
              <Delete color="primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
