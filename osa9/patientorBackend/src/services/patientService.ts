import { Patient, NoSSNPatient, NewPatient, NewEntry, Entry } from '../types';
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

const getPatient = (id: string) => {
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

const addEntry = (id: string, entry: NewEntry): Entry => {
    try {
        const patient = patients.find(
            (patient) => patient.id === id.toString()
        );
        if (!patient) {
            throw new Error('Patient not found');
        }
        const newEntry = {
            ...entry,
            id: uuid(),
        };
        patient.entries = patient.entries.concat(newEntry);
        console.log(patient.entries);
        return newEntry;
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
    addEntry,
};
