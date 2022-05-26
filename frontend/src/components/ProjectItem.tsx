import { IProjectType } from "../types";

export const ProjectItem = ({name, hourly_rate, isActive, customer}: IProjectType) => {
  return (
    <div className={`project-item ${!isActive && 'project-item--not-active'} p1 m1`}>
      <div className="project-item__name"><strong>{name}</strong></div>
      <div className="project-item__customer">{customer}</div>
      <div className="project-item__hourly-rate">{hourly_rate} $/hour</div>
      <div className="project-item__settings">
        <img className="icon" src={`/assets/edit-${isActive ? 'antracit' : 'lime'}.svg`} />
        <img className="icon" src={`/assets/delete-${isActive ? 'antracit' : 'lime'}.svg`} />
      </div>
    </div>
  );
}