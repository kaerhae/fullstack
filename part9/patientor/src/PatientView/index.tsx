import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { apiBaseUrl } from "../constants";
import { Patient } from '../types';
import { setPatient, useStateValue } from '../state';
import GenderIcon from './GenderIcon';
const PatientView = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {

    const fetchPatient = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    
    // Check if requested user is same as previous
    if(!patient || id !== patient.id) {
      console.log('finding new');
      void fetchPatient();
    }

  }, []);

  console.log(id);
  console.log(patient?.id);
  return (
    <div>
      {
        patient ?
        <div>
          <h1>{patient.name} <GenderIcon gender={patient.gender} /></h1>
          <p><b>SSN: </b>{patient.ssn} </p>
          <p><b>Occupation: </b>{patient.occupation} </p>
        </div> :
        <p>Error on loading patient details</p>
      }
    </div>
  );
};

export default PatientView;