import { Gender, NewPatient } from './types';

const parseName = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing name');
    }
    return text;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing occupation');
    }
    return text;
};

const parseDateOfBirth = (text: unknown): string => {
    if (!text || !isString(text) || !isDate(text)) {
        throw new Error(`incorrect or missing date: ${text}`);
    }
    return text;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender missiong or incorrect: ' + gender);
    }
    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((value) => value.toString())
        .includes(param);
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
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

export default toNewPatient;
