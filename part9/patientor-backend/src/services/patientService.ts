import patientData from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types/types';
const { v4: uuidv4 } = require('uuid');

const findById = (id: string): NonSensitivePatient | undefined => {
    const entry = patientData.find(p => p.id === id);
    if(!entry) {
        return undefined;
    } else {
        return entry;
    }
}

const getAllPatients = (): Patient[] => {
    return patientData;
}

const getNonSensitivePatient = (): NonSensitivePatient[] => {
    const nonSensitivePatients = patientData.map(({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));

    return nonSensitivePatients;
};

const addPatient = ( patient: NewPatient): Patient => {
    const newPatient = {
        id: uuidv4(),
        ...patient,
        entries: []
    };

    patientData.push(newPatient);
    return newPatient;
}

const addEntry = (id: string, entry: NewEntry) => {
    const patient = patientData.find(p => p.id === id);
    const newEntry = {
        ...entry,
        id: uuidv4(),
    };
    patient?.entries.push(newEntry);
    return newEntry;
}

export default {
    findById,
    getAllPatients,
    getNonSensitivePatient,
    addPatient,
    addEntry
};