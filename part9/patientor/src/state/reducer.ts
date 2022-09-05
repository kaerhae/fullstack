import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "GET_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  |{
      type: "ADD_ENTRY";
      payload: Entry;
      id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patient: action.payload,
        ...state.patient
      };
      case "SET_DIAGNOSIS_LIST":
        return {
            ...state,
            diagnoses: action.payload,
            ... state.diagnoses
          };
      case "ADD_ENTRY":
        const patient: Patient = state.patients[action.id];
        const updatedPatient: Patient = {
          ...patient,
          entries: patient.entries.concat(action.payload)
        };

        return {
          ...state,
          patient: updatedPatient,
        };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

export const setSinglePatient = (patient: Patient): Action => {
  return {
    type: "GET_PATIENT",
    payload: patient,
  };
};

export const addSinglePatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnoseList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses
  };
};

export const addEntry = (id: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    id: id,
    payload: entry
  };
};