import diagnoseData from '../../data/diagnoses';
import { Diagnose, NewDiagnoseEntry } from '../types/types';

const getEntries = (): Diagnose[] => {
    return diagnoseData;
}

const addEntry = ( entry: NewDiagnoseEntry ) => {
    const newDiagnose = entry;
    diagnoseData.push(newDiagnose);

    return newDiagnose;
}

export default {
    getEntries,
    addEntry
};