import { Link } from "react-router-dom";
import { useState } from "react";
import { GetProjectDto } from "../api/model";
import { DeleteForever, Delete, Edit } from "@mui/icons-material";
import toast from "react-hot-toast";
import { DeleteButton } from "./DeleteButton";
import { DeleteForeverButton } from "./DeleteForeverButton";

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
            <DeleteForeverButton onDelete={onDelete} id={id} />
          ) : (
            <DeleteButton
              wantToRemove={wantToRemove}
              setWantToRemove={setWantToRemove}
            />
          )}
        </div>
      </div>
    </div>
  );
};
