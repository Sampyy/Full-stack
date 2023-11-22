import { Patient, NoSSNPatient } from '../types';
import { v1 as uuid } from 'uuid';

import patients from '../data/patientData';

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

const addPatient = (
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
): Patient => {
    const newPatient = {
        id: uuid(),
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation,
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getAllPatients,
    getAllPatientsNonSensitive,
    addPatient,
};
