"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patientData_1 = __importDefault(require("../../data/patientData"));
const getAllPatients = () => {
    return patientData_1.default;
};
const getAllPatientsNonSensitive = () => {
    return patientData_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (newPatient
/*name: string,
dateOfBirth: string,
ssn: string,
gender: string,
occupation: string*/
) => {
    const addedPatient = Object.assign(Object.assign({}, newPatient), { id: (0, uuid_1.v1)() });
    patientData_1.default.push(addedPatient);
    return addedPatient;
};
exports.default = {
    getAllPatients,
    getAllPatientsNonSensitive,
    addPatient,
};
