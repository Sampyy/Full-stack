import { Patient, NoSSNPatient } from '../types';

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

export default {
    getAllPatients,
    getAllPatientsNonSensitive,
};
