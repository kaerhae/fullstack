import patients from '../../data/patients';
import {v1 as uuid} from 'uuid'
import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry } from '../../types/types';

const id = uuid();
const getEntries = (): Array<PatientEntry> => {
  return patients;
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id:string): PatientEntry | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: id,
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry
}



export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient
}