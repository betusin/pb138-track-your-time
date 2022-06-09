import { Link } from "react-router-dom";
import { useState } from "react";
import { GetProjectDto } from "../../api/model";
import { Trans } from "react-i18next";

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
      <Link to={`/project/${id}`} className="project-item__name">
        <strong>{name}</strong>
      </Link>
      <div className="project-item__customer">{customer}</div>
      <div className="project-item__hourly-rate">
        {hourlyRate}$/
        <Trans i18nKey="project.hour" />{" "}
      </div>
      <div className="project-item__settings">
        <Link to={`/project/${id}/edit`}>
          <img
            className="icon"
            alt="edit"
            src={`/assets/edit-${isActive ? "antracit" : "lime"}.svg`}
          />
        </Link>
        {wantToRemove ? (
          <button onClick={() => onDelete(id)} className="btn-delete-project">
            <img
              className={`icon icon--inverse ${
                isActive && "icon--active_inverse"
              }`}
              alt="real delete"
              title="Yes, I want to delete the project"
              src={`/assets/delete-${isActive ? "lime" : "antracit"}.svg`}
            />
          </button>
        ) : (
          <button
            onClick={() => setWantToRemove(!wantToRemove)}
            className="btn-delete-project"
          >
            <img
              className="icon"
              alt="delete"
              title="Delete the project"
              src={`/assets/delete-${isActive ? "antracit" : "lime"}.svg`}
            />
          </button>
        )}
      </div>
    </div>
  );
};
