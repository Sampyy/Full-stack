import { Patient, NoSSNPatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

import patients from '../../data/patientData';
import toNewPatient from '../utils';

const getAllPatients = (): Patient[] => {
    return patients.map((patient) => toNewPatient(patient));
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

const getPatient = (id: string) => {
    console.log(patients);
    try {
        const patient = patients.find(
            (patient) => patient.id === id.toString()
        );
        console.log(patient);
        return patient;
    } catch (error: unknown) {
        const errorMessage = 'Error occured: ' + error;
        throw new Error(errorMessage);
    }
};

const addPatient = (
    newPatient: NewPatient
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
    getPatient,
};
