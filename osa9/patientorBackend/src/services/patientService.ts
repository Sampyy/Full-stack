import { Patient, NoSSNPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

import patients from '../../data/patientData';

const getAllPatients = (): Patient[] => {
    return patients;
};

const getAllPatientsNonSensitive = (): NoSSNPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (newPatient:NewPatient
    /*name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string*/
): Patient => {
    const addedPatient = {
        ...newPatient,
        id: uuid(),
        
    };

    patients.push(addedPatient);
    return addedPatient;
};

export default {
    getAllPatients,
    getAllPatientsNonSensitive,
    addPatient,
};
