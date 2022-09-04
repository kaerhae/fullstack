import React from "react";
import { HealthCheckEntryProps } from "../types";
import HeartIcon from "./HeartIcon";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
const HealthCheckEntry = (props: HealthCheckEntryProps) => {
    const styles = {
        entry: {
          border: "1px solid black",
          marginBottom:"10px",
          padding: "10px"
        } as React.CSSProperties,
      };
    
    return (
        <div style={styles.entry}>
            <p>{props.date} <HealthAndSafetyIcon /></p>
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
            <HeartIcon rating={props.healthCheckRating}/>
        </div>
    );
};

export default HealthCheckEntry;