import React from 'react';
import { Patient } from '../types';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
const NameAndGender = ({ patient }: { patient: Patient}): JSX.Element => {
    switch (patient.gender) {
        case "male":
            return (
                <div>
                    <p><b>{patient.name} <MaleIcon /></b></p>
                </div>
            );
        case "female":
            return (
                <div>
                    <p><b>{patient.name} <FemaleIcon /></b></p>
                </div>
            );
        case "other":
            return (
                <div>
                    <p><b>{patient.name} <QuestionMarkIcon /></b></p>
                </div>
            );
        default:
            return (
                <p>Error on displaying name and gender</p>
            );
    }
};

export default NameAndGender;