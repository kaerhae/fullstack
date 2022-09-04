export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type SinglePageParams = {
  id: string;
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}


export interface EntryProps {
  findByCode: (code: string) => string | undefined;
  entry: Entry;
}


export enum EntryType {
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
  HealthCheck = "HealthCheck"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  sickLeave?: SickLeave;
  employerName: string;
  type: "OccupationalHealthcare";
}

export interface OccupationalHealthcareEntryProps extends OccupationalHealthcareEntry {
  findByCode: (code: string) => string | undefined;
}

export interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
  type: "Hospital";
}

export interface HospitalEntryProps extends HospitalEntry {
  findByCode: (code: string) => string | undefined;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HealthCheckEntryProps extends HealthCheckEntry {
  findByCode: (code: string) => string | undefined;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HeartIconProps {
  rating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;