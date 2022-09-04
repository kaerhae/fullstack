import { Diagnose, Discharge, Entry, Gender, HealthCheckRating, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewPatient, SickLeave } from "../types/types";

type Fields = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown,
    entries:Entry[]
};

const validateNewPatient = ({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries
}: Fields ): NewPatient => {
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        occupation: parseOccupation(occupation),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        entries: entries
    };

    return newEntry;
}

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isInt = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
/* SSN:n validointifunktio
const isSSN = (ssn: string): boolean => {
    return Boolean(ssn.length === 11);
}
*/

const checkGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Name is missing or incorrect!');
    }
    return name;
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Date is missing or incorrect!');
    }
    return date;
}

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Social Security Number is missing or incorrect!');
    }
    /* SSN: validointi
    
    if(!isSSN(ssn)) {
        throw new Error('Invalid Social Security Number!');
    }
    */
    return ssn;
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !checkGender(gender)) {
        throw new Error('Invalid gender');
    }
    return gender;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Occupation is missing or incorrect!');
    }
    return occupation;
}



const validateNewEntry = (entry: Entry) => {
    switch (entry.type) {
        case "HealthCheck":
            const newHealthCheck: NewHealthCheckEntry = {
                date: parseDate(entry.date),
                description: parseDescription(entry.description),
                specialist: parseSpecialist(entry.specialist),
                type: entry.type,
                healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
            }
            return newHealthCheck;
        
        case "Hospital":
            const newHospitalEntry: NewHospitalEntry = {
                date: parseDate(entry.date),
                description: parseDescription(entry.description),
                specialist: parseSpecialist(entry.specialist),
                type: entry.type,
                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                discharge: parseDischarge(entry.discharge)
            }

            return newHospitalEntry;
        case "OccupationalHealthcare":
            const newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
                date: parseDate(entry.date),
                description: parseDescription(entry.description),
                specialist: parseSpecialist(entry.specialist),
                type: entry.type,
                diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
                sickLeave: parseSickleave(entry.sickLeave),
                employerName: parseEmployerName(entry.employerName)
            }
            return newOccupationalHealthcareEntry;
        default:
            throw new Error("Invalid type");
    }
}

const checkRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
}
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!isInt(healthCheckRating) || !checkRating(healthCheckRating)) {
        throw new Error('Invalid health check rating!')
    }

    return healthCheckRating;
}

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge.date 
    || !discharge.criteria
    || !isString(discharge.date)
    || !isString(discharge.criteria)) {
        throw new Error("Invalid discharge")
    }

    return discharge;
}

const parseSickleave = (sickleave: any): SickLeave => {
    if (!sickleave.startDate 
    || !sickleave.endDate
    || !isString(sickleave.startDate)
    || !isString(sickleave.endDate)) {
        throw new Error("Invalid sickleave")
    }

    return sickleave;
}

const parseEmployerName = (name:unknown): string => {
    if(!isString(name) || !name) {
        throw new Error("Invalid or missing employer name")
    }

    return name;
}

const parseDescription = (desc: unknown): string => {
    if(!isString(desc) || !desc){
        throw new Error("Invalid or missing description")
    }

    return desc;
}

const parseSpecialist = (specialist: unknown): string => {
    if(!isString(specialist) || !specialist){
        throw new Error("Invalid or missing specialist")
    }

    return specialist;
}

const parseDiagnosisCodes = (diagnosisCode: any): Array<Diagnose['code']>  => {
    if(!diagnosisCode || !diagnosisCode.every((i: Diagnose['code']) => typeof i === "string")){
        throw new Error("Invalid or missing diagnosis code")
    }

    return diagnosisCode;
}

export default {
    validateNewPatient,
    validateNewEntry
}