export interface ICreateJob {
  hospitalId: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  slots: number;
  specialtyIds: string[];
}
