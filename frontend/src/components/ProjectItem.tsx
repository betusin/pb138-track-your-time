import { Link } from "react-router-dom";
import { useState } from "react";
import { GetProjectDto } from "../api/model";
import { Edit } from "@mui/icons-material";
import { DeleteButton } from "./DeleteButton";
import { DeleteForeverButton } from "./DeleteForeverButton";
import { styleLargeIcon } from "../styles/theme";

export interface IProjectItemProps {
  project: GetProjectDto;
  onDelete: Function;
}

export const ProjectItem = ({ project, onDelete }: IProjectItemProps) => {
  const [wantToRemove, setWantToRemove] = useState(false);
  const { customer, hourlyRate, id, isActive, name } = { ...project };

  return (
    <div
      className={`project-item ${!isActive && "project-item--not-active"}  m1`}
    >
      <div
        className={`project-item__info-wrapper p1 ${
          !isActive && "project-item__info-wrapper--not-active"
        }`}
      >
        <Link to={`/project/${id}`} className="project-info">
          <div className="project-info__name">
            <strong>{name}</strong>
          </div>
          <div className="project-info__customer">{customer}</div>
          <div className="project-info__hourlyRate">{hourlyRate}$/hour</div>
        </Link>
      </div>
      <div className="project-item__settings">
        <Link to={`/project/edit/${id}`}>
          <Edit style={styleLargeIcon} color="primary" />
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
  );
};
