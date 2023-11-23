"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parseName = (text) => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing name');
    }
    return text;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (text) => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing occupation');
    }
    return text;
};
const parseDateOfBirth = (text) => {
    if (!text || !isString(text) || !isDate(text)) {
        throw new Error(`incorrect or missing date: ${text}`);
    }
    return text;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender missiong or incorrect: ' + gender);
    }
    return gender;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((value) => value.toString())
        .includes(param);
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields missing');
};
exports.default = toNewPatient;
