import { Link } from "react-router-dom";
import { GetProjectDto } from "../../api/model";
import { Edit } from "@mui/icons-material";
import { styleLargeIcon } from "../../styles/theme";
import { DeleteButton } from "../common/DeleteButton";
import { Trans } from "react-i18next";

export interface IProjectItemProps {
  project: GetProjectDto;
  onDelete: (id: string) => void;
}

export const ProjectItem = ({ project, onDelete }: IProjectItemProps) => {
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
          <div className="project-info__hourlyRate">
            {hourlyRate}$/
            <Trans i18nKey="project.hour" />{" "}
          </div>
        </Link>
      </div>
      <div className="project-item__settings">
        <Link to={`/project/${id}/edit`} className="btn">
          <Edit style={styleLargeIcon} color="primary" />
        </Link>
        <DeleteButton onDelete={onDelete} id={id} />
      </div>
    </div>
  );
};
