export interface IProjectType {
  id: string;
  name: string;
  hourly_rate: number;
  isActive: boolean;
  customer: string;
}

export interface ISessionType {
  id: string;
  project_id: string;
  fromDate: Date;
  toDate: Date;
  isInvoiced: boolean;
  hourly_rate: number;
  note: string;
}
