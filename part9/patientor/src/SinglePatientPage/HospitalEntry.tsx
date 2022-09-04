import React from "react";
import { HospitalEntryProps } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
const HospitalEntry = (props: HospitalEntryProps) => {
    const styles = {
        entry: {
          border: "1px solid black",
          marginBottom:"10px",
          padding: "10px"
        } as React.CSSProperties,
      };
    return (
        <div style={styles.entry}>
            <p>{props.date} <LocalHospitalIcon /></p>
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
        </div>
    );
};

export default HospitalEntry;