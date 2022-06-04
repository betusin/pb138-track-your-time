import { IProjectType } from "../types";
import { Link } from "react-router-dom";
import { useState } from "react";

export const ProjectItem = ({
  id,
  name,
  hourly_rate,
  isActive,
  customer,
}: IProjectType) => {
  const [wantToRemove, setWantToRemove] = useState(false);

  const deleteProject = () => {
    window.alert("deleting project with id " + id);
  };

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
      <div className="project-item__hourly-rate">{hourly_rate}$/hour</div>
      <div className="project-item__settings">
        <Link to={`/project/edit/${id}`}>
          <img
            className="icon"
            src={`/assets/edit-${isActive ? "antracit" : "lime"}.svg`}
          />
        </Link>
        {wantToRemove ? (
          <img
            className={`icon icon--inverse ${
              isActive && "icon--active_inverse"
            }`}
            title="Yes, I want to delete the project"
            onClick={() => deleteProject()}
            src={`/assets/delete-${isActive ? "lime" : "antracit"}.svg`}
          />
        ) : (
          <img
            className="icon"
            title="Delete the project"
            onClick={() => setWantToRemove(!wantToRemove)}
            src={`/assets/delete-${isActive ? "antracit" : "lime"}.svg`}
          />
        )}
      </div>
    </div>
  );
};
