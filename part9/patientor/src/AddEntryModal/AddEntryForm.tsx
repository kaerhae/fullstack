import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { RatingField, RatingOption, SelectField, TextField, TypeOption } from "./FormField";
import { Diagnosis, Discharge, EntryType, HealthCheckRating, SickLeave } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection } from "../AddPatientModal/FormField";

const validateDate = (value:any) => {
  let error;
  if(value.length !== 10) {
    error = 'Invalid date, date must be in YYYY-MM-DD format';
    return error;
  } 
  if(!Date.parse(value)){
    error = 'Invalid date, date must be in YYYY-MM-DD format';
    return error;
  }
};


export type EntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  type: EntryType,
  diagnosisCodes?: Diagnosis[],
  healthCheckRating?: HealthCheckRating,
  sickLeave?: SickLeave,
  discharge?: Discharge,
  employerName?: string;
};

interface Props {
  onSubmit: (values: EntryFormValues)  => void;
  onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },

];

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Health Care" },
  { value: EntryType.Hospital, label: "Hospital" }
];

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnoses }] = useStateValue();
    return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        discharge: {
          date: '',
          criteria: ''
        },
        employerName: ''
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        switch (values.type) {
          case "HealthCheck":
            if(!values.healthCheckRating){
              errors.healthCheckRating = requiredError;
            }
            break;
        
          case "OccupationalHealthcare":
            if(!values.employerName){
              errors.employerName = requiredError;
            }
            if(!values.sickLeave){
              errors.sickLeave = requiredError;
            }
            break;

          case "Hospital":
            if(!values.discharge){
              errors.discharge = requiredError;
            }
            break;
          default:
            break;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
              validate={validateDate}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            
            {
              values.type === "HealthCheck" &&
              <RatingField
                label="Health Check Rating"
                name="healthCheckRating"
                options={ratingOptions}
              />
            }
            {
              values.type === "OccupationalHealthcare" &&
                <div>
                  <Field
                    label="Employer Name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                  />
                <Field
                  label="Starting Date for Sick leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                  validate={validateDate}
                  />
                <Field
                  label="Ending Date for Sick leave"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                  validate={validateDate}
                  />
                </div>
            }

            {
              values.type === "Hospital" &&
                <div>
                  <Field
                    label="Criteria for Discharge"
                    placeholder="Criteria"
                    name="discharge.criteria"
                    component={TextField}
                    />
                  <Field
                    label="Date for Discharge"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField} 
                    validate={validateDate}/>
                </div>
            }


            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

