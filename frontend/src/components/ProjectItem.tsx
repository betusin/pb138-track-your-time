import { IProjectType } from "../types";
import { Link } from 'react-router-dom';

export const ProjectItem = ({id, name, hourly_rate, isActive, customer}: IProjectType) => {
  return (
    <Link to={`/project/${id}`} className={`project-item ${!isActive && 'project-item--not-active'} p1 m1`}>
      <div className="project-item__name"><strong>{name}</strong></div>
      <div className="project-item__customer">{customer}</div>
      <div className="project-item__hourly-rate">{hourly_rate}$/hour</div>
      <div className="project-item__settings">
        <img className="icon" src={`/assets/edit-${isActive ? 'antracit' : 'lime'}.svg`} />
        <img className="icon" src={`/assets/delete-${isActive ? 'antracit' : 'lime'}.svg`} />
      </div>
    </Link>
  );
}