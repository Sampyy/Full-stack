/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAllPatientsNonSensitive());
});

router.get('/sensitive', (_req, res) => {
    res.send(patientService.getAllPatients());
});

router.get('/:id', (req, res) => {
    try {
        res.send(patientService.getPatient(req.params.id));
    } catch (error: unknown) {
        let errorMessage: string = 'Error occured';
        if (error instanceof Error) {
            errorMessage += error;
        }
        res.status(404).send(errorMessage);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage: string = 'Error occured';
        if (error instanceof Error) {
            errorMessage += error;
        }

        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(req.params.id, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage: string = 'Error occured';
        if (error instanceof Error) {
            errorMessage += error;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
