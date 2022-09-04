import React from "react";
import { EntryProps } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";


const Entries = (props: EntryProps) => {
    console.log(props.entry.type);
    switch(props.entry.type){
        case "HealthCheck":
            return <HealthCheckEntry
                type={props.entry.type}
                id={props.entry.id}
                date={props.entry.date}
                description={props.entry.description}
                diagnosisCodes={props.entry.diagnosisCodes}
                healthCheckRating={props.entry.healthCheckRating}
                specialist={props.entry.specialist}
                findByCode={props.findByCode}
                />;
        case "Hospital":
            return <HospitalEntry
                type={props.entry.type}
                id={props.entry.id}
                date={props.entry.date}
                description={props.entry.description}
                diagnosisCodes={props.entry.diagnosisCodes}
                specialist={props.entry.specialist}
                findByCode={props.findByCode}
                discharge={props.entry.discharge}
                />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry
                type={props.entry.type}
                employerName={props.entry.employerName}
                id={props.entry.id}
                date={props.entry.date}
                description={props.entry.description}
                diagnosisCodes={props.entry.diagnosisCodes}
                specialist={props.entry.specialist}
                sickLeave={props.entry.sickLeave}
                findByCode={props.findByCode} />;
        default:
            return assertNever(props.entry);
    }
};

export const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Entries;