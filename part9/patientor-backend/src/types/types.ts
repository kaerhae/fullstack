// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  sickLeave?: SickLeave;
  employerName: string;
  type: "OccupationalHealthcare";
}

export interface HospitalEntry extends BaseEntry {
  discharge?: Discharge;
  type: "Hospital";

}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
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

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface EntryProps {
  id: string;
  entry: Entry;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >
export type NewPatient = Omit<Patient, 'id'>;
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
export type NewDiagnoseEntry = Diagnose;

export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthcareEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;