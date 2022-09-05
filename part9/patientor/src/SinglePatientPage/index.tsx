import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { Entry, EntryFormValues, SinglePageParams } from "../types";
import { addEntry, setSinglePatient, useStateValue } from "../state";
import { Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import NameAndGender from "./NameAndGender";
import Entries from "./Entries";
import AddEntryModal from "../AddEntryModal";
const SinglePatientPage = () => {
  const [ { patient, diagnoses } ] = useStateValue();

	const { id } = useParams<SinglePageParams>();
  const [, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      switch (values.type) {
        case "HealthCheck":
          const newHealthCheck: EntryFormValues = {
            description: values.description,
            date: values.date,
            specialist: values.specialist,
            healthCheckRating: values.healthCheckRating,
            type: values.type,
            diagnosisCodes: values.diagnosisCodes
          };
    
          const { data: newHealthCheckData } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            newHealthCheck
          );
          dispatch(addEntry(id, newHealthCheckData));

          break;
          case "Hospital":
            const newHospital: EntryFormValues = {
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              type: values.type,
              diagnosisCodes: values.diagnosisCodes,
              discharge: values.discharge
            };
      
            const { data: newHospitalData } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${id}/entries`,
              newHospital
            );
            dispatch(addEntry(id, newHospitalData));
            break;
          case "OccupationalHealthcare":
            const newOccupational: EntryFormValues = {
              description: values.description,
              date: values.date,
              specialist: values.specialist,
              type: values.type,
              diagnosisCodes: values.diagnosisCodes,
              employerName: values.employerName,
              sickLeave: values.sickLeave
            };
      
            const { data: newOccupationalData } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${id}/entries`,
              newOccupational
            );
            dispatch(addEntry(id, newOccupationalData));
            break;
        default:
          break;
      }
      //dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e: any) {
      console.error('Printing the error', e.response);
      console.error(e.response?.message);
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        console.log('Fetching');
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setSinglePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) {
      void fetchPatientList();
    }
  }, [dispatch]);
  

  const findByCode = (code: string) => {
    const diagnose = diagnoses.find(d => d.code === code);
    return diagnose?.name;
  };

	return (
    <div className="App">
      <Container textAlign="left">
        <h3>Patient information</h3>
				{
          patient ?
          <div>
            <NameAndGender patient={patient}/>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {
              patient.entries.length ?
              patient.entries.map(e => 
                <Entries
                  key={e.id}
                  entry={e}
                  findByCode={findByCode}
                />
                )
              : <p>No entries</p>
            }
          </div> : <p>Patient not found!</p>
        }
        <Button onClick={() => openModal()}>Add New Entry</Button>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
      </Container>
    </div>
  );
};

export default SinglePatientPage;
