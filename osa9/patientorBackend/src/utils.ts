/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
    Diagnosis,
    Discharge,
    Entry,
    Gender,
    HealthCheckRating,
    NewEntry,
    NewPatient,
    SickLeave,
} from './types';

const parseName = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing name');
    }
    return text;
};

const parseSpecialist = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing specialist');
    }
    return text;
};

const parseDescription = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing description');
    }
    return text;
};

const parseEmployerName = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('incorrect or missing employer name');
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

const parseEntries = (entries: Entry[]): Entry[] => {
    if (!entries) {
        throw new Error('missing entries');
    }
    return entries.map((entry) => parseEntry(entry));
};

const parseEntry = (entry: unknown): Entry => {
    if (
        !entry ||
        typeof entry !== 'object' ||
        !('type' in entry) ||
        !isEntryType(entry.type)
    ) {
        throw new Error('Entries missing or incorrect: ');
    }
    console.log(entry);
    return entry as Entry;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('diagnosisCodes' in object)
    ) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('discharge' in object) ||
        !isDischarge(object.discharge)
    ) {
        throw new Error('Discharge missing');
    }
    return object.discharge;
};

const parseDischargeDate = (text: unknown): string => {
    if (!text || !isString(text) || !isDate(text)) {
        throw new Error(`incorrect or missing discharge date: ${text}`);
    }
    return text;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
    if (
        !discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge) ||
        !parseDischargeDate(discharge.date)
    ) {
        throw new Error('Incorrect Discharge');
    }
    return true;
};

/*const parseType = (
    type: unknown
): 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' => {
    if (!type || isString(type) || !isEntryType(type)) {
        throw new Error('Type incorrect');
    }
    return type as 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
};*/

const parseSickLeave = (object: unknown): SickLeave | undefined => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('sickLeave' in object) ||
        !isSickLeave(object.sickLeave)
    ) {
        throw new Error('something wrong with sickleave');
    }
    if (object.sickLeave.startDate === '' && object.sickLeave.endDate === '') {
        return undefined;
    }
    return object.sickLeave;
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('healthCheckRating' in object) ||
        typeof object.healthCheckRating !== 'number' ||
        !isHealthCheckRating(object.healthCheckRating)
    ) {
        throw new Error('Incorrect healthcheckrating');
    }
    return object.healthCheckRating;
};

const isHealthCheckRating = (
    healthCheckRating: number
): healthCheckRating is HealthCheckRating => {
    if (!healthCheckRating || typeof healthCheckRating !== 'number') {
        throw new Error('Healthcheck rating is worng type');
    }
    return Object.values(HealthCheckRating)
        .map((value) => value)
        .includes(healthCheckRating);
};
const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
    if (
        !sickLeave ||
        typeof sickLeave !== 'object' ||
        !('startDate' in sickLeave) ||
        !('endDate' in sickLeave)
    ) {
        throw new Error('Incorrect sickLeave');
    }
    if (!('startDate' in sickLeave) || !('endDate' in sickLeave)) {
        throw new Error('Incorrect sickLeave');
    }
    if (sickLeave.startDate === '' && sickLeave.endDate === '') {
        return true;
    }
    if (!isString(sickLeave.startDate) || !Date.parse(sickLeave.startDate)) {
        throw new Error('Incorrect sickleave startdate');
    }
    if (!isString(sickLeave.endDate) || !Date.parse(sickLeave.endDate)) {
        throw new Error('Incorrect sickleave enddate');
    }
    return true;
};

const isEntryType = (type: unknown): boolean => {
    if (!type || !isString(type)) {
        throw new Error('Entry doesnt contain type');
    }
    return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(type);
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
        'occupation' in object &&
        'entries' in object
    ) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(object.entries as Entry[]),
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields missing');
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'type' in object &&
        'date' in object &&
        'specialist' in object &&
        'description' in object &&
        'diagnosisCodes' in object &&
        'discharge' in object
    ) {
        const newEntry: NewEntry = {
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            diagnosisCodes: parseDiagnosisCodes(object),
            discharge: parseDischarge(object),
            type: 'Hospital',
        };
        return newEntry;
    }

    if (
        'type' in object &&
        'sickLeave' in object &&
        'date' in object &&
        'specialist' in object &&
        'description' in object &&
        'diagnosisCodes' in object &&
        'employerName' in object
    ) {
        const newEntry: NewEntry = {
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object),
            type: 'OccupationalHealthcare',
        };
        return newEntry;
    }
    if (
        'type' in object &&
        'date' in object &&
        'specialist' in object &&
        'description' in object &&
        'diagnosisCodes' in object &&
        'healthCheckRating' in object
    ) {
        const newEntry: NewEntry = {
            date: parseDateOfBirth(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            diagnosisCodes: parseDiagnosisCodes(object) || undefined,
            healthCheckRating: parseHealthCheckRating(object),
            type: 'HealthCheck',
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
