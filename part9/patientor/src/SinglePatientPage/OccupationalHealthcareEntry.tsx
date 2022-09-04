import React from "react";
import { OccupationalHealthcareEntryProps } from "../types";
import WorkIcon from '@mui/icons-material/Work';
const OccupationalHealthcareEntry = (props: OccupationalHealthcareEntryProps) => {
    const styles = {
        entry: {
          border: "1px solid black",
          marginBottom:"10px",
          padding: "10px"
        } as React.CSSProperties,
      };
    return (
        <div style={styles.entry}>
            <p>{props.date} <WorkIcon /> {props.employerName}</p>
            <p><u>Description</u></p>
            <p>{props.description}</p>
            {
                props.diagnosisCodes ?
                <div>
                    <p><u>Diagnose Codes</u></p>
                    <ul>
                        {
                            props.diagnosisCodes.map(d => 
                                    <li key={d}>{d} {props.findByCode(d)}</li>  
                            )
                        }
                    </ul>
                </div>
                : null
            }
            {
                props.sickLeave ?
                <p>Sickleave from {props.sickLeave?.startDate} to {props.sickLeave?.endDate}</p>
                : null
            }
        </div>
    );
};

export default OccupationalHealthcareEntry;