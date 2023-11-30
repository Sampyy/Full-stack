import { Button, Container, TextField, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import patientService from '../../services/patients';
import { Entry, HealthCheckRating, NewEntry, SickLeave } from '../../types';
import { AxiosError } from 'axios';
//add others using typeswitch to controll what fields are, FIX ENTRIES NOT SHOWING UP
const EntryForm = ({
    id,
    entries,
    setEntries,
}: {
    id: string;
    entries: Entry[];
    setEntries: React.Dispatch<React.SetStateAction<Entry[] | undefined>>;
}) => {
    const [type, setType] = useState<
        'Hospital' | 'OccupationalHealthcare' | 'HealthCheck'
    >('Hospital');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState('');
    const [sickLeaveEnd, setSickLeaveEnd] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState('');

    const [error, setError] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');

    const resetForm = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setDischargeDate('');
        setDischargeCriteria('');
        setDiagnosisCodes('');
    };

    const parseDiagnosisCodes = () => {
        const splitCodes = diagnosisCodes.split(',');
        return splitCodes.map((code) => code.trim());
    };

    const createEntry = async (entry: NewEntry) => {
        try {
            const createdEntry = await patientService.createEntry(id, entry);
            console.log(createdEntry);
            const newEntries = entries.concat(createdEntry);
            setEntries(newEntries);
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError && error.response) {
                errorMessage += error.response.data;
                console.log(errorMessage);
            } else if (error instanceof Error) {
                errorMessage += error;
                console.log(errorMessage);
            }
            setError(errorMessage);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const diagnosisCodes = parseDiagnosisCodes();
            console.log('diagnosisCodes: ', diagnosisCodes);
            switch (type) {
                case 'Hospital':
                    const discharge = {
                        date: dischargeDate,
                        criteria: dischargeCriteria,
                    };
                    const newHospitalEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        discharge,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newHospitalEntry);
                    break;
                case 'OccupationalHealthcare':
                    const sickLeave: SickLeave = {
                        startDate: sickLeaveStart,
                        endDate: sickLeaveEnd,
                    };
                    const newOccupationalEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        employerName,
                        sickLeave,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newOccupationalEntry);
                    break;
                case 'HealthCheck':
                    const healthCheckEntry: HealthCheckRating = Number(
                        healthCheckRating
                    ) as HealthCheckRating;
                    const newHealthCheckEntry: NewEntry = {
                        description,
                        date,
                        specialist,
                        healthCheckRating: healthCheckEntry,
                        diagnosisCodes,
                        type,
                    };
                    createEntry(newHealthCheckEntry);
                    break;
            }
        } catch (error: unknown) {
            let errorMessage = '';
            if (error instanceof AxiosError && error.response) {
                errorMessage += error.response.data;
                console.log(errorMessage);
            } else if (error instanceof Error) {
                errorMessage += error;
                console.log(errorMessage);
            }
            setError(errorMessage);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <Container style={{ border: 'dotted' }}>
            <Button variant="contained" onClick={() => setType('Hospital')}>
                Hospital
            </Button>
            <Button
                variant="contained"
                onClick={() => setType('OccupationalHealthcare')}
            >
                Occupational
            </Button>
            <Button variant="contained" onClick={() => setType('HealthCheck')}>
                HealthCheck
            </Button>
            <h3>New entry</h3>
            {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
            <form onSubmit={(event) => addEntry(event)}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    variant="standard"
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    variant="standard"
                    label="Date"
                    fullWidth
                    value={date}
                    type="date"
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                {type === 'Hospital' && (
                    <TextField
                        label="Discharge date"
                        fullWidth
                        value={dischargeDate}
                        type="date"
                        onChange={({ target }) =>
                            setDischargeDate(target.value)
                        }
                    />
                )}
                {type === 'Hospital' && (
                    <TextField
                        label="Discharge Criteria"
                        fullWidth
                        value={dischargeCriteria}
                        onChange={({ target }) =>
                            setDischargeCriteria(target.value)
                        }
                    />
                )}
                {type === 'OccupationalHealthcare' && (
                    <TextField
                        label="Employer name"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                )}
                {type === 'OccupationalHealthcare' && (
                    <TextField
                        label="Sickleave start"
                        fullWidth
                        value={sickLeaveStart}
                        type="date"
                        onChange={({ target }) =>
                            setSickLeaveStart(target.value)
                        }
                    />
                )}

                {type === 'OccupationalHealthcare' && (
                    <TextField
                        label="Sickleave end"
                        fullWidth
                        type="date"
                        value={sickLeaveEnd}
                        onChange={({ target }) => setSickLeaveEnd(target.value)}
                    />
                )}
                {type === 'HealthCheck' && (
                    <TextField
                        label="Healthcheck rating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) =>
                            setHealthCheckRating(target.value)
                        }
                    />
                )}
                <TextField
                    label="Diagnosis codes"
                    fullWidth
                    value={diagnosisCodes}
                    onChange={({ target }) => setDiagnosisCodes(target.value)}
                />

                <Button onClick={() => resetForm()}>Cancel</Button>
                <Button
                    variant="contained"
                    type="submit"
                    style={{ float: 'right' }}
                >
                    Add
                </Button>
            </form>
        </Container>
    );
};

export default EntryForm;
